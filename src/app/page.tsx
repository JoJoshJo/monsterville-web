"use client";

import { useState, useRef } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import AliveBackground from "@/components/AliveBackground";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Artists from "@/components/Artists";
import BookSession from "@/components/BookSession";
import Shop from "@/components/Shop";
import News from "@/components/News";
import JoinTown from "@/components/JoinTown";
import Footer from "@/components/Footer";

export default function Home() {
  const [loading, setLoading] = useState(true);

  // Section Refs for smooth scrolling navigation
  const aboutRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);

  const scrollToExplore = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBook = () => {
    bookRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <ReactLenis root>
          {/* Custom cursor overlay */}
          <CustomCursor />

          {/* Interactive particles background */}
          <AliveBackground />

          {/* Luxury ambient light glows */}
          <div className="absolute top-[120vh] right-[10%] w-[35vw] h-[35vw] bg-[#FF5A1F]/3 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute top-[280vh] left-[5%] w-[45vw] h-[45vw] bg-[#3A6073]/4 rounded-full blur-[180px] pointer-events-none" />
          <div className="absolute top-[450vh] right-[5%] w-[40vw] h-[40vw] bg-[#FF5A1F]/3 rounded-full blur-[150px] pointer-events-none" />

          {/* Immersive Scroll Sections */}
          <main className="w-full flex flex-col relative z-10 selection:bg-[#FF5A1F] selection:text-white">
            
            {/* 01. Hero */}
            <Hero onExploreClick={scrollToExplore} onBookClick={scrollToBook} />

            {/* 02. About */}
            <div ref={aboutRef}>
              <About />
            </div>

            {/* 03. Services */}
            <Services />

            {/* 05. Portfolio */}
            <Portfolio />

            {/* 04. Artists */}
            <Artists />

            {/* 06. Book Session */}
            <div ref={bookRef}>
              <BookSession />
            </div>

            {/* 07. Shop */}
            <Shop />

            {/* 08. News */}
            <News />

            {/* 09. Join Town */}
            <JoinTown />

            {/* 10. Footer */}
            <Footer />

          </main>
        </ReactLenis>
      )}
    </>
  );
}
