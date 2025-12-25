'use client';

import { useEffect, useRef } from 'react';

const LAYERS = [
  {
    count: 120,
    size: [0.6, 1.6],
    speed: [0.3, 0.9],
    drift: 0.35,
    alpha: 0.45,
    parallax: 0.2
  },
  {
    count: 90,
    size: [1.4, 2.6],
    speed: [0.7, 1.4],
    drift: 0.5,
    alpha: 0.65,
    parallax: 0.45
  },
  {
    count: 50,
    size: [2.6, 4.2],
    speed: [1.0, 2.0],
    drift: 0.7,
    alpha: 0.8,
    parallax: 0.8
  }
];

export default function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpi = window.devicePixelRatio || 1;
    const mouse = { x: width / 2, y: height / 2 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpi;
      canvas.height = height * dpi;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpi, 0, 0, dpi, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const flakes = LAYERS.flatMap((layer, index) =>
      Array.from({ length: layer.count }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius:
          layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
        speed:
          layer.speed[0] + Math.random() * (layer.speed[1] - layer.speed[0]),
        drift: (Math.random() - 0.5) * layer.drift,
        alpha: layer.alpha,
        layer: index,
        parallax: layer.parallax
      }))
    );

    const hero = {
      x: Math.random() * width,
      y: -40,
      radius: 6,
      speed: 0.35,
      drift: 0.15,
      alpha: 0.9,
      active: false
    };

    let heroTimer = window.setTimeout(() => {
      hero.active = true;
      hero.x = Math.random() * width;
      hero.y = -60;
      hero.radius = 5 + Math.random() * 4;
      hero.speed = 0.25 + Math.random() * 0.2;
    }, 6000 + Math.random() * 8000);

    const updateMouse = (event: MouseEvent) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener('mousemove', updateMouse);

    const draw = () => {
      context.clearRect(0, 0, width, height);

      flakes.forEach((flake) => {
        const offsetX = (mouse.x - width / 2) * flake.parallax * 0.02;
        const offsetY = (mouse.y - height / 2) * flake.parallax * 0.02;
        context.fillStyle = `rgba(255, 255, 255, ${flake.alpha})`;
        context.beginPath();
        context.arc(
          flake.x + offsetX,
          flake.y + offsetY,
          flake.radius,
          0,
          Math.PI * 2
        );
        context.fill();

        flake.y += flake.speed;
        flake.x += flake.drift;

        if (flake.y > height) {
          flake.y = -5;
          flake.x = Math.random() * width;
        }
        if (flake.x > width) flake.x = 0;
        if (flake.x < 0) flake.x = width;
      });

      context.save();
      context.globalCompositeOperation = 'destination-out';
      const maskTargets = Array.from(
        document.querySelectorAll<HTMLElement>('[data-snow-mask="true"]')
      );
      maskTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.height <= 0 || rect.width <= 0) return;
        const gradient = context.createRadialGradient(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          Math.min(rect.width, rect.height) * 0.2,
          rect.left + rect.width / 2,
          rect.top + rect.height / 2,
          Math.max(rect.width, rect.height) * 0.7
        );
        gradient.addColorStop(0, 'rgba(0,0,0,0.55)');
        gradient.addColorStop(1, 'rgba(0,0,0,0)');
        context.fillStyle = gradient;
        context.fillRect(rect.left, rect.top, rect.width, rect.height);
      });
      context.restore();

      if (hero.active) {
        context.fillStyle = `rgba(255, 255, 255, ${hero.alpha})`;
        context.beginPath();
        context.arc(hero.x, hero.y, hero.radius, 0, Math.PI * 2);
        context.fill();
        hero.y += hero.speed;
        hero.x += hero.drift;
        if (hero.y > height + 40) {
          hero.active = false;
          heroTimer = window.setTimeout(() => {
            hero.active = true;
            hero.x = Math.random() * width;
            hero.y = -60;
            hero.radius = 5 + Math.random() * 4;
            hero.speed = 0.25 + Math.random() * 0.2;
          }, 10000 + Math.random() * 5000);
        }
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrame);
      window.clearTimeout(heroTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', updateMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-20"
      aria-hidden="true"
    />
  );
}
