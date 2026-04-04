"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top on page load and clear hash
  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
    window.scrollTo(0, 0);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-fox-bg/80 shadow-lg shadow-black/20 backdrop-blur-xl"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 2.2 }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <Image
            src="/faheemud.png"
            alt="Faheemudheen Logo"
            width={40}
            height={40}
            className="transition-transform duration-300 group-hover:scale-110 rounded-full"
          />
          <span className="font-[family-name:var(--font-bebas)] text-xl tracking-wider text-white">
            FLARON TECH
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm text-slate-300 transition-colors hover:text-fox-orange"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-fox-orange transition-all duration-300 hover:w-full" />
            </a>
          ))}
          <a
            href="/Faheemudheen Resume.pdf"
            download
            className="rounded-full border border-fox-orange/50 px-4 py-1.5 text-sm text-fox-orange transition-all hover:bg-fox-orange/10 hover:shadow-[0_0_15px_rgba(228,111,32,0.2)]"
          >
            Resume
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <motion.span
            className="block h-0.5 w-6 bg-white"
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-white"
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="block h-0.5 w-6 bg-white"
            animate={
              mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
            }
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 top-0 bg-fox-bg/95 backdrop-blur-xl md:hidden z-40 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-2xl text-slate-300 transition-colors hover:text-fox-orange"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.name}
                </motion.a>
              ))}
              <a
                href="/Faheemudheen Resume.pdf"
                download
                className="mt-4 rounded-full border border-fox-orange/50 px-6 py-2 text-lg text-fox-orange"
                onClick={() => setMobileOpen(false)}
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
