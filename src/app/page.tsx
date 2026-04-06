"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
import ParticleBackground from "@/components/ParticleBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import FoxPhilosophy from "@/components/FoxPhilosophy";
import Contact from "@/components/Contact";

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  // Keep initial values deterministic across SSR and first client paint.
  const [liteMode, setLiteMode] = useState(true);
  const [coarsePointer, setCoarsePointer] = useState(true);

  useEffect(() => {
    const pointerMedia = window.matchMedia("(pointer: coarse)");
    const reducedMotionMedia = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updateDeviceMode = () => {
      const nextValue = pointerMedia.matches || window.innerWidth < 768;
      setCoarsePointer((previous) =>
        previous === nextValue ? previous : nextValue
      );

      const nav = navigator as Navigator & {
        connection?: { saveData?: boolean };
      };
      const reducedMotion = reducedMotionMedia.matches;
      const lowPowerDevice = (navigator.hardwareConcurrency ?? 8) <= 4;
      const saveData = Boolean(nav.connection?.saveData);
      const nextLiteMode = nextValue || reducedMotion || lowPowerDevice || saveData;

      setLiteMode((previous) =>
        previous === nextLiteMode ? previous : nextLiteMode
      );
    };

    // Compute real device profile after hydration.
    updateDeviceMode();

    pointerMedia.addEventListener("change", updateDeviceMode);
    reducedMotionMedia.addEventListener("change", updateDeviceMode);
    window.addEventListener("resize", updateDeviceMode);

    return () => {
      pointerMedia.removeEventListener("change", updateDeviceMode);
      reducedMotionMedia.removeEventListener("change", updateDeviceMode);
      window.removeEventListener("resize", updateDeviceMode);
    };
  }, []);

  return (
    <>
      <Loader onComplete={() => setLoaderDone(true)} />

      <motion.div
        initial={false}
        animate={{ opacity: loaderDone ? 0 : 1 }}
        transition={{
          duration: liteMode ? 0.32 : 0.58,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="pointer-events-none fixed inset-0 z-[9998] bg-fox-bg"
      />

      <motion.div
        initial={false}
        animate={{ opacity: loaderDone ? 1 : 0.9 }}
        transition={{ duration: liteMode ? 0.25 : 0.42, ease: "easeOut" }}
      >
        <ParticleBackground lite={liteMode} />
      </motion.div>

      {loaderDone && !coarsePointer && <CustomCursor />}

      <motion.div
        initial={false}
        animate={
          loaderDone
            ? { opacity: 1, y: 0, scale: 1 }
            : liteMode
              ? { opacity: 0.92, y: 2, scale: 1 }
              : { opacity: 0.9, y: 4, scale: 1 }
        }
        transition={{
          duration: liteMode ? 0.35 : 0.52,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ pointerEvents: loaderDone ? "auto" : "none" }}
      >
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
      </motion.div>
    </>
  );
}
