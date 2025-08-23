import App from "@/App";
import About from "@/pages/About/About";
import Login from "@/pages/Authentication/Login";
import Register from "@/pages/Authentication/Register";
import Contact from "@/pages/Contact/Contact";
import FAQ from "@/pages/FAQ/FAQ";
import Features from "@/pages/Features/Features";
import Home from "@/pages/Home/Home";
import Verify from "@/pages/Verify/Verify";
import { createBrowserRouter } from "react-router";

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
]);