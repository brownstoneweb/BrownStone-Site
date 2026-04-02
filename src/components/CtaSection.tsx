export default function CtaSection() {
  return (
    <section id="enquire" className="relative min-h-[85vh] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/MAIN-ENTRANCE-townhouse1-day.webp"
          alt="Celestia Townhouse — Main Entrance Day"
          className="w-full h-full object-cover object-top"
        />
      </div>
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.35), rgba(8,8,8,0.78))' }} />

      <div className="relative z-[2] w-full max-w-[720px] px-6 py-20">
        <div className="reveal-on-scroll">
          <span className="eyebrow-text block mb-4 text-white">Reserve Your Residence</span>
          <h2 className="font-serif-luxury text-white leading-tight mb-4" style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 300 }}>
            Your Piece of<br /><em className="italic text-white">Peace</em> Awaits.
          </h2>
          <p className="text-white text-sm leading-relaxed mb-12 max-w-lg mx-auto">
            Phase 1 is limited. Speak directly with our property team today — a real conversation, not a form. We&apos;ll walk you through everything.
          </p>
        </div>

        <div className="reveal-on-scroll reveal-delay-2 flex flex-col lg:flex-row items-center justify-center gap-4 mb-6">
          <div className="backdrop-blur-sm border border-gold/40 px-10 py-7 text-center hover:border-gold transition-all duration-300" style={{ background: 'rgba(8,8,8,0.7)' }}>
            <span className="text-[0.58rem] tracking-[0.25em] uppercase text-white block mb-2">Call or WhatsApp Direct</span>
            <a href="tel:+233244028485" className="font-serif-luxury text-white block hover:text-white/80 transition-colors duration-300" style={{ fontSize: '2.2rem', fontWeight: 300 }}>
              024 402 8485
            </a>
            <span className="text-[0.6rem] text-white mt-1 block">Mon–Sat, 8am–6pm · Direct Property Line</span>
          </div>
          <div className="flex flex-col gap-3 text-white">
            <a
              href="https://wa.me/233244028485?text=Hello%2C%20I%20am%20interested%20in%20Celestia%20by%20BrownStone.%20Please%20send%20me%20details."
              target="_blank"
              rel="nofollow"
              className="bg-gold text-luxury-dark px-10 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-bold hover:bg-gold-light transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap"
            >
              <i className="ri-whatsapp-line text-base" />
              WhatsApp Us Now
            </a>
            <a
              href="#brochure"
              className="border border-white/35 text-white px-10 py-4 text-[0.7rem] tracking-[0.18em] uppercase font-light hover:border-gold hover:text-gold transition-all duration-300 whitespace-nowrap text-center"
            >
              View Full Brochure Online
            </a>
          </div>
        </div>

        <p className="text-sm text-white relative z-[2]">
          Email:{' '}
          <a href="mailto:ghanaisthefuture@brownstoneltd.com" className="text-white hover:text-white/80 transition-colors duration-300">
            ghanaisthefuture@brownstoneltd.com
          </a>
        </p>
      </div>
    </section>
  );
}
