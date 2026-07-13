"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Increment progress counter
    const duration = 2800; // 2.8s
    const stepTime = Math.abs(Math.floor(duration / 100));
    
    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(onComplete, 800); // Allow fade out to finish
        }, 300);
      }
      setProgress(current);
    }, stepTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 1.05,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 w-full h-full bg-[#080808] z-[999999] flex flex-col justify-between p-12 select-none"
        >
          {/* Top Info */}
          <div className="flex justify-between items-start text-[10px] uppercase tracking-widest text-[#EDEDED]/40 font-mono">
            <div>DIGITAL EXPERIENCE v2.4</div>
            <div>TOWN STUDIOS ® 2026</div>
          </div>

          {/* Center Logo & Sound Wave */}
          <div className="flex flex-col items-center justify-center gap-8">
            <div className="relative w-48 h-20 flex items-center justify-center">
              {/* Dynamic glowing ring behind */}
              <div className="absolute w-24 h-24 bg-[#FF5A1F] rounded-full blur-[60px] opacity-25" />
              
              {/* Sleek SVG Logo that draws itself */}
              <svg className="w-full h-full" viewBox="0 0 300 80">
                <defs>
                  <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F5F5F5" />
                    <stop offset="50%" stopColor="#EDEDED" />
                    <stop offset="100%" stopColor="#FF5A1F" />
                  </linearGradient>
                </defs>
                {/* Drawn Logo paths representing 'T O W N' in stylized premium layout */}
                <motion.text
                  x="50%"
                  y="60%"
                  textAnchor="middle"
                  className="font-display text-4xl tracking-[0.2em] font-extrabold fill-none stroke-[url(#logoGrad)] stroke-1"
                  initial={{ strokeDasharray: "100px 300px", strokeDashoffset: "200px" }}
                  animate={{ strokeDasharray: "300px 0", strokeDashoffset: 0 }}
                  transition={{ duration: 2.2, ease: "easeInOut" }}
                >
                  TOWN
                </motion.text>
              </svg>
            </div>

            {/* Sound Wave Animation */}
            <div className="flex items-center gap-1.5 h-10">
              <span className="sound-wave-bar" style={{ animationDelay: "0.1s" }} />
              <span className="sound-wave-bar" style={{ animationDelay: "0.3s" }} />
              <span className="sound-wave-bar" style={{ animationDelay: "0.5s" }} />
              <span className="sound-wave-bar" style={{ animationDelay: "0.2s" }} />
              <span className="sound-wave-bar" style={{ animationDelay: "0.4s" }} />
              <span className="sound-wave-bar" style={{ animationDelay: "0.6s" }} />
            </div>
          </div>

          {/* Bottom Progress Counter */}
          <div className="flex flex-col gap-4">
            {/* Horizontal Loading Line */}
            <div className="w-full h-[1px] bg-[#EDEDED]/10 relative">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-[#FF5A1F]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            <div className="flex justify-between items-end">
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase tracking-wider text-[#EDEDED]/30 font-mono">Status</span>
                <span className="text-xs uppercase tracking-widest text-[#EDEDED]/70 font-display">
                  {progress < 40 && "Initializing core mesh..."}
                  {progress >= 40 && progress < 80 && "Loading ambient audio..."}
                  {progress >= 80 && progress < 100 && "Rendering 3D viewport..."}
                  {progress === 100 && "Ready to launch"}
                </span>
              </div>
              
              <div className="font-display text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-t from-[#EDEDED] to-[#FF5A1F] leading-none">
                {progress}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
