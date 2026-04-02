import { useState, FormEvent } from 'react';

export default function FormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new URLSearchParams(new FormData(form) as unknown as Record<string, string>);

    try {
      await fetch('https://readdy.ai/api/form/d75t08jq7u9ee9hce4v0', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: data.toString(),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  };

  return (
    <section id="brochure" className="py-24 lg:py-32 px-6" style={{ background: '#1C1916' }}>
      <div className="max-w-[560px] mx-auto text-center">
        <div className="reveal-on-scroll">
          <span className="eyebrow-text block mb-3 text-[#C3C3C3]">Get the Full Prospectus</span>
          <h2 className="font-serif-luxury text-white leading-tight mb-3" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.7rem)', fontWeight: 300 }}>
            Receive the Investment Brochure
          </h2>
          <p className="text-[#C3C3C3] text-sm leading-relaxed">
            Floor plans, unit availability, pricing, and investment projections — delivered directly to you.
          </p>
        </div>

        <div className="mt-10 reveal-on-scroll reveal-delay-2">
          {submitted ? (
            <div className="border border-green-500/40 bg-green-900/20 px-8 py-10 text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <i className="ri-checkbox-circle-line text-4xl text-green-400" />
              </div>
              <h3 className="font-serif-luxury text-white text-xl mb-2">Brochure Request Received</h3>
              <p className="text-luxury-mist text-sm">We&apos;ll be in touch within 2 hours!</p>
            </div>
          ) : (
            <form
              data-readdy-form
              onSubmit={handleSubmit}
              action="https://readdy.ai/api/form/d75t08jq7u9ee9hce4v0"
              method="POST"
            >
              <div className="flex flex-col sm:flex-row gap-2.5 mb-2.5">
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  required
                  className="flex-1 bg-white/5 border border-gold/20 text-white px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 placeholder:text-luxury-mist/40"
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone / WhatsApp"
                  required
                  className="flex-1 bg-white/5 border border-gold/20 text-white px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 placeholder:text-luxury-mist/40"
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-white/5 border border-gold/20 text-white px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 placeholder:text-luxury-mist/40 mb-2.5"
              />
              <select
                name="interest"
                className="w-full bg-luxury-stone border border-gold/20 text-luxury-mist px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 cursor-pointer mb-2.5 appearance-none"
                defaultValue=""
              >
                <option value="" disabled>I&apos;m most interested in…</option>
                <option>Celestia Townhouses — 3-Bedroom</option>
                <option>Celestia Private Chalets</option>
                <option>Lakehouse Membership Access</option>
                <option>All Options — Tell Me Everything</option>
              </select>
              <input
                name="company"
                type="text"
                placeholder="Company / Organisation (optional)"
                className="w-full bg-white/5 border border-gold/20 text-white px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 placeholder:text-luxury-mist/40 mb-2.5"
              />
              <textarea
                name="message"
                placeholder="Any specific questions? (optional)"
                maxLength={500}
                rows={3}
                onChange={(e) => setCharCount(e.target.value.length)}
                className="w-full bg-white/5 border border-gold/20 text-white px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 placeholder:text-luxury-mist/40 mb-1 resize-none"
              />
              <p className="text-[0.62rem] text-[#C3C3C3] text-right mb-3">{charCount}/500</p>
              <button
                type="submit"
                className="w-full bg-gold text-[#C3C3C3] py-4 text-[0.75rem] tracking-[0.22em] uppercase font-bold hover:bg-gold-light transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                Send Me the Brochure — No Cost
              </button>
              <p className="text-[0.65rem] text-[#C3C3C3] mt-3">
                <i className="ri-lock-line mr-1" />
                Your information is private. No spam — only Celestia updates.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
