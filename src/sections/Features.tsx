"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Quicksand } from 'next/font/google';

const quicksand = Quicksand({ subsets: ['latin'], weight: ['700', '500'] });

const insights = [
	{
		id: 1,
		title: "Aam Aadmi",
		date: "Wednesday, February 26, 2025",
		author: "Written by Flavio Montanari",
		description:
			"The film 'Aam Aadmi,' featuring the late Punjabi legendary singer Raj Brar and Suman Rana, was released worldwide on May 25, 2018. Suman, who was also known as Kiara Rana during her modelling career, walked the ramp and in photoshoots for numerous internationally recognized brands. This film marked the final of the late Raj Brar, leaving the entire Punjabi music industry in shock.",
		image: "/images/a.png",
		featured: true,
	},
	{
		id: 2,
		title: "A Biopic from the Film Industry",
		date: "Monday, February 24, 2025",
		author: "Written by Sarah Chen",
		description:
			"This drama film unveiled its first look to the media on April 2, 2019. It features Suman Rana, is directed by Sahith Sarkar, produced by Hari Vishnu, with music composed by Saurabh Sharma. The chief promotion was managed by co-producer Lauren Ayden from the USA. Filmed at Ramoji Film City, it was in three languages across India and marks Suman's third film overall but his first release in the South Indian film industry.",
		image: "/images/b.png",
	},
	{
		id: 3,
		title: "Miracle",
		date: "Friday, February 21, 2025",
		author: "Written by Marcus Rodriguez",
		description:
			"The movie featuring Star Girl Suman Rana is produced and directed by the renowned RV, Rudra Venu Gopalan, at Ramoji Studio in Hyderabad. This fictional film unveiled first look on April 2, 2019, in front of the media. It stars Suman Rana, Sandeep Bharadwaj, Sir Vijay Kumar Senior, Nazar, and legends like Jeeva, and is available in three languages: Tamil, Telugu, and Hindi.",
		image: "/images/c.png",
	},
	{
		id: 4,
		title: "JCLS 369",
		date: "Tuesday, February 18, 2025",
		author: "Written by Emma Thompson",
		description:
			"The film, which explores themes of mental depression as a girl navigates life alone in a new city and falls for the wrong guy is produced and directed by the acclaimed Lauren Ayden Kaur at The Walt Disney Company, USA. This documentary has unveiled its first look and will soon be available on platforms, with half of the shooting already completed. The feature film is anticipated to be released in 2026.",
		image: "/images/d.png",
	},
	{
		id: 5,
		title: "Let's Meet",
		date: "Sunday, February 16, 2025",
		author: "Written by David Kim",
		description:
			"Fate two strangers together in an unforeseen manner, igniting an immediate bond Suman Rana captivated theatergoers, leaving them in tears at his character's demise, especially during a time marked by the when many had lost loved ones. Tanuj Virwani, the son the renowned Indian actress Rati Agnihotri, adds to the compelling narrative.",
		image: "/images/e.png",
	},
	{
		id: 6,
		title: "THE DIPLOMAT",
		date: "Thursday, February 13, 2025",
		author: "Written by Lisa Park",
		description:
			"This exciting film draws inspiration from the spy tales of Indian intelligence and emphasizes the vital of diplomacy in a nation's development and security. Featuring John Abraham, Sadia Khateeb,athy, Kumud Mishra, Suman Rana, and Shar Hashmi, it is produced by Gulshan Kumar, T-Series, Entertainment, and Wakaoo Films in collaboration with Fortune Pictures, under the banner of T-Series Films, Fortune Pictures, and Wakaoo Films.",
		image: "/images/f.png",
	},
	{
		id: 7,
		title: "RUSH",
		date: "Monday, February 10, 2025",
		author: "Written by Alex Johnson",
		description:
			"Ram Gopal Varma's highly anticipated film, Rush, promises a thrilling unfiltered experience. Filming has wrapped up, and the release is near. This action-packed motorsports film features a talented, including Suman and Makrandhpande, focusing on intense action rather than character-driven drama, setting it apart in cinema. Varma is known for mentoring many directors in industry.",
		image: "/images/g.png",
	},
]

