import Link from "next/link";

export const metadata = {
  title: "Terms of Service - Tabularis",
  description: "Terms of Service for Tabularis.",
};

export default function TermsPage() {
  return (
    <div className="bg-paper text-ink my-8 min-h-screen font-mono">
      <div className="border-ink mx-auto flex min-h-screen max-w-[720px] flex-col border-[3px]">
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
            Terms of Service
          </h1>
          <p className="mb-6 text-sm opacity-90">Last updated: January 2025</p>

          <div className="flex flex-col gap-8 text-sm leading-relaxed">
            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">1. Acceptance</h2>
              <p className="opacity-90">
                By using Tabularis (“Service”), you agree to these Terms of Service and our Privacy
                Policy. If you do not agree, do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">
                2. Description of Service
              </h2>
              <p className="opacity-90">
                Tabularis provides tools to extract tables from PDFs and export them to Excel or
                XLSX. The Service is provided “as is.” We do not store your documents; processing is
                done in a secure, auditable manner. The server code is open source and available for
                review.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">3. Acceptable Use</h2>
              <p className="opacity-90">
                You must use the Service only for lawful purposes. You may not use it to process
                content you do not have the right to use, to violate any law, or to harm others. We
                may suspend or terminate access for misuse.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">4. Account and Data</h2>
              <p className="opacity-90">
                You sign in with your Microsoft account. We use the minimum data necessary to
                provide the Service. How we handle data is described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">
                5. Limitation of Liability
              </h2>
              <p className="opacity-90">
                To the extent permitted by law, Tabularis and its operators are not liable for
                indirect, incidental, or consequential damages arising from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">6. Changes</h2>
              <p className="opacity-90">
                We may update these terms. Continued use of the Service after changes constitutes
                acceptance. We encourage you to review this page periodically.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">7. Contact</h2>
              <p className="opacity-90">
                For questions about these terms, open an issue or discussion in the{" "}
                <a
                  href="https://github.com/mgeovany/tabularis-server"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                >
                  Tabularis server repository
                </a>
                . or contact us at{" "}
                <a className="underline hover:opacity-80" href="mailto:marlon.castro@thefndrs.com">
                  support@thefndrs.com
                </a>
                .
              </p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
