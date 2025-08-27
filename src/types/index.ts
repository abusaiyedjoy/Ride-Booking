import { ComponentType } from "react";

export type { ISendOtp, IVerifyOtp, ILogin } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ISidebarItem {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";


// Enums and Interfaces
export enum RideStatus {
  REQUESTED = "REQUESTED",
  ACCEPTED = "ACCEPTED",
  PICKED_UP = "PICKED_UP",
  IN_TRANSIT = "IN_TRANSIT",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  NO_DRIVER_FOUND = "NO_DRIVER_FOUND",
}

export interface ILocation {
  address: string;
  coordinates: [number, number];
}

export interface IRide {
  _id: string;
  riderId: string;
  driverId?: string;
  pickupLocation: ILocation;
  destinationLocation: ILocation;
  requestedAt: Date;
  acceptedAt?: Date;
  pickedUpAt?: Date;
  inTransitAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  status: RideStatus;
  fare?: number;
  cancellationReason?: string;
  riderRating?: number;
  createdAt: Date;
  updatedAt: Date;
  vehicleType: "car" | "bike";
  vehicleModel: string;
  duration: string;
  distance: string;
  driverName?: string;
  driverRating?: number;
  driverPhone?: string;
  seats: number;
  hasAC: boolean;
  isEMI: boolean;
  vehicleCategory: string;
}