import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Treatments from "./pages/Treatments";
import TreatmentMenu from "./pages/TreatmentMenu";
import HydrafacialDetail from "./pages/HydrafacialDetail";
import BookConsultation from "./pages/BookConsultation";
import OurDoctors from "./pages/OurDoctors";
import DoctorProfile from "./pages/DoctorProfile";
import ResultsGallery from "./pages/ResultsGallery";
import SkincareBoutique from "./pages/SkincareBoutique";
import ProductDetail from "./pages/ProductDetail";
import SpecialOffers from "./pages/SpecialOffers";
import CartCheckout from "./pages/CartCheckout";
import AboutUs from "./pages/AboutUs";
import InsightsAdvice from "./pages/InsightsAdvice";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/treatments" element={<Treatments />} />
        <Route path="/treatment-menu" element={<TreatmentMenu />} />
        <Route path="/treatments/hydrafacial" element={<HydrafacialDetail />} />
        <Route path="/book-consultation" element={<BookConsultation />} />
        <Route path="/doctors" element={<OurDoctors />} />
        <Route path="/doctors/:id" element={<DoctorProfile />} />
        <Route path="/results" element={<ResultsGallery />} />
        <Route path="/shop" element={<SkincareBoutique />} />
        <Route path="/shop/:id" element={<ProductDetail />} />
        <Route path="/offers" element={<SpecialOffers />} />
        <Route path="/cart" element={<CartCheckout />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/insights" element={<InsightsAdvice />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
