"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<string>("default");
  const [cursorText, setCursorText] = useState<string>("");
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for lag/inertia
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if interactive
      const isHoverable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("button") || 
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.closest('[data-hoverable="true"]');

      const customCursorData = target.closest("[data-cursor]")?.getAttribute("data-cursor");

      if (customCursorData) {
        setCursorType("custom");
        setCursorText(customCursorData);
      } else if (isHoverable) {
        setCursorType("hover");
        setCursorText("");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  // Variants for custom cursor states
  const variants = {
    default: {
      width: 8,
      height: 8,
      backgroundColor: "#F5F5F5",
      borderRadius: "50%",
    },
    hover: {
      width: 48,
      height: 48,
      backgroundColor: "transparent",
      border: "1px solid #FF5A1F",
      borderRadius: "50%",
    },
    custom: {
      width: 72,
      height: 72,
      backgroundColor: "#FF5A1F",
      borderRadius: "50%",
    }
  };

  return (
    <>
      {/* Outer Spring Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center overflow-hidden hidden md:flex"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
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

      {/* Inner Dot (instant follow) */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#FF5A1F] rounded-full pointer-events-none z-[999999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
}
