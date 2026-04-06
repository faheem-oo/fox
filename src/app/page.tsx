"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
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
const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  { ssr: false }
);

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [liteMode, setLiteMode] = useState(() => {
    if (typeof window === "undefined") return false;

    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean };
    };
    const coarse =
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const lowPowerDevice = (navigator.hardwareConcurrency ?? 8) <= 4;
    const saveData = Boolean(nav.connection?.saveData);

    return coarse || reducedMotion || lowPowerDevice || saveData;
  });
  const [coarsePointer, setCoarsePointer] = useState(() => {
    if (typeof window === "undefined") return false;

    return (
      window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768
    );
  });

  useEffect(() => {
    const pointerMedia = window.matchMedia("(pointer: coarse)");
    const reducedMotionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");

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

      {loaderDone && !coarsePointer && <CustomCursor />}
      {loaderDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: liteMode ? 0.25 : 0.35, ease: "easeOut" }}
        >
          <ParticleBackground lite={liteMode} />
        </motion.div>
      )}

      <motion.div
        initial={false}
        animate={
          loaderDone
            ? { opacity: 1, y: 0 }
            : { opacity: 0.92, y: 2 }
        }
        transition={{ duration: liteMode ? 0.35 : 0.5, ease: [0.22, 1, 0.36, 1] }}
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
