import { HeroSection } from "@/components/modules/homePage/heroSection";
import HowItWorksSection from "@/components/modules/homePage/howItWorks";
import RideStyleSection from "@/components/modules/homePage/rideStyle";
import TestimonialSection from "@/components/modules/homePage/Testimonial";

const Home = () => {
    return (
        <div className=" px-4 container mx-auto">
            <HeroSection/>
            <HowItWorksSection/>
            <RideStyleSection/>
            <TestimonialSection/>
        </div>
    );
};

export default Home;