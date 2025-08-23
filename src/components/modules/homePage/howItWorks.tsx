import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DollarSign, Shield, Smartphone } from "lucide-react";

// Individual Card Component
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <Card className="flex flex-col items-center text-center">
      <CardHeader className="w-full mx-auto">
        <div className="text-4xl mb-4 text-primary place-self-center">{icon}</div>
        <CardTitle className="">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="link">Read more</Button>
      </CardContent>
    </Card>
  );
};

// Main Section Component
const HowItWorksSection: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 ">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">How It Works</h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-muted-foreground">
            Drivers post their trips, passengers find rides, and together they
            split costs. Search for available journeys, connect with drivers or
            passengers, and hit the road. It's affordable, convenient, and
            eco-friendly!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<DollarSign className="w-10 h-10" />}
            title="Your pick of rides at low prices."
            description="No matter where you're going, by bus or carpool, find the perfect ride from our wide range of destinations and routes at low prices."
          />
          <FeatureCard
            icon={<Shield className="w-10 h-10" />}
            title="Trust who you travel with."
            description="We take the time to get to know each of our members and bus partners. We check reviews, profiles and IDs, so you know who you're traveling with and can book."
          />
          <FeatureCard
            icon={<Smartphone className="w-10 h-10" />}
            title="Scroll, click, tap and go!"
            description="Booking a ride has never been easier! Thanks to our simple app powered by great technology, you can book a ride close to you in just minutes."
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
