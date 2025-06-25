"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const televisionCategories = [
	{
		id: "video-albums",
		name: "Video Albums",
		image: "/placeholder.svg?height=600&width=800",
		title: "Music Video Portfolio",
		description:
			"Featured in 10+ music videos across different languages and genres, collaborating with renowned singers and music directors. Recent work includes: 'Tere Bina' with Mankirt Aulakh, 'Fiet Wargi' with Sandeep Brar, 'Mine Girl' with Slow & Flow, 'Kudiye' with Nitin Kumar & Rishiraj. Additional collaborations: 'Mere Mehboob' with Raj & Pratham, 'Bekadraa' with Sippy Gill, 'Khand' with G Sandhu, 'Gaali Vaaluga' (Tamil) with Sandeep Kurapati & Satya Yamini, and 'Badaami Rangaya' with Gagan Kokri.",
		projects: ["10+ Music Videos", "Multi-language", "Popular Artists"],
		videos: [
			{ title: "Tere Bina", artist: "Mankirt Aulakh", link: "https://www.youtube.com/watch?v=CvuAvLcbPg8" },
			{ title: "Fiet Wargi", artist: "Sandeep Brar", link: "https://youtu.be/fxl_E9YKLM8" },
			{ title: "Mine Girl", artist: "Slow & Flow", link: "https://youtu.be/sfGZS1GPeVs" },
			{ title: "Kudiye", artist: "Nitin Kumar & Rishiraj", link: "https://youtu.be/F_Ws7wrOuhY" },
			{ title: "Baatan", artist: "Raj Brar", link: "https://youtu.be/hNDVSW1hSgk" },
			{ title: "Mere Mehboob", artist: "Raj & Pratham", link: "https://youtu.be/JpCp5CPzCU0" },
			{ title: "Bekadraa", artist: "Sippy Gill", link: "https://youtu.be/jH0mjd8zELM" },
			{ title: "Khand", artist: "G Sandhu", link: "https://youtu.be/6misZ6Av6Bk" },
			{ title: "Gaali Vaaluga", artist: "Sandeep Kurapati & Satya Yamini", link: "https://youtu.be/gYkC6HBBNy8" },
			{ title: "Badaami Rangaya", artist: "Gagan Kokri", link: "https://youtu.be/b-tl4nFIVW8" },
		],
	},
	{
		id: "tv-serials",
		name: "TV Serials",
		image: "/placeholder.svg?height=600&width=800",
		title: "Television Drama",
		description:
			"Portrayed compelling negative lead characters in popular television serials, showcasing versatility and dramatic range across different networks. Featured as Negative Lead in 'Zindagi Ke Mehak' on Zee TV and 'Mere Hanikarak Biwi' on &TV Network, demonstrating strong character development and emotional depth in antagonist roles.",
		projects: ["Zee TV", "&TV Network", "Negative Lead Roles"],
		shows: [
			{ title: "Zindagi Ke Mehak", network: "Zee TV", role: "Negative Lead" },
			{ title: "Mere Hanikarak Biwi", network: "&TV", role: "Negative Lead" },
		],
	},
	{
		id: "tvc-commercials",
		name: "TVC & Commercials",
		image: "/placeholder.svg?height=600&width=800",
		title: "Brand Endorsements",
		description:
			"Extensive portfolio of 20+ television commercials and brand endorsements for major national and international brands. Featured campaigns include: EBIZY.com, Just Chill, Login Homes, Sona Masale, Jagatjit Group, Ultra Lite, Dabur Keratex Oil (Hindi & Kannada versions), TVS Tyres, Videocon Washing Machine, Closeup Web Singer, Just Buy Live, Mahi Mango (with behind-the-scenes content), Santoor Soap, Goldmedal Switches, Renault Kwid, Obama Care Insurance, LG Mosquito Away TV, LG Microwave Oven, Pancvati Ayurvedic Cream, and Urban Clap Derma Facial. Demonstrating commercial appeal across automotive, FMCG, technology, and healthcare sectors.",
		projects: ["20+ Brand Campaigns", "National Brands", "Multi-platform"],
		commercials: [
			{ brand: "EBIZY.com", link: "https://youtu.be/RJul7dAMD3M" },
			{ brand: "Just Chill", link: "https://youtu.be/V8g8hwgWFlU" },
			{ brand: "Login Homes", link: "https://youtu.be/nUsu-ywXjOo" },
			{ brand: "Sona Masale", link: "https://youtu.be/RBuJph4phsA" },
			{ brand: "Jagatjit Group", link: "https://youtu.be/gFkpH_yQn1s" },
			{ brand: "Ultra Lite", link: "https://youtu.be/LDl8gtJo1_U" },
			{ brand: "Dabur Keratex Oil (Hindi)", link: "https://youtu.be/fXrWjhyZs9Q" },
			{ brand: "Dabur Keratex Oil (Kannada)", link: "https://youtu.be/90hEd6SLE9Y" },
			{ brand: "TVS Tyres", link: "https://youtu.be/AyxvJpQpiKY" },
			{ brand: "Videocon Washing Machine", link: "https://youtu.be/E4h9-K3cCG4" },
			{ brand: "Closeup Web Singer", link: "https://youtu.be/iR52JupkwlM" },
			{ brand: "Just Buy Live", link: "https://youtu.be/oShXRF9ZA68" },
			{ brand: "Mahi Mango", link: "https://youtu.be/ar1cFTmy3YM" },
			{ brand: "Mahi Mango (Behind the Scenes)", link: "https://youtu.be/KsLZR80OKUc" },
			{ brand: "Santoor Soap", link: "https://youtu.be/k7nLEaRw9AM" },
			{ brand: "Goldmedal Switches", link: "https://youtu.be/V09C2QvsNBU" },
			{ brand: "Renault Kwid", link: "https://youtu.be/9o88F7ny9bw" },
			{ brand: "Obama Care Insurance", link: "https://youtu.be/W5OJMCJtDEg" },
			{ brand: "LG Mosquito Away TV", link: "https://youtu.be/3BxRls2WEeY" },
			{
				brand: "Pancvati Ayurvedic Cream",
				link: "https://officialsumanrana.wixsite.com/sumanrana/copy-of-bio?wix-vod-video-id=24ae45f98c894e82905f60635808d9bc&wix-vod-comp-id=comp-ja808wwo",
			},
			{
				brand: "LG Microwave Oven",
				link: "https://twitter.com/LGIndia/status/1185140910226640896?s=20&t=h7oIOjjLlXo6-vV2jdz03w",
			},
			{ brand: "Urban Clap Derma Facial", link: "https://youtu.be/mXBuEQGtOo0" },
		],
	},
]

