"use client";

import { useState } from "react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import CornerNav from "@/components/CornerNav";
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

  return (
    <>
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <ReactLenis root>
          {/* Custom cursor overlay */}
          <CustomCursor />

          {/* Corner navigation frame (desktop corners / mobile bottom bar) */}
          <CornerNav />

          {/* Immersive Scroll Sections */}
          <main className="w-full flex flex-col relative z-10 selection:bg-[#FF5A1F] selection:text-white">

            {/* 01. Hero — flashlight reveal (scrolls via ids: #about, #book) */}
            <Hero />

            {/* 01. About */}
            <div id="about">
              <About />
            </div>

            {/* 02. Services */}
            <Services />

            {/* 03. Portfolio */}
            <div id="work">
              <Portfolio />
            </div>

            {/* 04. Artists */}
            <Artists />

            {/* 05. Book Session */}
            <div id="book">
              <BookSession />
            </div>

            {/* 06. Shop */}
            <div id="shop">
              <Shop />
            </div>

            {/* 07. News */}
            <News />

            {/* 08. Join Town */}
            <div id="join">
              <JoinTown />
            </div>

            {/* Footer */}
            <Footer />

          </main>
        </ReactLenis>
      )}
    </>
  );
}
