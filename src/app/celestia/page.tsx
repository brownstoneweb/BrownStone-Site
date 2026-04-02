"use client";

import { useEffect } from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import UrgencyBar from '@/components/UrgencyBar';
import StatsSection from '@/components/StatsSection';
import PropertiesSection from '@/components/PropertiesSection';
import GallerySection from '@/components/GallerySection';
import FeaturesSection from '@/components/FeaturesSection';
import LocationSection from '@/components/LocationSection';
import TestimonialSection from '@/components/TestimonialSection';
import CtaSection from '@/components/CtaSection';
import FormSection from '@/components/FormSection';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal-on-scroll');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: '0px 0px -50px 0px' }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-luxury-dark text-luxury-cream font-sans overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <UrgencyBar />
      <StatsSection />
      <PropertiesSection />
      <GallerySection />
      <FeaturesSection />
      <LocationSection />
      <TestimonialSection />
      <CtaSection />
      <FormSection />
      <FooterSection />

      {/* Mobile sticky CTA */}
      <a
        href="tel:+233244028485"
        className="fixed bottom-0 left-0 right-0 z-[300] md:hidden flex items-center justify-center gap-2 bg-gold text-luxury-dark py-4 text-[0.82rem] font-bold tracking-[0.1em] uppercase whitespace-nowrap"
        style={{ boxShadow: '0 -4px 32px rgba(201,168,76,0.5)' }}
      >
        <i className="ri-phone-line" />
        Reserve Now — 024 402 8485
      </a>
    </div>
  );
}
