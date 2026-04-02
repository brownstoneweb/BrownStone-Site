const features = [
  { icon: 'ri-sun-line', title: 'Solar & EV Ready', desc: 'Solar PV with battery backup, EV charging, and smart energy monitoring — zero extra cost, built in from day one.' },
  { icon: 'ri-fingerprint-line', title: 'Biometric Security', desc: 'AI-enabled CCTV, biometric entry, smart access control, and video intercom — engineered safety at every threshold.' },
  { icon: 'ri-leaf-line', title: 'Eco Architecture', desc: 'Passive cooling design, rainwater harvesting, water purification, and LEED-aligned construction throughout.' },
  { icon: 'ri-bar-chart-2-line', title: 'Investor Dashboard', desc: 'Real-time asset monitoring, predictive maintenance, and digital rent management for hands-off ownership.' },
  { icon: 'ri-wifi-line', title: 'Fibre Connectivity', desc: 'High-speed fibre internet, centralized BMS, smart climate control, and remote management from anywhere.' },
  { icon: 'ri-drop-line', title: 'Smart Water Systems', desc: 'Smart metering, leak detection, automated irrigation, and purification — efficiency from every tap.' },
];

export default function FeaturesSection() {
  return (
    <section id="amenities" className="py-24 lg:py-32 px-6 lg:px-14" style={{ background: '#1C1916' }}>
      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-end mb-16">
          <div className="reveal-on-scroll">
            <span className="eyebrow-text block mb-3 text-white">What&apos;s Built In</span>
            <h2 className="font-serif-luxury text-white leading-tight" style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 300 }}>
              Technology That <em className="italic text-white">Thinks</em>.<br />Spaces That Breathe.
            </h2>
          </div>
          <div className="reveal-on-scroll reveal-delay-2">
            <p className="text-white text-sm leading-relaxed mb-6">
              Every Celestia residence comes with investor-grade smart infrastructure — reducing costs, elevating lifestyle, and growing asset value from day one.
            </p>
            <a href="https://www.brownstoneltd.com/media#townhouses" target="_blank" rel="nofollow" className="inline-block border border-white/30 text-white px-8 py-3 text-[0.65rem] tracking-[0.18em] uppercase hover:border-gold hover:text-gold transition-all duration-300 whitespace-nowrap">
              View Full Specifications
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2px]">
          {features.map((f, i) => (
            <div key={f.title} className={`bg-luxury-stone p-10 relative overflow-hidden group transition-colors duration-300 hover:bg-luxury-charcoal reveal-on-scroll ${i % 3 === 1 ? 'reveal-delay-1' : i % 3 === 2 ? 'reveal-delay-2' : ''}`}>
              <div className="absolute top-0 left-0 w-[2px] h-0 bg-gold group-hover:h-full transition-all duration-500" />
              <div className="w-10 h-10 flex items-center justify-center mb-5">
                <i className={`${f.icon} text-gold text-2xl`} />
              </div>
              <h3 className="font-serif-luxury text-white mb-3" style={{ fontSize: '1.15rem', fontWeight: 400 }}>{f.title}</h3>
              <p className="text-white text-[0.82rem] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
