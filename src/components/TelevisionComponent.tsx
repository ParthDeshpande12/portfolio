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
			"Featured in 10+ creative video projects across multiple genres and platforms, collaborating with innovative artists and directors. Portfolio includes diverse work spanning digital media, artistic expression, and contemporary storytelling with various creative collectives and independent artists across different artistic movements.",
		projects: ["10+ Music Videos", "Multi-language", "Popular Artists"],
		videos: [
			{ title: "Digital Harmony", artist: "Alex Rivera", link: "https://example.com/video1" },
			{ title: "Creative Flow", artist: "Maya Studios", link: "https://example.com/video2" },
			{ title: "Urban Beats", artist: "Tech Music", link: "https://example.com/video3" },
			{ title: "Modern Tales", artist: "Indie Artists", link: "https://example.com/video4" },
			{ title: "Vision Quest", artist: "Creative Collective", link: "https://example.com/video5" },
			{ title: "New Horizons", artist: "Digital Dreams", link: "https://example.com/video6" },
			{ title: "Artistic Journey", artist: "Innovation Labs", link: "https://example.com/video7" },
			{ title: "Future Sounds", artist: "Next Gen", link: "https://example.com/video8" },
			{ title: "Creative Expression", artist: "Art Collective", link: "https://example.com/video9" },
			{ title: "Digital Renaissance", artist: "Modern Artists", link: "https://example.com/video10" },
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
			"Comprehensive portfolio of 20+ commercial projects and brand collaborations across diverse industries. Portfolio spans technology, lifestyle, automotive, healthcare, and consumer sectors, showcasing versatility in creative expression and professional marketing communications through various digital and traditional media platforms.",
		projects: ["20+ Brand Campaigns", "National Brands", "Multi-platform"],
		commercials: [
			{ brand: "TechCorp Solutions", link: "https://example.com/commercial1" },
			{ brand: "Modern Lifestyle", link: "https://example.com/commercial2" },
			{ brand: "Creative Homes", link: "https://example.com/commercial3" },
			{ brand: "Spice Garden", link: "https://example.com/commercial4" },
			{ brand: "Innovation Group", link: "https://example.com/commercial5" },
			{ brand: "Smart Tech", link: "https://example.com/commercial6" },
			{ brand: "Beauty Care Products", link: "https://example.com/commercial7" },
			{ brand: "Regional Beauty Line", link: "https://example.com/commercial8" },
			{ brand: "Auto Components", link: "https://example.com/commercial9" },
			{ brand: "Home Appliances", link: "https://example.com/commercial10" },
			{ brand: "Digital Platform", link: "https://example.com/commercial11" },
			{ brand: "E-commerce Live", link: "https://example.com/commercial12" },
			{ brand: "Fresh Fruits", link: "https://example.com/commercial13" },
			{ brand: "Behind The Scenes", link: "https://example.com/commercial14" },
			{ brand: "Personal Care", link: "https://example.com/commercial15" },
			{ brand: "Electrical Solutions", link: "https://example.com/commercial16" },
			{ brand: "Automotive Brand", link: "https://example.com/commercial17" },
			{ brand: "Healthcare Services", link: "https://example.com/commercial18" },
			{ brand: "Smart Electronics", link: "https://example.com/commercial19" },
			{
				brand: "Wellness Products",
				link: "https://example.com/commercial20",
			},
			{
				brand: "Kitchen Appliances",
				link: "https://example.com/commercial21",
			},
			{ brand: "Beauty Services", link: "https://example.com/commercial22" },
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