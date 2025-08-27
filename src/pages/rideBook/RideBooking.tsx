import { useState, useMemo } from "react";
import { Car, Bike, X, Users, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import RideDetailsModal from "./RideDetailsModal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IRide, RideStatus } from "@/types";
import RideCard from './RideCard';

// Mock data
const mockRides: IRide[] = [
  {
    _id: "1",
    riderId: "rider1",
    driverId: "driver1",
    pickupLocation: { address: "Dhaka", coordinates: [90.4125, 23.8103] },
    destinationLocation: {
      address: "Chittagong",
      coordinates: [91.8313, 22.3569],
    },
    requestedAt: new Date(),
    status: RideStatus.REQUESTED,
    fare: 6057,
    createdAt: new Date(),
    updatedAt: new Date(),
    vehicleType: "car",
    vehicleModel: "Toyota Probox-Field",
    duration: "5h 8m",
    distance: "245 km",
    driverName: "Ahmed Rahman",
    driverRating: 4.8,
    driverPhone: "+8801712345678",
    seats: 4,
    hasAC: true,
    isEMI: true,
    vehicleCategory: "Budget Sedan",
  },
  {
    _id: "2",
    riderId: "rider1",
    driverId: "driver2",
    pickupLocation: { address: "Dhaka", coordinates: [90.4125, 23.8103] },
    destinationLocation: {
      address: "Chittagong",
      coordinates: [91.8313, 22.3569],
    },
    requestedAt: new Date(),
    status: RideStatus.ACCEPTED,
    fare: 6756,
    createdAt: new Date(),
    updatedAt: new Date(),
    vehicleType: "car",
    vehicleModel: "Toyota Corolla-Axio",
    duration: "5h 8m",
    distance: "245 km",
    driverName: "Karim Hassan",
    driverRating: 4.9,
    driverPhone: "+8801812345679",
    seats: 4,
    hasAC: true,
    isEMI: true,
    vehicleCategory: "Comfort Sedan",
  },
  {
    _id: "3",
    riderId: "rider1",
    driverId: "driver3",
    pickupLocation: { address: "Dhaka", coordinates: [90.4125, 23.8103] },
    destinationLocation: {
      address: "Chittagong",
      coordinates: [91.8313, 22.3569],
    },
    requestedAt: new Date(),
    status: RideStatus.REQUESTED,
    fare: 7688,
    createdAt: new Date(),
    updatedAt: new Date(),
    vehicleType: "car",
    vehicleModel: "Toyota Allion-Premio",
    duration: "5h 8m",
    distance: "245 km",
    driverName: "Rahim Khan",
    driverRating: 4.7,
    driverPhone: "+8801912345680",
    seats: 4,
    hasAC: true,
    isEMI: true,
    vehicleCategory: "Premium Sedan",
  },
  {
    _id: "4",
    riderId: "rider1",
    driverId: "driver4",
    pickupLocation: { address: "Dhaka", coordinates: [90.4125, 23.8103] },
    destinationLocation: {
      address: "Chittagong",
      coordinates: [91.8313, 22.3569],
    },
    requestedAt: new Date(),
    status: RideStatus.REQUESTED,
    fare: 450,
    createdAt: new Date(),
    updatedAt: new Date(),
    vehicleType: "bike",
    vehicleModel: "Honda CB Shine",
    duration: "1h 15m",
    distance: "25 km",
    driverName: "Sabbir Ahmed",
    driverRating: 4.6,
    driverPhone: "+8801612345681",
    seats: 1,
    hasAC: false,
    isEMI: false,
    vehicleCategory: "Standard Bike",
  },
  {
    _id: "5",
    riderId: "rider1",
    driverId: "driver5",
    pickupLocation: { address: "Dhaka", coordinates: [90.4125, 23.8103] },
    destinationLocation: {
      address: "Chittagong",
      coordinates: [91.8313, 22.3569],
    },
    requestedAt: new Date(),
    status: RideStatus.REQUESTED,
    fare: 580,
    createdAt: new Date(),
    updatedAt: new Date(),
    vehicleType: "bike",
    vehicleModel: "Yamaha FZ-S",
    duration: "1h 12m",
    distance: "25 km",
    driverName: "Nasir Uddin",
    driverRating: 4.8,
    driverPhone: "+8801512345682",
    seats: 1,
    hasAC: false,
    isEMI: false,
    vehicleCategory: "Sport Bike",
  },
];

const RideBookingPage = () => {
  const [activeTab, setActiveTab] = useState("car");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedRide, setSelectedRide] = useState<IRide | null>(null);

  // Filter states
  const [filters, setFilters] = useState({
    category: "all",
    seats: "all",
    fareRange: [0, 10000],
    sortBy: "fare-low",
  });

  // Filtered rides
  const filteredRides = useMemo(() => {
    let rides = mockRides.filter((ride) => ride.vehicleType === activeTab);

    if (filters.category !== "all") {
      rides = rides.filter((ride) =>
        ride.vehicleCategory.toLowerCase().includes(filters.category)
      );
    }

    if (filters.seats !== "all") {
      rides = rides.filter((ride) => ride.seats >= parseInt(filters.seats));
    }

    rides = rides.filter(
      (ride) =>
        (ride.fare || 0) >= filters.fareRange[0] &&
        (ride.fare || 0) <= filters.fareRange[1]
    );

    // Sort rides
    rides.sort((a, b) => {
      switch (filters.sortBy) {
        case "fare-low":
          return (a.fare || 0) - (b.fare || 0);
        case "fare-high":
          return (b.fare || 0) - (a.fare || 0);
        case "duration":
          return a.duration.localeCompare(b.duration);
        default:
          return 0;
      }
    });

    return rides;
  }, [activeTab, filters]);

  const clearFilters = () => {
    setFilters({
      category: "all",
      seats: "all",
      fareRange: [0, 10000],
      sortBy: "fare-low",
    });
  };

  return (
    <div className="min-h-screen container mx-auto bg-background text-foreground roboto-slab">
      {/* Header Stats */}
      <div className="bg-card rounded-lg mt-2 border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cars */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10">
              <div className="p-3 rounded-full bg-primary/20">
                <Car className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Cars Available</p>
                <p className="text-xl font-bold text-primary">₹ 6057-31987</p>
              </div>
            </div>

            {/* Bikes */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-secondary/10">
              <div className="p-3 rounded-full bg-secondary/20">
                <Bike className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Bikes Available</p>
                <p className="text-xl font-bold text-secondary-foreground">
                  ₹ 450-800
                </p>
              </div>
            </div>

            {/* Shared Rides */}
            <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/10">
              <div className="p-3 rounded-full bg-accent/20">
                <Users className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Shared Rides</p>
                <p className="text-xl font-bold text-accent-foreground">
                  ₹ 0-0
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Header with Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Pick a Ride Option</h1>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            {(filters.category !== "all" ||
              filters.seats !== "all" ||
              filters.sortBy !== "fare-low") && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="flex items-center gap-2 text-destructive hover:text-destructive"
              >
                <X className="w-4 h-4" />
                Clear All Filter
              </Button>
            )}
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="mb-6 bg-card text-card-foreground border border-border">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Category */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Category
                  </Label>
                  <Select
                    value={filters.category}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, category: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="budget">Budget</SelectItem>
                      <SelectItem value="comfort">Comfort</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="sport">Sport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Seats */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Seats
                  </Label>
                  <Select
                    value={filters.seats}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, seats: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any Seats" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Seats</SelectItem>
                      <SelectItem value="1">1+ Seats</SelectItem>
                      <SelectItem value="2">2+ Seats</SelectItem>
                      <SelectItem value="4">4+ Seats</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Sort By
                  </Label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, sortBy: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fare-low">
                        Fare: Low to High
                      </SelectItem>
                      <SelectItem value="fare-high">
                        Fare: High to Low
                      </SelectItem>
                      <SelectItem value="duration">Duration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Fare Range */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Fare Range: ₹{filters.fareRange[0]} - ₹
                    {filters.fareRange[1]}
                  </Label>
                  <Slider
                    value={filters.fareRange}
                    onValueChange={(value) =>
                      setFilters((prev) => ({ ...prev, fareRange: value }))
                    }
                    max={10000}
                    step={100}
                    className="mt-2"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Vehicle Type Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto grid-cols-2 mb-6 bg-muted">
            <TabsTrigger value="car" className="flex items-center gap-2">
              <Car className="w-4 h-4" />
              Cars
            </TabsTrigger>
            <TabsTrigger value="bike" className="flex items-center gap-2">
              <Bike className="w-4 h-4" />
              Bikes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="car">
            <div className="space-y-4">
              {filteredRides.length === 0 ? (
                <Card className="bg-card border border-border">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p>No cars available matching your filters.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredRides.map((ride) => (
                  <RideCard
                    key={ride._id}
                    ride={ride}
                    onDetailsClick={setSelectedRide}
                  />
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="bike">
            <div className="space-y-4">
              {filteredRides.length === 0 ? (
                <Card className="bg-card border border-border">
                  <CardContent className="p-8 text-center text-muted-foreground">
                    <Bike className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p>No bikes available matching your filters.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredRides.map((ride) => (
                  <RideCard
                    key={ride._id}
                    ride={ride}
                    onDetailsClick={setSelectedRide}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Ride Details Modal */}
      <Dialog open={!!selectedRide} onOpenChange={() => setSelectedRide(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card text-card-foreground border border-border">
          {selectedRide && <RideDetailsModal ride={selectedRide} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RideBookingPage;
