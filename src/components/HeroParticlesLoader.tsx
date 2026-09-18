"use client";

import dynamic from "next/dynamic";

// next/dynamic with ssr:false must live inside a Client Component in the
// App Router, so this tiny wrapper exists purely to host that call —
// page.tsx (a Server Component) imports this instead of HeroParticles
// directly.
const HeroParticles = dynamic(
  () => import("@/components/HeroParticles").then((m) => m.HeroParticles),
  { ssr: false }
);

export function HeroParticlesLoader() {
  return <HeroParticles />;
}
