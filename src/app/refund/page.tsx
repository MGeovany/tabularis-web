"use client";

import Link from "next/link";

export default function RefundPolicyPage() {
  return (
    <div className="bg-paper text-ink min-h-screen font-mono">
      <div className="border-ink mx-auto my-8 flex min-h-screen max-w-[720px] flex-col border-[3px]">
        <header className="border-ink flex h-14 items-center border-b-[3px] px-6">
          <Link
            href="/"
            className="border-ink hover:bg-ink hover:text-paper -ml-2 rounded px-2 py-1 text-sm font-bold uppercase transition-colors"
          >
            ← Back
          </Link>
        </header>

        <main className="flex-1 p-6 pb-12">
          <h1 className="font-dela mb-8 text-2xl font-black tracking-tight uppercase md:text-3xl">
            Refund Policy
          </h1>
          <p className="mb-6 text-sm opacity-90">Last updated: February 2026</p>

          <div className="flex flex-col gap-8 text-sm leading-relaxed">
            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">1. Overview</h2>
              <p className="opacity-90">
                This Refund Policy explains when refunds may be available for Tabularis paid plans.
                Because Tabularis is a digital service, refunds are generally limited once the
                service has been accessed or consumed.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">2. Eligibility</h2>
              <p className="opacity-90">
                Refunds may be considered on a case-by-case basis, including (a) accidental
                duplicate purchases, (b) billing errors, or (c) technical issues that prevent you
                from using the service despite reasonable support efforts. We do not guarantee
                refunds for changes of mind.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">3. How to Request</h2>
              <p className="opacity-90">
                To request a refund, email{" "}
                <a className="underline hover:opacity-80" href="mailto:marlon.castro@thefndrs.com">
                  support@thefndrs.com
                </a>{" "}
                with your account email, the approximate purchase date, and a brief description of
                the issue. We may ask for additional details to investigate.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">4. Chargebacks</h2>
              <p className="opacity-90">
                If you believe a charge is unauthorized, contact us as soon as possible. Initiating
                a chargeback may result in suspension of access while the dispute is reviewed.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">5. Regional Rights</h2>
              <p className="opacity-90">
                If you are located in a jurisdiction that provides mandatory consumer rights (for
                example, EU/UK withdrawal rights), those rights may apply and are not limited by
                this policy.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">6. Changes</h2>
              <p className="opacity-90">
                We may update this policy from time to time. We will post the revised version here
                and update the &quot;Last updated&quot; date.
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
