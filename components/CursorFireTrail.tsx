'use client';

import { useEffect, useRef } from 'react';

type Point = {
  x: number;
  y: number;
  life: number;
  intensity: number;
};

const MAX_POINTS = 40;
const MELT_TIME = 800;
const WET_TIME = 2400;
const MELT_DISTANCE = 150;

export default function CursorFireTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number>(0);
  const isActiveRef = useRef(false);
  const intensityRef = useRef(1);
  const timeoutsRef = useRef(new WeakMap<HTMLElement, number[]>());

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!isFinePointer || prefersReducedMotion || navigator.webdriver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpi = window.devicePixelRatio || 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpi;
      canvas.height = height * dpi;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpi, 0, 0, dpi, 0, 0);
    };

    const setState = (element: HTMLElement, state: 'snowy' | 'melting' | 'wet') => {
      element.dataset.snowState = state;
      element.classList.toggle('is-snowy', state === 'snowy');
      element.classList.toggle('is-melting', state === 'melting');
      element.classList.toggle('is-wet', state === 'wet');
    };

    const clearTimers = (element: HTMLElement) => {
      const timers = timeoutsRef.current.get(element);
      if (timers) {
        timers.forEach((timer) => window.clearTimeout(timer));
      }
    };

    const triggerMelt = (element: HTMLElement) => {
      clearTimers(element);
      setState(element, 'melting');
      const meltingTimer = window.setTimeout(() => {
        setState(element, 'wet');
      }, MELT_TIME);
      const wetTimer = window.setTimeout(() => {
        setState(element, 'snowy');
      }, MELT_TIME + WET_TIME);
      timeoutsRef.current.set(element, [meltingTimer, wetTimer]);
    };

    const snowTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-snow="true"]'));
    const hoverHandlers = new Map<HTMLElement, () => void>();
    snowTargets.forEach((target) => {
      if (!target.dataset.snowState) {
        setState(target, 'snowy');
      }
      const handler = () => triggerMelt(target);
      hoverHandlers.set(target, handler);
      target.addEventListener('mouseenter', handler);
    });

    resize();
    window.addEventListener('resize', resize);

    const handleMove = (event: MouseEvent) => {
      isActiveRef.current = true;
      pointsRef.current.push({
        x: event.clientX,
        y: event.clientY,
        life: 1,
        intensity: intensityRef.current
      });
      if (pointsRef.current.length > MAX_POINTS) {
        pointsRef.current.shift();
      }

      let closest = Number.POSITIVE_INFINITY;
      snowTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.hypot(centerX - event.clientX, centerY - event.clientY);
        closest = Math.min(closest, distance);
        if (distance < MELT_DISTANCE) {
          triggerMelt(el);
        }
      });
      intensityRef.current = closest < MELT_DISTANCE ? 1.35 : 1;
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      if (isActiveRef.current) {
        context.globalCompositeOperation = 'lighter';
        context.filter = 'blur(0.6px)';
        pointsRef.current.forEach((point, index) => {
          const life = Math.max(point.life, 0);
          const boost = point.intensity;
          const size = (18 + index * 0.9) * boost;
          const inner = size * 0.28;
          const outer = size * 2.4;
          const rise = 14 * life;
          const drift = ((index % 5) - 2) * 2;
          const flameX = point.x + drift;
          const flameY = point.y - rise;
          const flameGradient = context.createRadialGradient(
            flameX,
            flameY,
            inner,
            flameX,
            flameY,
            outer
          );
          flameGradient.addColorStop(0, `rgba(255, 244, 214, ${0.9 * life})`);
          flameGradient.addColorStop(0.35, `rgba(255, 189, 120, ${0.75 * life})`);
          flameGradient.addColorStop(0.65, `rgba(255, 125, 110, ${0.45 * life})`);
          flameGradient.addColorStop(0.85, `rgba(244, 114, 182, ${0.2 * life})`);
          flameGradient.addColorStop(1, 'rgba(244, 114, 182, 0)');
          context.save();
          context.translate(flameX, flameY);
          context.scale(0.95, 1.3);
          context.fillStyle = flameGradient;
          context.beginPath();
          context.arc(0, 0, outer, 0, Math.PI * 2);
          context.fill();
          context.restore();

          const coreY = point.y - rise * 0.55;
          const coreGradient = context.createRadialGradient(
            point.x,
            coreY,
            0,
            point.x,
            coreY,
            size * 0.9
          );
          coreGradient.addColorStop(0, `rgba(255, 255, 255, ${0.45 * life})`);
          coreGradient.addColorStop(0.7, `rgba(255, 212, 150, ${0.25 * life})`);
          coreGradient.addColorStop(1, 'rgba(255, 190, 170, 0)');
          context.save();
          context.translate(point.x, coreY);
          context.scale(0.9, 1.1);
          context.fillStyle = coreGradient;
          context.beginPath();
          context.arc(0, 0, size, 0, Math.PI * 2);
          context.fill();
          context.restore();

          point.life -= 0.04;
        });
        context.globalCompositeOperation = 'source-over';
        context.filter = 'none';

        pointsRef.current = pointsRef.current.filter((point) => point.life > 0);
      }
      animationRef.current = window.requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener('mousemove', handleMove);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationRef.current);
      snowTargets.forEach((target) => {
        const handler = hoverHandlers.get(target);
        if (handler) {
          target.removeEventListener('mouseenter', handler);
        }
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      aria-hidden="true"
    />
  );
}
