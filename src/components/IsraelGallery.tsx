"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const galleryImages = [
  "/idm/idm2.jpg",
  "/idm/idm4.jpg",
  "/idm/idm6.jpeg",
  "/idm/idm7.jpeg",
  "/idm/living1.png",
  "/idm/living2.png",
  "/idm/living3.png",
  "/idm/idm3.png",
  "/idm/bed1.png",
  "/idm/bed3.png",
  "/idm/bath1.png",
  "/idm/bath2.png",
  "/idm/kitchen2.png",
  "/idm/kitchen1.png",
  "/idm/dining1.png",
  "/idm/dining2.png",
  "/idm/dining3.png",
  "/idm/idm5.jpg",
];

export default function IsraelGallery() {
  const [imageOpen, setImageOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const galleryRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!galleryRef.current) return;

    galleryRef.current.scrollBy({
      left: direction === "left" ? -350 : 350,
      behavior: "smooth",
    });
  };

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h3 className="text-earthy font-serif text-3xl md:text-4xl font-bold">
              Gallery
            </h3>

            <div className="w-16 h-0.5 bg-primary mx-auto mt-4" />

            <p className="text-grey mt-6 max-w-2xl mx-auto">
              Explore the elegance of Israel de Maison through our curated
              collection.
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white px-3 py-2 rounded"
            >
              ◀
            </button>

            <div
              ref={galleryRef}
              className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
            >
              {galleryImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  onClick={() => {
                    setActiveImage(img);
                    setImageOpen(true);
                  }}
                  className="w-[300px] h-[220px] object-cover rounded-xl cursor-pointer hover:scale-105 transition flex-shrink-0"
                />
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 text-white px-3 py-2 rounded"
            >
              ▶
            </button>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {imageOpen && activeImage && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setImageOpen(false)}
          >
            <img
              src={activeImage}
              alt="Preview"
              className="max-h-[90vh] max-w-[90vw] rounded-xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}