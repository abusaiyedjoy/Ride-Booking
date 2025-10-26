import { useState } from "react";
import { CalendarIcon, CarTaxiFront, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/icons/Logo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router";
import DatePickerField from "./../../ui/datePicker";
import { toast } from "sonner";
export const HeroSection = () => {
  const [roundTrip, setRoundTrip] = useState(true);
  const [filter, setFilter] = useState<"with" | "without">("without");

  const handleSearch =  ()=>{
    toast.warning("This feature is not available yet");
  }

  return (
    <section className="2xl:container 2xl:mx-auto relative overflow-hidden lg:h-[90vh] mb-12 flex items-center">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co.com/1f5h9XYx/mathieu-buquet-4-WBv-Cqe-Ma-DE-unsplash.jpg"
          alt="banner"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Black overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative pb-3 z-10 container mx-auto flex h-full items-center justify-center px-4">
        <div className="flex max-w-6xl flex-col items-center text-center gap-8">
          <Logo />

          <div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-white lg:text-5xl">
              Get Going. Get <span className="text-[#96e6a1]">There.</span>
            </h1>
            <p className="mx-auto max-w-3xl text-white/80 lg:text-xl">
              Request a ride, hop in, and go. Visit new places, meet new people,
              and explore your city like never before.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="shadow-sm hover:shadow-lg ">
              <Link
                className="inline-flex flex-row-reverse items-center gap-2"
                to="/ride-request"
              >
                Request a ride <CalendarIcon className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" className="flex items-center gap-2 ">
              <Link
                className="inline-flex flex-row-reverse items-center gap-2"
                to="/create"
              >
                As a Driver <CarTaxiFront className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Booking Form */}
          <div className="w-full max-w-7xl mx-auto p-6 bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="flex flex-col gap-4">
              <div className={`w-full ${roundTrip ? "space-y-4" : "flex flex-col md:flex-row justify-between items-center w-full gap-4"}`}>
                {/* Row 1: Departure & Round Trip & Return Location */}
                <div className="flex flex-1 flex-col md:flex-row gap-4 justify-between items-end md:items-center">
                  <div className="flex flex-col flex-1 w-full">
                    <Label htmlFor="departure">Departure</Label>
                    <div className="relative mt-2">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="departure"
                        placeholder="City, airport or station"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <Label htmlFor="round" className="whitespace-nowrap">
                      Round-trip?
                    </Label>
                    <Switch
                      id="round"
                      checked={roundTrip}
                      onCheckedChange={setRoundTrip}
                    />
                  </div>

                  {roundTrip && (
                    <div className="flex flex-col flex-1 w-full">
                      <Label htmlFor="return">Return Location</Label>
                      <div className="relative mt-2">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="return"
                          placeholder="City, airport or station"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 justify-between items-center gap-5">
                  {/* Row 2: Pickup Date & Time */}
                  <div className="flex flex-col flex-1">
                    <DatePickerField label="Pick Up Date" />
                  </div>

                  {/* Row 3: Return Date & Time */}
                  {roundTrip && (
                    <div className="flex flex-col flex-1">
                      <DatePickerField label="Return Date" />
                    </div>
                  )}
                </div>
              </div>

              {/* Row 4: Filter & Search */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-2 md:ml-0 mt-4">
                <div className="flex gap-2 justify-center md:justify-start">
                  <Button
                    variant={filter === "without" ? "default" : "outline"}
                    className="rounded-full cursor-pointer"
                    onClick={() => setFilter("without")}
                  >
                    Without Driver
                  </Button>
                  <Button
                    variant={filter === "with" ? "default" : "outline"}
                    className="rounded-full cursor-pointer"
                    onClick={() => setFilter("with")}
                  >
                    With Driver
                  </Button>
                </div>
                <Button onClick={handleSearch} size="lg" className="bg-chart-2 cursor-pointer mt-2 md:mt-0 md:ml-4">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
