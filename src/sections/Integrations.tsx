import ExplosionGrid from "@/components/ExplosionGrid";

const baseImages = [
	{ id: "a", title: "A", image: "/images/a.png", description: "" },
	{ id: "b", title: "B", image: "/images/b.png", description: "" },
	{ id: "c", title: "C", image: "/images/c.png", description: "" },
	{ id: "d", title: "D", image: "/images/d.png", description: "" },
	{ id: "e", title: "E", image: "/images/e.png", description: "" },
	{ id: "f", title: "F", image: "/images/f.png", description: "" },
	{ id: "g", title: "G", image: "/images/g.png", description: "" },
];

const integrationItems = Array.from({ length: 36 }, (_, i) => {
	const base = baseImages[i % baseImages.length];
	return {
		...base,
		id: `${base.id}-${Math.floor(i / baseImages.length) + 1}`,
		title: `${base.title} ${Math.floor(i / baseImages.length) + 1}`,
	};
});

export default function Integrations() {
	return (
		<section className="min-h-[300vh] h-auto w-full bg-black overflow-hidden">
			<ExplosionGrid items={integrationItems} />
		</section>
	);
}