import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import InternshipGrid from "@/components/InternshipGrid";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <InternshipGrid />
      </main>
    </div>
  );
};

export default Index;
