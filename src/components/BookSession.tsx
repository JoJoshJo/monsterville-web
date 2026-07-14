"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { SERVICE_PRICING, ADDONS, getService } from "@/data/pricing";

const BOOKABLE = SERVICE_PRICING.filter((s) => s.bookable);

export default function BookSession() {
  const [selectedService, setSelectedService] = useState("recording");
  const [hours, setHours] = useState(4);
  const [addAnalogGear, setAddAnalogGear] = useState(false);
  const [addVideographer, setAddVideographer] = useState(false);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const service = getService(selectedService);
  const isFlat = service.mode === "flat";

  // Pricing formula — single source of truth in src/data/pricing.ts (A4)
  const calculateTotal = () => {
    let subtotal = isFlat ? service.rate : service.rate * hours;
    if (addAnalogGear) subtotal += ADDONS.analogGear;
    if (addVideographer) subtotal += ADDONS.videographer * (isFlat ? 1 : hours);
    return subtotal;
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !name || !email) return;
    setSubmitted(true);
  };

  // Generate calendar days for current month (mockup: July 2026)
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <section className="relative w-full min-h-dvh py-32 px-6 md:px-12 bg-[#080808] flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto relative z-10 flex flex-col gap-16">
        {/* Title */}
        <div className="flex flex-col gap-4 text-center items-center">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full" />
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#EDEDED]/50 uppercase">
              05 / WORKSPACE RESERVATION
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-[#F5F5F5]">
            SECURE YOUR <span className="font-editorial italic font-normal text-[#FF5A1F]">session</span>
          </h2>
          <p className="text-sm text-[#EDEDED]/60 font-sans max-w-md">
            Choose your suite, customize your inputs, select an open date, and book instant access.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
            >
              {/* Form Configurator (7 cols) */}
              <form onSubmit={handleBooking} className="lg:col-span-7 glass rounded-2xl p-6 md:p-10 flex flex-col gap-8 text-left">
                {/* Step 1: Service selection */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-[#EDEDED]/50">
                    1. Select Suite
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BOOKABLE.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedService(s.id)}
                        className={`px-4 py-3 rounded-lg border text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                          selectedService === s.id
                            ? "bg-[#FF5A1F] text-white border-[#FF5A1F]"
                            : "bg-white/[0.02] border-white/[0.05] text-[#EDEDED]/70 hover:bg-white/[0.05] hover:border-white/15"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Duration / Hours */}
                {!isFlat && (
                  <div className="flex flex-col gap-3">
                    <label className="text-[10px] font-mono uppercase tracking-widest text-[#EDEDED]/50 flex justify-between">
                      <span>2. Session Duration</span>
                      <span className="text-[#FF5A1F] font-bold">{hours} Hours</span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="12"
                      step="1"
                      value={hours}
                      onChange={(e) => setHours(Number(e.target.value))}
                      className="w-full accent-[#FF5A1F] bg-white/[0.05] h-1.5 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-white/30 font-mono">
                      <span>2 Hrs</span>
                      <span>6 Hrs</span>
                      <span>12 Hrs (Full Day)</span>
                    </div>
                  </div>
                )}

                {/* Step 3: Add-ons */}
                <div className="flex flex-col gap-3">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-[#EDEDED]/50">
                    3. Analog Extras & Visuals
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div
                      onClick={() => setAddAnalogGear(!addAnalogGear)}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300 ${
                        addAnalogGear
                          ? "bg-white/[0.04] border-[#FF5A1F]"
                          : "bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-white">Analog Outboard Suite</span>
                        <span className="text-[10px] text-white/40">Neve & SSL vintage compressors</span>
                      </div>
                      <span className={`w-4 h-4 rounded border flex items-center justify-center ${addAnalogGear ? "bg-[#FF5A1F] border-[#FF5A1F]" : "border-white/20"}`}>
                        {addAnalogGear && <span className="w-1.5 h-1.5 bg-white rounded-sm" />}
                      </span>
                    </div>

                    <div
                      onClick={() => setAddVideographer(!addVideographer)}
                      className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300 ${
                        addVideographer
                          ? "bg-white/[0.04] border-[#FF5A1F]"
                          : "bg-white/[0.01] border-white/[0.05] hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span className="text-xs font-semibold text-white">B-Roll Videographer</span>
                        <span className="text-[10px] text-white/40">4K behind the scenes capture</span>
                      </div>
                      <span className={`w-4 h-4 rounded border flex items-center justify-center ${addVideographer ? "bg-[#FF5A1F] border-[#FF5A1F]" : "border-white/20"}`}>
                        {addVideographer && <span className="w-1.5 h-1.5 bg-white rounded-sm" />}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Step 4: Contact details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="booking-name" className="text-[10px] font-mono uppercase tracking-widest text-[#EDEDED]/50">
                      Name
                    </label>
                    <input
                      id="booking-name"
                      type="text"
                      required
                      placeholder="Marc L."
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-white/[0.02] border border-white/[0.08] focus:border-[#FF5A1F] text-sm text-white px-4 py-3 rounded-lg outline-none transition-colors"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="booking-email" className="text-[10px] font-mono uppercase tracking-widest text-[#EDEDED]/50">
                      Email
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      required
                      placeholder="client@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/[0.02] border border-white/[0.08] focus:border-[#FF5A1F] text-sm text-white px-4 py-3 rounded-lg outline-none transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!selectedDate}
                  className="w-full py-4 mt-4 bg-[#FF5A1F] hover:bg-white hover:text-black font-semibold text-xs uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,90,31,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <span>{selectedDate ? "Confirm Booking" : "Select a Date to Continue"}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </form>

              {/* Calendar & Pricing (5 cols) */}
              <div className="lg:col-span-5 flex flex-col gap-8 justify-between">
                {/* Calendar Panel */}
                <div className="glass rounded-2xl p-6 md:p-8 flex flex-col gap-6 text-left">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <span className="text-sm font-semibold uppercase tracking-wider text-white">July 2026</span>
                    <span className="text-[10px] font-mono text-white/40">Paris Time</span>
                  </div>

                  <div className="grid grid-cols-7 gap-2 text-center text-xs text-white/50 font-mono mb-2">
                    <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1">
                    {/* Add blank spaces for calendar alignment if needed, July 2026 starts on Wednesday (2 offsets) */}
                    <span></span>
                    <span></span>
                    {daysInMonth.map((day) => {
                      const isSelected = selectedDate === day;
                      // Random disabled days for realism
                      const isDisabled = day % 7 === 0 || day === 15 || day === 19;

                      return (
                        <button
                          key={day}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setSelectedDate(day)}
                          className={`aspect-square text-xs font-semibold rounded flex items-center justify-center transition-all ${
                            isSelected
                              ? "bg-[#FF5A1F] text-white border border-[#FF5A1F]"
                              : isDisabled
                              ? "text-white/10 cursor-not-allowed line-through"
                              : "text-white/70 hover:bg-white/[0.05] border border-transparent hover:border-white/10"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pricing Breakdowns */}
                <div className="glass border-[#FF5A1F]/20 rounded-2xl p-6 md:p-8 flex flex-col gap-6 text-left relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF5A1F]/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs uppercase tracking-widest text-[#EDEDED]/50 font-mono">Real-Time Quote</span>
                      <span className="text-2xl font-bold font-display text-white">
                        {service.label.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-white/30 uppercase block">Est. Cost</span>
                      <span className="text-4xl font-extrabold text-[#FF5A1F] font-display">
                        ${calculateTotal()}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex flex-col gap-2.5 text-xs text-white/60 font-sans">
                    <div className="flex justify-between">
                      <span>Base rate:</span>
                      <span className="text-white">${service.rate}</span>
                    </div>
                    {!isFlat && (
                      <div className="flex justify-between">
                        <span>Hours:</span>
                        <span className="text-white">x {hours}</span>
                      </div>
                    )}
                    {addAnalogGear && (
                      <div className="flex justify-between text-[#FF5A1F]">
                        <span>Analog Outboard:</span>
                        <span>+${ADDONS.analogGear}</span>
                      </div>
                    )}
                    {addVideographer && (
                      <div className="flex justify-between text-white/80">
                        <span>Videographer premium:</span>
                        <span>+${ADDONS.videographer * (isFlat ? 1 : hours)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md w-full mx-auto glass border-[#FF5A1F]/30 rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-6"
            >
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/40 mb-2">
                <span className="rec-dot w-3 h-3 rounded-full bg-red-500" />
                <span className="font-mono text-xs tracking-[0.3em] text-red-400 uppercase">REC</span>
              </div>
              <h3 className="text-2xl font-bold font-display text-white uppercase tracking-wider">
                Session Requested!
              </h3>
              <p className="text-sm text-white/60 leading-relaxed font-sans">
                Merci {name}. We have logged your request for July {selectedDate}, 2026. A representative from Town Studios will reach out to <strong className="text-white">{email}</strong> within 2 hours to confirm your project spec sheet.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSelectedDate(null);
                  setName("");
                  setEmail("");
                }}
                className="px-6 py-2.5 bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-white/20 text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors text-white mt-4"
              >
                Book Another Suite
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
