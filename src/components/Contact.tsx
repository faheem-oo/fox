"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import {
  FaPhone,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const contactLinks = [
  {
    icon: FaPhone,
    label: "Phone",
    value: "+91 9150904940",
    href: "tel:+919150904940",
  },
  {
    icon: FaEnvelope,
    label: "Email",
    value: "n.faheemudheen@gmail.com",
    href: "mailto:n.faheemudheen@gmail.com",
  },
  {
    icon: FaGithub,
    label: "GitHub",
    value: "faheem-oo",
    href: "https://github.com/faheem-oo",
  },
  {
    icon: FaLinkedin,
    label: "LinkedIn",
    value: "Faheemudheen N",
    href: "https://linkedin.com/in/faheemudheen-n-985641225",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "faheem.oo",
    href: "https://instagram.com/faheem.oo",
  },
  {
    icon: FaXTwitter,
    label: "X (Twitter)",
    value: "faheem_oo",
    href: "https://x.com/faheem_oo",
  },
];

const footerNavLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const socialLinks = contactLinks.filter((link) => link.href.startsWith("http"));

  return (
    <section id="contact" className="relative py-24 px-6">
      <div ref={ref} className="mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.3em] text-fox-orange uppercase">
            Let&apos;s connect
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-white sm:text-5xl">
            Get In Touch
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-slate-400">
            Have a project in mind or want to collaborate? Feel free to reach out
            through any of the channels below.
          </p>
        </motion.div>

        {/* Contact grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {contactLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group glass glass-hover flex items-center gap-4 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-fox-orange/10 transition-colors duration-300 group-hover:bg-fox-orange/20">
                <link.icon className="text-lg text-fox-orange" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">{link.label}</p>
                <p className="mt-0.5 truncate text-sm font-medium text-slate-300 transition-colors duration-300 group-hover:text-white">
                  {link.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="relative mx-auto mt-24 max-w-6xl overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-900/40 p-6 sm:p-8"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(228,111,32,0.16),transparent_42%),radial-gradient(circle_at_80%_82%,rgba(56,189,248,0.14),transparent_40%)]" />

        <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.85fr_1fr]">
          <div>
            <a href="#hero" className="inline-flex items-center gap-3">
              <Image
                src="/faheemud.png"
                alt="Faheemudheen Logo"
                width={44}
                height={44}
                className="rounded-full border border-fox-orange/40 bg-slate-900/70 p-1"
              />
              <div>
                <p className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-white">
                  FLARON TECH
                </p>
                <p className="text-[11px] tracking-[0.24em] text-slate-500 uppercase">
                  Build. Scale. Ship.
                </p>
              </div>
            </a>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Crafting dependable full-stack products with clean architecture,
              pragmatic design, and performance-focused engineering.
            </p>
          </div>

          <div>
            <p className="font-[family-name:var(--font-bebas)] text-lg tracking-wider text-fox-orange">
              Quick Links
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {footerNavLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-full border border-slate-600/70 px-3 py-1.5 text-xs text-slate-300 transition-all hover:border-fox-orange/70 hover:text-fox-orange"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="font-[family-name:var(--font-bebas)] text-lg tracking-wider text-fox-orange">
              Connect
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex h-10 w-10 items-center justify-center rounded-lg border border-slate-600/70 bg-slate-800/60 text-slate-300 transition-all hover:-translate-y-0.5 hover:border-fox-orange/60 hover:text-fox-orange"
                >
                  <link.icon className="text-base" />
                </a>
              ))}
            </div>
            <a
              href="mailto:n.faheemudheen@gmail.com"
              className="mt-4 inline-block break-all text-sm text-slate-400 transition-colors hover:text-white"
            >
              n.faheemudheen@gmail.com
            </a>
          </div>
        </div>

        <div className="relative mt-8 flex flex-col gap-3 border-t border-slate-700/60 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Faheemudheen N. All rights reserved.</p>
          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-fox-orange"
          >
            Back to top
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </motion.footer>
    </section>
  );
}
