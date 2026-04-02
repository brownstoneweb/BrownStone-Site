export default function LocationSection() {
  return (
    <section id="location" className="bg-luxury-dark">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Image */}
        <div className="relative overflow-hidden min-h-[500px] lg:min-h-[620px] reveal-on-scroll">
          <img
            src="https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/CHALETS_.webp"
            alt="Celestia — Akosombo landscape and nature"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute bottom-8 left-8">
            <div className="backdrop-blur-sm px-6 py-4 border-l-2 border-gold" style={{ background: 'rgba(8,8,8,0.88)' }}>
              <p className="text-[0.58rem] tracking-[0.2em] uppercase text-white mb-1">Celestia is located in</p>
              <h3 className="font-serif-luxury text-white text-xl font-light">Akosombo, Volta Region</h3>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-luxury-stone px-10 py-16 lg:px-20 lg:py-24 flex flex-col justify-center reveal-on-scroll reveal-delay-2">
          <span className="eyebrow-text block mb-3">Location Intelligence</span>
          <h2 className="font-serif-luxury text-[#c3c3c3] leading-tight mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 300 }}>
            Leave the Noise.<br /><em className="italic text-gold">Keep the Returns.</em>
          </h2>
          <p className="text-luxury-mist text-sm leading-relaxed mb-4">
            Akosombo sits at the convergence of Ghana&apos;s most dramatic landscape — the Volta River basin, dense forest canopies, and mountain ridgelines. Just 90 minutes from Accra&apos;s business district, Celestia delivers genuine seclusion without sacrificing proximity to the capital.
          </p>
          <p className="text-luxury-mist text-sm leading-relaxed">
            A strategic investment in one of Ghana&apos;s highest-appreciation corridors, with proximity to the Akosombo Dam, Volta Lake tourism, and growing diaspora demand for Volta region real estate.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-10 text-white">
            {[
              { num: '90min', label: 'From Accra CBD' },
              { num: 'Volta', label: 'River Access' },
              { num: 'Forest', label: 'Mountain Air' },
              { num: 'Phase 1', label: 'Now Open' },
            ].map((s) => (
              <div key={s.label} className="px-5 py-5" style={{ background: '#1C1916' }}>
                <span className="font-serif-luxury text-gold block leading-none mb-1.5" style={{ fontSize: '1.9rem', fontWeight: 300 }}>{s.num}</span>
                <span className="text-[0.58rem] tracking-[0.15em] uppercase text-luxury-mist">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
