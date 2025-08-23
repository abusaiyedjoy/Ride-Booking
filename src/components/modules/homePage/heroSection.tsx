import { useState } from "react";
import {
  CalendarIcon,
  CarTaxiFront,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/assets/icons/Logo";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Calendar as FullCalendar } from "react-calendar"; 

export const HeroSection = () => {
  const [roundTrip, setRoundTrip] = useState(true);
  const [filter, setFilter] = useState<"with" | "without">("without");
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [returnDate, setReturnDate] = useState<Date | undefined>(new Date());
  const [pickupTime, setPickupTime] = useState("10:30 AM");
  const [returnTime, setReturnTime] = useState("04:30 AM");

  return (
    <section className="relative overflow-hidden h-[90vh] my-12 rounded-3xl flex items-center">
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
      <div className="relative z-10 container mx-auto flex h-full items-center justify-center px-4">
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
            <Button className="shadow-sm hover:shadow-lg">
              Request a ride
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              Become a driver <CarTaxiFront className="h-4 w-4" />
            </Button>
          </div>

          {/* Booking Form */}
          <div className="w-full max-w-7xl mx-auto p-6 bg-background/90 backdrop-blur-sm rounded-2xl shadow-lg">
            <div className="flex flex-col gap-4">
              {/* Row 1: Departure & Round Trip & Return Location */}
              <div className="flex flex-col md:flex-row gap-4 items-end md:items-center">
                <div className="flex flex-col flex-1">
                  <Label htmlFor="departure">Departure</Label>
                  <div className="relative">
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
                  <div className="flex flex-col flex-1">
                    <Label htmlFor="return">Return Location</Label>
                    <div className="relative">
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

              {/* Row 2: Pickup Date & Time */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <Label>Pick Up Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="flex-1 justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {pickupDate?.toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <FullCalendar
                        value={pickupDate}
                        onChange={setPickupDate}
                        view="month"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col flex-1">
                  <Label>Pick Up Time</Label>
                  <Input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  />
                </div>
              </div>

              {/* Row 3: Return Date & Time */}
              {roundTrip && (
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col flex-1">
                    <Label>Return Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex-1 justify-start">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {returnDate?.toLocaleDateString("en-US", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="p-0">
                        <FullCalendar
                          value={returnDate}
                          onChange={setReturnDate}
                          view="month"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex flex-col flex-1">
                    <Label>Return Time</Label>
                    <Input
                      type="time"
                      value={returnTime}
                      onChange={(e) => setReturnTime(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Row 4: Filter & Search */}
              <div className="flex flex-col md:flex-row items-center gap-2 md:ml-0 mt-4">
                <div className="flex gap-2 justify-center md:justify-start">
                  <Button
                    variant={filter === "without" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setFilter("without")}
                  >
                    Without Driver
                  </Button>
                  <Button
                    variant={filter === "with" ? "default" : "outline"}
                    className="rounded-full"
                    onClick={() => setFilter("with")}
                  >
                    With Driver
                  </Button>
                </div>
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 mt-2 md:mt-0 md:ml-4"
                >
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
