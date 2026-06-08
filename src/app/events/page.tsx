import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { FaIcon } from "@/components/Icons";

export const metadata = {
	alternates: { canonical: "/events" },
};

const eventInfo = {
	name: "Big 5 Construct South Africa",
	date: "9 - 11 June 2026",
	venue: "Gallagher Convention Center 19 Richard’s Drive, Half way House, Midrand, 1685, South Africa",
	address: "19 Richard’s Drive, Half way House, Midrand, 1685, South Africa",
	description:
		"Brownstone Construction Limited will be exhibiting Celestia and meeting investors, partners, and high-value clients during the premier construction industry showcase.",
};

const highlights = [
	{
		title: "Exhibiting Celestia",
		description:
			"Showcasing our flagship real estate project with premium finishes, sustainable design, and exclusive community amenities.",
		icon: "house",
	},
	{
		title: "Strategic Connections",
		description:
			"Connect with industry leaders, developers, and construction professionals from across South Africa.",
		icon: "handshake",
	},
	{
		title: "Event Presence",
		description:
			"We are attending the show to expand Celestia's reach and present high-value property opportunities to local and international buyers.",
		icon: "map",
	},
];

export default function EventsPage() {
	return (
		<div className="bg-background-light text-earthy min-h-screen">
			<Nav activePath="/events" />
			<main className="pt-14 sm:pt-16 md:pt-20">
				<section className="relative min-h-[70vh] overflow-hidden">
					<Image
						src="/bstone.jpg"
						alt="Big 5 Construct South Africa event background"
						fill
						className="object-cover object-center"
						priority
					/>
					<div className="absolute inset-0 bg-black/80" />
					<div className="relative z-10 mx-auto max-w-6xl px-4 py-24 sm:py-28 lg:py-32">
						<div className="max-w-3xl text-white">
								<Image
									src="/big5.png"
									alt="Big 5 Construct South Africa logo"
									width={400}
									height={400}
									className="h-700 w-300 object-cover mb-10"
								/>
							<p className="text-white/80 text-base sm:text-xl leading-relaxed mb-15">
								Join Brownstone at Gallagher Convention Center as we bring our premier real estate property, Celestia, to the heart of South Africa’s construction community.
							</p>
							<div className="grid gap-4 sm:grid-cols-[auto_1fr] sm:items-center mt-10">
								<div className="rounded-full bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-lg shadow-primary/25">
									{eventInfo.date}
								</div>
								<div className="rounded-full bg-black/10 border border-white/60 px-5 py-3 text-sm uppercase tracking-[0.2em] text-white">
									{eventInfo.venue}
								</div>
							</div>
						</div>
					</div>
				</section>

				

				<section className="max-w-[980px] mx-auto px-4 sm:px-6 py-16 md:py-24">
					<div className="rounded-[2rem] border border-earthy/10 bg-white p-10 shadow-sm text-center">
						<span className="text-primary uppercase tracking-[0.2em] text-xs font-bold mb-4 block">
							See you there
						</span>
						<h2 className="text-earthy text-3xl sm:text-4xl font-bold font-serif mb-4">
							Meet the Brownstone team in Midrand and discover Celestia.
						</h2>
						<p className="text-grey text-base sm:text-lg leading-relaxed mb-8">
							We’re attending the Big 5 Construct South African event to exhibit our real estate property and to connect with buyers, investors, and construction professionals.
						</p>
						
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
