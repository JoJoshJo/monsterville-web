"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EASE } from "@/lib/motion";

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: EASE },
    },
  };

  const statItems = [
    { number: "72+", label: "Platinum Records" },
    { number: "04", label: "Acoustic Rooms" },
    { number: "A24", label: "Visual Grade" },
    { number: "24/7", label: "Creation Access" },
  ];

  return (
    <section className="relative w-full min-h-dvh py-32 px-6 md:px-12 flex items-center justify-center bg-[#080808]">
      {/* Decorative vertical lines representing a museum exhibition grid */}
      <div className="absolute inset-0 flex justify-between pointer-events-none opacity-5 px-6 md:px-12">
        <div className="w-[1px] h-full bg-[#EDEDED]" />
        <div className="w-[1px] h-full bg-[#EDEDED] hidden md:block" />
        <div className="w-[1px] h-full bg-[#EDEDED] hidden md:block" />
        <div className="w-[1px] h-full bg-[#EDEDED]" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10"
      >
        {/* Left Editorial Text Column (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-8 text-left">
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full" />
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#EDEDED]/50 uppercase">01 / ESTABLISHED IN PARIS & NY</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display leading-[1.05] text-[#F5F5F5]"
          >
            WHERE CINEMATIC <span className="font-editorial italic font-normal text-[#FF5A1F]">vision</span> MEETS SONIC INERTIA.
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-[#EDEDED]/70 leading-relaxed font-light font-sans max-w-2xl"
          >
            Town Studios is not just a workspace; it is a sacred ground for high-end creators. 
            We design sensory soundscapes and cinematic visuals for records, film, and editorial fashion. 
            Blurring the lines between Travis Scott’s digital sub-bass and A24’s organic grain.
          </motion.p>

          {/* Grid of counters/stats */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#EDEDED]/10">
            {statItems.map((stat, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col gap-2"
              >
                <span className="text-4xl sm:text-5xl font-extrabold font-display text-[#F5F5F5] flex items-center">
                  {stat.number}
                  {i === 0 && <span className="text-[#FF5A1F] text-2xl font-light ml-1">+</span>}
                </span>
                <span className="text-[10px] font-mono text-[#EDEDED]/45 uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Double Image Composition Column (5 cols) */}
        <div className="lg:col-span-5 grid grid-cols-12 gap-4 relative">
          {/* Main Back Image */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="col-span-12 rounded-lg overflow-hidden glass aspect-[4/5] relative group cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              style={{ backgroundImage: `url('/images/PORTE.jpg')` }}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white">
              <span className="text-xs uppercase font-mono tracking-widest text-[#EDEDED]/60">THE SANCTUARY / ENTRYWAY</span>
              <ArrowUpRight className="w-4 h-4 text-[#FF5A1F]" />
            </div>
          </motion.div>

          {/* Overlay Front Image (overlaps slightly) */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute -bottom-8 -left-8 w-1/2 aspect-[1/1] rounded-lg overflow-hidden glass border border-[#FF5A1F]/30 hidden sm:block group cursor-pointer"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
              style={{ backgroundImage: `url('/images/BOOK.jpg')` }}
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
