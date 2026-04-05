"use client";

import { motion } from "framer-motion";
import { FaFolderOpen, FaDownload } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16 sm:px-6 md:px-8 lg:px-12"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* THE FOX label */}
        <motion.p
          className="mb-4 font-[family-name:var(--font-bebas)] text-base tracking-[0.3em] text-fox-orange uppercase sm:mb-6 sm:text-lg sm:tracking-[0.4em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          Fox
        </motion.p>

        {/* Name */}
        <motion.h1
          className="font-[family-name:var(--font-bebas)] text-4xl leading-tight tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          Faheemudheen
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 px-4 text-base font-medium text-fox-orange sm:mt-5 sm:text-lg md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          Computer Science Engineering Student{" "}
          <span className="text-slate-400">|</span> Full Stack Developer
        </motion.p>

        {/* Description */}
        <motion.p
          className="mt-4 max-w-2xl px-4 text-sm leading-relaxed text-slate-400 sm:mt-5 sm:text-base md:max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.0 }}
        >
          Building robust web applications with a focus on functionality,
          usability, and reliability. Passionate about end-to-end development
          and clean system architecture.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-fox-orange/40 to-transparent sm:mt-8 sm:w-32"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 3.1 }}
        />

        {/* CTA Buttons */}
        <motion.div
          className="mt-6 flex w-full flex-col gap-3 px-4 sm:mt-8 sm:w-auto sm:flex-row sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
        >
          <a
            href="#projects"
            className="group flex items-center justify-center gap-2 rounded-lg bg-fox-surface px-6 py-3 text-sm font-medium text-white transition-all hover:bg-fox-surface/80 hover:shadow-[0_0_20px_rgba(228,111,32,0.15)] sm:px-7 sm:py-3.5 md:text-base"
          >
            <FaFolderOpen className="text-fox-orange" />
            View Projects
          </a>
          <a
            href="/Faheemudheen Resume.pdf"
            download
            className="group flex items-center justify-center gap-2 rounded-lg bg-slate-700/60 px-6 py-3 text-sm font-medium text-slate-200 transition-all hover:bg-slate-600/60 sm:px-7 sm:py-3.5 md:text-base"
          >
            <FaDownload className="text-slate-400" />
            Download CV
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs tracking-widest text-slate-500">
            SCROLL
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-fox-orange/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
