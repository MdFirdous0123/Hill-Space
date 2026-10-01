import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';

// Lazy load pages for performance
const HomePage           = lazy(() => import('./pages/Home/HomePage'));
const ServicesPage       = lazy(() => import('./pages/Services/ServicesPage'));
const ServiceDetailPage  = lazy(() => import('./pages/Services/ServiceDetailPage'));
const PortfolioPage      = lazy(() => import('./pages/Portfolio/PortfolioPage'));
const HowItWorksPage     = lazy(() => import('./pages/HowItWorks/HowItWorksPage'));
const PriceEstimatorPage = lazy(() => import('./pages/PriceEstimator/PriceEstimatorPage'));
const AboutPage          = lazy(() => import('./pages/About/AboutPage'));
const ContactPage        = lazy(() => import('./pages/Contact/ContactPage'));
const LoginPage          = lazy(() => import('./pages/Auth/LoginPage'));
const SignupPage         = lazy(() => import('./pages/Auth/SignupPage'));

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/"                  element={<HomePage />} />
            <Route path="/services"          element={<ServicesPage />} />
            <Route path="/services/:slug"    element={<ServiceDetailPage />} />
            <Route path="/portfolio"         element={<PortfolioPage />} />
            <Route path="/how-it-works"      element={<HowItWorksPage />} />
            <Route path="/price-estimator"   element={<PriceEstimatorPage />} />
            <Route path="/about"             element={<AboutPage />} />
            <Route path="/contact"           element={<ContactPage />} />
            <Route path="/login"             element={<LoginPage />} />
            <Route path="/signup"            element={<SignupPage />} />
            <Route path="*"                  element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}

export default App;
