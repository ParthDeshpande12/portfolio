import { AnimatedContainer } from "@/components/AnimatedContainer";
import { AnimatedText } from "@/components/AnimatedText";
import ContactRevealSection from "@/components/contact-reveal-section";

export default function ContactUs() {
  return (
    <AnimatedContainer variant="fade" className="relative w-full h-screen z-30">
      <AnimatedText text="Contact" variant="split" as="h2" className="text-5xl font-bold text-white mb-8" />
      <div className="h-screen z-10">
        <ContactRevealSection portraitImage="/images/portrait.png" />
      </div>
    </AnimatedContainer>
  );
}