"use client";

import { useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface Artist {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  trackName: string;
}

export default function Artists() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const artists: Artist[] = [
    {
      id: "bobino-beats",
      name: "BOBINO BEATS",
      role: "Lead Multi-Platinum Producer",
      image: "/images/Bobino Beats.jpg",
      bio: "Crafting heavy, texture-rich trap and cinematic hip-hop sub-bass signature. Multi-platinum engineer based in Paris.",
      trackName: "Listen: 'Leopard Sign' (Prod. Bobino)",
    },
    {
      // Using first custom logo image for variety
      id: "tatasanvi",
      name: "TATASANVI",
      role: "Cinematographer & Visual Director",
      image: "/images/Bobino logo ok1@2x.jpg",
      bio: "Specializing in high-contrast editorial photography, 16mm cinematic visual grades, and dark mode luxury edits.",
      trackName: "Project: 'A24 Light Study 02'",
    },
    {
      id: "monsterville",
      name: "MONSTERVILLE",
      role: "Creative Collective & Audio Design",
      image: "/images/MONSTERVILLE INC BLANC NOIR GRIS.jpg",
      bio: "Immersive sound design group pushing boundaries in volumetric soundscapes for Netflix and game integrations.",
      trackName: "Soundtrack: 'Love Death + Robots Ep. 5'",
    },
    {
      id: "sanvi-t",
      name: "SANVI T.",
      role: "Executive Audio Engineer",
      image: "/images/Bobino logo ok2@2x.jpg",
      bio: "Mastering guru ensuring pristine translation across digital DSPs and vinyl pressings. Analog outboard wizard.",
      trackName: "Mastered: 'Steel & Glass LP'",
    },
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full min-h-dvh py-32 bg-[#080808] flex flex-col justify-center overflow-hidden">
      {/* Title */}
      <div className="max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
        <div className="flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#EDEDED]/50 uppercase">
              04 / RESIDENT CREATIVES
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-[#F5F5F5]">
            TOWN <span className="font-editorial italic font-normal text-[#FF5A1F]">artists</span>
          </h2>
        </div>

        {/* Custom Navigation */}
        <div className="flex gap-4">
          <button
            onClick={scrollLeft}
            aria-label="Scroll artists left"
            className="w-12 h-12 rounded-full border border-white/10 hover:border-[#FF5A1F] hover:bg-[#FF5A1F]/5 flex items-center justify-center transition-all group"
          >
            <ArrowLeft className="w-4 h-4 text-[#EDEDED] group-hover:text-[#FF5A1F]" aria-hidden="true" />
          </button>
          <button
            onClick={scrollRight}
            aria-label="Scroll artists right"
            className="w-12 h-12 rounded-full border border-white/10 hover:border-[#FF5A1F] hover:bg-[#FF5A1F]/5 flex items-center justify-center transition-all group"
          >
            <ArrowRight className="w-4 h-4 text-[#EDEDED] group-hover:text-[#FF5A1F]" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Area */}
      <div
        ref={scrollContainerRef}
        className="w-full flex gap-6 overflow-x-auto overflow-y-hidden pb-12 px-6 md:px-12 scrollbar-none snap-x snap-mandatory"
        style={{ scrollbarWidth: "none" }}
      >
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="flex-none w-[85vw] sm:w-[500px] md:w-[600px] snap-center"
          >
            <div className="glass rounded-2xl overflow-hidden flex flex-col group transition-all duration-500 hover:border-[#FF5A1F]/30">
              {/* Photo Portrait */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-950">
                {/* 3D Depth tilt effect wrapper */}
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale contrast-[1.1] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  style={{ backgroundImage: `url('${artist.image}')` }}
                />
                
                {/* Visual gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent" />

                <div className="absolute bottom-4 left-6 flex flex-col text-left">
                  <span className="text-[10px] font-mono tracking-widest text-[#FF5A1F] uppercase">{artist.role}</span>
                  <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-display mt-1">
                    {artist.name}
                  </h3>
                </div>
              </div>

              {/* Bio & Listen Section */}
              <div className="p-8 flex flex-col gap-6 text-left bg-white/[0.01]">
                <p className="text-sm text-white/70 leading-relaxed font-sans min-h-[72px]">
                  {artist.bio}
                </p>

                <div className="flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="text-[10px] font-mono tracking-wider text-white/40 uppercase">
                    {artist.trackName}
                  </span>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#FF5A1F] flex items-center gap-1 group-hover:translate-x-1.5 transition-transform duration-300">
                    <span>VIEW PORTFOLIO</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
