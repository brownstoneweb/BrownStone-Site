import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaIcon } from "@/components/Icons";
import IsraelGallery from "@/components/IsraelGallery";

export const metadata = {
  title: "Israel de Maison — Luxury Residences in East Legon",
  description:
    "Israel de Maison | Contemporary luxury residences in East Legon.",
  alternates: {
    canonical: "/properties/israel-de-maison",
  },
};

export default function IsraelDeMaison() {
  return (
    <div className="bg-background-light text-earthy min-h-screen">
      <Nav activePath="/portfolio" />

  return (
    <div className="bg-background-light text-earthy min-h-screen">
      <Nav activePath="/portfolio" />

      <main className="pt-14 sm:pt-16 md:pt-20">
        {/* Hero */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh]">
          <div className="absolute inset-0 z-0">
            <img
              src="/israeldm.jpg"
              alt="Israel de Maison — East Legon residences"
              className="w-full h-full object-cover object-top absolute inset-0"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-white">
            <div className="flex items-center gap-1">
              <Image
                src="/logo1.png"
                alt="Israel de Maison"
                width={200}
                height={300}
                className="object-contain"
              />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif leading-tight mt-9">
              Your Next Address
              <br />
              Should Reflect
              <br />
              Your Success
            </h1>

            <p className="text-white/90 max-w-2xl text-base sm:text-lg mt-5">
              Experience contemporary luxury in the heart of East Legon with
              spacious residences crafted for comfort, prestige, and everyday
              elegance.
            </p>

            <div className="flex flex-wrap gap-3 items-center mt-16">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg font-semibold uppercase tracking-widest text-sm hover:bg-primary/90 transition"
              >
                Enquire Now
              </Link>

              <a
                href="/brochure.pdf"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-5 py-3 rounded-lg text-sm hover:bg-white/5 transition"
              >
                Download Brochure
              </a>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
          <div className="grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-earthy text-2xl sm:text-3xl font-bold font-serif mb-3">
                Key Features
              </h2>

              <p className="text-grey mb-6">
                Israel de Maison offers modern living with considered finishes,
                functional layouts, and premium amenities designed for a refined
                lifestyle.
              </p>

              <ul className="grid gap-3 sm:grid-cols-2">
                <li className="flex gap-3 items-start">
                  <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <FaIcon name="house" />
                  </div>
                  <div>
                    <div className="font-semibold text-earthy">
                      3-Bedroom Residences
                    </div>
                    <div className="text-sm text-grey">
                      Spacious floorplans with generous living and dining areas.
                    </div>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <FaIcon name="gem" />
                  </div>
                  <div>
                    <div className="font-semibold text-earthy">
                      Exclusive Penthouse
                    </div>
                    <div className="text-sm text-grey">
                      Private terraces with panoramic views and high-end
                      finishes.
                    </div>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <FaIcon name="droplet" />
                  </div>
                  <div>
                    <div className="font-semibold text-earthy">
                      Private Pool
                    </div>
                    <div className="text-sm text-grey">
                      Exclusive pool for residents — perfect for relaxation and
                      entertaining.
                    </div>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <FaIcon name="key" />
                  </div>
                  <div>
                    <div className="font-semibold text-earthy">
                      Elevator Feature
                    </div>
                    <div className="text-sm text-grey">
                      Convenient floor access with modern elevator systems.
                    </div>
                  </div>
                </li>
              </ul>

              <p className="text-grey mt-6">
                Additional amenities include secure parking, 24/7 security,
                landscaped communal areas, and dedicated concierge services.
                Prices and availability are subject to change — contact us for
                current listings and site visits.
              </p>
            </div>

            <div>
              <div className="rounded-xl overflow-hidden border border-earthy/10 bg-white p-6 shadow-sm">
                <div className="aspect-[16/10] bg-earthy/5 rounded-lg overflow-hidden mb-4">
                  <img
                    src="/idm/idm1.jpg"
                    alt="Israel de Maison preview"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-earthy font-bold text-xl">
                      Israel de Maison
                    </div>
                    <div className="text-sm text-grey">
                      East Legon, Accra
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-primary font-bold">For Sale</div>
                    <div className="text-sm text-grey">
                      Units available
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Contact Sales
                  </a>

                  <a
                    href="/book-visit"
                    className="inline-flex items-center gap-2 border border-earthy/10 px-4 py-2 rounded-lg text-sm"
                  >
                    Book a Visit
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

       <IsraelGallery />
       
        {/* Footer CTA */}
        <section className="py-16 bg-background-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="rounded-2xl bg-earthy/5 border border-earthy/10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-earthy font-bold text-xl">
                  Interested in Israel de Maison?
                </h4>

                <p className="text-grey">
                  Contact our sales team to schedule a viewing or request more
                  information.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-lg font-semibold"
                >
                  Contact Sales
                </Link>

                <Link
                  href="/brochure.pdf"
                  className="inline-flex items-center gap-2 border border-earthy/10 px-4 py-3 rounded-lg"
                >
                  Download Brochure
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </div>
  );
}