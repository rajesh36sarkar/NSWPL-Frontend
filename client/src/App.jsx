import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ProductsPage from "./pages/ProductsPage";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

// Admin
import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

// Protected Route
import ProtectedRoute from "./components/ProtectedRoute";

// Floating Contact Buttons
import WhatsAppButton from "./components/common/WhatsAppButton";
import CallButton from "./components/common/CallButton";

// Styles
import "./App.css";

// Layout wrapper to conditionally hide header/footer on admin routes
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main style={{ minHeight: "70vh" }}>{children}</main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <LayoutWrapper>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LayoutWrapper>

      {/* Floating Contact Buttons - Only visible on public pages */}
      <FloatingButtons />
    </BrowserRouter>
  );
}

// Floating Buttons Component (Only shows on public pages)
const FloatingButtons = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Don't show floating buttons on admin pages
  if (isAdminRoute) {
    return null;
  }

  return (
    <div className="floating-buttons">
      
      <WhatsAppButton position="fixed" />
      <CallButton variant="floating" phoneNumber="+919830770400" />
    </div>
  );
};

export default App;