import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Trophy, Clock } from "lucide-react";
import heroImage from "@/assets/hero-internships.jpg";

const HeroSection = () => {
  const scrollToInternships = () => {
    const element = document.getElementById('internships');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="Professional internship environment" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Kickstart Your{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Career Journey
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                Join our comprehensive internship program and gain real-world experience 
                with mentorship from industry experts. Build your portfolio while working 
                on live projects.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                onClick={scrollToInternships}
                className="group"
              >
                Explore Internships
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border/50">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3 mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Interns Placed</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3 mx-auto">
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-3 mx-auto">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl font-bold">6-12</div>
                <div className="text-sm text-muted-foreground">Weeks Duration</div>
              </div>
            </div>
          </div>

          {/* Right side content could be an additional image or feature highlights */}
          <div className="hidden lg:block">
            <div className="bg-gradient-card rounded-2xl p-8 shadow-strong border border-border/50">
              <h3 className="text-2xl font-semibold mb-6">What You'll Gain</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium">Real-World Experience</h4>
                    <p className="text-sm text-muted-foreground">Work on live projects with real impact</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium">Expert Mentorship</h4>
                    <p className="text-sm text-muted-foreground">Learn from industry professionals</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium">Portfolio Projects</h4>
                    <p className="text-sm text-muted-foreground">Build impressive work samples</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <div>
                    <h4 className="font-medium">Career Guidance</h4>
                    <p className="text-sm text-muted-foreground">Get recommendations and networking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;