import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroImages from "@/components/introimages";
import AboutMe from "@/components/aboutme";
gsap.registerPlugin(ScrollTrigger);




export default function Introduction() {
	useEffect(() => {
		return () => {
			ScrollTrigger.getAll().forEach(t => t.kill());
		};
	}, []);

	return (
		<div className="bg-gradient-to-b from-black to-[#181c23]" style={{background: "linear-gradient(to bottom, #000, #181c23 80%)"}}>
			{/* Intro Images Section at the very start */}
			<IntroImages />
			<AboutMe />
		</div>
	);
}
