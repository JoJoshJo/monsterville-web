"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, User, Link as LinkIcon, Briefcase } from "lucide-react";

export default function JoinTown() {
  const [role, setRole] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const roles = [
    "Producer / Beatmaker",
    "Mixing/Mastering Engineer",
    "Director / Videographer",
    "High-End Photographer",
    "Brand/UI Designer",
  ];

  const handleNext = () => {
    if (step === 1 && !role) return;
    if (step === 2 && !portfolio) return;
    if (step === 2) {
      // Proceed to step 3 (email)
      setStep(3);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section className="relative w-full min-h-screen py-32 px-6 md:px-12 bg-[#0c0c0c] flex items-center justify-center border-t border-white/5">
      <div className="max-w-4xl w-full mx-auto relative z-10 flex flex-col gap-12">
        
        {/* Title */}
        <div className="flex flex-col gap-4 text-center items-center">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-[#FF5A1F] rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.3em] font-mono text-[#EDEDED]/50 uppercase">
              08 / RESIDENCY APPLICATION
            </span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-display text-[#F5F5F5]">
            JOIN THE <span className="text-[#FF5A1F]">NETWORK</span>
          </h2>
          <p className="text-sm text-[#EDEDED]/60 font-sans max-w-md">
            We are always scouting for elite creative talent. Pitch your raw links to enter our resident syndicate.
          </p>
        </div>

        <div className="max-w-xl w-full mx-auto glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#FF5A1F]/5 rounded-full blur-2xl pointer-events-none" />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Step Indicators */}
                <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                  <span className="text-[10px] font-mono text-white/30 uppercase">
                    Step {step} of 3
                  </span>
                  <div className="flex gap-1.5">
                    <span className={`w-6 h-1 rounded-sm transition-all duration-300 ${step >= 1 ? "bg-[#FF5A1F]" : "bg-white/10"}`} />
                    <span className={`w-6 h-1 rounded-sm transition-all duration-300 ${step >= 2 ? "bg-[#FF5A1F]" : "bg-white/10"}`} />
                    <span className={`w-6 h-1 rounded-sm transition-all duration-300 ${step >= 3 ? "bg-[#FF5A1F]" : "bg-white/10"}`} />
                  </div>
                </div>

                {/* Form Steps */}
                {step === 1 && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col gap-6 text-left"
                  >
                    <label className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-[#FF5A1F]" />
                      <span>Select your creative vertical</span>
                    </label>
                    <div className="flex flex-col gap-2.5">
                      {roles.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`w-full p-4 rounded-xl text-left border text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                            role === r
                              ? "bg-[#FF5A1F] border-[#FF5A1F] text-white"
                              : "bg-white/[0.01] border-white/[0.05] text-[#EDEDED]/70 hover:bg-white/[0.03] hover:border-white/10"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                    <button
                      disabled={!role}
                      onClick={handleNext}
                      className="w-full py-4 mt-4 bg-[#FF5A1F] hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors text-white"
                    >
                      Next Step
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col gap-6 text-left"
                  >
                    <label className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-[#FF5A1F]" />
                      <span>Provide your portfolio link</span>
                    </label>
                    <input
                      type="url"
                      required
                      placeholder="https://behance.net/yourprofile or soundcloud.com"
                      value={portfolio}
                      onChange={(e) => setPortfolio(e.target.value)}
                      className="bg-white/[0.02] border border-white/[0.08] focus:border-[#FF5A1F] text-sm text-white px-4 py-4 rounded-xl outline-none transition-colors"
                    />
                    <div className="flex gap-4 mt-4">
                      <button
                        onClick={() => setStep(1)}
                        className="flex-1 py-4 bg-white/[0.02] border border-white/5 hover:bg-white/5 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors text-white"
                      >
                        Back
                      </button>
                      <button
                        disabled={!portfolio}
                        onClick={handleNext}
                        className="flex-1 py-4 bg-[#FF5A1F] hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors text-white"
                      >
                        Next Step
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 text-left"
                  >
                    <label className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                      <User className="w-4 h-4 text-[#FF5A1F]" />
                      <span>Enter your email address</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="creative@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-white/[0.02] border border-white/[0.08] focus:border-[#FF5A1F] text-sm text-white px-4 py-4 rounded-xl outline-none transition-colors"
                    />
                    <div className="flex gap-4 mt-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 py-4 bg-white/[0.02] border border-white/5 hover:bg-white/5 font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors text-white"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={!email}
                        className="flex-1 py-4 bg-[#FF5A1F] hover:bg-white hover:text-black disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-xs uppercase tracking-wider rounded-lg transition-colors text-white flex items-center justify-center gap-2"
                      >
                        <span>Submit Application</span>
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="success-container"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex flex-col items-center justify-center text-center gap-6 py-8"
              >
                <div className="w-14 h-14 rounded-full bg-[#FF5A1F]/15 flex items-center justify-center border border-[#FF5A1F]/40 mb-2 animate-bounce">
                  <CheckCircle2 className="w-7 h-7 text-[#FF5A1F]" />
                </div>
                <h3 className="text-xl font-bold font-display text-white uppercase tracking-wider">
                  Pitch Received
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-sans max-w-sm">
                  We have logged your application for the **{role}** residency slot. Our visual panel will audit your portfolio at **{portfolio}** and contact you if we select you for an interview.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setStep(1);
                    setRole("");
                    setPortfolio("");
                    setEmail("");
                  }}
                  className="px-6 py-2.5 bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] hover:border-white/20 text-[10px] font-mono tracking-widest uppercase rounded-lg transition-colors text-white"
                >
                  Restart Application
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
