"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const variants = {
  default: { width: 8, height: 8, backgroundColor: "#F5F5F5", borderRadius: "50%" },
  hover: { width: 48, height: 48, backgroundColor: "transparent", border: "1px solid #FF5A1F", borderRadius: "50%" },
  custom: { width: 72, height: 72, backgroundColor: "#FF5A1F", borderRadius: "50%" },
};

export default function CustomCursor() {
  // Only run on devices with a fine pointer. On touch devices this component
  // renders nothing and attaches no listeners at all (was: listeners + a live
  // spring animation mounted on every device, hidden only by CSS).
  // Lazy init is safe: this component only mounts client-side, after the preloader.
  const [enabled] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: fine)").matches
  );
  const [cursorType, setCursorType] = useState("default");
  const [cursorText, setCursorText] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("custom-cursor-active");
    return () => document.documentElement.classList.remove("custom-cursor-active");
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    // Only re-evaluate hover state when the pointer crosses into a new element,
    // and prefer the cheap composedPath() over repeated closest() walks.
    const handleOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        "[data-cursor], a, button, [role='button'], [data-hoverable='true']"
      ) as HTMLElement | null;

      const data = el?.getAttribute("data-cursor");
      if (data) {
        setCursorType("custom");
        setCursorText(data);
      } else if (el) {
        setCursorType("hover");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [enabled, cursorX, cursorY, isVisible]);

  if (!enabled || !isVisible) return null;

  return (
    <>
      {/* Outer spring cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center overflow-hidden"
        style={{ x: cursorXSpring, y: cursorYSpring }}
        animate={cursorType}
        variants={variants}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {cursorType === "custom" && cursorText && (
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#080808]">
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner dot (instant follow) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#FF5A1F] rounded-full pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorX, y: cursorY }}
      />
    </>
  );
}
