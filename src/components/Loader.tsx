"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const compactScreen = window.innerWidth < 768;
    const lowPowerDevice = (navigator.hardwareConcurrency ?? 8) <= 4;
    const hideAfter = prefersReducedMotion
      ? 450
      : compactScreen || lowPowerDevice
        ? 1050
        : 1600;

    const timer = setTimeout(() => setLoading(false), hideAfter);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-fox-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src="/faheemud.png"
              alt="Faheemudheen Logo"
              width={80}
              height={80}
              className="rounded-full drop-shadow-[0_0_20px_rgba(228,111,32,0.4)]"
            />
          </motion.div>

          {/* Loading text */}
          <motion.p
            className="mt-6 font-[family-name:var(--font-bebas)] text-2xl tracking-widest text-fox-orange"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            FOX
          </motion.p>

          {/* Loading bar */}
          <motion.div
            className="mt-4 h-0.5 rounded-full bg-fox-orange"
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
