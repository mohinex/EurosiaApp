import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PricingPage from "./pages/Pricing";
import AppsPage from "./pages/Apps";
import SolutionsPage from "./pages/Solutions";
import MarketplacePage from "./pages/Marketplace";
import CloudPBX from "./pages/modules/CloudPBX";
import Cybersecurity from "./pages/modules/Cybersecurity";
import FieldForce from "./pages/modules/FieldForce";
import Settings from "./pages/dashboard/Settings";
import RolesPermissions from "./pages/dashboard/RolesPermissions";
import Companies from "./pages/dashboard/Companies";
import PaymentSettings from "./pages/dashboard/PaymentSettings";
import Licenses from "./pages/dashboard/Licenses";
import Devices from "./pages/dashboard/Devices";
import WebsiteCMS from "./pages/dashboard/WebsiteCMS";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import Diagram from "./pages/Diagram";
import DashboardLayout from "./components/DashboardLayout";
import SuperAdminDashboard from "./pages/dashboard/SuperAdminDashboard";
import TenantDashboard from "./pages/dashboard/TenantDashboard";
import FeedbackRenderer from "./components/FeedbackRenderer";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { syncService } from "./services/syncService";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.token);
  
  useEffect(() => {
    if (token) {
      syncService.startAutoSync();
    }
  }, [token]);

  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <FeedbackRenderer />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LayoutWrapper><Home /></LayoutWrapper>} />
          <Route path="/apps" element={<LayoutWrapper><AppsPage /></LayoutWrapper>} />
          <Route path="/solutions" element={<LayoutWrapper><SolutionsPage /></LayoutWrapper>} />
          <Route path="/marketplace" element={<LayoutWrapper><MarketplacePage /></LayoutWrapper>} />
          <Route path="/pricing" element={<LayoutWrapper><PricingPage /></LayoutWrapper>} />
          <Route path="/about" element={<LayoutWrapper><AboutPage /></LayoutWrapper>} />
          <Route path="/contact" element={<LayoutWrapper><ContactPage /></LayoutWrapper>} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardSelector />} />
            <Route path="super" element={<SuperAdminDashboard />} />
            <Route path="tenant" element={<TenantDashboard />} />
            <Route path="analytics" element={<Placeholder title="Analytics" />} />
            <Route path="companies" element={<Placeholder title="Companies" />} />
            <Route path="users" element={<Placeholder title="Users" />} />
            <Route path="roles" element={<RolesPermissions />} />
            <Route path="companies" element={<Companies />} />
            <Route path="payments" element={<PaymentSettings />} />
            <Route path="licenses" element={<Licenses />} />
            <Route path="devices" element={<Devices />} />
            <Route path="cms" element={<WebsiteCMS />} />
            <Route path="settings" element={<Settings />} />
            <Route path="apps" element={<Placeholder title="Apps & Modules" />} />
            <Route path="cloudpbx" element={<CloudPBX />} />
            <Route path="cybersecurity" element={<Cybersecurity />} />
            <Route path="fieldforce" element={<FieldForce />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

function DashboardSelector() {
  const user = useAuthStore(state => state.user);
  if (user?.role === "SUPER_ADMIN") return <SuperAdminDashboard />;
  return <TenantDashboard />;
}

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-3xl p-12 border border-gray-100 shadow-sm text-center">
       <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
       <p className="text-gray-500 max-w-md mx-auto">This module is under development. It will follow the exact UI patterns defined in the design specification.</p>
    </div>
  );
}
