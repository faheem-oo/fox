"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { FaBuilding } from "react-icons/fa";

const experiences = [
  {
    role: "Frontend Developer Cum Marketing",
    company: "Imitate Labs",
    date: "December 2025",
    description:
      "Designed UI/UX for the site using Next.js and Deployed Query Box for employees. Prepared Documentation for team workflow management system and pricing strategy analysis for their product.",
  },
  {
    role: "Internal IT Support",
    company: "Vdart Technologies",
    date: "June 2025",
    description:
      "Developed Employee Management system using PHP and prepared detailed documentation of internal applications and tools used by the team.",
  },
  {
    role: "Full Stack Developer",
    company: "Afton Tech",
    date: "December 2024",
    description:
      "Contributed to both frontend and backend development using PHP, MySQL, HTML, CSS, Javascript supporting end-to-end web application development.",
  },
  {
    role: "IT Employee Support",
    company: "All Sec Technologies",
    date: "June 2024",
    description:
      "Involved in recording employee queries, tracking issues resolution, coordinated with HR and IT teams, and maintained accurate support records to improve efficiency.",
  },
];

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="relative py-24 px-6">
      <div ref={ref} className="mx-auto max-w-4xl">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.3em] text-fox-orange uppercase">
            Where I&apos;ve worked
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-white sm:text-5xl">
            Professional Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-fox-orange/40 via-fox-orange/20 to-transparent sm:left-8" />

          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="relative mb-10 flex items-start gap-6 sm:gap-8"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            >
              {/* Timeline icon */}
              <div className="relative z-10 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-fox-orange/30 bg-fox-surface shadow-[0_0_15px_rgba(228,111,32,0.15)] sm:h-16 sm:w-16">
                <FaBuilding className="text-lg text-fox-orange/70 sm:text-xl" />
              </div>

              {/* Card */}
              <div className="flex-1 glass glass-hover rounded-xl p-5 sm:p-6 transition-all duration-300">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
                  <h3 className="font-[family-name:var(--font-bebas)] text-xl tracking-wide text-fox-orange sm:text-2xl">
                    {exp.role}
                  </h3>
                  <span className="flex-shrink-0 text-sm text-slate-400">
                    {exp.date}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-white">
                  {exp.company}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
