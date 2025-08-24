import { HeroSection } from "@/components/modules/homePage/heroSection";
import HowItWorksSection from "@/components/modules/homePage/howItWorks";
import RideStyleSection from "@/components/modules/homePage/rideStyle";
import SafetyComfort from "@/components/modules/homePage/safety&Comfort";
import TestimonialSection from "@/components/modules/homePage/Testimonial";

const Home = () => {
    return (
        <div className=" px-4 container mx-auto">
            <HeroSection/>
            <HowItWorksSection/>
            <RideStyleSection/>
            <SafetyComfort/>
            <TestimonialSection/>
        </div>
    );
};

export default Home;