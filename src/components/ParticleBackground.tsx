"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  hue: number;
  twinkleOffset: number;
}

interface PointerState {
  x: number;
  y: number;
  active: boolean;
}

const MAX_DPR = 2;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });
  const viewportRef = useRef({ width: 0, height: 0, dpr: 1 });
  const reducedMotionRef = useRef(false);
  const coarsePointerRef = useRef(false);

  const initParticles = useCallback((width: number, height: number) => {
    const coarsePointer = coarsePointerRef.current;
    const divisor = coarsePointer ? 17000 : 11000;
    const count = clamp(Math.floor((width * height) / divisor), 70, 240);
    const baseHues = [24, 30, 36, 42, 188, 196, 204, 212, 222, 232];
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 2 + 0.9,
        alpha: Math.random() * 0.46 + 0.28,
        hue: baseHues[Math.floor(Math.random() * baseHues.length)],
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    reducedMotionRef.current = reducedMotionQuery.matches;
    coarsePointerRef.current = coarsePointerQuery.matches;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

      viewportRef.current = { width, height, dpr };

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(width, height);
    };

    const onReducedMotionChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
    };

    const onCoarsePointerChange = (event: MediaQueryListEvent) => {
      coarsePointerRef.current = event.matches;
      resizeCanvas();
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        active: true,
      };
    };

    const onPointerLeave = () => {
      pointerRef.current.active = false;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);
    coarsePointerQuery.addEventListener("change", onCoarsePointerChange);

    const animate = (time: number) => {
      const { width, height } = viewportRef.current;
      const particles = particlesRef.current;
      const pointer = pointerRef.current;
      const coarsePointer = coarsePointerRef.current;
      const reducedMotion = reducedMotionRef.current;
      const linkDistance = coarsePointer ? 130 : 180;
      const pointerRadius = coarsePointer ? 120 : 205;
      const pointerRadiusSq = pointerRadius * pointerRadius;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < -30) p.x = width + 30;
          if (p.x > width + 30) p.x = -30;
          if (p.y < -30) p.y = height + 30;
          if (p.y > height + 30) p.y = -30;

          if (pointer.active && !coarsePointer) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const distanceSq = dx * dx + dy * dy;

            if (distanceSq > 0.001 && distanceSq < pointerRadiusSq) {
              const distance = Math.sqrt(distanceSq);
              const force = (1 - distance / pointerRadius) * 0.13;
              p.vx -= (dx / distance) * force;
              p.vy -= (dy / distance) * force;
            }
          }

          p.vx = clamp(p.vx + (Math.random() - 0.5) * 0.0035, -0.72, 0.72);
          p.vy = clamp(p.vy + (Math.random() - 0.5) * 0.0035, -0.72, 0.72);
          p.vx *= 0.986;
          p.vy *= 0.986;
        }

        const twinkle = 0.7 + Math.sin(time * 0.001 + p.twinkleOffset) * 0.3;
        const radius = p.size * (0.9 + twinkle * 0.25);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 88%, 64%, ${p.alpha * twinkle})`;
        ctx.fill();
      }

      const maxLinks = coarsePointer ? 4 : 8;

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        let linksDrawn = 0;

        for (let j = i + 1; j < particles.length; j++) {
          if (linksDrawn >= maxLinks) break;

          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < linkDistance) {
            const baseOpacity = (1 - distance / linkDistance) * 0.17;
            const opacity = Math.max(0.02, baseOpacity);
            const averageHue = (a.hue + b.hue) / 2;
            const isWarmLink = averageHue < 90;

            ctx.strokeStyle = isWarmLink
              ? `rgba(255, 176, 96, ${opacity.toFixed(4)})`
              : `rgba(126, 190, 255, ${opacity.toFixed(4)})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            linksDrawn += 1;
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      reducedMotionQuery.removeEventListener("change", onReducedMotionChange);
      coarsePointerQuery.removeEventListener("change", onCoarsePointerChange);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
      <div className="ambient-orb ambient-orb-d" />
      <div className="ambient-orb ambient-orb-e" />
      <div className="ambient-orb ambient-orb-f" />
      <div className="ambient-orb ambient-orb-g" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="ambient-vignette" />
    </div>
  );
}
