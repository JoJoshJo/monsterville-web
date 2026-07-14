"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ArrowUpRight } from "lucide-react";
import { EASE } from "@/lib/motion";

/**
 * De-carded portfolio (DESIGN-DIRECTION.md Move 3): full-bleed image rows,
 * typography set directly on the photograph — no glass panels, no grid cells.
 */

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  /** "cover" = full-bleed photo/texture; "artifact" = logo art floating in the dark (Travis-explore style). */
  display: "cover" | "artifact";
  /** Frequency (Hz) for the placeholder synth preview. */
  audioFreq?: number;
}

// One shared AudioContext for the whole page (IMPROVEMENTS.md A3 — browsers
// cap concurrent contexts; creating one per click eventually kills audio).
let sharedCtx: AudioContext | null = null;
const getAudioContext = (): AudioContext | null => {
  try {
    if (!sharedCtx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      sharedCtx = new Ctor();
    }
    if (sharedCtx.state === "suspended") sharedCtx.resume();
    return sharedCtx;
  } catch {
    return null;
  }
};

const CATEGORIES = [
  { value: "all", label: "ALL WORK" },
  { value: "audio", label: "AUDIO PRODUCTION" },
  { value: "film", label: "FILM & DIRECTING" },
  { value: "design", label: "ART DIRECTION" },
];

const PROJECTS: Project[] = [
  {
    id: "leopard-beats",
    title: "Leopard Rhythms",
    category: "audio",
    image: "/images/Bobino-Beats-Signature-Leopard.png",
    client: "Bobino Beats Sign",
    display: "artifact",
    audioFreq: 220,
  },
  {
    id: "netflix-intro",
    title: "Netflix Title Concept",
    category: "film",
    image: "/images/NETFLIX.jpg",
    client: "Netflix Inc.",
    display: "artifact",
  },
  {
    id: "tiger-chords",
    title: "Tiger Outboard Session",
    category: "audio",
    image: "/images/Bobino-Beats-Signature-Tiger.png",
    client: "Town Live Sessions",
    display: "cover",
    audioFreq: 261.63,
  },
  {
    id: "editorial-book",
    title: "The Editorial Monograph",
    category: "design",
    image: "/images/BOOK.jpg",
    client: "Luxury Editorial Print",
    display: "cover",
  },
  {
    id: "monsterville-identity",
    title: "Monsterville Digital Suite",
    category: "design",
    image: "/images/MONSTERVILLE INC BLEU.jpg",
    client: "Monsterville LLC",
    display: "artifact",
  },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);

  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const stopSynth = () => {
    const ctx = sharedCtx;
    const gain = gainNodeRef.current;
    const osc = oscillatorRef.current;
    if (ctx && gain && osc) {
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      osc.stop(ctx.currentTime + 0.45);
    }
    oscillatorRef.current = null;
    gainNodeRef.current = null;
  };

  const playSynth = (frequency: number) => {
    stopSynth();
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle"; // smooth organic tone
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();

    oscillatorRef.current = osc;
    gainNodeRef.current = gain;
  };

  const toggleAudio = (id: string, freq: number) => {
    if (playingId === id) {
      stopSynth();
      setPlayingId(null);
    } else {
      playSynth(freq);
      setPlayingId(id);
    }
  };

  const filteredProjects = PROJECTS.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section className="relative w-full py-32 bg-[#080808] border-t border-white/5">
      {/* Header Block */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-end justify-between gap-8 text-left mb-20">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full" />
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#EDEDED]/50 uppercase">
              03 / SELECTED PROJECTS
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-[#F5F5F5]">
            PORTFOLIO <span className="font-editorial italic font-normal text-[#FF5A1F]">logs</span>
          </h2>
        </div>

        {/* Navigation Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                stopSynth();
                setPlayingId(null);
                setFilter(c.value);
              }}
              className={`px-4 py-2.5 rounded-full border text-[10px] font-semibold tracking-wider transition-all duration-300 ${
                filter === c.value
                  ? "bg-[#FF5A1F] text-white border-[#FF5A1F]"
                  : "bg-white/[0.02] border-white/[0.05] text-[#EDEDED]/50 hover:bg-white/[0.05] hover:border-white/15"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Full-bleed editorial rows */}
      <div className="flex flex-col">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => {
            const isPlaying = playingId === project.id;

            return (
              <motion.article
                layout
                key={project.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9] overflow-hidden group cursor-pointer"
              >
                {project.display === "cover" ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} — ${project.client}`}
                    fill
                    sizes="100vw"
                    className="object-cover brightness-[0.65] contrast-[1.05] transition-all duration-700 group-hover:brightness-90 group-hover:scale-[1.03]"
                  />
                ) : (
                  /* Artifact: the piece hangs like a print in a dark gallery, lit on hover */
                  <div className="absolute inset-0 bg-[#0b0b0b] flex items-center justify-center">
                    <div className="relative w-[62%] sm:w-[46%] aspect-[4/3] bg-[#F5F2EC] p-[4%] shadow-[0_30px_80px_rgba(0,0,0,0.8)] opacity-70 brightness-[0.8] transition-all duration-700 group-hover:opacity-100 group-hover:brightness-100 group-hover:scale-[1.03] group-hover:-rotate-1">
                      <Image
                        src={project.image}
                        alt={`${project.title} — ${project.client}`}
                        fill
                        sizes="60vw"
                        className="object-contain p-6"
                      />
                    </div>
                  </div>
                )}

                {/* Seating gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/20 to-transparent" />

                {/* Index + category, top corners */}
                <div className="absolute top-0 inset-x-0 flex justify-between items-start p-6 md:p-12">
                  <span className="font-mono text-xs text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-mono tracking-widest text-[#EDEDED]/70 uppercase">
                    {project.category}
                  </span>
                </div>

                {/* Title set directly on the photograph */}
                <div className="absolute bottom-0 inset-x-0 p-6 md:p-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
                  <div className="flex flex-col gap-2 text-left">
                    <span className="text-[10px] font-mono tracking-widest text-[#FF5A1F] uppercase">
                      {project.client}
                    </span>
                    <h3 className="font-editorial italic text-3xl sm:text-5xl lg:text-6xl text-white leading-[1.05]">
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4">
                    {project.audioFreq ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleAudio(project.id, project.audioFreq!);
                        }}
                        aria-label={isPlaying ? `Stop preview of ${project.title}` : `Play preview of ${project.title}`}
                        className="flex items-center gap-3 px-5 py-3 rounded-full border border-white/15 bg-black/30 backdrop-blur-md hover:border-[#FF5A1F] transition-colors text-xs font-semibold text-white uppercase tracking-wider"
                      >
                        {isPlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 text-[#FF5A1F] fill-current" aria-hidden="true" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 text-[#FF5A1F] fill-current" aria-hidden="true" />
                            <span>Preview</span>
                          </>
                        )}
                      </button>
                    ) : (
                      <span className="flex items-center gap-2 text-xs font-semibold text-white/60 uppercase tracking-wider">
                        <span>View</span>
                        <ArrowUpRight className="w-4 h-4 text-[#FF5A1F]" aria-hidden="true" />
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
