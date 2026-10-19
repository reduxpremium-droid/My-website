/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CODELIX Official Web Application
 */

import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { NewsletterRibbon } from './components/NewsletterRibbon';
import { AuthModal } from './pages/Auth/AuthModal';

import { Home } from './pages/Home';
import { About } from './pages/About';
import { Services } from './pages/Services';
import { Offers } from './pages/Offers';
import { Portfolio } from './pages/Portfolio';
import { Contact } from './pages/Contact';
import { Careers } from './pages/Careers';
import { ApplicationTracking } from './pages/ApplicationTracking';
import { Cart } from './pages/Cart';
import { CustomerDashboard } from './pages/Customer/CustomerDashboard';
import { EmployeeDashboard } from './pages/Employee/EmployeeDashboard';
import { AdminDashboard } from './pages/Admin/AdminDashboard';
import { LegalPage } from './pages/Legal/LegalPage';

export function AppContent() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [viewParams, setViewParams] = useState<any>({});
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);

  const navigateTo = (view: string, params: any = {}) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  // Ensure scroll to top on any view or parameter change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [currentView]);

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 selection:bg-cyan-500 selection:text-white">
      {/* Sticky Header */}
      <Navbar
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenAuth={() => setAuthModalOpen(true)}
      />

      {/* Animated 10% Discount Newsletter Ribbon */}
      <NewsletterRibbon onNavigate={navigateTo} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'home' && <Home onNavigate={navigateTo} />}

        {currentView === 'about' && <About onNavigate={navigateTo} />}

        {currentView === 'services' && (
          <Services
            onNavigate={navigateTo}
            initialCategory={viewParams?.category}
          />
        )}

        {currentView === 'offers' && <Offers onNavigate={navigateTo} />}

        {currentView === 'portfolio' && <Portfolio onNavigate={navigateTo} />}

        {currentView === 'careers' && <Careers onNavigate={navigateTo} />}

        {currentView === 'track-application' && (
          <ApplicationTracking
            initialReference={viewParams?.reference}
            initialEmail={viewParams?.email}
          />
        )}

        {currentView === 'contact' && (
          <Contact
            initialTab={viewParams?.tab || 'quote'}
            initialService={viewParams?.service}
          />
        )}

        {currentView === 'cart' && <Cart onNavigate={navigateTo} />}

        {currentView === 'customer-dashboard' && (
          <CustomerDashboard
            onNavigate={navigateTo}
            initialTab={viewParams?.tab || 'overview'}
          />
        )}

        {currentView === 'employee-dashboard' && (
          <EmployeeDashboard onNavigate={navigateTo} />
        )}

        {currentView === 'admin-dashboard' && (
          <AdminDashboard
            onNavigate={navigateTo}
            initialTab={viewParams?.tab || 'overview'}
          />
        )}

        {currentView === 'legal' && (
          <LegalPage
            initialTab={viewParams?.tab || 'privacy'}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Official Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Authentication & Verification Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}
