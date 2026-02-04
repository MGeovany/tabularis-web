import Link from "next/link";

const GITHUB_REPO = "https://github.com/mgeovany/tabularis-server";

export function LandingFooter() {
  return (
    <footer className="border-ink mt-auto flex flex-wrap items-end justify-between gap-6 border-t-[3px] p-8">
      <div className="flex flex-col gap-2 text-xs font-bold uppercase">
        <span className="flex flex-wrap gap-x-3 gap-y-1 opacity-80">
          <Link href="/privacy" className="hover:underline">
            Privacy
          </Link>
          /
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
          /
          <Link href="/refund" className="hover:underline">
            Refunds
          </Link>
        </span>
        <span className="mt-2 max-w-md font-normal normal-case opacity-90">
          Open source and auditable. Server code on{" "}
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80"
          >
            GitHub
          </a>
          .
        </span>
      </div>
    </footer>
  );
}