function Card({ insight, isLarge = false }: { insight: (typeof insights)[0]; isLarge?: boolean }) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<motion.div
			className={`relative cursor-pointer will-change-transform h-[515px] md:h-[515px] lg:h-[515px]`}
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
			whileHover={{
				y: -8,
				transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
			}}
		>
			{/* Background Image */}
			<div className="absolute inset-0 rounded-2xl overflow-hidden">
				<motion.img
					src={insight.image}
					alt={insight.title}
					className={`w-full h-full object-cover will-change-transform transition-all duration-500 ${isHovered ? 'blur-sm scale-105' : 'scale-100'}`}
					animate={{}}
					transition={{}}
				/>

				{/* Dark Overlay */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
			</div>

			{/* Fixed Content Container */}
			<div className={`absolute inset-0 p-8 flex flex-col text-white overflow-hidden`}
				style={{ justifyContent: 'flex-start' }}>
				{/* Title - now at the top, bold, Quicksand font, larger */}
				<motion.h2
					className="font-normal mb-4 leading-tight will-change-transform text-5xl md:text-7xl font-poppins"
					style={{ fontWeight: 400, fontSize: isLarge ? '3.5rem' : '2.5rem', letterSpacing: '-0.01em', textShadow: '0 8px 32px #222831' }}
					animate={{
						y: isHovered ? -10 : 0,
					}}
					transition={{
						duration: 0.4,
						ease: [0.25, 0.1, 0.25, 1],
					}}
				>
					{insight.title}
				</motion.h2>
				{/* Line effect only on hover */}
				<motion.div
					className="h-px bg-white/30 mb-2"
					initial={{ opacity: 0, scaleX: 0 }}
					animate={{ opacity: isHovered ? 1 : 0, scaleX: isHovered ? 1 : 0 }}
					transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
				/>
				{/* Spacer to push subheading to bottom */}
				<div className="flex-1" />
				{/* Description as subheading, bottom, only on hover */}
				<motion.p
					className={`text-white/90 font-light leading-relaxed ${isLarge ? "text-lg" : "text-base"} ${quicksand.className}`}
					style={{ fontSize: isLarge ? '1.1rem' : '1rem', lineHeight: '1.7rem', opacity: isHovered ? 1 : 0 }}
					animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
					transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
				>
					{insight.description}
				</motion.p>
			</div>
			{/* Subtle border */}
			<motion.div
				className="absolute inset-0 rounded-2xl border border-white/20 pointer-events-none"
				initial={{ opacity: 0 }}
				animate={{ opacity: isHovered ? 1 : 0 }}
				transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
			/>
		</motion.div>
	)
}

export default function Features() {
	const featuredInsight = insights[0]
	const regularInsights = insights.slice(1)

	return (
		<div id="work" className="min-h-[160vh] bg-gradient-to-b from-black to-gray-900 py-32 px-8 scroll-mt-32">
			<div className="max-w-[1600px] mx-auto">
				{/* Top Section - Header + Featured Card */}
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
					{/* Header */}
					<motion.div
						className="flex flex-col justify-start pt-16"
						initial={{ opacity: 0, x: -40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
					>
						<h1 className="text-6xl md:text-8xl lg:text-9xl font-light text-white tracking-tight leading-none">
							Indian Films & <br />
							Television
						</h1>
					</motion.div>

					{/* Featured Card */}
					<motion.div
						initial={{ opacity: 0, x: 40 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
					>
						<Card insight={featuredInsight} />
					</motion.div>
				</div>

				{/* Bottom Section - Regular Cards Grid */}
				<motion.div
					className="grid grid-cols-1 md:grid-cols-2 gap-8"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 }}
				>
					{regularInsights.map((insight, index) => (
						<motion.div
							key={insight.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{
								duration: 0.6,
								delay: 0.6 + index * 0.1,
								ease: [0.25, 0.1, 0.25, 1],
							}}
						>
							<Card insight={insight} />
						</motion.div>
					))}
				</motion.div>
			</div>
		</div>
	)
}
