import { AnimatedContainer } from "@/components/AnimatedContainer";
import { AnimatedText } from "@/components/AnimatedText";
import { ProjectsSection } from "@/components/projects-section";

interface FeaturesProps {
  isActive: boolean;
}

export default function Features({ isActive }: FeaturesProps) {
  return (
	<AnimatedContainer variant="fade" className="h-auto w-full mb-12 md:mb-16 pb-16" isActive={isActive}>
	  <div style={{ minHeight: 'fit-content' }}>
		<AnimatedText text="Features" variant="split" as="h2" className="text-5xl font-bold text-white mb-8" isActive={isActive} />
		<ProjectsSection />
	  </div>
	</AnimatedContainer>
  );
}