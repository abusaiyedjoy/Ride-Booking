import App from "@/App";
import { RiderDriverForm } from "@/components/AuthenticationForm/RiderDriverForm/RiderDriverForm";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import About from "@/pages/About/About";
import AdminProfilePage from "@/pages/admin/AdminProfile";
import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import Contact from "@/pages/Contact/Contact";
import DriverProfilePage from "@/pages/driver/Profile";
import FAQ from "@/pages/FAQ/FAQ";
import Features from "@/pages/Features/Features";
import Home from "@/pages/Home/Home";
import RideBookingPage from "@/pages/rideBook/RideBooking";
import RiderProfilePage from "@/pages/rider/Profile";
import Verify from "@/pages/Verify/Verify";
import { createBrowserRouter } from "react-router";
import RideRequestForm from './../pages/rideBook/RideBookinForm';

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        Component: About,
        path: "about",
      },
      {
        path: "rides",
        Component: RideBookingPage,
      },
      {
        Component: Features,
        path: "features",
      },
      {
        Component: Contact,
        path: "contact",
      },
      {
        Component: FAQ,
        path: "faq",
      },
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: RiderDriverForm,
    path: "/create",
  },
  {
    Component: RideRequestForm,
    path: "/ride-request",
  },
  

  // Rider Routes
  {
    path: "/rider",
    Component: (props) => <DashboardLayout role="RIDER" {...props} />,
    children: [
      {
        path: "profile",
        Component: RiderProfilePage,
      },
      
    ],
  },

  // Driver Routes
  {
    path: "/driver",
    Component: (props) => <DashboardLayout role="DRIVER" {...props} />,
    children: [
      {
        path: "profile",
        Component: DriverProfilePage,
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    Component: (props) => <DashboardLayout role="SUPER-ADMIN" {...props} />,
    children: [
      {
        path: "profile",
        Component: AdminProfilePage,
      },
    ],
  },
]);
