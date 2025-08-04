"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const filmCategories = [
	{
		id: "lead-films",
		name: "Lead Films",
		image: "/placeholder.svg?height=600&width=800",
		title: "Digital Dreams",
		description:
			"Maya Sharma's debut film as a lead actress alongside veteran actor Rajesh Kumar. The film was well-received at box office and showcased compelling storytelling through exceptional performances and direction.",
		projects: ["Digital Dreams (2021)", "With Arjun Singh", "Critically Acclaimed"],
		trailerLink: "https://example.com/trailer1",
		songLink: "https://example.com/song1",
	},
	{
		id: "international",
		name: "International",
		image: "/placeholder.svg?height=600&width=800",
		title: "Global Creative Productions",
		description:
			"Partnered with Global Creative Productions for innovative international projects, demonstrating versatility across diverse creative platforms and expanding artistic horizons.",
		projects: ["Creative Vision", "New Horizons", "International Recognition"],
		trailerLinks: [
			"https://example.com/trailer2",
			"https://example.com/trailer3",
		],
		songLink: null,
	},
	{
		id: "recent",
		name: "Recent",
		image: "/placeholder.svg?height=600&width=800",
		title: "Urban Tales",
		description:
			"Recently completed project with Rohit Mehta under Creative Vision Studios, representing innovative storytelling in modern digital media.",
		projects: ["Urban Tales", "With Rohit Mehta", "Creative Vision Studios"],
		trailerLink: "https://example.com/trailer4",
		songLink: null,
	},
	{
		id: "upcoming",
		name: "Upcoming",
		image: "/placeholder.svg?height=600&width=800",
		title: "The Diplomat",
		description:
			"Upcoming film directed by Shivam Nair under T-Series production, promising another compelling performance in this highly anticipated project.",
		projects: ["The Diplomat", "Directed by Shivam Nair", "T-Series Production"],
		trailerLink: "https://example.com/trailer5",
		songLink: null,
	},
	{
		id: "production",
		name: "In Production",
		image: "/placeholder.svg?height=600&width=800",
		title: "Rush",
		description:
			"Currently in production under RGV production house, working with renowned filmmaker Ram Gopal Varma on this exciting new project.",
		projects: ["Rush", "RGV Production", "Ram Gopal Varma"],
		trailerLink: null,
		songLink: null,
	},
]

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

export default function FilmsComponent() {
	const [activeCategory, setActiveCategory] = useState(0)
	const [direction, setDirection] = useState(0)

	const handleCategoryChange = (newIndex: number) => {
		if (newIndex !== activeCategory) {
			setDirection(newIndex > activeCategory ? 1 : -1)
			setActiveCategory(newIndex)
		}
	}

	const currentCategory = filmCategories[activeCategory]

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
							<h3 className="text-lg font-medium text-white drop-shadow-lg">
								Films
							</h3>
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
										x: {
											type: "spring",
											stiffness: 150,
											damping: 30,
											duration: 1.8,
										},
										opacity: { duration: 0.8 },
									}}
									className="absolute inset-0"
								>
									<Image
										src={getRandomImage()}
										alt={`${currentCategory.name} film scene`}
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
											<h2 className="text-3xl md:text-4xl font-bold mb-3">
												{currentCategory.title}
											</h2>
										</div>

										<div className="flex flex-wrap gap-2 mb-4">
											{currentCategory.projects.map((project, index) => (
												<motion.span
													key={index}
													className="px-2 py-1 bg-black/40 backdrop-blur-sm rounded text-xs"
													initial={{ opacity: 0, scale: 0.8 }}
													animate={{ opacity: 1, scale: 1 }}
													transition={{
														delay: 0.3 + index * 0.1,
														duration: 0.3,
													}}
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
						<h3 className="text-xl font-semibold mb-2">
							{currentCategory.title}
						</h3>
						<p className="text-gray-300 text-sm">
							{currentCategory.description}
						</p>
					</motion.div>
				</div>
			</div>

			{/* Action Buttons Section */}
			<div className="relative py-6 px-4">
				<div className="max-w-4xl mx-auto flex justify-center">
					<div className="flex gap-4 transition-all duration-[1.8s] ease-in-out">
						{currentCategory.trailerLink && (
							<Button
								size="lg"
								className="bg-white text-black hover:bg-gray-200 border-0"
								onClick={() =>
									window.open(currentCategory.trailerLink, "_blank")
								}
							>
								<Play className="w-4 h-4 mr-2" />
								Watch Trailer
							</Button>
						)}
						{currentCategory.songLink && (
							<Button
								size="lg"
								className="bg-white text-black hover:bg-gray-200 border-0"
								onClick={() => window.open(currentCategory.songLink, "_blank")}
							>
								<Play className="w-4 h-4 mr-2" />
								Song
							</Button>
						)}
						{currentCategory.trailerLinks &&
							currentCategory.trailerLinks.map((link, index) => (
								<Button
									key={index}
									size="lg"
									className="bg-white text-black hover:bg-gray-200 border-0"
									onClick={() => window.open(link, "_blank")}
								>
									<Play className="w-4 h-4 mr-2" />
									Trailer {index + 1}
								</Button>
							))}
					</div>
				</div>
			</div>

			{/* Bottom Navigation Panel */}
			<div className="relative py-8 px-4 bg-black/50 backdrop-blur-sm">
				<div className="max-w-6xl mx-auto">
					{/* Categories Navigation */}
					<div className="flex items-center justify-center mb-6">
						<div className="flex items-center space-x-6 bg-black/60 backdrop-blur-sm rounded-full px-6 py-3">
							{filmCategories.map((category, index) => (
								<motion.button
									key={category.id}
									onClick={() => handleCategoryChange(index)}
									className={`relative px-4 py-2 text-sm font-medium transition-all duration-500 ${
										activeCategory === index
											? "text-white"
											: "text-gray-400 hover:text-gray-200"
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