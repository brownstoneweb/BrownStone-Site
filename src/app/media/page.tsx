"use client"

import Nav from "@/components/Nav";
import { FaIcon, IconName } from "@/components/Icons";
import Footer from "@/components/Footer";
import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const images = [
  "/Townhouse/t1.jpg",
  "/Townhouse/t2.png",
  "/Townhouse/t3.png",
  "/Townhouse/t4.png",
  "/Townhouse/t5.jpg",
  "/Townhouse/t6.jpg",
  "/Townhouse/t7.jpg",
  "/Townhouse/t8.jpg",
  "/Townhouse/t9.jpg",
  "/Townhouse/t10.jpg",
  "/Townhouse/tt11.png",
  "/Townhouse/t12.png",
  "/Townhouse/t13.png",
  "/Townhouse/t14.png",
  "/Townhouse/t15.png",
  "/Townhouse/t2i.png",
  "/Townhouse/jac.jpeg",
  "/Townhouse/ab (7).webp",
]

const images1 = [
  "/Chalets/c2i.jpg",
  "/Chalets/c2ii.jpg",
  "/Chalets/c3.jpg",
  "/Chalets/chal.png",
  "/Chalets/c7.png",
  "/Chalets/c7i.png",
  "/Chalets/c8.png",
  "/Chalets/c9.png",
  "/Chalets/c10.png",
  "/Chalets/c11.png",
]

const images2 = [
  "/Lakehouse/l1.jpg",
  "/Lakehouse/eve.jpg",
  "/Lakehouse/l3.jpg",
  "/Lakehouse/l4.jpg",
  "/Lakehouse/l5.png",
  "/Lakehouse/l6.png",
  "/Lakehouse/l7.png",
  "/Lakehouse/l8.png",
  "/Lakehouse/l9.png",
  "/Lakehouse/l10.png",
  "/Lakehouse/l11.png",
  "/Lakehouse/l13.png",
  "/Lakehouse/l14.png",
  "/Lakehouse/l15.png",
  "/Lakehouse/l16.png",
  "/Lakehouse/l17.png",
  "/Lakehouse/l18.png",
]

type LandmarkCardProps = {
  name: string
  description: string
  distance: string
  icon: IconName
}

const nearestLandmarks: LandmarkCardProps[] = [
  {
    name: "Akosombo Dam",
    description: "Iconic hydroelectric dam and engineering marvel",
    distance: "5.2 km",
    icon: "dam",
  },
  {
    name: "Adomi Bridge",
    description: "Stunning suspension bridge over the Volta River",
    distance: "3.8 km",
    icon: "bridge",
  },
  {
    name: "The Royal Senchi Hotel and Resort",
    description: "Premier luxurious resort with a spa",
    distance: "12.5 km",
    icon: "umbrellaBeach",
  },
  {
    name: "Shai Hills Nature Reserve",
    description: "Hiking, wildlife viewing, and cave exploration",
    distance: "18.3 km",
    icon: "leaf",
  },
  {
    name: "The Craft Village",
    description: "Buy local crafts and souvenirs",
    distance: "7.1 km",
    icon: "city",
  },
  {
    name: "BridgeView Resort",
    description: "Mountain and lake views, kayaking, infinity pool",
    distance: "9.4 km",
    icon: "droplet",
  },
  {
    name: "Alos Bay",
    description: "Popular for food, stunning views, and swimming",
    distance: "4.6 km",
    icon: "utensils",
  },
  {
    name: "Lake Club",
    description: "Leisure and water-based activities",
    distance: "2.9 km",
    icon: "sailboat",
  },
]

type AmenityCardProps = {
  name: string
  description: string
  icon: IconName
}

const celestiaAmenities: AmenityCardProps[] = [
  {
    name: "Fitness Center",
    description: "State-of-the-art gym with modern equipment",
    icon: "bolt",
  },
  {
    name: "Wellness Spa",
    description: "Relaxing massages and wellness treatments",
    icon: "umbrellaBeach",
  },
  {
    name: "Jet Ski Rentals",
    description: "Exciting water sports on the lake",
    icon: "sailboat",
  },
  {
    name: "Conference Rooms",
    description: "Professional meeting spaces for events",
    icon: "building",
  },
  {
    name: "Bar & Lounge",
    description: "Elegant cocktails and social gatherings",
    icon: "martiniGlass",
  },
  {
    name: "EV Charging Station",
    description: "Sustainable charging for electric vehicles",
    icon: "gears",
  },
  {
    name: "Swimming Pool",
    description: "Infinity pool with lake views",
    icon: "droplet",
  },
  {
    name: "Fine Dining",
    description: "Gourmet cuisine and waterfront dining",
    icon: "utensils",
  },
]

