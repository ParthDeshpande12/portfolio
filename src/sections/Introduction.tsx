import StickyScroll from "@/components/ImageStackingPages";
import CircularText from "@/components/CircularText";
import { Quicksand } from 'next/font/google';
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollReveal from "@/components/ScrollReveal"; // Import ScrollReveal component
gsap.registerPlugin(ScrollTrigger);

const quicksand = Quicksand({ subsets: ['latin'], weight: ['700', '500'] });


const sections = [
	{
		id: "design-faster",
		title: "B", // Dummy for type
		description: "Born in the serene landscapes of Kishtwar, Jammu & Kashmir, Suman Rana is a rare fusion of intellect, artistry, and unwavering determination. Her journey began in the realm of medicine, where she earned a Ph.D. in Health Management (Obstetrics & Gynaecology) and certifications in Advanced Cardiovascular Life Support (ACLS) and Basic Life Support (BLS). As a board member of LIPS Research University Paris, Europe and a visiting consultant at MAX Hospital, Delhi, and other leading hospitals in Mumbai, she remains deeply committed to research, innovation, and the pursuit of excellence.",
		image: "/images/resized_1.jpg",
		backgroundColor: "bg-gradient-to-br from-gray-900 to-black",
	},
	{
		id: "create-better",
		title: "W", // Dummy for type
		description: "With intellect and purpose, she walks a path where artistry, innovation, and service converge. Committed to excellence, she seeks not just success but significance. A proud patriot, she dreams of the Bharat Ratna—not as recognition, but as a tribute to a life dedicated to uplifting her nation. Beyond medicine, she embraces creativity and storytelling, holding a Para Activities, Advanced Cabin Crew Diploma. Her passions span dance, makeup, fashion, writing, fitness, spirituality, and MMA. She’s also worked behind the lens, assisting directors and deepening her love for cinema.",
		image: "/images/resized_2.jpg",
		backgroundColor: "bg-gradient-to-br from-black to-gray-800",
	},
	{
		id: "work-smarter",
		title: "H", // Dummy for type
		description: "Her versatility and captivating presence have made her a sought-after actor, model, and brand ambassador. She has collaborated with renowned national and global brands, gracing films, music videos, digital campaigns, and print media with an effortless blend of professionalism and authenticity. Whether embodying a character on screen or representing a brand, she brings depth, elegance, and an undeniable impact to every project she undertakes.",
		image: "/images/resized_3.jpg",
		backgroundColor: "bg-gradient-to-b from-gray-800 via-black to-black",
	},
];

export default function Introduction() {
	useEffect(() => {
		return () => {
			ScrollTrigger.getAll().forEach(t => t.kill());
		};
	}, []);

	return (
		<div className="bg-gradient-to-b from-black to-[#181c23]" style={{background: "linear-gradient(to bottom, #000, #181c23 80%)"}}>
			<div className="w-full flex flex-col md:flex-row items-start justify-center px-0 py-20">
				{/* Left: Main Introduction Text */}
				<div className="w-full md:w-7/12 flex flex-col justify-center items-start text-left pr-0 md:pr-8 pl-0 md:pl-32 min-h-[80vh]" style={{paddingTop: '6rem', paddingBottom: '6rem'}}>
					<div className="space-y-16">
						<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
							नमस्ते,
						</h1>
						<ScrollReveal textClassName="text-[0.7rem] md:text-xs text-gray-400 font-bold rounded-xl font-montserrat-alt leading-snug" wordAnimationEnd="top 50%" rotationEnd="top 50%">
							To the storytellers, visionaries, and creators, if you seek a performer who breathes life into every frame with depth, grace, and unwavering dedication, let’s bring your vision to life, together..
						</ScrollReveal>
					</div>
					<div className="w-full flex justify-start my-8">
						<div
							id="sticky-stack-anchor"
							className="h-2 w-40 bg-gradient-to-r from-gray-700 via-gray-400 to-gray-700 rounded-full"
						/>
					</div>
				</div>

				{/* Right: CircularText above right section */}
				<div className="w-full md:w-5/12 flex flex-col items-end mt-12 md:mt-20">
					<div className="mb-32 w-full flex justify-end pr-20">
						<CircularText
							text="Hello * Namaste * Bonjour * Hola * Ciao * "
							onHover="speedUp"
							spinDuration={20}
							className="custom-class"
						/>
					</div>
					<div className="flex flex-col justify-start items-start mt-[12vh] pl-0 md:pl-24 pr-0 md:pr-40 w-full">
						<p className={`text-xl md:text-2xl text-gray-400 mb-8 ${quicksand.className}`}>For casting, brand partnerships, or collaborations, feel free to get in touch.</p>
						<button
							className="px-8 py-4 rounded-3xl backdrop-blur-md bg-white/10 border border-white/30 shadow-lg text-lg font-semibold text-white transition-all duration-300 hover:bg-white/20 focus:outline-none ml-0 animate-glassmorph mt-4"
							onClick={e => {
								const btn = e.currentTarget;
								btn.classList.add('translate-y-4');
								setTimeout(() => btn.classList.remove('translate-y-4'), 300);
								const contactSection = document.getElementById('contactus');
								if (contactSection) {
									contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
								}
							}}
							style={{alignSelf: 'flex-start'}}>
							Contact Me
						</button>
					</div>
				</div>
			</div>
			<StickyScroll sections={sections} />
		</div>
	);
}

// Add glassmorph animation
// In your global CSS, add:
// .animate-glassmorph { transition: transform 0.3s cubic-bezier(.4,2,.6,1); }
// .translate-y-4 { transform: translateY(1rem); }
