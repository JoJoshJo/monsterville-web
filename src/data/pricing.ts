// Single source of truth for service pricing (IMPROVEMENTS.md A4).
// Services.tsx displays `marketing`; BookSession.tsx computes quotes from `mode` + `rate`.

export type PricingMode = "hourly" | "flat";

export interface ServicePricing {
  id: string;
  label: string;
  mode: PricingMode;
  /** USD. Per hour when mode is "hourly", per track/project when "flat". 0 = custom quote. */
  rate: number;
  marketing: string;
  /** Appears in the Book Session configurator. */
  bookable: boolean;
}

export const SERVICE_PRICING: ServicePricing[] = [
  { id: "recording", label: "Recording", mode: "hourly", rate: 120, marketing: "From $120/hr", bookable: true },
  { id: "mixing", label: "Mixing", mode: "flat", rate: 350, marketing: "From $350/track", bookable: true },
  { id: "mastering", label: "Mastering", mode: "flat", rate: 150, marketing: "From $150/track", bookable: true },
  { id: "photography", label: "Photography", mode: "hourly", rate: 200, marketing: "From $800 / 4hr session", bookable: true },
  { id: "videography", label: "Videography", mode: "hourly", rate: 250, marketing: "From $250/hr", bookable: true },
  { id: "creative-direction", label: "Creative Direction", mode: "flat", rate: 0, marketing: "Custom quote", bookable: false },
  { id: "podcast-live", label: "Podcast & Live", mode: "hourly", rate: 200, marketing: "From $200/hr", bookable: false },
];

export const ADDONS = {
  /** Flat fee per session. */
  analogGear: 75,
  /** Per hour for hourly services, flat for per-track services. */
  videographer: 150,
};

export const getService = (id: string) =>
  SERVICE_PRICING.find((s) => s.id === id) ?? SERVICE_PRICING[0];
