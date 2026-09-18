"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A lightweight, decorative Three.js particle field for the homepage hero.
 *
 * Deliberately minimal by design:
 * - Low particle count and no postprocessing, so it doesn't hurt load time
 *   or mobile performance.
 * - Skips rendering entirely if the user prefers reduced motion.
 * - Pauses the animation loop when the tab isn't visible.
 * - Fully disposes of GPU resources on unmount.
 * - pointer-events-none, so it never blocks clicks on hero buttons/links.
 *
 * Only used on the homepage hero — tool pages intentionally do not import
 * this, so their bundle size and performance are unaffected.
 */
export function HeroParticles() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect the user's motion preference — render nothing rather than a
    // moving background if they've asked for reduced motion.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Particle field — kept deliberately small (this is a background accent,
    // not the page's content).
    const PARTICLE_COUNT = 500;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Brand colors: primary blue (hsl(218,100%,56%)) and secondary teal
    // (hsl(189,82%,44%)), matching the site's CSS variables.
    const colorA = new THREE.Color("hsl(218, 100%, 66%)");
    const colorB = new THREE.Color("hsl(189, 82%, 54%)");
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const c = colorA.clone().lerp(colorB, Math.random());
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    let rafId: number;
    let isVisible = true;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.02;
      points.rotation.x = Math.sin(t * 0.05) * 0.05;

      // Gentle parallax toward the cursor.
      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 0.4 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    // Pause rendering when the tab is hidden to save battery/CPU.
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-70"
    />
  );
}
