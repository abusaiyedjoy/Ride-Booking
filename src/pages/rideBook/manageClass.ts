import { RideStatus } from "@/types";

export const getStatusBadgeColor = (status: RideStatus) => {
  switch (status) {
    case RideStatus.ACCEPTED:
      return "bg-green-100 text-green-800";
    case RideStatus.REQUESTED:
      return "bg-blue-100 text-blue-800";
    case RideStatus.IN_TRANSIT:
      return "bg-orange-100 text-orange-800";
    case RideStatus.COMPLETED:
      return "bg-emerald-100 text-emerald-800";
    case RideStatus.CANCELLED:
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getCategoryBadgeColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "budget sedan":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "comfort sedan":
      return "bg-green-100 text-green-800 border-green-200";
    case "premium sedan":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "mini microbus":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "standard bike":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "sport bike":
      return "bg-pink-100 text-pink-800 border-pink-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
