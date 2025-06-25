import UnfixedHero from "@/components/component";

export default function Hero() {
  return (
    <>
      <UnfixedHero />
      {/* BOOST Section - Stick to top of section, remove extra space */}
      <section className="min-h-screen bg-black flex items-start justify-start relative z-30 m-0 p-0">
        <div className="w-full px-0 pt-0 pb-0">
          <div className="sticky top-0 bg-black/90 pt-4 pb-2 z-40">
            <h2 className="text-6xl md:text-8xl font-black uppercase text-white mb-2 tracking-tight text-left">
              BOOST
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed text-left">
              Transform your digital presence with cutting-edge design solutions that
              drive engagement and deliver measurable results.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
