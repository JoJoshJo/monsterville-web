"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ExternalLink, Image as ImageIcon, Volume2 } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  client: string;
  size: string; // Column layout class
  audioUrl?: string;
}

export default function Portfolio() {
  const [filter, setFilter] = useState("all");
  const [playingId, setPlayingId] = useState<string | null>(null);
  
  // We can use a synthetic Web Audio API Synth to play some elegant chill chords when they click play!
  // This will literally blow their mind because it's a real audio engine!
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const playSynth = (frequency: number) => {
    // Stop previous if exists
    stopSynth();

    try {
      // Create new Context
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioContextRef.current = ctx;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle"; // smooth organic tone like FKJ
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      
      // Gentle fade in
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch (e) {
      console.error("Audio API not supported or blocked by browser policy", e);
    }
  };

  const stopSynth = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      gainNodeRef.current.gain.setValueAtTime(gainNodeRef.current.gain.value, ctx.currentTime);
      gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
      
      const currentOsc = oscillatorRef.current;
      setTimeout(() => {
        try {
          currentOsc?.stop();
        } catch(e){}
      }, 600);
    }
    oscillatorRef.current = null;
    gainNodeRef.current = null;
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

  const categories = [
    { value: "all", label: "ALL WORK" },
    { value: "audio", label: "AUDIO PRODUCTION" },
    { value: "film", label: "FILM & DIRECTING" },
    { value: "design", label: "ART DIRECTION" },
  ];

  const projects: Project[] = [
    {
      id: "leopard-beats",
      title: "LEOPARD RHYTHMS",
      category: "audio",
      image: "/images/Bobino-Beats-Signature-Leopard.png",
      client: "Bobino Beats Sign",
      size: "md:col-span-8",
      audioUrl: "220", // low frequency chill tone A3
    },
    {
      id: "netflix-intro",
      title: "NETFLIX TITLE CONCEPT",
      category: "film",
      image: "/images/NETFLIX.jpg",
      client: "Netflix Inc.",
      size: "md:col-span-4",
    },
    {
      id: "tiger-chords",
      title: "TIGER OUTBOARD SESSION",
      category: "audio",
      image: "/images/Bobino-Beats-Signature-Tiger.png",
      client: "Town Live Sessions",
      size: "md:col-span-4",
      audioUrl: "261.63", // Middle C4 tone
    },
    {
      id: "editorial-book",
      title: "THE EDITORIAL MONOGRAPH",
      category: "design",
      image: "/images/BOOK.jpg",
      client: "Luxury Editorial Print",
      size: "md:col-span-8",
    },
    {
      id: "monsterville-identity",
      title: "MONSTERVILLE DIGITAL SUITE",
      category: "design",
      image: "/images/MONSTERVILLE INC BLEU.jpg",
      client: "Monsterville LLC",
      size: "md:col-span-6",
    },
    {
      id: "ambient-wallpaper",
      title: "VOLUMETRIC GRADIENTS",
      category: "design",
      image: "/images/WALL PAPER.jpg",
      client: "Fine Arts Gallery",
      size: "md:col-span-6",
    },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === "all" || p.category === filter
  );

  return (
    <section className="relative w-full min-h-screen py-32 px-6 md:px-12 bg-[#080808] flex items-center justify-center border-t border-white/5">
      <div className="max-w-7xl w-full mx-auto relative z-10 flex flex-col gap-16">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 text-left">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full" />
              <span className="text-[10px] tracking-[0.3em] font-mono text-[#EDEDED]/50 uppercase">
                05 / SELECTED PROJECTS
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-[#F5F5F5]">
              PORTFOLIO <span className="text-[#FF5A1F]">LOGS</span>
            </h2>
          </div>

          {/* Navigation Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  stopSynth();
                  setPlayingId(null);
                  setFilter(c.value);
                }}
                className={`px-4 py-2 rounded-full border text-[10px] font-semibold tracking-wider transition-all duration-300 ${
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

        {/* Masonry-Style Grid with smooth exit/enter */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const isPlaying = playingId === project.id;
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as any }}
                  key={project.id}
                  className={`relative rounded-xl overflow-hidden glass aspect-[4/3] group cursor-pointer ${project.size}`}
                >
                  {/* Photo Container */}
                  <div
                    className="absolute inset-0 bg-cover bg-center grayscale contrast-[1.1] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />

                  {/* Dark Vignette Layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-black/30 opacity-70 transition-opacity group-hover:opacity-85" />

                  {/* Top category label */}
                  <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
                    <span className="px-3 py-1 bg-black/40 backdrop-blur-md border border-white/5 rounded-full text-[9px] font-mono tracking-widest text-[#EDEDED]/60 uppercase">
                      {project.category}
                    </span>
                  </div>

                  {/* Sound Wave Audio Playing Overlay Indicator */}
                  {isPlaying && (
                    <div className="absolute top-6 right-6 z-10 bg-[#FF5A1F]/20 border border-[#FF5A1F]/40 px-3 py-1.5 rounded-full flex items-center gap-2 backdrop-blur-md">
                      <Volume2 className="w-3.5 h-3.5 text-[#FF5A1F] animate-pulse" />
                      <span className="text-[9px] font-mono text-white tracking-widest uppercase">PLAYING CHORD</span>
                    </div>
                  )}

                  {/* Hover visual details */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-left transition-transform duration-500">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[10px] font-mono tracking-widest text-[#FF5A1F] uppercase">
                        {project.client}
                      </span>
                      <h3 className="text-xl md:text-2xl font-extrabold tracking-tight text-white font-display">
                        {project.title}
                      </h3>
                    </div>

                    <div className="h-0 overflow-hidden group-hover:h-8 group-hover:mt-4 transition-all duration-300 flex items-center gap-4">
                      {project.audioUrl ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleAudio(project.id, Number(project.audioUrl));
                          }}
                          className="flex items-center gap-2 text-xs font-semibold text-[#FF5A1F] hover:text-white"
                        >
                          {isPlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5 text-[#FF5A1F] fill-current" />
                              <span>MUTE SYNTH</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 text-[#FF5A1F] fill-current" />
                              <span>PLAY AUDIO CHORD</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="flex items-center gap-2 text-xs font-semibold text-white/50">
                          <ImageIcon className="w-3.5 h-3.5" />
                          <span>VIEW DETAILS</span>
                        </span>
                      )}
                      
                      <span className="ml-auto w-6 h-6 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors">
                        <ExternalLink className="w-3 h-3 text-white" />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
