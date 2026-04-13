import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import BrochureForm from "@/components/BrochureForm";
import { assetUrl } from "@/lib/assets";

const defaultOgImage = assetUrl("c2i.jpg");

export const metadata: Metadata = {
  title: "Exclusive Luxury Chalets | Celestia Akosombo",
  description:
    "Bespoke luxury chalets at Celestia Akosombo: Private sanctuaries with premium craftsmanship, panoramic lake views, and unparalleled exclusivity. Limited availability.",
  keywords: [
    "luxury chalets Akosombo",
    "Celestia chalets",
    "exclusive homes Ghana",
    "bespoke chalets Volta",
    "private luxury residences",
    "premium real estate Akosombo",
    "exclusive property Ghana",
    "luxury chalet investment",
    "Celestia by Brown Stone",
    "high-end chalets Ghana",
  ],
  openGraph: {
    title: "Exclusive Luxury Chalets | Celestia Akosombo",
    description:
      "Bespoke luxury chalets at Celestia: Private sanctuaries with premium craftsmanship, panoramic lake views, and unparalleled exclusivity. Limited availability.",
    images: [{ url: defaultOgImage, alt: "Celestia luxury chalets at Akosombo with panoramic lake views" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exclusive Luxury Chalets | Celestia Akosombo",
    description:
      "Bespoke luxury chalets at Celestia: Private sanctuaries with premium craftsmanship and unparalleled exclusivity.",
  },
  alternates: { canonical: "/celestia/chalets" },
};

const HERO_IMAGE = assetUrl("CHALETS_.webp");
const CHALET_INTERIOR = "/Chalets/c2i.jpg";
const CHALET_EXTERIOR = assetUrl("c2i.jpg");

const GALLERY_IMAGES = [
  { src: "/Chalets/c7.png", alt: "Celestia chalet interior detail" },
  { src: "/Chalets/c7i.png", alt: "Celestia chalet bathroom" },
  { src: "/Chalets/c8.png", alt: "Celestia chalet terrace" },
  { src: "/Chalets/c9.png", alt: "Celestia chalet exterior" },
  { src: "/Chalets/c10.png", alt: "Celestia chalet living space" },
  { src: "/Chalets/c11.png", alt: "Celestia chalet detail" },
];

export default function ChaletsPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#fdfcfb]">
      <Nav activePath="/celestia/chalets" />

      {/* Hero — Exclusive Sanctuary */}
      <section className="relative min-h-[100svh] min-h-[600px] sm:min-h-[700px] h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 transition-transform duration-[1.2s] ease-out"
            style={{ backgroundImage: `url(${HERO_IMAGE})` }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(to bottom, rgba(65, 22, 0, 0.25) 0%, rgba(65, 22, 0, 0.8) 100%)",
            }}
          />
        </div>
        <div className="relative z-20 px-4 sm:px-6 max-w-4xl mx-auto pt-20">
          <span className="text-white/80 text-[10px] sm:text-xs font-bold tracking-[0.35em] uppercase mb-4 sm:mb-6 block">
            Celestia · Akosombo
          </span>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-tight mb-4 sm:mb-6">
            Exclusive Luxury Chalets
          </h1>
          <p className="text-white/90 text-lg sm:text-xl md:text-2xl font-light leading-relaxed mb-6 sm:mb-8">
            Where Privacy Meets Prestige
          </p>
          <p className="text-white/85 text-base sm:text-lg max-w-2xl mx-auto font-light leading-[1] mb-6">
            Each chalet is a masterpiece of bespoke design, crafted for those who demand absolute privacy and uncompromising luxury. Set apart from the ordinary, these exclusive residences offer panoramic lake views and sanctuary-like seclusion.
          </p>
          <Link
            href="#exclusive-viewing"
            className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg"
          >
            Request Exclusive Viewing
          </Link>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-white/40 z-20">
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase">Discover</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      {/* Bespoke Design & Craftsmanship */}
      <section className="w-full flex flex-col lg:flex-row min-h-0">
        <div className="lg:w-1/2 flex flex-col justify-center px-6 sm:px-8 lg:px-16 xl:px-24 py-16 lg:py-24">
          <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-4">
            Bespoke Design
          </span>
          <h2 className="text-earthy text-3xl sm:text-4xl md:text-5xl font-serif font-semibold leading-tight mb-6">
            Crafted for the Discerning Few
          </h2>
          <p className="text-earthy/80 text-lg font-light leading-snug max-w-xl mb-6">
            Every chalet is a unique architectural statement, designed with meticulous attention to detail and built using only the finest materials. These are not mass-produced homes — they are bespoke sanctuaries for those who appreciate true exclusivity.
          </p>
          <ul className="space-y-6 text-earthy/85 font-light">
            <li className="flex gap-4">
              <span className="text-primary font-serif shrink-0">—</span>
              <span>
                <strong className="text-earthy">Architectural Distinction:</strong> Each chalet features unique design elements, from custom rooflines to bespoke interior layouts that maximize natural light and lake views.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-primary font-serif shrink-0">—</span>
              <span>
                <strong className="text-earthy">Premium Materials:</strong> Imported stone, exotic hardwoods, and handcrafted details create spaces of unparalleled quality and character.
              </span>
            </li>
            <li className="flex gap-4">
              <span className="text-primary font-serif shrink-0">—</span>
              <span>
                <strong className="text-earthy">Private Terraces:</strong> Expansive outdoor spaces designed for intimate gatherings, complete with custom landscaping and unobstructed lake vistas.
              </span>
            </li>
          </ul>
        </div>
        <div className="lg:w-1/2 min-h-[50vh] lg:min-h-[70vh] relative overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${CHALET_INTERIOR})` }}
          />
          <div className="absolute inset-0 bg-earthy/5" />
        </div>
      </section>

      {/* Privacy & Seclusion */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">
                Absolute Privacy
              </span>
              <h2 className="text-earthy text-3xl sm:text-4xl md:text-5xl font-serif font-semibold leading-tight mb-6">
                Sanctuary in Paradise
              </h2>
              <p className="text-earthy/80 text-lg font-light leading-snug mb-6">
                Positioned for maximum seclusion while maintaining effortless access to all resort amenities, our chalets offer the perfect balance of privacy and convenience. Each residence is thoughtfully situated to ensure your personal sanctuary remains undisturbed.
              </p>
              <ul className="space-y-6 text-earthy/85 font-light">
                <li className="flex gap-4">
                  <span className="text-primary font-serif shrink-0">—</span>
                  <span>
                    <strong className="text-earthy">Strategic Positioning:</strong> Chalets are nestled among mature landscaping, providing natural screening and acoustic privacy from neighboring properties.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-serif shrink-0">—</span>
                  <span>
                    <strong className="text-earthy">Gated Access:</strong> Private gated entry ensures only authorized guests can access your exclusive domain.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-serif shrink-0">—</span>
                  <span>
                    <strong className="text-earthy">Personal Staff Access:</strong> Dedicated pathways for discreet service access, maintaining your privacy while ensuring impeccable service.
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-primary font-serif shrink-0">—</span>
                  <span>
                    <strong className="text-earthy">Sound Design:</strong> Triple-glazed windows and acoustic insulation create a peaceful retreat from the outside world.
                  </span>
                </li>
              </ul>
            </div>
            <div className="order-1 lg:order-2 relative aspect-[4/5] lg:aspect-auto lg:min-h-[500px] rounded-lg overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(/chal3.png)` }}
              />
              <div className="absolute inset-0 bg-earthy/10" />
            </div>
          </div>
        </div>
      </section>

      {/* Gallery — Exclusive Interiors */}
      <section className="w-full bg-earthy/5 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="text-center mb-16">
            <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">
              Exclusive Interiors
            </span>
            <h2 className="text-earthy text-3xl sm:text-4xl md:text-5xl font-serif font-semibold leading-tight mb-6">
              Bespoke Living Spaces
            </h2>
            <p className="text-earthy/80 text-lg font-light leading-snug max-w-2xl mx-auto">
              Each chalet interior is a canvas for personal expression, featuring custom millwork, premium finishes, and thoughtful design that reflects the discerning taste of our clientele.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_IMAGES.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[4/5] rounded-lg overflow-hidden group cursor-pointer"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${image.src})` }}
                />
                <div className="absolute inset-0 bg-earthy/20 group-hover:bg-earthy/10 transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment & Appreciation */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-16 lg:py-24">
          <div className="max-w-3xl">
            <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">
              The Investment
            </span>
            <h2 className="text-earthy text-3xl sm:text-4xl md:text-5xl font-serif font-semibold leading-tight mb-6">
              Limited Edition Luxury
            </h2>
          <p className="text-earthy/80 text-lg font-light leading-snug mb-10">
            With only a select number of chalets available, these exclusive properties represent a rare opportunity for sophisticated investors seeking both luxury and long-term appreciation in Ghana's premier lakeside destination.
          </p>
            <ul className="space-y-6 text-earthy/85 font-light">
              <li className="flex gap-4">
                <span className="text-primary font-serif shrink-0">—</span>
                <span>
                  <strong className="text-earthy">Limited Availability:</strong> Only a handful of these bespoke chalets will be built, ensuring lasting exclusivity and value.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-serif shrink-0">—</span>
                <span>
                  <strong className="text-earthy">Prime Location:</strong> Positioned on Ghana's most prestigious waterfront, with proximity to Akosombo and international accessibility.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="text-primary font-serif shrink-0">—</span>
                <span>
                  <strong className="text-earthy">Resort Amenities:</strong> Full access to Celestia's world-class facilities while maintaining complete privacy in your personal sanctuary.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Ownership Process */}
      <section className="w-full bg-earthy/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16 py-16 lg:py-24">
          <span className="text-primary text-[10px] font-bold tracking-[0.4em] uppercase mb-4 block">
            Exclusive Ownership
          </span>
          <h2 className="text-earthy text-3xl sm:text-4xl md:text-5xl font-serif font-semibold leading-tight mb-6">
            A Discreet Path to Ownership
          </h2>
          <p className="text-earthy/80 text-lg font-light leading-snug max-w-2xl mb-8">
            Our exclusive chalets are available to discerning clients worldwide. We facilitate a seamless ownership process with complete discretion and personalized service.
          </p>
          <ol className="space-y-8 max-w-2xl">
            <li className="flex gap-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-serif font-semibold shrink-0">
                1
              </span>
              <div>
                <strong className="text-earthy block mb-1">Private Consultation</strong>
                <span className="text-earthy/80 font-light">
                  Confidential discussion of your requirements and preferences for your bespoke chalet.
                </span>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-serif font-semibold shrink-0">
                2
              </span>
              <div>
                <strong className="text-earthy block mb-1">Custom Design Phase</strong>
                <span className="text-earthy/80 font-light">
                  Work with our architects to personalize your chalet's design and specifications.
                </span>
              </div>
            </li>
            <li className="flex gap-6">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-serif font-semibold shrink-0">
                3
              </span>
              <div>
                <strong className="text-earthy block mb-1">Secure Reservation</strong>
                <span className="text-earthy/80 font-light">
                  Reserve your exclusive chalet with a confidential agreement and personalized terms.
                </span>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* CTA — Request Exclusive Viewing */}
      <section
        id="exclusive-viewing"
        className="relative w-full flex flex-col justify-center items-center overflow-hidden bg-earthy text-white py-20 lg:py-28 px-6"
      >
        <div className="absolute inset-0 z-0 opacity-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${assetUrl("CHALETS_.webp")})` }}
          />
        </div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold leading-tight mb-4">
            Request Exclusive Viewing
          </h2>
          <p className="text-white/85 text-lg font-light leading-snug mb-4">
            Experience the unparalleled luxury of Celestia Chalets. Contact us for a private, confidential viewing and discover why these exclusive residences are reserved for the most discerning clientele.
          </p>
          <div className="w-full max-w-md mx-auto mb-10">
            <BrochureForm
              project="chalets"
              successMessage="Thank you for your interest. A member of our exclusive services team will contact you shortly to arrange your private viewing."
              className="[&_input]:bg-white/10 [&_input]:border-white/30 [&_input]:text-white [&_input]:placeholder:text-white/60 [&_label]:text-white/90 [&_a]:text-primary [&_button]:border [&_button]:border-white/40 [&_button]:bg-transparent [&_button]:text-white [&_button:hover]:bg-white [&_button:hover]:text-earthy"
            />
          </div>
          <Link
            href="/contact?interest=chalets"
            className="inline-flex items-center justify-center bg-primary text-white px-10 py-4 rounded-lg font-bold text-sm uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg"
          >
            Speak with Our Team
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}