
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaIcon } from "@/components/Icons";
import IzzyGallery from "@/components/IzzyGallery";

export const metadata = {
	title: "Izzy Villa — 5-Bedroom Luxury Home in East Legon",
	description:
		"Izzy Villa | 5-bedroom luxury home, private pool, premium finishes and in-house elevator in East Legon, Adjiringanor.",
	alternates: {
		canonical: "/properties/izzy-villa",
	},
};

export default function IzzyVilla() {
	return (
		<div className="bg-background-light text-earthy min-h-screen">
			<Nav activePath="/portfolio" />

			<main className="pt-14 sm:pt-16 md:pt-20">
				<section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[75vh]">
					<div className="absolute inset-0 z-0">
						<img
							src="/izzy.jpeg"
							alt="Izzy Villa luxury home in East Legon"
							className="w-full h-full object-cover object-top absolute inset-0"
						/>
						<div className="absolute inset-0 bg-black/55" />
					</div>

					<div className="relative z-10 max-w-6xl mx-auto px-4 pt-20 pb-14 text-white">
						<div className="flex items-center gap-4 mb-6">
							<Image
								src="/logo2.png"
								alt="Izzy Villa"
								width={200}
								height={80}
								className="object-contain"
							/>
						</div>

						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif leading-tight mb-4">
							Designed for  
                            <br/>comfort and prestige
						</h1>

						<div className="flex flex-wrap gap-3 items-center mt-9">
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 bg-primary text-white px-5 py-3 rounded-lg font-semibold uppercase tracking-widest text-sm hover:bg-primary/90 transition"
							>
								Enquire Now
							</Link>

							
						</div>
					</div>
				</section>

				<section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
					<div className="grid gap-8 lg:grid-cols-2 items-start">
						<div>
							<h2 className="text-earthy text-2xl sm:text-3xl font-bold font-serif mb-3">
								Contemporary Family Living
							</h2>

							<p className="text-grey mb-6">
								Izzy Villa is a standout East Legon residence that blends refined architecture with
								everyday functionality. The home offers generous living areas, a dedicated service
								wing, private outdoor space, and amenities designed for modern family comfort.
							</p>

							<ul className="grid gap-3 sm:grid-cols-2">
								<li className="flex gap-3 items-start">
									<div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
										<FaIcon name="house" />
									</div>
									<div>
										<div className="font-semibold text-earthy">5-Bedroom Villa</div>
										<div className="text-sm text-grey">
											Spacious bedrooms with elegant finishes and abundant natural light.
										</div>
									</div>
								</li>

								<li className="flex gap-3 items-start">
									<div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
										<FaIcon name="droplet" />
									</div>
									<div>
										<div className="font-semibold text-earthy">Private Pool</div>
										<div className="text-sm text-grey">
											A secluded pool area for relaxation, entertaining, and family leisure.
										</div>
									</div>
								</li>

								<li className="flex gap-3 items-start">
									<div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
										<FaIcon name="key" />
									</div>
									<div>
										<div className="font-semibold text-earthy">Boys Quarters</div>
										<div className="text-sm text-grey">
											A practical service wing for staff or guest accommodation.
										</div>
									</div>
								</li>

								<li className="flex gap-3 items-start">
									<div className="size-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
										<FaIcon name="building" />
									</div>
									<div>
										<div className="font-semibold text-earthy">In-House Elevator</div>
										<div className="text-sm text-grey">
											Smooth vertical access across floors, combining luxury with convenience.
										</div>
									</div>
								</li>
							</ul>

							<p className="text-grey mt-6">
								The villa is situated in the desirable Adjiringanor enclave, offering privacy,
								security, and easy access to East Legon’s best dining, shopping, and leisure.
								It is perfect for families who want a prestigious home with thoughtful, modern
								comforts at every turn.
							</p>
						</div>

						<div>
							<div className="rounded-xl overflow-hidden border border-earthy/10 bg-white p-6 shadow-sm">
								<div className="aspect-[16/10] bg-earthy/5 rounded-lg overflow-hidden mb-4">
									<img
										src="/izzy/pool.png"
										alt="Izzy Villa preview"
										className="w-full h-full object-cover object-center"
									/>
								</div>

								<div className="flex items-center justify-between">
									<div>
										<div className="text-earthy font-bold text-xl">Izzy Villa</div>
										<div className="text-sm text-grey">East Legon, Adjiringanor</div>
									</div>

									<div className="text-right">
										<div className="text-primary font-bold">For Sale</div>
										<div className="text-sm text-grey">Limited residences available</div>
									</div>
								</div>

								<div className="mt-6 flex gap-3 flex-wrap">
									<Link
										href="/contact"
										className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
									>
										Contact Sales
									</Link>
									
								</div>
							</div>
						</div>
					</div>
				</section>
                <IzzyGallery />
                <section className="py-16 bg-background-light">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6">
                        <div className="rounded-2xl bg-earthy/5 border border-earthy/10 p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <div>
                                 <h4 className="text-earthy font-bold text-xl">Interested in Izzy Villa?</h4>
                                 <p className="text-grey">Contact our sales team today to secure one of the last available residences.</p>
                            </div>
                
                                <div className="flex gap-3 flex-wrap">
                                     <Link
                                         href="/contact"
                                         className="inline-flex items-center gap-2 bg-primary text-white px-4 py-3 rounded-lg font-semibold"
                                         >
                                         Contact Sales
                                     </Link>
                                     
                                        </div>
                                </div>
                            </div>
                </section>
			</main>
			<Footer />
		</div>
	);
}
