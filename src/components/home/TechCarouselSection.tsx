"use client";

import { useState, useCallback, useEffect } from "react";
import { FaIcon } from "@/components/Icons";
import type { IconName } from "@/components/Icons";

const CAROUSEL_IMAGES = [
  { src: "/WhatsApp-1.jpeg", alt: "Brownstone smart and sustainable development" },
  { src: "/WhatsApp-2.jpeg", alt: "Brownstone tech-integrated construction" },
  { src: "/WhatsApp-3.jpeg", alt: "Brownstone sustainable infrastructure" },
  { src: "/WhatsApp-4.jpeg", alt: "Brownstone intelligent building systems" },
  { src: "/WhatsApp-5.jpeg", alt: "Brownstone EV and solar-ready development" },
  { src: "/WhatsApp-6.jpeg", alt: "Brownstone modern residential technology" },
];

const TECH_CATEGORIES: {
  icon: IconName;
  title: string;
  items: string[];
}[] = [
  {
    icon: "sun",
    title: "Smart & Sustainable Infrastructure",
    items: [
      "Solar PV systems with battery backup",
      "EV charging stations (EV-ready parking)",
      "Smart energy monitoring & load management",
      "LED lighting with motion/daylight sensors",
    ],
  },
  {
    icon: "gears",
    title: "Intelligent Building Systems",
    items: [
      "Centralized Building Management System (BMS)",
      "Smart climate control & automation",
      "Remote property management integration",
      "Fiber-optic & high-speed connectivity",
    ],
  },
  {
    icon: "shieldHalved",
    title: "Advanced Security & Access",
    items: [
      "Biometric & smart access control",
      "AI-enabled CCTV surveillance",
      "Smart locks & mobile entry systems",
      "Video intercom & digital concierge",
    ],
  },
  {
    icon: "droplet",
    title: "Water & Environmental Efficiency",
    items: [
      "Smart water metering & leak detection",
      "Rainwater harvesting systems",
      "Water filtration & purification",
      "Automated irrigation systems",
    ],
  },
  {
    icon: "chartLine",
    title: "Investor-Focused Technology",
    items: [
      "Predictive maintenance systems",
      "Digital tenant & rent management platforms",
      "Real-time asset performance monitoring",
      "Remote oversight dashboards",
    ],
  },
];

const N = CAROUSEL_IMAGES.length;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return isMobile;
}

export function TechCarouselSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const isMobile = useIsMobile();

  // Duplicate for infinite loop: [0,1,2,3,4,5,0,1,2,3,4,5]
  const slides = [...CAROUSEL_IMAGES, ...CAROUSEL_IMAGES];

  // Desktop: 4 visible → positions 0,1,2 then 3 (duplicate); reset after 3. Mobile: 2 visible → positions 0..5 then 6; reset after 6.
  const maxIndex = isMobile ? N - 1 : N - 4;
  const goNext = useCallback(() => {
    setCarouselIndex((prev) => {
      const nextVal = prev + 1;
      if (nextVal > maxIndex) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCarouselIndex(0);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setIsTransitioning(true));
          });
        }, 500);
        return maxIndex + 1;
      }
      return nextVal;
    });
  }, [maxIndex]);

  const goPrev = useCallback(() => {
    setCarouselIndex((prev) => {
      if (prev <= 0) {
        // Jump to duplicate segment so we show last 4 slides (e.g. 2,3,4,5) without animation
        setIsTransitioning(false);
        setTimeout(() => {
          setCarouselIndex(N - 1);
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setIsTransitioning(true));
          });
        }, 0);
        return prev;
      }
      return prev - 1;
    });
  }, []);

  const openLightbox = (index: number) => setLightboxIndex(index % N);
  const goLightboxPrev = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i - 1 + N) % N)),
    []
  );
  const goLightboxNext = useCallback(
    () => setLightboxIndex((i) => (i === null ? null : (i + 1) % N)),
    []
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") goLightboxPrev();
      if (e.key === "ArrowRight") goLightboxNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, goLightboxPrev, goLightboxNext]);

  // Mobile: 2 per view (50% each), desktop: 4 per view (25% each)
  const translateX = isMobile ? -carouselIndex * 50 : -carouselIndex * 25;

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-8 bg-primary" />
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs">
              Tech-Integrated Living
            </span>
            <div className="h-[1px] w-8 bg-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-earthy font-serif mb-4">
            Smart & Sustainable Infrastructure
          </h2>
          <p className="text-earthy/70 font-light">
            Solar, EV readiness, intelligent building systems, and investor-grade technology built into every development.
          </p>
          {/* Mobile: smaller arrows under the intro */}
          <div className="flex items-center justify-center gap-4 mt-6 md:hidden">
            <button
              type="button"
              onClick={goPrev}
              className="w-9 h-9 rounded-full bg-earthy text-white flex items-center justify-center shadow hover:bg-primary transition-colors"
              aria-label="Previous"
            >
              <FaIcon name="chevronLeft" className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="w-9 h-9 rounded-full bg-earthy text-white flex items-center justify-center shadow hover:bg-primary transition-colors"
              aria-label="Next"
            >
              <FaIcon name="chevronRight" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Carousel: 4 visible on lg, 2 on mobile */}
        <div className="relative mb-16 md:mb-20">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transitionProperty: isTransitioning ? "transform" : "none",
                transform: `translateX(${translateX}%)`,
              }}
            >
              {slides.map((img, i) => (
                <div
                  key={`${img.src}-${i}`}
                  className="flex-none w-1/2 md:w-1/4 px-2 sm:px-3"
                >
                  <button
                    type="button"
                    onClick={() => openLightbox(i % N)}
                    className="block w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-full object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Desktop: arrows on sides of carousel; hidden on mobile (arrows shown under intro) */}
          <button
            type="button"
            onClick={goNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-2 md:translate-x-4 w-10 h-10 rounded-full bg-earthy text-white items-center justify-center shadow-lg hover:bg-primary transition-colors z-10 hidden md:flex"
            aria-label="Next"
          >
            <FaIcon name="chevronRight" className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-2 md:-translate-x-4 w-10 h-10 rounded-full bg-earthy text-white items-center justify-center shadow-lg hover:bg-primary transition-colors z-10 hidden md:flex"
            aria-label="Previous"
          >
            <FaIcon name="chevronLeft" className="w-5 h-5" />
          </button>
        </div>

        {/* Tech categories with icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {TECH_CATEGORIES.map(({ icon, title, items }) => (
            <div
              key={title}
              className="bg-background-light rounded-xl p-6 sm:p-8 border border-earthy/5 hover:border-primary/20 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xl">
                  <FaIcon name={icon} />
                </div>
                <h3 className="font-bold text-lg text-earthy font-serif">
                  {title}
                </h3>
              </div>
              <ul className="space-y-2 text-sm text-earthy/70">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <FaIcon name="check" className="text-primary mt-0.5 shrink-0 w-4" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            aria-label="Close"
          >
            <FaIcon name="xmark" className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goLightboxPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            aria-label="Previous image"
          >
            <FaIcon name="chevronLeft" className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goLightboxNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            aria-label="Next image"
          >
            <FaIcon name="chevronRight" className="w-6 h-6" />
          </button>
          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={CAROUSEL_IMAGES[lightboxIndex].src}
              alt={CAROUSEL_IMAGES[lightboxIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </section>
  );
}
