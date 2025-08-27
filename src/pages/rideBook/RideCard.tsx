import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Card } from "@/components/ui/card";
import {
  Bike,
  Car,
  ChevronRight,
  Clock,
  Luggage,
  Snowflake,
  Users,
  Zap,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getCategoryBadgeColor } from "./manageClass";
import { IRide } from "@/types";

const RideCard = ({
  ride,
  onDetailsClick,
}: {
  ride: IRide;
  onDetailsClick: (ride: IRide) => void;
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow bg-card text-card-foreground border border-border">
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Left: Vehicle Info */}
          <div className="flex items-center gap-4 flex-shrink-0">
            <div className="p-3 rounded-full bg-muted">
              {ride.vehicleType === "car" ? (
                <Car className="w-8 h-8 text-muted-foreground" />
              ) : (
                <Bike className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div>
              <Badge
                className={`mb-2 ${getCategoryBadgeColor(
                  ride.vehicleCategory
                )}`}
              >
                {ride.vehicleCategory}
              </Badge>
              {ride.isEMI && (
                <Badge
                  variant="secondary"
                  className="ml-2 mb-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                >
                  <Zap className="w-3 h-3 mr-1" />
                  EMI Available
                </Badge>
              )}
              <h3 className="font-semibold text-foreground">
                {ride.vehicleModel}
              </h3>
              <p className="text-sm text-muted-foreground">
                or similar • {ride.vehicleModel.split("-")[1] || "2020"}
              </p>
            </div>
          </div>

          {/* Center: Route Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-3">
              <div className="text-center">
                <p className="font-semibold text-foreground">
                  {ride.pickupLocation.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {ride.pickupLocation.address}
                </p>
              </div>

              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-px bg-border"></div>
                <div className="text-center px-2">
                  <Clock className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">
                    {ride.duration}
                  </p>
                </div>
                <div className="flex-1 h-px bg-border"></div>
              </div>

              <div className="text-center">
                <p className="font-semibold text-foreground">
                  {ride.destinationLocation.address}
                </p>
                <p className="text-sm text-muted-foreground">
                  {ride.destinationLocation.address}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{ride.seats} Seats</span>
              </div>
              {ride.hasAC && (
                <div className="flex items-center gap-1">
                  <Snowflake className="w-4 h-4" />
                  <span>AC</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Luggage className="w-4 h-4" />
                <span>1-2 Suitcase</span>
              </div>
            </div>
          </div>

          {/* Right: Price & Action */}
          <div className="flex flex-col items-end gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                Approximate fare BDT
              </p>
              <p className="text-2xl font-bold text-foreground">
                ₹{ride.fare?.toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => onDetailsClick(ride)}
                className="text-destructive border-destructive hover:bg-destructive/10"
              >
                See all Details
              </Button>
              <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                Select Car
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideCard;
