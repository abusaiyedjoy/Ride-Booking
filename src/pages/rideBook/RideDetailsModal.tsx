import { Separator } from "@/components/ui/separator";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Car,
  Bike,
  MapPin,
  Clock,
  Star,
  Users,
  Snowflake,
  Zap,
  Phone,
  MessageSquare,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategoryBadgeColor, getStatusBadgeColor } from "./manageClass";
import { IRide } from "@/types";

const RideDetailsModal = ({ ride }: { ride: IRide }) => {
  return (
    <div className="w-full">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3 text-foreground">
          {ride.vehicleType === "car" ? (
            <Car className="w-6 h-6" />
          ) : (
            <Bike className="w-6 h-6" />
          )}
          {ride.vehicleModel}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-6 mt-6">
        {/* Status and Category */}
        <div className="flex flex-wrap items-center gap-3">
          <Badge className={getCategoryBadgeColor(ride.vehicleCategory)}>
            {ride.vehicleCategory}
          </Badge>
          <Badge className={getStatusBadgeColor(ride.status)}>
            {ride.status.replace("_", " ")}
          </Badge>
          {ride.isEMI && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
            >
              <Zap className="w-3 h-3 mr-1" />
              EMI Available
            </Badge>
          )}
        </div>

        {/* Route Information */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-semibold mb-3 text-foreground">Route Details</h3>
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1 sm:mt-2"></div>
              <div>
                <p className="font-medium text-foreground">
                  Pickup: {ride.pickupLocation.address}
                </p>
                <p className="text-sm text-muted-foreground break-words">
                  Coordinates: {ride.pickupLocation.coordinates.join(", ")}
                </p>
              </div>
            </div>
            <div className="ml-3 border-l-2 border-border h-6 hidden sm:block"></div>
            <div className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-1 sm:mt-2"></div>
              <div>
                <p className="font-medium text-foreground">
                  Destination: {ride.destinationLocation.address}
                </p>
                <p className="text-sm text-muted-foreground break-words">
                  Coordinates: {ride.destinationLocation.coordinates.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Features */}
        <div>
          <h3 className="font-semibold mb-3 text-foreground">
            Vehicle Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{ride.seats} Seats</span>
            </div>
            {ride.hasAC && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Snowflake className="w-4 h-4 text-blue-500" />
                <span>Air Conditioning</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Duration: {ride.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Distance: {ride.distance}</span>
            </div>
          </div>
        </div>

        {/* Driver Information */}
        {ride.driverName && (
          <div>
            <h3 className="font-semibold mb-3 text-foreground">
              Driver Information
            </h3>
            <div className="bg-muted rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                <div>
                  <p className="font-medium text-foreground">
                    {ride.driverName}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-foreground">
                      {ride.driverRating}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {ride.driverPhone && (
                <p className="text-sm text-muted-foreground">
                  Phone: {ride.driverPhone}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Pricing */}
        <div>
          <h3 className="font-semibold mb-3 text-foreground">Fare Breakdown</h3>
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-foreground">
              <span>Base Fare</span>
              <span>₹{ride.fare ? Math.floor(ride.fare * 0.7) : 0}</span>
            </div>
            <div className="flex justify-between text-foreground">
              <span>Distance Charge</span>
              <span>₹{ride.fare ? Math.floor(ride.fare * 0.2) : 0}</span>
            </div>
            <div className="flex justify-between text-foreground">
              <span>Service Charge</span>
              <span>₹{ride.fare ? Math.floor(ride.fare * 0.1) : 0}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold text-lg text-foreground">
              <span>Total Fare</span>
              <span>₹{ride.fare?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button variant="outline" className="flex-1">
            Contact Driver
          </Button>
          <Button className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
            Book This Ride
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RideDetailsModal;
