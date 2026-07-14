"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface Article {
  id: string;
  title: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

export default function News() {
  const articles: Article[] = [
    {
      id: "philosophy-of-bass",
      title: "THE ANATOMY OF TRANSITIONAL SUB-BASS",
      date: "JULY 02, 2026",
      category: "AUDIO EDITORIAL",
      image: "/images/Bobino Beats.jpg",
      readTime: "5 MIN READ",
    },
    {
      id: "cinematic-volumetric",
      title: "VOLUMETRIC LIGHTING SCHEMES FOR HIGH-END CINEMA",
      date: "JUNE 25, 2026",
      category: "FILM GRADE",
      image: "/images/PORTE.jpg",
      readTime: "7 MIN READ",
    },
    {
      id: "analog-limiters",
      title: "OUTBOARD SATURATION: NEVE 1073 HARMONIC DEPTH",
      date: "MAY 19, 2026",
      category: "TECHNICAL ESSAY",
      image: "/images/MONSTERVILLE INC BLANC NOIR GRIS.jpg",
      readTime: "12 MIN READ",
    },
  ];

  return (
    <section className="relative w-full min-h-dvh py-32 px-6 md:px-12 bg-[#080808] flex items-center justify-center border-t border-white/5">
      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col gap-16">
        
        {/* Title */}
        <div className="flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full" />
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#EDEDED]/50 uppercase">
              07 / LOGGED PRESS & ARTICLES
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-[#F5F5F5]">
            TOWN <span className="font-editorial italic font-normal text-[#FF5A1F]">chronicles</span>
          </h2>
        </div>

        {/* Article Grid (3 columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          {articles.map((art, i) => (
            <motion.article
              key={art.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group cursor-pointer flex flex-col gap-6"
            >
              {/* Image Frame */}
              <div className="w-full aspect-[4/3] rounded-xl overflow-hidden glass relative">
                <Image
                  src={art.image}
                  alt={art.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover grayscale scale-100 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              </div>

              {/* Meta */}
              <div className="flex justify-between items-center text-[10px] font-mono text-white/40">
                <span>{art.category}</span>
                <span>{art.readTime}</span>
              </div>

              {/* Title & Info */}
              <div className="flex flex-col gap-3">
                <h3 className="text-xl font-bold text-white tracking-tight leading-snug group-hover:text-[#FF5A1F] transition-colors duration-300">
                  {art.title}
                </h3>
                <span className="text-[10px] font-mono text-[#EDEDED]/30 uppercase block">
                  {art.date}
                </span>
              </div>

              {/* Custom Reveal arrow link */}
              <div className="border-t border-white/5 pt-4 mt-auto flex items-center justify-between text-xs text-white/50 group-hover:text-white transition-colors duration-300">
                <span>READ ARTICLE</span>
                <ArrowUpRight className="w-4 h-4 text-[#FF5A1F]" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
