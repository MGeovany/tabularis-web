import Link from "next/link";

export const metadata = {
  title: "Privacy Policy - Tabularis",
  description: "Privacy Policy for Tabularis.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mb-6 text-sm opacity-90">Last updated: January 2025</p>

          <div className="flex flex-col gap-8 text-sm leading-relaxed">
            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">1. Overview</h2>
              <p className="opacity-90">
                Tabularis (“we”) respects your privacy. This policy describes what data we collect,
                how we use it, and your rights. The service is designed to minimize data retention:
                we do not store your documents.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">2. Data We Collect</h2>
              <p className="opacity-90">
                We use Microsoft (Entra ID / Azure AD) for sign-in. When you sign in, we receive an
                identifier and, depending on consent, your email. We do not receive or store your
                Microsoft password. For conversions, we process your PDF only to extract tables and
                generate output; files are not retained after processing.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">3. How We Use Data</h2>
              <p className="opacity-90">
                We use your sign-in data to authenticate you and to enforce usage limits (e.g.
                conversion quotas). Conversion metadata (e.g. job id, status, size) may be kept for
                audit and support. We do not sell your data or use it for advertising.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">
                4. Sharing and Disclosure
              </h2>
              <p className="opacity-90">
                We do not share your personal data with third parties except as required by law or
                to operate the service (e.g. hosting, Microsoft for authentication). The server
                application is open source and auditable.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">
                5. Security and Retention
              </h2>
              <p className="opacity-90">
                We use industry-standard practices to protect data. Documents are processed in a
                secure environment and are not stored. We retain only the minimum data needed for
                the service and audit (e.g. account and conversion metadata).
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">6. Your Rights</h2>
              <p className="opacity-90">
                You may request access, correction, or deletion of your data. You can stop using the
                service at any time. For requests or questions, use the contact channel provided
                (e.g. GitHub repository). or contact us at{" "}
                <a className="underline hover:opacity-80" href="mailto:marlon.castro@thefndrs.com">
                  support@thefndrs.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">7. Changes</h2>
              <p className="opacity-90">
                We may update this policy. We will post the revised version here and update the
                “Last updated” date. Continued use of the service after changes constitutes
                acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="font-dela mb-2 text-base font-bold uppercase">8. Contact</h2>
              <p className="opacity-90">
                For privacy-related questions, open an issue or discussion in the{" "}
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
