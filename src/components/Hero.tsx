"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Play, Calendar } from "lucide-react";

interface HeroProps {
  onExploreClick: () => void;
  onBookClick: () => void;
}

export default function Hero({ onExploreClick, onBookClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll transformations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [0.65, 0.1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Handle subtle mouse tilt
  useEffect(() => {
    const card = containerRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20; // max 20px shift
      const y = (clientY / innerHeight - 0.5) * 20;
      
      const layers = card.querySelectorAll(".parallax-layer");
      layers.forEach((layer: any) => {
        const speed = layer.getAttribute("data-speed") || 1;
        layer.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between items-center text-center p-8 bg-[#080808]"
    >
      {/* Background Image / Ambient Loop */}
      <motion.div
        style={{ scale: bgScale, opacity: bgOpacity }}
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/WALL PAPER.jpg')`,
            filter: "brightness(0.35) contrast(1.1) saturate(0.85)",
          }}
        />
        {/* Dark vignette overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080808] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
      </motion.div>

      {/* Ambient glowing spotlight */}
      <div className="absolute top-[20%] left-[20%] w-[45vw] h-[45vw] bg-[#FF5A1F]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Header bar */}
      <div className="w-full flex justify-between items-center z-10 max-w-7xl mx-auto pt-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src="/images/Bobino logo ok.png" alt="Town Logo" className="h-9 w-auto object-contain brightness-200" />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={onBookClick}
          className="glass hover:bg-[#FF5A1F]/10 hover:border-[#FF5A1F] text-xs uppercase tracking-widest px-5 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 group"
        >
          <Calendar className="w-3.5 h-3.5 text-[#FF5A1F]" />
          <span>Book Session</span>
        </motion.button>
      </div>

      {/* Title block */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="flex flex-col items-center justify-center my-auto z-10 max-w-5xl"
      >
        {/* Subtitle / Intro phrase */}
        <div className="overflow-hidden mb-4">
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#FF5A1F] font-mono"
          >
            A24 Cinematic Heritage • Digital Audio Universe
          </motion.p>
        </div>

        {/* Title */}
        <div className="overflow-hidden reveal-text-container leading-[0.9]">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl sm:text-9xl md:text-[11rem] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#F5F5F5] to-[#888888] font-display"
          >
            TOWN
          </motion.h1>
        </div>
        <div className="overflow-hidden reveal-text-container leading-[0.9] -mt-1 md:-mt-4">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-7xl sm:text-9xl md:text-[11rem] font-extrabold tracking-tighter text-[#F5F5F5] font-display"
          >
            STUDIOS
          </motion.h1>
        </div>

        {/* Subtitle grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.3 }}
          className="flex gap-4 sm:gap-8 mt-6 sm:mt-10 text-xs sm:text-sm uppercase tracking-widest text-[#EDEDED]/50 font-mono"
        >
          <span>Create.</span>
          <span>Record.</span>
          <span>Film.</span>
          <span>Inspire.</span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-12 w-full justify-center max-w-[400px]"
        >
          <button
            onClick={onBookClick}
            className="px-8 py-4 bg-[#FF5A1F] text-white hover:bg-white hover:text-black font-semibold rounded-full uppercase tracking-wider text-xs transition-all duration-300 shadow-[0_0_30px_rgba(255,90,31,0.3)] hover:shadow-white/20 hover:scale-105"
          >
            Book Session
          </button>
          <button
            onClick={onExploreClick}
            className="px-8 py-4 glass hover:bg-white hover:text-black font-semibold rounded-full uppercase tracking-wider text-xs transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Explore Experience</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Footer bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
        className="w-full flex justify-between items-center z-10 text-[10px] uppercase tracking-widest text-[#EDEDED]/30 max-w-7xl mx-auto font-mono pb-4"
      >
        <div>SCROLL TO DEVIATE</div>
        <button
          onClick={onExploreClick}
          className="flex items-center gap-2 animate-bounce cursor-pointer hover:text-[#FF5A1F] transition-colors"
        >
          <span>NEXT CHAPTER</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
        <div>LAT. 43.7001° N</div>
      </motion.div>
    </section>
  );
}