// List of available images from public/images
const randomImages = [
	"/images/1.jpg",
	"/images/2.jpg",
	"/images/3.jpg",
	"/images/a.png",
	"/images/b.png",
	"/images/c.png",
	"/images/d.png",
	"/images/e.png",
	"/images/f.png",
	"/images/g.png",
	"/images/heading.png",
	"/images/hero.jpg",
	"/images/logo.svg",
	"/images/portrait.png",
	"/images/rays.png",
	"/images/resized_1.jpg",
	"/images/resized_2.jpg",
	"/images/resized_3.jpg",
]

function getRandomImage() {
	return randomImages[Math.floor(Math.random() * randomImages.length)]
}

const slideVariants = {
	enter: (direction: number) => ({
		x: direction > 0 ? 1000 : -1000,
		opacity: 0,
	}),
	center: {
		zIndex: 1,
		x: 0,
		opacity: 1,
	},
	exit: (direction: number) => ({
		zIndex: 0,
		x: direction < 0 ? 1000 : -1000,
		opacity: 0,
	}),
}

export default function TelevisionComponent() {
	const [activeCategory, setActiveCategory] = useState(0)
	const [direction, setDirection] = useState(0)

	const handleCategoryChange = (newIndex: number) => {
		if (newIndex !== activeCategory) {
			setDirection(newIndex > activeCategory ? 1 : -1)
			setActiveCategory(newIndex)
		}
	}

	const currentCategory = televisionCategories[activeCategory]

	const renderActionButtons = () => {
		const category = currentCategory

		if (category.videos) {
			return category.videos.slice(0, 4).map((video, index) => (
				<Button
					key={index}
					size="lg"
					className="bg-white text-black hover:bg-gray-200 border-0"
					onClick={() => window.open(video.link, "_blank")}
				>
					<Play className="w-4 h-4 mr-2" />
					{video.title}
				</Button>
			))
		}

		if (category.shows) {
			return category.shows.map((show, index) => (
				<Button key={index} size="lg" className="bg-white text-black hover:bg-gray-200 border-0" disabled>
					{show.title} - {show.network}
				</Button>
			))
		}

		if (category.commercials) {
			return category.commercials.slice(0, 4).map((commercial, index) => (
				<Button
					key={index}
					size="lg"
					className="bg-white text-black hover:bg-gray-200 border-0"
					onClick={() => window.open(commercial.link, "_blank")}
				>
					<Play className="w-4 h-4 mr-2" />
					{commercial.brand}
				</Button>
			))
		}

		return null
	}

	return (
		<div
			className="bg-black text-white"
			style={{
				minHeight: "100vh",
				overflow: "visible",
				height: "auto",
			}}
		>
			{/* Main Content Section */}
			<div className="relative flex flex-col lg:flex-row min-h-screen">
				{/* Image Section with Sliding Animation */}
				<div className="flex-1 relative overflow-hidden">
					{/* Section Title Indicator */}
					<div className="absolute top-8 left-8 z-10">
						<motion.div
							key={`title-${activeCategory}`}
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8, ease: "easeOut" }}
							className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20 shadow-lg shadow-white/20 bg-gradient-to-r from-white/10 to-white/5"
							style={{
								boxShadow:
									"0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
							}}
						>
							<h3 className="text-lg font-medium text-white drop-shadow-lg">Television</h3>
						</motion.div>
					</div>

					<div className="absolute inset-0 flex items-center justify-center p-8">
						<div className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
							<AnimatePresence initial={false} custom={direction}>
								<motion.div
									key={activeCategory}
									custom={direction}
									variants={slideVariants}
									initial="enter"
									animate="center"
									exit="exit"
									transition={{
										x: { type: "spring", stiffness: 150, damping: 30, duration: 1.8 },
										opacity: { duration: 0.8 },
									}}
									className="absolute inset-0"
								>
									<Image
										src={getRandomImage()}
										alt={`${currentCategory.name} content`}
										fill
										className="object-cover pointer-events-none"
										priority
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

									{/* Overlay Content */}
									<motion.div
										className="absolute bottom-0 left-0 right-0 p-8"
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2, duration: 0.5 }}
									>
										<div className="mb-4">
											<h2 className="text-3xl md:text-4xl font-bold mb-3">{currentCategory.title}</h2>
										</div>

										<div className="flex flex-wrap gap-2 mb-4">
											{currentCategory.projects.map((project, index) => (
												<motion.span
													key={index}
													className="px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-xs"
													initial={{ opacity: 0, scale: 0.8 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
												>
													{project}
												</motion.span>
											))}
										</div>
									</motion.div>
								</motion.div>
							</AnimatePresence>
						</div>
					</div>
				</div>

				{/* Side Panel for Mobile/Tablet */}
				<div className="lg:hidden p-6 bg-gray-900/50 backdrop-blur-sm">
					<motion.div
						className="text-center"
						key={`mobile-${activeCategory}`}
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h3 className="text-xl font-semibold mb-2">{currentCategory.title}</h3>
						<p className="text-gray-300 text-sm">{currentCategory.description}</p>
					</motion.div>
				</div>
			</div>

			{/* Action Buttons Section */}
			<div className="relative py-6 px-4">
				<div className="max-w-4xl mx-auto flex justify-center">
					<div className="flex gap-4 transition-all duration-[1.8s] ease-in-out flex-wrap">{renderActionButtons()}</div>
				</div>
			</div>

			{/* Bottom Navigation Panel */}
			<div className="relative py-8 px-4 bg-black/50 backdrop-blur-sm">
				<div className="max-w-6xl mx-auto">
					{/* Categories Navigation */}
					<div className="flex items-center justify-center mb-6">
						<div className="flex items-center space-x-6 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3 flex-wrap">
							{televisionCategories.map((category, index) => (
								<motion.button
									key={category.id}
									onClick={() => handleCategoryChange(index)}
									className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 ${
										activeCategory === index ? "text-white" : "text-gray-400 hover:text-gray-200"
									}`}
									whileHover={{
										scale: 1.05,
										transition: { duration: 0.3, ease: "easeOut" },
									}}
									whileTap={{
										scale: 0.95,
										transition: { duration: 0.1 },
									}}
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										delay: index * 0.1,
										duration: 0.6,
										ease: "easeOut",
									}}
								>
									{category.name}
									{activeCategory === index && (
										<motion.div
											className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full"
											layoutId="activeTab"
											transition={{
												type: "spring",
												stiffness: 150,
												damping: 30,
												duration: 1.2,
											}}
										/>
									)}
								</motion.button>
							))}
						</div>
					</div>

					{/* Description Text Section */}
					<div className="max-w-4xl mx-auto">
						<div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 transition-all duration-[1.8s] ease-in-out">
							<div className="transition-all duration-[1.8s] ease-in-out">
								<p className="text-gray-300 text-base leading-relaxed transition-all duration-[1.8s] ease-in-out">
									{currentCategory.description}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}