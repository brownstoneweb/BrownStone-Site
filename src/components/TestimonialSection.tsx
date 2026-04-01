export default function TestimonialSection() {
  return (
    <section className="py-28 px-10 text-center relative overflow-hidden" style={{ background: '#121210' }}>
      <div
        className="absolute top-[-60px] left-1/2 -translate-x-1/2 font-serif-luxury pointer-events-none select-none leading-none"
        style={{ fontSize: '22rem', color: 'rgba(201,168,76,0.04)', fontWeight: 300 }}
      >
        &ldquo;
      </div>
      <div className="relative z-10 reveal-on-scroll max-w-3xl mx-auto">
        <p className="font-serif-luxury text-white italic leading-relaxed mb-6" style={{ fontSize: 'clamp(1.4rem, 3.5vw, 2.3rem)', fontWeight: 300 }}>
          &ldquo;This isn&apos;t just a property. It&apos;s a decision to live differently — and to build something that will outlast me.&rdquo;
        </p>
        <span className="text-[0.62rem] tracking-[0.28em] uppercase text-gold">— Phase 1 Reservation Holder, Accra</span>
      </div>
    </section>
  );
}
