export default function HeroSection() {
  const handleScroll = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative h-screen min-h-[720px] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/lakehouse-wide.webp"
          alt="Celestia Lakehouse at Akosombo"
          className="w-full h-full object-cover object-top"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(160deg, rgba(8,8,8,0.72) 0%, rgba(8,8,8,0.28) 50%, rgba(8,8,8,0.88) 100%)' }} />

      {/* Content */}
      <div className="relative z-[2] w-full max-w-[900px] px-6">
        {/* Badge */}
        <div className="anim-fadeup-1 inline-flex items-center gap-3 mb-7 px-5 py-2.5 border border-gold/40" style={{ background: 'rgba(201,168,76,0.12)' }}>
          <span className="w-1.5 h-1.5 rounded-full bg-gold blink-dot" />
          <span className="text-[0.6rem] tracking-[0.32em] uppercase text-gold font-medium">Phase 1 Now Open — Akosombo, Volta Region</span>
        </div>

        {/* Headline */}
        <h1 className="anim-fadeup-2 font-serif-luxury text-white leading-[1.05] mb-5" style={{ fontSize: 'clamp(3.2rem, 7.5vw, 6.8rem)', fontWeight: 300 }}>
          Where Luxury<br />Finds Its{' '}
          <em className="block italic text-gold">True Landscape</em>
        </h1>

        {/* Subtext */}
        <p className="anim-fadeup-3 font-serif-luxury text-luxury-mist leading-[1.7] mb-10 mx-auto max-w-[560px]" style={{ fontSize: 'clamp(1rem, 2vw, 1.3rem)', fontWeight: 300 }}>
          104 kilometres from the noise. 90 minutes from Accra.<br />A lifetime away from anything ordinary.
        </p>

        {/* CTAs */}
        <div className="anim-fadeup-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="tel:+233244028485"
            className="bg-gold text-luxury-dark px-10 py-4 text-[0.72rem] tracking-[0.2em] uppercase font-bold hover:bg-gold-light transition-all duration-300 inline-flex items-center gap-2 whitespace-nowrap"
            style={{ boxShadow: '0 6px 32px rgba(201,168,76,0.3)' }}
          >
            <i className="ri-phone-line" />
            Call Now — Reserve Your Unit
          </a>
          <button
            onClick={() => handleScroll('#residences')}
            className="bg-transparent text-white px-10 py-4 text-[0.72rem] tracking-[0.2em] uppercase font-light border border-white/35 hover:border-gold hover:text-gold transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            Explore the Collection
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="anim-fadeup-5 absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2">
        <span className="text-[0.55rem] tracking-[0.3em] text-luxury-mist uppercase">Discover Celestia</span>
        <div className="w-px h-12 scroll-line" style={{ background: 'linear-gradient(to bottom, #C9A84C, transparent)' }} />
      </div>
    </section>
  );
}
