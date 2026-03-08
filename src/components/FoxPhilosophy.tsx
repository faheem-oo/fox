"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function FoxPhilosophy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-fox-orange/5 via-transparent to-fox-orange/5" />

      <div ref={ref} className="relative mx-auto max-w-4xl text-center">
        {/* Decorative fox icon */}
        <motion.div
          className="mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/faheemud.png"
            alt="Faheemudheen Logo"
            width={60}
            height={60}
            className="mx-auto rounded-full opacity-40"
          />
        </motion.div>

        <motion.p
          className="text-sm font-medium tracking-[0.3em] text-fox-orange uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          The Fox Philosophy
        </motion.p>

        <motion.blockquote
          className="mt-6 font-[family-name:var(--font-bebas)] text-3xl leading-relaxed tracking-wide text-white sm:text-4xl md:text-5xl"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          &ldquo;Like a fox navigating the forest with{" "}
          <span className="gradient-text">intelligence</span> and{" "}
          <span className="gradient-text">precision</span>.&rdquo;
        </motion.blockquote>

        <motion.p
          className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-slate-400"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          I approach software development with strategy, creativity, and
          adaptability. Every project is built with smart architecture, clean
          design, and scalable thinking — moving through challenges with the
          sharp instinct of a fox.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-fox-orange to-transparent"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        />
      </div>
    </section>
  );
}