export default function MediaGallery() {

  const [videoOpen, setVideoOpen] = useState(false)
  const [activeVideo, setActiveVideo] = useState("")
  const [imageOpen, setImageOpen] = useState(false)
  const [activeImage, setActiveImage] = useState<string | null>(null)

  const townhouseRef = useRef<HTMLDivElement>(null)
  const chaletRef = useRef<HTMLDivElement>(null)
  const lakeRef = useRef<HTMLDivElement>(null)

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (!ref.current) return
    ref.current.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth"
    })
  }

  type SliderProps = {
    title: string
    description: React.ReactNode
    videoImage: string
    videoLink: string
    images: string[]
    sliderRef: React.RefObject<HTMLDivElement | null>
  }

  const Slider = ({ title, description, videoImage, videoLink, images, sliderRef }: SliderProps) => (
    <div className="w-full max-w-7xl mx-auto p-6">

      <section className="py-16 text-center">
        <h2 className="text-earthy font-serif text-3xl md:text-4xl font-bold mb-6">
          {title}
        </h2>
        <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />

        <div className="text-grey text-lg max-w-2xl mx-auto font-light leading-relaxed space-y-4">
          {description}
        </div>
      </section>

      {/* VIDEO */}
      <div
        className="relative rounded-xl overflow-hidden cursor-pointer"
        onClick={() => {
          setActiveVideo(videoLink)
          setVideoOpen(true)
        }}
      >
        <img
          src={videoImage}
          className="w-full h-[500px] object-cover object-bottom"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/80 rounded-full p-6 text-xl">
            ▶
          </div>
        </div>
      </div>

      {/* SLIDER */}
      <div className="relative mt-6">

        <button
          onClick={() => scroll(sliderRef, "left")}
          className="absolute left-0 z-10 top-1/2 -translate-y-1/2 bg-black/70 text-white px-3 py-2 rounded"
        >
          ◀
        </button>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {images.map((img: string, index: number) => (
            <img
              key={index}
              src={img}
              onClick={() => {
                setActiveImage(img)
                setImageOpen(true)
              }}
              className="w-[260px] h-[180px] object-cover rounded-lg cursor-pointer hover:scale-105 transition mb-20"
            />
          ))}
        </div>

        <button
          onClick={() => scroll(sliderRef, "right")}
          className="absolute right-0 z-10 top-1/2 -translate-y-1/2 bg-black/70 text-white px-3 py-2 rounded"
        >
          ▶
        </button>

      </div>
    </div>
  )

  const LandmarkCard = ({ name, description, distance, icon }: LandmarkCardProps) => (
    <div className="bg-white/80 border border-white/40 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 shadow-sm">
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
        <FaIcon name={icon} className="w-8 h-8 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="text-earthy font-semibold text-lg">{name}</h3>
        <p className="text-grey text-sm mt-1 leading-relaxed">{description}</p>
      </div>
      <div className="text-primary font-semibold text-sm flex items-center">{distance}</div>
    </div>
  )

  const AmenityCard = ({ name, description, icon }: AmenityCardProps) => (
    <div className="bg-white/80 border border-white/40 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 shadow-sm">
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10">
        <FaIcon name={icon} className="w-8 h-8 text-primary" />
      </div>
      <div className="flex-1">
        <h3 className="text-earthy font-semibold text-lg">{name}</h3>
        <p className="text-grey text-sm mt-1 leading-relaxed">{description}</p>
      </div>
    </div>
  )

  return (
    <div className="bg-background-light text-earthy min-h-screen">

      <Nav activePath="/media" />

      <main className="pt-20">

        {/* HERO */}
        <section className="relative min-h-[70vh] flex items-center justify-center text-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('media.jpg')`
            }}
          />
          <div className="relative z-10">
            <span className="text-primary uppercase tracking-[0.2em] text-xs mb-4 block">
              Browse through our media 
            </span>
            <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-black font-serif mb-6">
              Gallery
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mt-6" />
          </div>
        </section>

        {/* TOWNHOUSE */}
        <Slider
          title="Townhouses - Celestia"
          description={<p className="font-semibold text-earthy">Modern Comfort for the Discerning Buyer</p>}
          videoImage="/Night-house.jpg"
          videoLink="https://www.youtube.com/embed/2_0Qikzkel4"
          images={images}
          sliderRef={townhouseRef}
        />

        {/* CHALET */}
        <Slider
          title="Chalet - Celestia"
          description={<p className="font-semibold text-earthy">For individuals who desire exclusivity and sanctuary.</p>}
          videoImage="/Chalet-ev.jpg"
          videoLink="https://www.youtube.com/embed/bGl8kNslIX8"
          images={images1}
          sliderRef={chaletRef}
        />

        {/* LAKEHOUSE */}
        <Slider
          title="Lakehouse - Celestia"
          description={<p className="font-semibold text-earthy">Perfect for global-minded achievers.</p>}
          videoImage="/lakehouse.jpg"
          videoLink="https://www.youtube.com/embed/-Bv12I-WlzE"
          images={images2}
          sliderRef={lakeRef}
        />

        {/* NEAREST LANDMARKS */}
        <section className="py-20 bg-background-light">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-earthy font-serif text-3xl md:text-4xl font-bold mb-4">
              Nearest landmarks
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Explore key places that are just minutes away from Celestia. These landmarks give you a taste of what life feels like in the area.
            </p>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {nearestLandmarks.map((landmark) => (
                <LandmarkCard key={landmark.name} {...landmark} />
              ))}
            </div>
          </div>
        </section>

        {/* AMENITIES IN CELESTIA */}
        <section className="py-20 bg-background-light">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-earthy font-serif text-3xl md:text-4xl font-bold mb-4">
              Amenities in Celestia
            </h2>
            <p className="text-grey text-lg max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Enjoy world-class facilities and services designed for your comfort and convenience at Celestia.
            </p>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {celestiaAmenities.map((amenity) => (
                <AmenityCard key={amenity.name} {...amenity} />
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* VIDEO MODAL */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
          >
            <div
              className="w-[900px] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                width="100%"
                height="100%"
                src={activeVideo}
                allow="autoplay"
                allowFullScreen
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* IMAGE MODAL */}
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
              className="max-h-[90vh] max-w-[90vw] rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}