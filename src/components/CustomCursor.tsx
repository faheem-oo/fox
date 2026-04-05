"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const springFast = { stiffness: 650, damping: 44, mass: 0.2 };
const springSoft = { stiffness: 220, damping: 24, mass: 0.45 };

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return Boolean(
    target.closest(
      "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']"
    )
  );
}

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [visible, setVisible] = useState(false);

  const isCoarsePointer =
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const dotX = useSpring(mouseX, springFast);
  const dotY = useSpring(mouseY, springFast);
  const ringX = useSpring(mouseX, springSoft);
  const ringY = useSpring(mouseY, springSoft);

  useEffect(() => {
    if (isCoarsePointer) return;

    const handleMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
      setVisible(true);
      setHovering(isInteractiveTarget(event.target));
    };

    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);
    const handleLeave = () => {
      setVisible(false);
      setHovering(false);
      setClicking(false);
    };
    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [isCoarsePointer, mouseX, mouseY]);

  if (isCoarsePointer) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9997] h-9 w-9 rounded-[8px] border-2 border-orange-300"
        style={{ x: ringX, y: ringY, marginLeft: -18, marginTop: -18 }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.35 : clicking ? 0.84 : 1,
          rotate: hovering ? 135 : 45,
          borderColor: hovering
            ? "rgba(253, 186, 116, 1)"
            : "rgba(253, 186, 116, 1)",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-5 w-5"
        style={{ x: ringX, y: ringY, marginLeft: -10, marginTop: -10 }}
        animate={{
          opacity: visible ? 0.95 : 0,
          scale: hovering ? 1.15 : clicking ? 0.9 : 1,
          rotate: hovering ? -90 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-orange-300" />
        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-orange-300" />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[8px] w-[8px] rounded-[2px] bg-orange-400"
        style={{ x: dotX, y: dotY, marginLeft: -5, marginTop: -5 }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.35 : clicking ? 0.72 : 1,
          rotate: hovering ? 45 : 0,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </>
  );
}
