export default function PropertiesSection() {
  return (
    <section id="residences" className="bg-luxury-dark py-24 lg:py-32">
      {/* Header */}
      <div className="text-center px-6 mb-16 reveal-on-scroll">
        <span className="eyebrow-text block mb-3">The Collection</span>
        <h2 className="font-serif-luxury text-[#d6d6d6] leading-tight mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300 }}>
          Three Distinct Residences.<br />One Standard of Perfection.
        </h2>
        <p className="text-luxury-mist text-sm leading-relaxed max-w-lg mx-auto">
          Every unit is a self-contained world — designed with precision, built with intention, delivered with the BrownStone guarantee.
        </p>
      </div>

      {/* Townhouses — Featured */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] min-h-[560px] gap-px mb-px reveal-on-scroll">
        <div className="relative overflow-hidden min-h-[400px]">
          <img
            src="https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/TOWNHOMEUNIT-portrait.webp"
            alt="Celestia Townhouses Exterior"
            className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(120deg, rgba(8,8,8,0.45), transparent)' }} />
        </div>
        <div className="bg-luxury-stone px-10 py-16 lg:px-16 flex flex-col justify-center">
          <span className="font-serif-luxury text-gold/10 leading-none block mb-[-0.6rem]" style={{ fontSize: '5.5rem', fontWeight: 300 }}>01</span>
          <span className="eyebrow-text block mb-3">Terraced Townhomes</span>
          <h3 className="font-serif-luxury text-[#d6d6d6] mb-3 leading-tight" style={{ fontSize: '2.4rem', fontWeight: 300 }}>
            Celestia<br />Townhouses
          </h3>
          <p className="text-luxury-mist text-sm leading-relaxed mb-6">
            Sophisticated 2-bedroom residences perched on tiered terraces with unobstructed mountain panoramas. Every room is designed around the view — and the view never disappoints.
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {['Floor-to-ceiling glass', 'Smart-home', 'Private terrace'].map((t) => (
              <span key={t} className="text-[0.58rem] tracking-wide uppercase px-3 py-1.5 border border-gold/30 text-gold" style={{ background: 'rgba(201,168,76,0.08)' }}>{t}</span>
            ))}
          </div>
          <a href="https://www.brownstoneltd.com/celestia/townhouses" target="_blank" rel="nofollow" className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase text-gold hover:gap-4 transition-all duration-300 cursor-pointer">
            Explore Full Details <span>→</span>
          </a>
        </div>
      </div>

      {/* Chalets + Lakehouse */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px">
        {/* Chalets */}
        <div className="relative overflow-hidden min-h-[460px] group cursor-pointer">
          <img src="https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/CHALET-UNIT-PERSPECTIVE_DAY.webp" alt="Celestia Chalets" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.2) 60%, transparent 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            <span className="font-serif-luxury text-white leading-none block mb-[-0.3rem]" style={{ fontSize: '3rem', fontWeight: 300 }}>02</span>
            <span className="eyebrow-text block mb-2 text-white">Private Chalets</span>
            <h3 className="font-serif-luxury text-[#c3c3c3] mb-2 leading-tight" style={{ fontSize: '2rem', fontWeight: 300 }}>Celestia<br />Chalets</h3>
            <p className="text-white text-xs leading-relaxed mb-4">Built into the mountain face. Bespoke seclusion, river access, natural stone finishes, sunken fire pits.</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Natural stone', 'Smart EV charging station', 'Luxury interior views'].map((t) => (
                <span key={t} className="text-[0.58rem] tracking-wide uppercase px-3 py-1 border border-gold/30 text-white" style={{ background: 'rgba(201,168,76,0.08)' }}>{t}</span>
              ))}
            </div>
            <a href="https://www.brownstoneltd.com/celestia/chalets" target="_blank" rel="nofollow" className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase text-white hover:gap-4 transition-all duration-300">Explore Chalets <span>→</span></a>
          </div>
        </div>
        {/* Lakehouse */}
        <div className="relative overflow-hidden min-h-[460px] group cursor-pointer">
          <img src="https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/lakehouse-wide.webp" alt="Celestia Lakehouse" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.2) 60%, transparent 100%)' }} />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            <span className="font-serif-luxury text-white leading-none block mb-[-0.3rem]" style={{ fontSize: '3rem', fontWeight: 300 }}>03</span>
            <span className="eyebrow-text block mb-2 text-white">The Social Core</span>
            <h3 className="font-serif-luxury text-[#c3c3c3] mb-2 leading-tight" style={{ fontSize: '2rem', fontWeight: 300 }}>The<br />Lakehouse</h3>
            <p className="text-white text-xs leading-relaxed mb-4">Elite gym, thermal spa, executive deep-work hub — the communal heartbeat of Celestia, overlooking the Volta.</p>
            <div className="flex flex-wrap gap-2 mb-4 text-white">
              {['Thermal spa', 'Elite gym', 'Work hub'].map((t) => (
                <span key={t} className="text-[0.58rem] tracking-wide uppercase px-3 py-1 border border-gold/30 text-white" style={{ background: 'rgba(201,168,76,0.08)' }}>{t}</span>
              ))}
            </div>
            <a href="https://www.brownstoneltd.com/celestia/lakehouse" target="_blank" rel="nofollow" className="inline-flex items-center gap-2 text-[0.65rem] tracking-[0.18em] uppercase text-white hover:gap-4 transition-all duration-300">Explore Lakehouse <span>→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}
