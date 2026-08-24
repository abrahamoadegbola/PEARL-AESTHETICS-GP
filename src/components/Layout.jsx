import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import StickyBar from "./StickyBar";
import useFadeUp from "../hooks/useFadeUp";

export default function Layout() {
  useFadeUp();

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-[88px] md:pt-[104px]">
        <Outlet />
      </main>
      <StickyBar />
      <Footer />
    </div>
  );
}
