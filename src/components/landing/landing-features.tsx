export function LandingFeatures() {
  return (
    <section className="border-ink grid border-t-[3px] md:grid-cols-3">
      <div className="border-ink border-r-0 border-b-[3px] p-8 md:border-r-[3px] md:border-b-0">
        <div className="border-ink hover:bg-ink hover:text-paper mb-4 h-10 w-10 rounded-full border-2" />
        <h3 className="font-dela text-xl font-black uppercase">1. Ingest</h3>
        <p className="mt-2 text-sm leading-relaxed">
          Upload PDFs. We detect table boundaries and headers automatically—no manual setup.
        </p>
      </div>
      <div className="border-ink border-r-0 border-b-[3px] p-8 md:border-r-[3px] md:border-b-0">
        <div className="border-ink hover:bg-ink hover:text-paper mb-4 h-10 w-10 rounded-full border-2" />
        <h3 className="font-dela text-xl font-black uppercase">2. Structure</h3>
        <p className="mt-2 text-sm leading-relaxed">
          Data is normalized and mapped to clean Excel columns—audit-ready and traceable.
        </p>
      </div>
      <div className="border-ink border-b-[3px] p-8 md:border-b-0">
        <div className="border-ink hover:bg-ink hover:text-paper mb-4 h-10 w-10 rounded-full border-2" />
        <h3 className="font-dela text-xl font-black uppercase">3. Export</h3>
        <p className="mt-2 text-sm leading-relaxed">
          Download .xlsx. Your documents are never stored—encrypted and compliant.
        </p>
      </div>
    </section>
  );
}
