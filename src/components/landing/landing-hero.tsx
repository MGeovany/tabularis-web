"use client";

import Link from "next/link";
import { Button } from "@/components/button";
import { useAuth } from "@/contexts/auth-context";

export function LandingHero() {
  const { user } = useAuth();
  const getStartedHref = user ? "/dashboard" : "/login";
  return (
    <section className="min-h-[60vh]">
      <div className="relative flex flex-col justify-between p-6">
        <div className="absolute inset-0 [background-image:radial-gradient(var(--ink)_20%,transparent_20%)] [background-size:6px_6px] [background-position:0_0] opacity-15" />
        <div className="relative z-10">
          <div className="border-ink mb-8 border-b pb-2 text-xs font-bold uppercase">
            <span className="mr-2">PDF → Excel</span>
            <span className="mr-2">• Encrypted</span>
            <span>• Audit-ready</span>
          </div>

          <h1 className="font-dela text-4xl leading-tight font-black tracking-tight uppercase md:text-5xl lg:text-6xl">
            Convert tables
            <br />
            without exposing
            <br />
            your documents.
          </h1>

          <p className="mt-6 max-w-[85%] text-2xl leading-relaxed">
            From sizing charts to production specs—encrypted and audit-ready.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={getStartedHref}>
              <Button>Get started</Button>
            </Link>
            <Link
              href="/login"
              className="border-ink bg-paper text-ink hover:bg-ink hover:text-paper inline-flex border-2 px-8 py-4 text-base font-bold uppercase transition-colors"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/*     <div className="relative flex min-h-[400px] flex-col lg:min-h-0">
        <div className="font-dela absolute top-4 left-4 z-10 text-sm font-bold uppercase">
          Secure
        </div>
        <div className="font-dela absolute top-4 right-4 z-10 text-sm font-bold uppercase opacity-60">
          ///
        </div>
        <div className="border-ink bg-paper relative min-h-[400px] w-full border-l-[3px] [background-image:radial-gradient(var(--ink)_15%,transparent_15%)] [background-size:24px_24px] [background-position:0_0]" />
        <div className="font-dela absolute bottom-4 left-4 z-10 text-xs font-bold uppercase">
          Max 50MB
        </div>
        <div className="font-dela absolute right-4 bottom-4 z-10 text-xs font-bold uppercase">
          Encrypted
        </div>
      </div> */}
    </section>
  );
}
