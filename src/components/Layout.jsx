import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import StickyBar from "./StickyBar";
import CursorGlow from "./motion/CursorGlow";
import useFadeUp from "../hooks/useFadeUp";
import { DarkHeroProvider } from "../context/DarkHeroContext";

export default function Layout() {
  useFadeUp();

  return (
    <DarkHeroProvider>
      <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
        <CursorGlow />
        <Header />
        {/* Pages that open with a full-bleed dark hero cancel this padding
            with a matching negative margin, so their hero runs right up
            under the header. Everything else clears it normally. */}
        <main className="flex-grow pt-[88px] md:pt-[104px]">
          <Outlet />
        </main>
        <StickyBar />
        <Footer />
      </div>
    </DarkHeroProvider>
  );
}
