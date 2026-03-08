"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaFolderOpen, FaDownload } from "react-icons/fa";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6"
    >
      {/* Gradient orbs */}
      <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-fox-orange/5 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-fox-orange/8 blur-[100px]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* THE FOX label */}
        <motion.p
          className="mb-6 font-[family-name:var(--font-bebas)] text-lg tracking-[0.4em] text-fox-orange uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
        >
          The Fox
        </motion.p>

        {/* Name with image */}
        <motion.div
          className="flex items-center gap-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.6 }}
        >
          <Image
            src="/faheemud.png"
            alt="Faheemudheen"
            width={70}
            height={70}
            className="rounded-full drop-shadow-[0_0_20px_rgba(228,111,32,0.3)]"
            priority
          />
          <h1 className="font-[family-name:var(--font-bebas)] text-5xl leading-tight tracking-wide text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Faheemudheen N
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="mt-5 text-lg font-medium text-fox-orange sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.8 }}
        >
          Computer Science Engineering Student{" "}
          <span className="text-slate-400">|</span> Full Stack Developer
        </motion.p>

        {/* Description */}
        <motion.p
          className="mt-5 max-w-xl text-base leading-relaxed text-slate-400"
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
          className="mt-8 h-px w-32 bg-gradient-to-r from-transparent via-fox-orange/40 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 3.1 }}
        />

        {/* CTA Buttons */}
        <motion.div
          className="mt-8 flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3.2 }}
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 rounded-lg bg-fox-surface px-6 py-3 text-sm font-medium text-white transition-all hover:bg-fox-surface/80 hover:shadow-[0_0_20px_rgba(228,111,32,0.15)]"
          >
            <FaFolderOpen className="text-fox-orange" />
            View Projects
          </a>
          <a
            href="/Faheemudheen Resume.pdf"
            download
            className="group flex items-center gap-2 rounded-lg bg-slate-700/60 px-6 py-3 text-sm font-medium text-slate-200 transition-all hover:bg-slate-600/60"
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
