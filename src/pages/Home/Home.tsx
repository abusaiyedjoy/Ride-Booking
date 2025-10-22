import { HeroSection } from "@/components/modules/homePage/heroSection";
import HowItWorksSection from "@/components/modules/homePage/howItWorks";
import RideStyleSection from "@/components/modules/homePage/rideStyle";
import SafetyComfort from "@/components/modules/homePage/safety&Comfort";
import TestimonialSection from "@/components/modules/homePage/Testimonial";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <div className="">
      <HeroSection />
      <HowItWorksSection />
      <RideStyleSection />
      <SafetyComfort />
      <TestimonialSection />
      {/* CTA Section */}
      <Card className="container mx-auto mb-12 rounded-3xl border-2 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5" />
        <CardContent className="p-12 text-center space-y-6 relative">
          <h2 className="text-3xl md:text-4xl font-bold">Ready to join us?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            We're always looking for talented people who share our passion for
            building better mobility experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" className="group">
              View Open Positions
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline">
              Get in Touch
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
