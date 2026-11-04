import { useEffect, useRef } from 'react';

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary, .filter, .project-card";

export default function NeonCursor({ trailLength = 24 }) {
  const canvasRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !dot || !ring || !ctx) return;

    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: innerWidth / 2, y: innerHeight / 2 };
    const ringPos = { ...mouse };
    const points = [];
    let frame = 0;
    let visible = false;
    let color = getComputedStyle(root).getPropertyValue('--accent').trim() || '#00e5a8';

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.x = mouse.x;
        ringPos.y = mouse.y;
        root.classList.add('neon-cursor-visible');
      }
      if (!reduceMotion) points.push({ x: mouse.x, y: mouse.y, life: 1 });
    };

    const onOver = (e) => {
      const target = e.target?.closest?.(INTERACTIVE);
      root.classList.toggle('neon-cursor-hover', Boolean(target));
      // Project cards glow in their own color (--project-color) while hovered
      const tinted = e.target?.closest?.('[class*="project-card"]');
      const tint = tinted ? getComputedStyle(tinted).getPropertyValue('--project-color').trim() : '';
      color = tint || getComputedStyle(root).getPropertyValue('--accent').trim() || '#00e5a8';
      root.style.setProperty('--neon', color);
    };

    const onDown = () => root.classList.add('neon-cursor-press');
    const onUp = () => root.classList.remove('neon-cursor-press');
    const onLeave = () => {
      visible = false;
      root.classList.remove('neon-cursor-visible');
    };

    const render = () => {
      const ease = reduceMotion ? 1 : 0.18;
      ringPos.x += (mouse.x - ringPos.x) * ease;
      ringPos.y += (mouse.y - ringPos.y) * ease;
      dot.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;

      ctx.clearRect(0, 0, innerWidth, innerHeight);
      for (const p of points) p.life -= 0.04;
      while (points.length && points[0].life <= 0) points.shift();
      if (points.length > trailLength) points.splice(0, points.length - trailLength);

      if (points.length > 1) {
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 16;
        for (let i = 1; i < points.length; i++) {
          const strength = points[i].life * (i / points.length);
          ctx.globalAlpha = strength;
          ctx.lineWidth = 1 + strength * 5;
          ctx.beginPath();
          ctx.moveTo(points[i - 1].x, points[i - 1].y);
          ctx.lineTo(points[i].x, points[i].y);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      frame = requestAnimationFrame(render);
    };

    resize();
    root.style.setProperty('--neon', color);
    root.classList.add('neon-cursor-enabled');
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    root.addEventListener('pointerleave', onLeave);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      root.removeEventListener('pointerleave', onLeave);
      root.classList.remove('neon-cursor-enabled', 'neon-cursor-visible', 'neon-cursor-hover', 'neon-cursor-press');
    };
  }, [trailLength]);

  return (
    <div className="neon-cursor" aria-hidden="true">
      <canvas ref={canvasRef} className="neon-cursor-trail" />
      <div ref={ringRef} className="neon-cursor-ring" />
      <div ref={dotRef} className="neon-cursor-dot" />
    </div>
  );
}
