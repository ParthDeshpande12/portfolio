import ExplosionGrid from "@/components/ExplosionGrid";



// Classic grid: repeat a small set of hero images for a full grid
const baseImages = [
  { id: "1", title: "1", image: "/images/1.jpg", description: "" },
  { id: "2", title: "2", image: "/images/2.jpg", description: "" },
  { id: "3", title: "3", image: "/images/3.jpg", description: "" },
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
    <section className="min-h-[120vh] sm:min-h-[160vh] md:min-h-[300vh] h-auto w-full bg-black overflow-hidden">
      <ExplosionGrid items={integrationItems} />
    </section>
  );
}