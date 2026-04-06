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

interface QualityProfile {
  count: number;
  linkDistance: number;
  maxLinks: number;
  pointerRadius: number;
  speedLimit: number;
  targetFrameMs: number;
  lineWidth: number;
}

const MAX_DPR = 2;
const WRAP_PADDING = 30;
const DESKTOP_FRAME_MS = 1000 / 48;
const MOBILE_FRAME_MS = 1000 / 30;
const LITE_FRAME_MS = 1000 / 24;

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function getQualityProfile(
  width: number,
  height: number,
  coarsePointer: boolean
): QualityProfile {
  const compact = width < 900;
  const largeDesktop = !coarsePointer && width >= 1280;
  const divisor = coarsePointer
    ? 22000
    : compact
      ? 18000
      : largeDesktop
        ? 11500
        : 14500;
  const count = clamp(
    Math.floor((width * height) / divisor),
    coarsePointer ? 34 : compact ? 48 : largeDesktop ? 92 : 64,
    coarsePointer ? 120 : compact ? 170 : largeDesktop ? 320 : 220
  );

  return {
    count,
    linkDistance: coarsePointer ? 106 : compact ? 132 : largeDesktop ? 174 : 154,
    maxLinks: coarsePointer ? 3 : compact ? 4 : largeDesktop ? 7 : 5,
    pointerRadius: coarsePointer ? 0 : compact ? 130 : 175,
    speedLimit: coarsePointer ? 0.42 : compact ? 0.52 : 0.6,
    targetFrameMs: coarsePointer
      ? MOBILE_FRAME_MS
      : largeDesktop
        ? 1000 / 42
        : DESKTOP_FRAME_MS,
    lineWidth: coarsePointer ? 0.58 : largeDesktop ? 0.74 : 0.7,
  };
}

interface ParticleBackgroundProps {
  lite?: boolean;
}

