"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLenis } from "lenis/react";
import { ChevronDown } from "lucide-react";

/**
 * Flashlight hero (DESIGN-DIRECTION.md Move 1).
 * The studio entrance (PORTE.jpg) sits in near-darkness; a radial mask that
 * follows the pointer reveals it — the visitor carries the light into the
 * studio. On touch devices (or when idle) the beam drifts slowly on its own.
 * Dust particles live INSIDE the beam (Move 6: the old full-page particle
 * background demoted to a cinematic detail).
 */

const MASK =
  "radial-gradient(circle 280px at var(--mx, 50%) var(--my, 42%), rgba(0,0,0,1) 0%, rgba(0,0,0,0.75) 55%, transparent 100%)";

export default function Hero() {
  const lenis = useLenis();

  // Native smooth scrollIntoView fights Lenis's scroll loop — use the Lenis
  // API when mounted, native as fallback.
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el);
    else el.scrollIntoView({ behavior: "smooth" });
  };
  const onExploreClick = () => scrollTo("about");
  const onBookClick = () => scrollTo("book");

  // If the tab is hidden at mount (background-tab load, occluded window), rAF is
  // suspended and JS-driven entrance animations would freeze at their initial
  // state — leaving the hero blank. Render the final state instantly instead.
  const instant =
    typeof document !== "undefined" && document.visibilityState === "hidden";
  const containerRef = useRef<HTMLElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Parallax scroll transformations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "120%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Flashlight beam: follow the pointer; drift gently when idle / on touch.
  useEffect(() => {
    const el = containerRef.current;
    const reveal = revealRef.current;
    if (!el || !reveal) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0, y: 0, last: 0 };
    let raf = 0;
    let t = Math.random() * 10;

    const setSpot = (x: number, y: number) => {
      reveal.style.setProperty("--mx", `${x}px`);
      reveal.style.setProperty("--my", `${y}px`);
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
      pointer.last = performance.now();
    };
    el.addEventListener("pointermove", onPointerMove);

    const tick = () => {
      const { width, height } = el.getBoundingClientRect();
      const idle = performance.now() - pointer.last > 2500;
      if (idle) {
        // Slow drift so mobile / hands-off visitors still see the room breathe
        if (!reduced) t += 0.004;
        setSpot(
          width * (0.5 + Math.sin(t) * 0.24),
          height * (0.42 + Math.cos(t * 0.8) * 0.16)
        );
      } else {
        setSpot(pointer.x, pointer.y);
      }
      raf = requestAnimationFrame(tick);
    };

    if (reduced) {
      // Static, fully-placed light for reduced motion users
      const { width, height } = el.getBoundingClientRect();
      setSpot(width * 0.5, height * 0.42);
    } else {
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  // Dust in the light beam — pauses when the tab is hidden.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const count = width < 768 ? 22 : 45;
    const dust = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.4 + 0.4,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.1 - 0.04, // slight upward drift
      a: Math.random() * 0.45 + 0.15,
    }));

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      if (document.hidden) {
        raf = requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      for (const p of dust) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        ctx.globalAlpha = p.a;
        ctx.fillStyle = "#EDEDED";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-dvh overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-8 bg-[#080808]"
    >
      {/* Layer 1: the room, barely there */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/images/PORTE.jpg"
          alt="The entrance of Town Studios at night"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "brightness(0.14) saturate(0.7)" }}
        />
      </div>

      {/* Layer 2: the same room inside the flashlight beam, plus dust */}
      <div
        ref={revealRef}
        className="absolute inset-0 pointer-events-none"
        style={{ WebkitMaskImage: MASK, maskImage: MASK }}
      >
        <Image
          src="/images/PORTE.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ filter: "brightness(0.72) contrast(1.08) saturate(0.9)" }}
        />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      </div>

      {/* Vignette to seat the type */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60 pointer-events-none" />

      {/* Title block */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="flex flex-col items-center justify-center my-auto z-10 max-w-5xl w-full"
      >
        <div className="overflow-hidden mb-4">
          <motion.p
            initial={instant ? false : { y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] sm:tracking-[0.4em] text-[#FF5A1F] font-mono"
          >
            Cinematic Heritage • Digital Audio Universe
          </motion.p>
        </div>

        <div className="overflow-hidden reveal-text-container leading-[0.9]">
          <motion.h1
            initial={instant ? false : { y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13vw] sm:text-9xl md:text-[10rem] font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#F5F5F5] to-[#888888] font-display"
          >
            TOWN
          </motion.h1>
        </div>
        <div className="overflow-hidden reveal-text-container leading-[0.9] -mt-1 md:-mt-4">
          <motion.h1
            initial={instant ? false : { y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[13vw] sm:text-9xl md:text-[10rem] font-extrabold tracking-tighter text-[#F5F5F5] font-display"
          >
            STUDIOS
          </motion.h1>
        </div>

        {/* Editorial serif tagline (accent voice) */}
        <motion.p
          initial={instant ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.3 }}
          className="font-editorial italic text-lg sm:text-2xl text-[#EDEDED]/70 mt-6 sm:mt-8"
        >
          Create. Record. Film. <span className="text-[#FF5A1F]">Inspire.</span>
        </motion.p>

        {/* Spinning sticker CTA */}
        <motion.button
          initial={instant ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          onClick={onBookClick}
          aria-label="Book a session"
          className="group relative w-28 h-28 sm:w-36 sm:h-36 mt-10 sm:mt-12"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full sticker-spin" aria-hidden="true">
            <defs>
              <path
                id="sticker-circle"
                d="M50,50 m-40,0 a40,40 0 1,1 80,0 a40,40 0 1,1 -80,0"
              />
            </defs>
            <text
              className="fill-[#F5F5F5] uppercase"
              style={{ fontSize: "8.2px", letterSpacing: "0.22em", fontFamily: "var(--font-outfit)" }}
            >
              <textPath href="#sticker-circle">
                Book a session — Book a session —
              </textPath>
            </text>
          </svg>
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#FF5A1F]/60 bg-[#FF5A1F]/10 group-hover:bg-[#FF5A1F] transition-colors duration-300 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] group-hover:bg-white transition-colors duration-300" />
          </span>
        </motion.button>
      </motion.div>

      {/* Footer bar */}
      <motion.div
        initial={instant ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1.8 }}
        className="w-full flex justify-center items-center z-10 text-[10px] uppercase tracking-widest text-[#EDEDED]/30 font-mono pb-24 md:pb-4"
      >
        <button
          onClick={onExploreClick}
          className="flex items-center gap-2 animate-bounce cursor-pointer hover:text-[#FF5A1F] transition-colors"
        >
          <span>NEXT CHAPTER</span>
          <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </motion.div>
    </section>
  );
}
