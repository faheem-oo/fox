"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { IconType } from "react-icons";
import {
  FaDatabase,
  FaGitAlt,
  FaPhp,
  FaReact,
  FaServer,
} from "react-icons/fa";
import {
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { TbBrandJavascript } from "react-icons/tb";

interface SkillItem {
  name: string;
  icon: IconType;
  color: string;
}

const skills: SkillItem[] = [
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "React", icon: FaReact, color: "#61dafb" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#3c873a" },
  { name: "MySQL", icon: SiMysql, color: "#4479a1" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06b6d4" },
  { name: "JavaScript", icon: TbBrandJavascript, color: "#f7df1e" },
  { name: "PHP", icon: FaPhp, color: "#777bb4" },
  { name: "Git", icon: FaGitAlt, color: "#f1502f" },
  { name: "Vercel", icon: SiVercel, color: "#ffffff" },
  { name: "phpMyAdmin", icon: FaDatabase, color: "#f39c12" },
  { name: "XAMPP", icon: FaServer, color: "#fb7a24" },
];

function loopSkills(skills: SkillItem[]) {
  return [...skills, ...skills];
}

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

        <motion.div
          className="skills-dynamic-shell"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="skills-marquee">
            <div className="skills-track">
              {loopSkills(skills).map((skill, index) => (
                <div
                  key={`${skill.name}-${index}`}
                  className="skills-card"
                >
                  <div className="skills-card-icon" style={{ color: skill.color }}>
                    <skill.icon />
                  </div>
                  <p className="skills-card-label">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
