"use client";

import { useEffect, useRef } from "react";

export default function AliveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse for interactivity
    const mouse = { x: width / 2, y: height / 2, tx: width / 2, ty: height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.tx = e.clientX;
      mouse.ty = e.clientY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    // Particle classes
    class Particle {
      x: number;
      y: number;
      size: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.15;
        this.vy = (Math.random() - 0.5) * 0.15;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.decay = Math.random() * 0.002 + 0.001;
        this.color = Math.random() > 0.95 ? "#FF5A1F" : "#EDEDED";
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce/Wrap boundaries
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Subtle mouse pull
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          this.x += (dx / dist) * 0.15;
          this.y += (dy / dist) * 0.15;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = this.alpha;
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    // Floating glowing orbs (luxury lights)
    class LightOrb {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;

      constructor(color: string, radius: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = radius;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.color = color;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;

        // Lag-based mouse tracking for ambient drift
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 400) {
          this.x += (dx / dist) * 0.1;
          this.y += (dy / dist) * 0.1;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        const grad = c.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        grad.addColorStop(0, this.color);
        grad.addColorStop(1, "rgba(8, 8, 8, 0)");
        c.fillStyle = grad;
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: 60 }, () => new Particle());
    
    // Luxury lighting colors: Steel Blue (#3A6073), Soft Orange (#FF5A1F), and deep charcoal
    const orbs: LightOrb[] = [
      new LightOrb("rgba(58, 96, 115, 0.12)", 350), // Steel Blue
      new LightOrb("rgba(255, 90, 31, 0.04)", 250),  // Accent Orange
      new LightOrb("rgba(120, 120, 120, 0.06)", 300), // Muted White/Grey
    ];

    // Loop
    const tick = () => {
      // Smooth mouse coordinate ease
      mouse.x += (mouse.tx - mouse.x) * 0.08;
      mouse.y += (mouse.ty - mouse.y) * 0.08;

      ctx.fillStyle = "#080808";
      ctx.fillRect(0, 0, width, height);

      // Draw light orbs
      orbs.forEach((orb) => {
        orb.update();
        orb.draw(ctx);
      });

      // Draw dust particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
    />
  );
}
