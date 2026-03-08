"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setHovering(true);
      }
    };

    const handleOut = () => setHovering(false);
    const handleLeave = () => setVisible(false);
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <>
      {/* Main dot */}
      <motion.div
        className="pointer-events-none fixed z-[9998] rounded-full bg-orange-500"
        style={{ top: pos.y - 4, left: pos.x - 4 }}
        animate={{
          width: hovering ? 40 : 8,
          height: hovering ? 40 : 8,
          x: hovering ? -16 : 0,
          y: hovering ? -16 : 0,
          opacity: hovering ? 0.3 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      {/* Outer glow ring */}
      <motion.div
        className="pointer-events-none fixed z-[9997] rounded-full border border-orange-500/40"
        style={{ top: pos.y - 16, left: pos.x - 16 }}
        animate={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          x: hovering ? -12 : 0,
          y: hovering ? -12 : 0,
          opacity: hovering ? 0.5 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
