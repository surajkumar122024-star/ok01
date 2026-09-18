"use client";

import { useEffect, useRef } from "react";

/**
 * A lightweight, decorative particle field for the homepage hero.
 *
 * Deliberately minimal by design:
 * - Plain Canvas 2D — no Three.js/WebGL. Same visual effect (slow-drifting
 *   dots with a gentle cursor-parallax) at a fraction of the download size
 *   (a few KB vs. ~340 KB gzipped for Three.js), which matters since this
 *   site's whole promise is being fast even on slow mobile connections.
 * - Low particle count and no postprocessing.
 * - Skips rendering entirely if the user prefers reduced motion.
 * - Pauses the animation loop when the tab isn't visible.
 * - pointer-events-none, so it never blocks clicks on hero buttons/links.
 *
 * Only used on the homepage hero — tool pages intentionally do not import
 * this, so their bundle size and performance are unaffected.
 */
export function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas?.parentElement;
    if (!canvas || !container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Brand colors: primary blue (hsl(218,100%,56%)) and secondary teal
    // (hsl(189,82%,44%)), matching the site's CSS variables.
    const colors = ["hsl(218, 100%, 66%)", "hsl(189, 82%, 54%)"];

    const PARTICLE_COUNT = 70;
    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
    };
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 1 + Math.random() * 1.8,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      color: colors[Math.random() < 0.5 ? 0 : 1],
      alpha: 0.35 + Math.random() * 0.4,
    }));

    let mouseX = width / 2;
    let mouseY = height / 2;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let rafId: number;
    let isVisible = true;

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!isVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Gentle parallax offset toward the cursor.
      const offsetX = ((mouseX / width) - 0.5) * 12;
      const offsetY = ((mouseY / height) - 0.5) * 12;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x + offsetX, p.y + offsetY, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };
    draw();

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-70"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
