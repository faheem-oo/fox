"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
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

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
     <motion.div
  className="mx-auto mt-20 max-w-4xl border-t border-slate-700/50 pt-8 text-center"
  initial={{ opacity: 0 }}
  animate={inView ? { opacity: 1 } : {}}
  transition={{ delay: 0.8 }}
>
  <div className="flex flex-col items-center justify-center gap-3">
    <p className="text-sm text-slate-500 text-center">
      © {new Date().getFullYear()} Faheemudheen N. All rights reserved.
    </p>
  </div>
</motion.div>
    </section>
  );
}
