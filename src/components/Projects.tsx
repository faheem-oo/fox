"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "Time-Table Management System",
    date: "November 2024",
    description:
      "An automated timetable generation and management system designed for educational institutions to streamline scheduling workflows.",
    tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "Employee Management System",
    date: "June 2025",
    description:
      "A full-featured employee management platform built for internal operations, including record management, documentation, and team coordination tools.",
    tech: ["PHP", "MySQL", "HTML", "CSS"],
  },
  {
    title: "Consumer Pantry System",
    date: "October 2025",
    description:
      "A comprehensive system for managing consumer pantry inventory, tracking supplies, and generating usage reports for efficient food management.",
    tech: ["Next.js", "JavaScript", "MySQL"],
  },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="relative py-24 px-6">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.3em] text-fox-orange uppercase">
            What I&apos;ve built
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-white sm:text-5xl">
            Projects
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group glass glass-hover rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(228,111,32,0.15)]"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
            >
              <span className="text-xs text-slate-500">{project.date}</span>
              <h3 className="mt-2 text-lg font-semibold text-white transition-colors duration-300 group-hover:text-fox-orange">
                {project.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-fox-dark/80 px-3 py-1 text-xs text-slate-300 transition-colors duration-300 group-hover:bg-fox-orange/10 group-hover:text-fox-orange"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
