"use client";
import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from 'react';

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 70);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[200] flex items-center justify-between px-8 lg:px-14 transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-luxury-dark/97 backdrop-blur-md border-b border-gold/10'
            : 'py-6 bg-gradient-to-b from-luxury-dark/80 to-transparent'
        }`}
      >
        <Link href="/" className="flex items-center gap-3 shrink-0 ml-4 md:ml-0">
          <Image
            src="/Brown1.png"
            alt="Brownstone Construction Limited"
            width={86}
            height={26}
            className="h-4 sm:h-5 w-auto object-contain"
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => handleNav('#residences')} className="text-white text-[0.9rem] tracking-[0.14em] uppercase hover:text-gold transition-colors duration-300 cursor-pointer whitespace-nowrap">
            Residences
          </button>
          <button onClick={() => handleNav('#amenities')} className="text-white text-[0.9rem] tracking-[0.14em] uppercase hover:text-gold transition-colors duration-300 cursor-pointer whitespace-nowrap">
            Amenities
          </button>
          <button onClick={() => handleNav('#location')} className="text-white text-[0.9rem] tracking-[0.14em] uppercase hover:text-gold transition-colors duration-300 cursor-pointer whitespace-nowrap">
            Location
          </button>
          <a
            href="tel:+233244028485"
            className="text-white text-[0.9rem] tracking-[0.12em] hover:text-gold transition-colors duration-300 whitespace-nowrap"
          >
            +233 24 402 8485
          </a>
          <a
            href="#enquire"
            onClick={(e) => { e.preventDefault(); handleNav('#enquire'); }}
            className="bg-gold text-white px-6 py-2.5 text-[0.9rem] tracking-[0.18em] uppercase font-bold hover:bg-gold-light transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            Reserve Now
          </a>
        </div>

        <button
          className="md:hidden text-luxury-mist cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <i className={`ri-${mobileOpen ? 'close' : 'menu'}-line text-xl`} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[199] bg-luxury-dark/97 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          {['#residences', '#amenities', '#location', '#enquire'].map((id) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className="font-serif-luxury text-2xl text-luxury-cream hover:text-gold transition-colors duration-300 capitalize cursor-pointer"
            >
              {id.replace('#', '')}
            </button>
          ))}
          <a
            href="tel:+233244028485"
            className="text-gold font-serif-luxury text-xl mt-4"
          >
            +233 24 402 8485
          </a>
        </div>
      )}
    </>
  );
}
