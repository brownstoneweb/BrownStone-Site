export default function GallerySection() {
  const mosaicImages = [
    { src: 'https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/MAIN-ENTRANCE-townhouse1-day.webp', alt: 'Townhouse Main Entrance', label: 'Townhouse — Main Entrance', tall: true },
    { src: 'https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/lakehouse/LAKEHOUSE_LIVING-AREA.webp', alt: 'Lakehouse Living Area', label: 'Lakehouse — Living Area', tall: false },
    { src: 'https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/CHALETS_.webp', alt: 'Celestia Chalets', label: 'Private Chalets — Mountain Face', tall: false },
    { src: 'https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/lakehouse/LAKEHOUSE-GYM.webp', alt: 'Elite Wellness Gym', label: 'Lakehouse — Elite Fitness', tall: false },
    { src: 'https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/celestia-townhouse-LIVING-AREA1.webp', alt: 'Townhouse Living Area', label: 'Townhouse — Open-Plan Living', tall: false },
  ];

  const interiorImages = [
    { src: 'https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/celestia-townhouse-LIVING-AREA1.webp', alt: 'Townhouse open-plan living', label: 'Townhouse — Open-Plan Living', colSpan: true, rowSpan: false },
    { src: 'https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/lakehouse/LAKEHOUSE-BATHROOM.webp', alt: 'Lakehouse wellness spa', label: 'Lakehouse — Wellness Spa', colSpan: false, rowSpan: true },
    { src: 'https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/lakehouse/LAKEHOUSE-GYM.webp', alt: 'Fitness Centre', label: 'Elite Fitness Centre', colSpan: false, rowSpan: false },
    { src: 'https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/lakehouse/LAKEHOUSE_LIVING-AREA3.webp', alt: 'Lakehouse Volta views', label: 'Open Living & Volta Views', colSpan: false, rowSpan: false },
  ];

  return (
    <>
      {/* Mosaic */}
      <section className="bg-luxury-dark">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-[3px]">
          {mosaicImages.map((img, i) => (
            <div key={i} className={`overflow-hidden relative group cursor-pointer ${img.tall ? 'row-span-2' : ''}`} style={{ minHeight: img.tall ? 500 : 240 }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" style={{ minHeight: img.tall ? 500 : 240 }} />
              <div className="absolute inset-0 bg-luxury-dark/20 group-hover:bg-luxury-dark/10 transition-all duration-500" />
              <div className="absolute bottom-0 left-0 right-0 px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.85), transparent)' }}>
                <span className="text-[0.58rem] tracking-[0.2em] uppercase text-gold">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interior spread */}
      <section className="bg-luxury-dark">
        <div className="hidden lg:grid grid-cols-3 gap-[3px]" style={{ gridTemplateRows: '290px 290px' }}>
          {interiorImages.map((img, i) => (
            <div key={i} className={`overflow-hidden relative group ${img.colSpan ? 'col-span-2' : ''} ${img.rowSpan ? 'row-span-2' : ''}`}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-4 left-4 text-[0.55rem] tracking-[0.22em] uppercase px-3 py-1.5 text-gold backdrop-blur-sm" style={{ background: 'rgba(8,8,8,0.7)' }}>{img.label}</div>
            </div>
          ))}
        </div>
        {/* Mobile interior grid */}
        <div className="grid grid-cols-2 gap-[3px] lg:hidden">
          {interiorImages.map((img, i) => (
            <div key={i} className="overflow-hidden relative" style={{ height: 200 }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-top" />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.85), transparent)' }}>
                <span className="text-[0.5rem] tracking-wide uppercase text-white">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery strip */}
      <section className="bg-luxury-stone">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-[3px]" style={{ height: 280 }}>
          {[
            { src: 'https://pub-3e7b2072ee7b4288bdc8a3613d022372.r2.dev/main/BrownStone%20Celestia-Riverside-House.jpeg', alt: 'Celestia Riverside House' },
            { src: 'https://www.brownstoneltd.com/WhatsApp-1.jpeg', alt: 'BrownStone Development' },
            { src: 'https://www.brownstoneltd.com/WhatsApp-3.jpeg', alt: 'BrownStone Infrastructure' },
            { src: 'https://www.brownstoneltd.com/WhatsApp-4.jpeg', alt: 'BrownStone Interiors' },
            { src: 'https://www.brownstoneltd.com/WhatsApp-5.jpeg', alt: 'BrownStone EV Solar' },
          ].map((img, i) => (
            <div key={i} className="overflow-hidden group cursor-pointer" style={{ height: 280 }}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover object-top brightness-75 group-hover:brightness-100 group-hover:scale-105 transition-all duration-600" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
