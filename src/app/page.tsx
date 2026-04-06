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

  return (
    <>
      <Loader onComplete={() => setLoaderDone(true)} />

      {loaderDone && !coarsePointer && <CustomCursor />}
      {loaderDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <ParticleBackground />
        </motion.div>
      )}

      <motion.div
        initial={false}
        animate={
          loaderDone
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0.88, y: 4, filter: "blur(1px)" }
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
