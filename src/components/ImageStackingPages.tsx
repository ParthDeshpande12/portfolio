"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ApertureHoverCard from "@/components/ApertureHoverCard";
import TextRevealWithBold from "@/components/TextRevealWithBold";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

interface StickySection {
	id: string;
	title: string;
	description: string;
	image: string;
	backgroundColor: string;
}

interface StickyScrollProps {
	sections: StickySection[];
}

export default function StickyScroll({ sections }: StickyScrollProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// Pin each section
			const stickyElements = gsap.utils.toArray<HTMLElement>(".sticky-section");

			stickyElements.forEach((section) => {
				ScrollTrigger.create({
					trigger: section,
					start: "top top",
					end: "bottom top",
					pin: true,
					pinSpacing: false,
				});
			});

			// Zoom effect for each image on scroll
			imageRefs.current.forEach((img, idx) => {
				if (!img) return;
				if (idx === 2) {
					// Third image: less zoom, shorter scroll
					gsap.fromTo(
						img,
						{ scale: 1 },
						{
							scale: 1.03,
							ease: "none",
							scrollTrigger: {
								trigger: stickyElements[idx],
								start: "top top",
								end: "bottom-=20% top",
								scrub: true,
							},
						}
					);
				} else {
					gsap.fromTo(
						img,
						{ scale: 1 },
						{
							scale: 1.08,
							ease: "none",
							scrollTrigger: {
								trigger: stickyElements[idx],
								start: "top top",
								end: "bottom top",
								scrub: true,
							},
						}
					);
				}
			});

			// Simple fade in animations
			gsap.utils.toArray<HTMLElement>(".animate-in").forEach((element) => {
				gsap.fromTo(
					element,
					{ opacity: 0, y: 50 },
					{
						opacity: 1,
						y: 0,
						duration: 0.8,
						ease: "power2.out",
						scrollTrigger: {
							trigger: element,
							start: "top 80%",
							toggleActions: "play none none reverse",
						},
					},
				);
			});
		}, containerRef);

		return () => {
			ctx.revert();
			ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
		};
	}, []);

	return (
		<div ref={containerRef} className="relative">
			{sections.map((section, index) => (
				<div
					key={section.id}
					className={`sticky-section min-h-screen flex items-center justify-between px-2 md:px-8 lg:px-12 ${section.backgroundColor}`}
				>
					{/* For the second section (index 1), show image first, then content */}
					{index === 1 ? (
						<>
							{/* Image Side - Left (Larger) */}
							<div className="flex-1 flex justify-start">
								<div
									ref={el => { imageRefs.current[index] = el }}
									className="will-change-transform w-full max-w-2xl h-[600px] md:h-[700px] flex items-center translate-y-16"
								>
									<ApertureHoverCard
										imageSrc={section.image}
										imageAlt={section.title}
										title={section.title}
										date={"2024-06-01"}
										className="w-full h-full"
									/>
								</div>
							</div>

							{/* Content Side - Right (Smaller) */}
							<div className="flex-1 max-w-xl ml-8 flex flex-col justify-center items-center md:items-start text-left">
								<TextRevealWithBold
									text={section.description}
									className="text-white font-philosopher mb-4 text-2xl md:text-3xl leading-snug"
								/>
							</div>
						</>
					) : (
						<>
							{/* Content Side - Left (Smaller) */}
							<div className="flex-1 max-w-xl flex flex-col justify-center items-center md:items-start text-left">
								<TextRevealWithBold
									text={section.description}
									className="text-white font-philosopher mb-4 text-2xl md:text-3xl leading-snug"
								/>
							</div>

							{/* Image Side - Right (Larger) */}
							<div className="flex-1 flex justify-end">
								<div
									ref={el => { imageRefs.current[index] = el }}
									className="will-change-transform w-full max-w-2xl h-[600px] md:h-[700px] flex items-center translate-y-16"
								>
									<ApertureHoverCard
										imageSrc={section.image}
										imageAlt={section.title}
										title={section.title}
										date={"2024-06-01"}
										className="w-full h-full"
									/>
								</div>
							</div>
						</>
					)}
				</div>
			))}
			{/* Add spacing at the end to prevent overlap */}
			<div className="h-screen"></div>
		</div>
	);
}
