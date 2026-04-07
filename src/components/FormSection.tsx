"use client";

import { useState } from "react";

export default function FormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    interest: "",
    company: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "message") {
      setCharCount(value.length);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/brochure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          project: "celestia",
          consent: true,

          // extra data (optional backend use)
          fullName: formData.fullName,
          phone: formData.phone,
          interest: formData.interest,
          company: formData.company,
          message: formData.message,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      setSubmitted(true);
      setLoading(false);
    } catch (err: any) {
      console.error("FORM ERROR:", err);
      setError(err?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <section id="brochure" className="py-24 lg:py-32 px-6" style={{ background: "#1C1916" }}>
      <div className="max-w-[560px] mx-auto text-center">
        
        <div className="reveal-on-scroll">
          <span className="eyebrow-text block mb-3 text-[#C3C3C3]">
            Get the Full Prospectus
          </span>
          <h2
            className="font-serif-luxury text-white leading-tight mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.7rem)", fontWeight: 300 }}
          >
            Receive the Investment Brochure
          </h2>
          <p className="text-[#C3C3C3] text-sm leading-relaxed">
            Brochure delivered directly to your mail
          </p>
        </div>

        <div className="mt-10 reveal-on-scroll reveal-delay-2">
          {submitted ? (
            <div className="border border-green-500/40 bg-green-900/20 px-8 py-10 text-center">
              <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <i className="ri-checkbox-circle-line text-4xl text-green-400" />
              </div>
              <h3 className="font-serif-luxury text-white text-xl mb-2">
                Brochure Request Received
              </h3>
              <p className="text-white text-sm">
                Check your mail or spam folder.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              
              <div className="flex flex-col sm:flex-row gap-2.5 mb-2.5">
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Full Name"
                  required
                  className="flex-1 bg-white/5 border border-gold/20 text-white px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 placeholder:text-luxury-mist/40"
                />
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="Phone / WhatsApp"
                  required
                  className="flex-1 bg-white/5 border border-gold/20 text-white px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 placeholder:text-luxury-mist/40"
                />
              </div>

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                placeholder="Email Address"
                required
                className="w-full bg-white/5 border border-gold/20 text-white px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 placeholder:text-luxury-mist/40 mb-2.5"
              />

              {/* ✅ SAME CSS PRESERVED */}
              <select
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full bg-luxury-stone border border-gold/20 text-luxury-mist px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 cursor-pointer mb-2.5 appearance-none"
              >
                <option value="" disabled>
                  I&apos;m most interested in…
                </option>
                <option>Celestia Townhouses — 2-Bedroom</option>
                <option>Celestia Private Chalets</option>
                <option>Lakehouse Membership Access</option>
                <option>All Options — Tell Me Everything</option>
              </select>

              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                type="text"
                placeholder="Company / Organisation (optional)"
                className="w-full bg-white/5 border border-gold/20 text-white px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 placeholder:text-luxury-mist/40 mb-2.5"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any specific questions? (optional)"
                maxLength={500}
                rows={3}
                className="w-full bg-white/5 border border-gold/20 text-white px-4 py-4 text-sm font-light outline-none focus:border-gold transition-colors duration-300 placeholder:text-luxury-mist/40 mb-1 resize-none"
              />

              <p className="text-[0.62rem] text-[#C3C3C3] text-right mb-3">
                {charCount}/500
              </p>

              {/* ✅ BUTTON CSS FULLY PRESERVED */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gold text-[#C3C3C3] py-4 text-[0.75rem] border border-white/30 tracking-[0.22em] uppercase font-bold hover:bg-gold-light transition-all duration-300 cursor-pointer whitespace-nowrap disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Me the Brochure"}
              </button>

              {error && (
                <p className="text-red-400 text-sm mt-3">{error}</p>
              )}

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