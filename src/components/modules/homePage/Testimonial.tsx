
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Author {
  name: string;
  role: string;
  avatar: {
    src: string;
    alt: string;
  };
}

interface Testimonial {
  quote: string;
  author: Author;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur.",
    author: {
      name: "Customer One",
      role: "CEO, Company A",
      avatar: {
        src: "https://i.ibb.co.com/Dgz7sNnG/lance-asper-N9-Pf2-J656a-Q-unsplash.jpg",
        alt: "Customer One",
      },
    },
  },
  {
    quote:
      "Excellent service and support. Highly recommend to anyone looking for quality!",
    author: {
      name: "Customer Two",
      role: "Manager, Company B",
      avatar: {
        src: "https://i.ibb.co.com/Dgz7sNnG/lance-asper-N9-Pf2-J656a-Q-unsplash.jpg",
        alt: "Customer Two",
      },
    },
  },
  {
    quote:
      "The team was amazing, very responsive and helpful. Truly exceptional experience!",
    author: {
      name: "Customer Three",
      role: "Developer, Company C",
      avatar: {
        src: "https://i.ibb.co.com/Dgz7sNnG/lance-asper-N9-Pf2-J656a-Q-unsplash.jpg",
        alt: "Customer Three",
      },
    },
  },
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { quote, author } = testimonials[currentIndex];

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="flex flex-col items-center text-center">
          <p className="mb-16 max-w-4xl px-8 font-medium lg:text-3xl">
            &ldquo;{quote}&rdquo;
          </p>
          <div className="flex items-center gap-2 md:gap-4">
            <Avatar className="w-12 h-12 md:w-16 md:h-16">
              <AvatarImage src={author.avatar.src} alt={author.avatar.alt} />
              <AvatarFallback>{author.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="text-sm font-medium md:text-base">{author.name}</p>
              <p className="text-muted-foreground text-sm md:text-base">
                {author.role}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex mt-12 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index ? "bg-gray-800 dark:bg-white" : "bg-gray-300 dark:bg-gray-600"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
