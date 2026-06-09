import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaIcon } from "@/components/Icons";
import WilmaGallery from "@/components/WilmaGallery";

export const metadata = {
	title: "Wilma Crescent — Luxury Townhouses in East Legon",
	description:
		"Wilma Crescent | Premium 4-bedroom townhouses with private pools, gated community, and 24-hour security in East Legon.",
	alternates: { canonical: "/properties/wilma-crescent" },
};

export default function WilmaCrescent() {
	return (
		<div className="bg-background-light text-earthy min-h-screen">
			<Nav activePath="/portfolio" />

			<main className="pt-14 sm:pt-16 md:pt-20">
				<section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh]">
					<div className="absolute inset-0 z-0">
						<img
							src="/wilma.jpeg"
							alt="Wilma Crescent luxury townhouses in East Legon"
							className="w-full h-full object-cover object-center absolute inset-0"
						/>
						<div className="absolute inset-0 bg-black/55" />
					</div>

					<div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-white flex flex-col justify-end min-h-full">
						<div className="flex items-center gap-4 mt-8">
							<Image
								src="/logo3.png"
								alt="Wilma Crescent"
								width={140}
								height={48}
								className="object-contain"
							/>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif leading-tight mt-7">
							Carefully curated 
                            <br />collection of
                            <br />luxury townhouses
						</h1>
						<p className="text-white/90 max-w-3xl text-base sm:text-lg mt-8">
							Designed for discerning homeowners who appreciate privacy, 
                            <br/>comfort, security, and timeless elegance.
						</p>

						<div className="flex flex-wrap gap-3 items-center mt-8">
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg font-semibold uppercase tracking-widest text-sm hover:bg-primary/90 transition"
							>
								Enquire Now
							</Link>
							<a
								href="/Wilma-crescent_brochure.pdf"
								download
								className="inline-flex items-center gap-2 border border-white/20 text-white px-5 py-3 rounded-lg text-sm hover:bg-white/5 transition"
							>
								Download Brochure
							</a>
						</div>
					</div>
				</section>               
				<section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
					<div className="grid gap-8 lg:grid-cols-2 items-start">
						<div>
							<h2 className="text-earthy text-2xl sm:text-3xl font-bold font-serif mb-3">
								Property Highlights
							</h2>
							<p className="text-grey mb-6">
								Wilma Crescent is a premier gated community of luxurious townhouses in East Legon, created for residents who expect the best in finish, comfort, and security.
							</p>

							<ul className="grid gap-3 sm:grid-cols-2">
								{[
									{
										title: "4-Bedroom Townhouses",
										desc: "Generous family layouts with service quarters and elegant living spaces.",
										icon: "house",
									},
									{
										title: "Private Mini Swimming Pool",
										desc: "Relax in your own exclusive pool with a beautifully landscaped setting.",
										icon: "droplet",
									},
									{
										title: "Exclusive Gated Community",
										desc: "A quiet residential enclave with premium security and privacy.",
										icon: "shieldHalved",
									},
									{
										title: "24-Hour Security",
										desc: "Continuous protection for residents and guest access control.",
										icon: "city",
									},
									{
										title: "Private Gated Entrance",
										desc: "Separate private driveway access for added privacy and convenience.",
										icon: "key",
									},
									{
										title: "Premium Finishes Throughout",
										desc: "Luxury materials and craftsmanship deliver a refined everyday experience.",
										icon: "gem",
									},
								].map((feature) => (
									<li key={feature.title} className="flex gap-3 items-start">
										<div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
											<FaIcon name={feature.icon as any} />
										</div>
										<div>
											<div className="font-semibold text-earthy">{feature.title}</div>
											<div className="text-sm text-grey">{feature.desc}</div>
										</div>
									</li>
								))}
							</ul>

							<div className="mt-8 rounded-3xl border border-primary/20 bg-primary/5 p-6">
								<div className="text-primary uppercase tracking-[0.2em] text-xs font-bold mb-3">Limited Availability</div>
								<p className="text-earthy text-sm leading-relaxed">
									With ONE residence already secured, availability is now extremely limited. Reserve your Wilma Crescent home before the final units are taken.
								</p>
							</div>
						</div>

						<div>
							<div className="rounded-xl overflow-hidden border border-earthy/10 bg-white p-6 shadow-sm">
								<div className="aspect-[16/10] bg-earthy/5 rounded-lg overflow-hidden mb-4">
									<img
										src="/wilma0.jpeg"
										alt="Wilma Crescent townhouse preview"
										className="w-full h-full object-cover object-center"
									/>
								</div>
								<div className="flex items-center justify-between">
									<div>
										<div className="text-earthy font-bold text-xl">Wilma Crescent</div>
										<div className="text-sm text-grey">East Legon, Accra</div>
									</div>
									<div className="text-right">
										<div className="text-primary font-bold">For Sale</div>
										<div className="text-sm text-grey">Limited units</div>
									</div>
								</div>

								<div className="mt-6 flex gap-3 flex-wrap">
									<Link
										href="/contact"
										className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
									>
										Contact Sales
									</Link>
									<a
										href="/Wilma-crescent_brochure.pdf"
										download
										className="inline-flex items-center gap-2 border border-earthy/10 px-4 py-2 rounded-lg text-sm"
									>
										Download Brochure
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
                <WilmaGallery />
				<section className="py-16 bg-background-light">
					<div className="max-w-6xl mx-auto px-4 sm:px-6">
						<div className="rounded-2xl bg-earthy/5 border border-earthy/10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
							<div>
								<h4 className="text-earthy font-bold text-xl">Interested in Wilma Crescent?</h4>
								<p className="text-grey">Contact our sales team today to secure one of the last available residences.</p>
							</div>

							<div className="flex gap-3 flex-wrap">
								<Link
									href="/contact"
									className="inline-flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-lg font-semibold"
								>
									Contact Sales
								</Link>
								<a
									href="/Wilma-crescent_brochure.pdf"
									download
									className="inline-flex items-center gap-2 border border-earthy/10 px-4 py-3 rounded-lg"
								>
									Download Brochure
								</a>
							</div>
						</div>
					</div>
				</section>
			</main>

			<Footer />
		</div>
	);
}
