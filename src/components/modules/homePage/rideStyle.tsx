import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Ride {
  id: string;
  title: string;
  price: string;
  description: string;
  image: string;
}

const rides: Ride[] = [
  {
    id: "economy",
    title: "ECONOMY CLASS",
    price: "$1.25/mi",
    description: "Compact & Affordable rides for everyday commute",
    image: "https://i.ibb.co.com/bg57HBfm/dhiva-krishna-X16z-Xcbx-U4-U-unsplash.jpg",
  },
  {
    id: "standard",
    title: "STANDARD CLASS",
    price: "$1.75/mi",
    description: "Mid-size vehicles with premium comfort",
    image: "https://i.ibb.co.com/bg57HBfm/dhiva-krishna-X16z-Xcbx-U4-U-unsplash.jpg",
  },
  {
    id: "business",
    title: "BUSINESS CLASS",
    price: "$2.25/mi",
    description: "Executive class for business professionals",
    image: "https://i.ibb.co.com/bg57HBfm/dhiva-krishna-X16z-Xcbx-U4-U-unsplash.jpg",
  },
];

const RideCard: React.FC<{ ride: Ride }> = ({ ride }) => (
  <Card className="rounded-xl overflow-hidden shadow-lg border-2 border-gray-200 dark:border-gray-700">
    <div className="relative w-full aspect-[16/9] bg-gray-100 dark:bg-gray-800">
      <img
        src={ride.image}
        alt={ride.title}
        className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
      />
    </div>
    <CardHeader className="pt-4 px-6 text-start">
      <CardTitle className="text-lg font-bold text-secondary-foreground uppercase tracking-wider">
        {ride.title}
      </CardTitle>
      <CardDescription className="text-xl font-bold text-primary">
        {ride.price}
      </CardDescription>
    </CardHeader>
    <CardContent className="px-6">
      <p className="text-base text-muted-foreground text-start">
        {ride.description}
      </p>
    </CardContent>
    <CardFooter className="px-6">
      <Button className="w-full text-base font-semibold py-6">
        Learn More
      </Button>
    </CardFooter>
  </Card>
);

const RideStyleSection: React.FC = () => {
  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          Choose Your Ride Style
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rides.map((ride) => (
            <RideCard key={ride.id} ride={ride} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RideStyleSection;