export default function ParticleBackground({ lite = false }: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false });
  const viewportRef = useRef({ width: 0, height: 0, dpr: 1 });
  const reducedMotionRef = useRef(false);
  const coarsePointerRef = useRef(false);
  const qualityRef = useRef<QualityProfile>({
    count: 70,
    linkDistance: 130,
    maxLinks: 3,
    pointerRadius: 140,
    speedLimit: 0.55,
    targetFrameMs: DESKTOP_FRAME_MS,
    lineWidth: 0.68,
  });
  const lastFrameRef = useRef(0);
  const pageVisibleRef = useRef(true);

  const initParticles = useCallback((width: number, height: number) => {
    const count = qualityRef.current.count;
    const baseHues = [24, 30, 36, 42, 188, 196, 204, 212, 222, 232];
    const particles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.26,
        vy: (Math.random() - 0.5) * 0.26,
        size: Math.random() * 2 + 0.9,
        alpha: Math.random() * 0.5 + 0.3,
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
      const coarsePointer = coarsePointerRef.current;

      const baseQuality = getQualityProfile(width, height, coarsePointer || lite);
      qualityRef.current = lite
        ? {
            ...baseQuality,
            count: clamp(Math.floor((width * height) / 26000), 24, 96),
            linkDistance: Math.min(baseQuality.linkDistance, 112),
            maxLinks: Math.min(baseQuality.maxLinks, 2),
            pointerRadius: 0,
            targetFrameMs: LITE_FRAME_MS,
            lineWidth: 0.56,
          }
        : baseQuality;

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

    const onVisibilityChange = () => {
      pageVisibleRef.current = !document.hidden;
      if (document.hidden) {
        pointerRef.current.active = false;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);
    reducedMotionQuery.addEventListener("change", onReducedMotionChange);
    coarsePointerQuery.addEventListener("change", onCoarsePointerChange);
    document.addEventListener("visibilitychange", onVisibilityChange);

    const animate = (time: number) => {
      const { width, height } = viewportRef.current;
      const quality = qualityRef.current;

      if (time - lastFrameRef.current < quality.targetFrameMs) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const dt = lastFrameRef.current
        ? Math.min((time - lastFrameRef.current) / 16.6667, 2)
        : 1;
      lastFrameRef.current = time;

      if (!pageVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const particles = particlesRef.current;
      const pointer = pointerRef.current;
      const coarsePointer = coarsePointerRef.current || lite;
      const reducedMotion = reducedMotionRef.current;
      const linkDistance = quality.linkDistance;
      const pointerRadius = quality.pointerRadius;
      const pointerRadiusSq = pointerRadius * pointerRadius;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        if (!reducedMotion) {
          p.x += p.vx * dt;
          p.y += p.vy * dt;

          if (p.x < -WRAP_PADDING) p.x = width + WRAP_PADDING;
          if (p.x > width + WRAP_PADDING) p.x = -WRAP_PADDING;
          if (p.y < -WRAP_PADDING) p.y = height + WRAP_PADDING;
          if (p.y > height + WRAP_PADDING) p.y = -WRAP_PADDING;

          if (pointer.active && !coarsePointer && pointerRadius > 0) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const distanceSq = dx * dx + dy * dy;

            if (distanceSq > 0.001 && distanceSq < pointerRadiusSq) {
              const distance = Math.sqrt(distanceSq);
              const force = (1 - distance / pointerRadius) * 0.11 * dt;
              p.vx -= (dx / distance) * force;
              p.vy -= (dy / distance) * force;
            }
          }

          const noise = coarsePointer ? 0.0022 : 0.003;
          p.vx = clamp(
            p.vx + (Math.random() - 0.5) * noise,
            -quality.speedLimit,
            quality.speedLimit
          );
          p.vy = clamp(
            p.vy + (Math.random() - 0.5) * noise,
            -quality.speedLimit,
            quality.speedLimit
          );
          p.vx *= coarsePointer ? 0.99 : 0.988;
          p.vy *= coarsePointer ? 0.99 : 0.988;
        }

        const twinkle = 0.7 + Math.sin(time * 0.001 + p.twinkleOffset) * 0.3;
        const radius = p.size * (0.9 + twinkle * 0.25);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 88%, 64%, ${p.alpha * twinkle})`;
        ctx.fill();
      }

      const grid = new Map<string, number[]>();
      const cellSize = linkDistance;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const gx = Math.floor(p.x / cellSize);
        const gy = Math.floor(p.y / cellSize);
        const key = `${gx},${gy}`;
        const bucket = grid.get(key);
        if (bucket) {
          bucket.push(i);
        } else {
          grid.set(key, [i]);
        }
      }

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        let linksDrawn = 0;
        const gx = Math.floor(a.x / cellSize);
        const gy = Math.floor(a.y / cellSize);

        for (let ox = -1; ox <= 1; ox++) {
          if (linksDrawn >= quality.maxLinks) break;

          for (let oy = -1; oy <= 1; oy++) {
            if (linksDrawn >= quality.maxLinks) break;

            const bucket = grid.get(`${gx + ox},${gy + oy}`);
            if (!bucket) continue;

            for (const j of bucket) {
              if (j <= i || linksDrawn >= quality.maxLinks) continue;

              const b = particles[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const distance = Math.sqrt(dx * dx + dy * dy);

              if (distance >= linkDistance) continue;

              const baseOpacity = (1 - distance / linkDistance) * 0.18;
              const opacity = Math.max(0.018, baseOpacity);
              const averageHue = (a.hue + b.hue) / 2;
              const isWarmLink = averageHue < 90;

              ctx.strokeStyle = isWarmLink
                ? `rgba(255, 176, 96, ${opacity.toFixed(4)})`
                : `rgba(126, 190, 255, ${opacity.toFixed(4)})`;
              ctx.lineWidth = quality.lineWidth;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
              linksDrawn += 1;
            }
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
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(animationRef.current);
    };
  }, [initParticles, lite]);

  return (
    <div className={`pointer-events-none fixed inset-0 z-0 overflow-hidden ${lite ? "ambient-lite" : ""}`}>
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
      <div className="ambient-orb ambient-orb-d" />
      <div className="ambient-orb ambient-orb-e" />
      <div className="ambient-orb ambient-orb-f" />
      <div className="ambient-orb ambient-orb-g" />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full ${lite ? "opacity-80" : ""}`}
      />
      <div className="ambient-vignette" />
    </div>
  );
}
