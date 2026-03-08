"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaPhp,
  FaReact,
  FaGitAlt,
  FaDatabase,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiVercel,
  SiMysql,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { TbBrandJavascript, TbBrandMongodb, TbDatabaseCog } from "react-icons/tb";

const skillCategories = [
  {
    title: "Programming",
    skills: [
      { name: "HTML", icon: FaHtml5, color: "#E34F26" },
      { name: "CSS", icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", icon: TbBrandJavascript, color: "#F7DF1E" },
      { name: "PHP", icon: FaPhp, color: "#777BB4" },
    ],
  },
  {
    title: "Frameworks",
    skills: [
      { name: "React.js", icon: FaReact, color: "#61DAFB" },
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: TbBrandMongodb, color: "#47A248" },
    ],
  },
  {
    title: "Developer Tools",
    skills: [
      { name: "Git", icon: FaGitAlt, color: "#F05032" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
      { name: "PhpMyAdmin", icon: TbDatabaseCog, color: "#6C78AF" },
      { name: "MAMP", icon: FaDatabase, color: "#02749C" },
    ],
  },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="relative py-24 px-6">
      <div ref={ref} className="mx-auto max-w-6xl">
        {/* Section header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm font-medium tracking-[0.3em] text-fox-orange uppercase">
            What I work with
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-bebas)] text-4xl tracking-wide text-white sm:text-5xl">
            Skills & Technologies
          </h2>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={category.title}
              className="glass glass-hover rounded-2xl p-6 transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + catIdx * 0.15 }}
            >
              <h3 className="mb-6 font-[family-name:var(--font-bebas)] text-xl tracking-wider text-fox-orange">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    className="group flex items-center gap-3 rounded-xl bg-fox-dark/50 p-3 transition-all duration-300 hover:bg-fox-dark hover:shadow-[0_0_15px_rgba(228,111,32,0.1)]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + catIdx * 0.15 + skillIdx * 0.05,
                    }}
                  >
                    <skill.icon
                      className="text-xl transition-transform duration-300 group-hover:scale-110"
                      style={{ color: skill.color }}
                    />
                    <span className="text-sm text-slate-300">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
