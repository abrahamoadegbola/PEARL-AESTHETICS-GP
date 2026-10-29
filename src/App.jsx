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
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import AboutUs from "./pages/AboutUs";
import InsightsAdvice from "./pages/InsightsAdvice";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminTreatments from "./pages/admin/AdminTreatments";
import AdminStaff from "./pages/admin/AdminStaff";
import AcceptInvite from "./pages/admin/AcceptInvite";

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
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/insights" element={<InsightsAdvice />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/accept-invite" element={<AcceptInvite />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="treatments" element={<AdminTreatments />} />
        <Route path="staff" element={<AdminStaff />} />
      </Route>
    </Routes>
  );
}
