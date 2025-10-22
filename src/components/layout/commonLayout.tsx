import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface IProps {
  children: ReactNode;
}

export default function CommonLayout({ children }: IProps) {
  return (
    <div className=" min-h-screen flex flex-col">
      <Navbar />
      <div className="relative h-full w-full bg-gray-200 dark:bg-[#0b0e0a]">
        <div className="grow-1 z-50">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
