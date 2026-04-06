"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import FoxPhilosophy from "@/components/FoxPhilosophy";
import Contact from "@/components/Contact";

const Loader = dynamic(() => import("@/components/Loader"), { ssr: false });
const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});
const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  { ssr: false }
);

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const [coarsePointer, setCoarsePointer] = useState(() => {
    if (typeof window === "undefined") return false;

    return (
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768
    );
  });

  useEffect(() => {
    const pointerMedia = window.matchMedia("(pointer: coarse)");

    const updatePointerMode = () => {
      const nextValue = pointerMedia.matches || window.innerWidth < 768;
      setCoarsePointer((previous) =>
        previous === nextValue ? previous : nextValue
      );
    };

    pointerMedia.addEventListener("change", updatePointerMode);
    window.addEventListener("resize", updatePointerMode);

    return () => {
      pointerMedia.removeEventListener("change", updatePointerMode);
      window.removeEventListener("resize", updatePointerMode);
    };
  }, []);

  useEffect(() => {
    if (!loaderDone) return;

    const startDelay = coarsePointer ? 180 : 0;
    const timer = window.setTimeout(() => setBackgroundReady(true), startDelay);

    return () => window.clearTimeout(timer);
  }, [coarsePointer, loaderDone]);

  return (
    <>
      <Loader onComplete={() => setLoaderDone(true)} />

      {loaderDone && !coarsePointer && <CustomCursor />}
      {loaderDone && backgroundReady && <ParticleBackground />}

      {loaderDone && (
        <>
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <FoxPhilosophy />
            <Contact />
          </main>
        </>
      )}
    </>
  );
}
