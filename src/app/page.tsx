"use client";

import { useAuth } from "@/contexts/auth-context";
import { LandingHeader, LandingHero, LandingFeatures, LandingFooter } from "@/components/landing";

export default function LandingPage() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="bg-paper flex min-h-screen items-center justify-center font-mono">
        <p className="text-ink text-sm font-bold uppercase">Loading...</p>
      </div>
    );
  }

  return (
    <div className="tabular bg-paper text-ink min-h-screen font-mono">
      <div className="border-ink mx-auto flex min-h-screen max-w-[1440px] flex-col border-[3px]">
        <LandingHeader />
        <LandingHero />
        <LandingFeatures />
        <LandingFooter />
      </div>
    </div>
  );
}
