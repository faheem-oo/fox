"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaGraduationCap, FaSchool } from "react-icons/fa";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 px-6">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.3em] text-fox-orange uppercase">
            Get to know me
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-white sm:text-5xl">
            About Me
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg leading-relaxed text-slate-300">
              I am a Computer Science student and developer passionate about building efficient web systems and solving real-world problems. I am specialized in full-stack development using modern technologies such as Next.js, JavaScript, PHP, and scalable backend systems..
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-400">
              With a strategic mindset like a fox, every project is approached
              with intelligence, adaptability, and a drive for clean, scalable
              architecture.
            </p>

            {/* Quick stats */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { value: "4+", label: "Experiences" },
                { value: "3+", label: "Projects" },
                { value: "8.62", label: "CGPA" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="glass rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <p className="font-[family-name:var(--font-bebas)] text-2xl text-fox-orange">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <h3 className="font-[family-name:var(--font-bebas)] text-2xl tracking-wide text-white">
              Education
            </h3>

            {/* B.Tech */}
            <div className="glass glass-hover rounded-xl p-6 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-fox-orange/10">
                  <FaGraduationCap className="text-xl text-fox-orange" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    B.Tech Computer Science & Engineering
                  </h4>
                  <p className="mt-1 text-sm text-slate-400">
                    Hindustan Institute of Technology and Science, Chennai
                  </p>
                  <div className="mt-3 flex items-center gap-4">
                    <span className="rounded-full bg-fox-orange/10 px-3 py-1 text-xs text-fox-orange">
                      CGPA: 8.62
                    </span>
                    <span className="text-xs text-slate-500">
                      July 2023 – July 2027
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* High School */}
            <div className="glass glass-hover rounded-xl p-6 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-fox-orange/10">
                  <FaSchool className="text-xl text-fox-orange" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">
                    High School — PCB + Mathematics
                  </h4>
                  <p className="mt-1 text-sm text-slate-400">
                    Velammal Bodhi Campus
                  </p>
                  <div className="mt-3">
                    <span className="text-xs text-slate-500">May 2023</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
