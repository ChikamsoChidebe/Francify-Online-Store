import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNavBar from './components/BottomNavBar';
import ScrollToTop from './components/ScrollToTop';

// Pages
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProductsPage from './pages/ProductsPage';
import CategoryProductsPage from './pages/CategoryProductsPage';
import CategoriesPage from './pages/CategoriesPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import OrdersPage from './pages/OrdersPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import WishlistPage from './pages/WishlistPage';
import SalePage from './pages/SalePage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFoundPage from './pages/NotFoundPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import BlogPage from './pages/BlogPage';
import NotificationsPage from './pages/NotificationsPage';
import HelpPage from './pages/HelpPage';
import TrackOrderPage from './pages/TrackOrderPage';
import Terms from './pages/Terms';
import Shipping from './pages/Shipping';
import FAQ from './pages/FAQ';
import LoadingSpinner from './components/LoadingSpinner';
import WarrantySupportPage from './pages/WarrantySupportPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminUserManagement from './components/AdminUserManagement';
import AdminProductManagement from './components/AdminProductManagement';
import AdminReports from './components/AdminReports';

// --- FIX: isAdmin should be used as a boolean, not a function ---
const AdminRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin) { // <-- FIXED: removed ()
    return <Navigate to="/" replace />;
  }
  return children;
};

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay or wait for actual loading event
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5 seconds delay

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/categories" element={<CategoriesPage />} />
                <Route path="/category/:categoryId" element={<CategoryProductsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orderdetails/:id" element={<OrderDetailsPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/sale" element={<SalePage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/notifications" element={<NotificationsPage />} />
                <Route path="/help" element={<HelpPage />} />
                <Route path="/track-order" element={<TrackOrderPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Terms />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/warranty-support" element={<WarrantySupportPage />} />
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminPage />
                  </AdminRoute>
                } />
                <Route path="/admin/products/new" element={
                  <AdminRoute>
                    <AdminProductManagement />
                  </AdminRoute>
                } />
                <Route path="/admin/users" element={
                  <AdminRoute>
                    <AdminUserManagement />
                  </AdminRoute>
                } />
                <Route path="/admin/reports" element={
                  <AdminRoute>
                    <AdminReports />
                  </AdminRoute>
                } />
              </Routes>
            </main>
            <Footer />
            <BottomNavBar />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;