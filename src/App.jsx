import React, { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { BottomNav } from "./components/layout/BottomNav";
import { GuidedTourBar } from "./components/layout/GuidedTourBar";
import { ToastContainer } from "./components/common/ToastContainer";
import { AIAssistantDrawer } from "./components/common/AIAssistantDrawer";
import { ArchitectureModal } from "./components/common/ArchitectureModal";

// Pages
import { LandingPage } from "./components/landing/LandingPage";
import { ArtisanDashboard } from "./components/dashboard/ArtisanDashboard";
import { ImageStudio } from "./components/studio/ImageStudio";
import { VoiceCataloger } from "./components/cataloger/VoiceCataloger";
import { DynamicPricing } from "./components/pricing/DynamicPricing";
import { ProductCatalog } from "./components/catalog/ProductCatalog";
import { B2BMarketplace } from "./components/marketplace/B2BMarketplace";
import { OrdersManager } from "./components/orders/OrdersManager";
import { ArtisanProfile } from "./components/profile/ArtisanProfile";

import "./App.css";

const MainAppContent = () => {
  const { currentTab } = useApp();
  const [architectureOpen, setArchitectureOpen] = useState(false);

  // Render active view based on current navigation state
  const renderCurrentView = () => {
    switch (currentTab) {
      case "landing":
        return <LandingPage />;
      case "dashboard":
        return <ArtisanDashboard />;
      case "studio":
        return <ImageStudio />;
      case "cataloger":
        return <VoiceCataloger />;
      case "pricing":
        return <DynamicPricing />;
      case "catalog":
        return <ProductCatalog />;
      case "marketplace":
        return <B2BMarketplace />;
      case "orders":
        return <OrdersManager />;
      case "profile":
        return <ArtisanProfile />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="app-container">
      {/* Toast Notification Stream */}
      <ToastContainer />

      {/* Guided Tour Banner (visible during 7-step demo) */}
      <GuidedTourBar />

      {/* Desktop Left Sidebar (hidden on mobile) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="main-content-wrapper">
        {/* Top Navbar */}
        <Navbar onOpenArchitecture={() => setArchitectureOpen(true)} />

        {/* Active View Container */}
        <main style={{ minHeight: "calc(100vh - 140px)" }}>
          {renderCurrentView()}
        </main>
      </div>

      {/* Mobile Bottom Navigation (hidden on desktop) */}
      <BottomNav />

      {/* Floating AI Sahayak Assistant Drawer */}
      <AIAssistantDrawer />

      {/* Technical Architecture & Database Schema Inspector Modal */}
      <ArchitectureModal
        isOpen={architectureOpen}
        onClose={() => setArchitectureOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
