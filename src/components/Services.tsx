"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Sliders, Speaker, Camera, Video, Compass, MicVocal, Play, type LucideIcon } from "lucide-react";
import { getService } from "@/data/pricing";

interface ServiceItem {
  id: string;
  num: string;
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  rates: string;
}

export default function Services() {
  const [activeService, setActiveService] = useState<string>("recording");

  const services: ServiceItem[] = [
    {
      id: "recording",
      num: "01",
      title: "RECORDING",
      description: "Pristine analog signal paths coupled with state-of-the-art acoustics. Designed for artists demanding absolute depth.",
      icon: Mic,
      image: "/images/Bobino Beats.jpg",
      rates: getService("recording").marketing,
    },
    {
      id: "mixing",
      num: "02",
      title: "MIXING",
      description: "Stereo and spatial audio mixes designed for deep impact. Balancing the organic texture of hardware with surgical digital precision.",
      icon: Sliders,
      image: "/images/MONSTERVILLE INC BLANC NOIR GRIS.jpg",
      rates: getService("mixing").marketing,
    },
    {
      id: "mastering",
      num: "03",
      title: "MASTERING",
      description: "The final touch. Precision balancing using high-end tube limiters and solid-state equalizers for a world-class translation.",
      icon: Speaker,
      image: "/images/MONSTERVILLE INC BLEU.jpg",
      rates: getService("mastering").marketing,
    },
    {
      id: "photography",
      num: "04",
      title: "PHOTOGRAPHY",
      description: "High-contrast editorial film shoots, fashion print, and cover art styling to immortalize your project's visual voice.",
      icon: Camera,
      image: "/images/TAMPON.jpg",
      rates: getService("photography").marketing,
    },
    {
      id: "videography",
      num: "05",
      title: "VIDEOGRAPHY",
      description: "From Netflix title sequences to 16mm film music videos. Volumetric lighting and cinematic color grading that evokes raw A24 feeling.",
      icon: Video,
      image: "/images/PORTE.jpg",
      rates: getService("videography").marketing,
    },
    {
      id: "creative-direction",
      num: "06",
      title: "CREATIVE DIRECTION",
      description: "Building the visual and auditive soul of your brand. Cohesive storytelling across merch, art, sound design, and identity.",
      icon: Compass,
      image: "/images/BOOK.jpg",
      rates: getService("creative-direction").marketing,
    },
    {
      id: "podcast-live",
      num: "07",
      title: "PODCAST & LIVE SESSIONS",
      description: "High-end multi-cam sets with broadcast-ready sound. Immersive livestream setups and intimate acoustic performances.",
      icon: MicVocal,
      image: "/images/WALL PAPER.jpg",
      rates: getService("podcast-live").marketing,
    },
  ];

  return (
    <section className="relative w-full min-h-dvh py-32 px-6 md:px-12 bg-[#0c0c0c] overflow-hidden flex flex-col justify-center">
      {/* Background visual reveal */}
      <div className="absolute inset-0 w-full h-full pointer-events-none opacity-20 transition-all duration-700">
        <AnimatePresence mode="wait">
          {services.map(
            (s) =>
              s.id === activeService && (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.15, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 bg-cover bg-center grayscale filter blur-sm"
                  style={{ backgroundImage: `url('${s.image}')` }}
                />
              )
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-transparent to-[#0c0c0c]" />
      </div>

      <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left column info (4 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between text-left">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full animate-ping" />
              <span className="text-[10px] tracking-[0.3em] font-mono text-[#EDEDED]/50 uppercase">
                02 / CREATIVE CAPABILITIES
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-[#F5F5F5]">
              SOUND & <br />
              <span className="font-editorial italic font-normal text-[#FF5A1F]">vision</span>
            </h2>
            <p className="text-base text-[#EDEDED]/60 font-sans max-w-sm mt-4">
              Explore our core capabilities — each one previews the visual aesthetic and details of its production suite.
            </p>
          </div>

          {/* Immersive active service card display */}
          <div className="hidden lg:block mt-12 bg-white/[0.02] border border-white/[0.05] rounded-xl p-8 backdrop-blur-md max-w-sm">
            <AnimatePresence mode="wait">
              {services.map(
                (s) =>
                  s.id === activeService && (
                    <motion.div
                      key={s.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.4 }}
                      className="flex flex-col gap-4"
                    >
                      <span className="text-[10px] font-mono tracking-widest text-[#FF5A1F]">{s.rates}</span>
                      <h4 className="text-lg font-bold tracking-tight text-[#F5F5F5]">{s.title}</h4>
                      <p className="text-sm text-[#EDEDED]/70 leading-relaxed font-sans">{s.description}</p>
                      
                      <div className="w-full h-[150px] mt-4 rounded-lg overflow-hidden relative">
                        <img src={s.image} alt={s.title} className="w-full h-full object-cover grayscale brightness-90" />
                      </div>
                    </motion.div>
                  )
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right column: Interactive list (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-center gap-2">
          {services.map((service) => {
            const Icon = service.icon;
            const isActive = service.id === activeService;

            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveService(service.id)}
                onClick={() => setActiveService(service.id)}
                className="group relative border-b border-white/5 py-6 cursor-pointer flex justify-between items-center transition-all duration-300"
              >
                {/* Background color slide on hover */}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#FF5A1F] transition-all duration-500 group-hover:w-full" />

                <div className="flex items-center gap-6">
                  {/* Number */}
                  <span className={`font-mono text-xs ${isActive ? "text-[#FF5A1F]" : "text-white/20"} transition-colors duration-300`}>
                    {service.num}
                  </span>

                  {/* Title */}
                  <h3
                    className={`text-xl sm:text-3xl font-bold tracking-tight transition-all duration-300 flex items-center gap-3 ${
                      isActive ? "text-[#F5F5F5] translate-x-3" : "text-white/40 group-hover:text-white/80"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-[#FF5A1F]" : "text-white/25"} transition-colors`} />
                    <span>{service.title}</span>
                  </h3>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center gap-2">
                  {isActive && (
                    <motion.div
                      layoutId="activeArrow"
                      className="w-8 h-8 rounded-full bg-[#FF5A1F]/10 flex items-center justify-center border border-[#FF5A1F]/30"
                    >
                      <Play className="w-2.5 h-2.5 text-[#FF5A1F] fill-current" />
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
