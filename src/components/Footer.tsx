"use client";

import { useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#080808] border-t border-white/5 py-24 px-6 md:px-12 text-left">
      <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8">
        
        {/* Left Side: Brand, Description, Socials (5 cols) */}
        <div className="md:col-span-5 flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 cursor-pointer" onClick={scrollToTop}>
              <img src="/images/Bobino logo ok.png" alt="Town Logo" className="h-10 w-auto object-contain brightness-200" />
            </div>
            <p className="text-sm text-white/55 leading-relaxed font-sans max-w-sm">
              An architectural space dedicated to cinematic grade visuals and high-fidelity sound layouts. 
              Pioneering digital soundscapes.
            </p>
          </div>

          {/* Socials */}
          <div className="flex gap-4">
            {[
              { label: "Instagram", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>, href: "https://instagram.com" },
              { label: "YouTube", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17z"/><path d="m10 15 5-3-5-3v6z"/></svg>, href: "https://youtube.com" },
              { label: "Twitter", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>, href: "https://twitter.com" },
              { label: "GitHub", icon: (props: React.SVGProps<SVGSVGElement>) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>, href: "https://github.com" },
            ].map((soc, i) => {
              const Icon = soc.icon;
              return (
                <a
                  key={i}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.label}
                  className="w-10 h-10 rounded-full border border-white/5 bg-white/[0.01] hover:border-[#FF5A1F] hover:bg-[#FF5A1F]/5 flex items-center justify-center transition-colors group"
                >
                  <Icon className="w-4 h-4 text-[#EDEDED] group-hover:text-[#FF5A1F] transition-colors" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Center: Directory links (3 cols) */}
        <div className="md:col-span-3 flex flex-col gap-6">
          <span className="text-[10px] font-mono tracking-widest text-[#FF5A1F] uppercase">DIRECTORY</span>
          <ul className="flex flex-col gap-4 text-xs font-semibold uppercase tracking-wider text-white/60">
            {["Services", "Artists", "Portfolio", "Boutique Shop", "News Press", "Join Syndicate"].map((link, i) => (
              <li key={i}>
                <span className="hover:text-[#FF5A1F] transition-colors cursor-pointer flex items-center gap-1.5 group">
                  <span>{link}</span>
                  <ArrowUpRight className="w-3 h-3 text-white/30 group-hover:text-[#FF5A1F] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Newsletter form (4 cols) */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <span className="text-[10px] font-mono tracking-widest text-[#FF5A1F] uppercase">NEWSLETTER</span>
          
          {!subscribed ? (
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <p className="text-xs text-white/50 leading-relaxed font-sans">
                Subscribe to receive private beat catalog drops, exclusive drum kit sales, and local visual screening alerts.
              </p>
              <div className="flex gap-2 mt-2">
                <input
                  id="newsletter-email"
                  aria-label="Email address for newsletter"
                  type="email"
                  required
                  placeholder="enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/[0.02] border border-white/[0.08] focus:border-[#FF5A1F] text-xs text-white px-4 py-3 rounded-lg outline-none transition-colors uppercase tracking-wider font-mono"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="w-12 bg-[#FF5A1F] text-white hover:bg-white hover:text-black rounded-lg flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 rounded-lg bg-white/[0.02] border border-[#FF5A1F]/30 flex flex-col gap-2">
              <span className="text-xs font-semibold text-white uppercase tracking-wider">Subscribed Successfully!</span>
              <p className="text-[11px] text-white/50">Your email has been added to our private mailing log.</p>
            </div>
          )}
        </div>
      </div>

      {/* Deep Footer bottom */}
      <div className="max-w-7xl w-full mx-auto relative z-10 border-t border-white/5 mt-20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">
        <div>TOWN STUDIOS © 2026. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6">
          <span className="hover:text-white cursor-pointer transition-colors">Privacy policy</span>
          <span className="hover:text-white cursor-pointer transition-colors">Terms of service</span>
        </div>
      </div>
    </footer>
  );
}
