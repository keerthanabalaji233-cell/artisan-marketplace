import React, { createContext, useContext, useState, useEffect } from "react";
import { sampleProducts, sampleBuyers, sampleOrders, initialArtisanProfile } from "../data/mockData";
import { translations } from "../data/translations";
import { playAudioFeedback, speakText } from "../utils/speechHelper";
import confetti from "canvas-confetti";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Navigation: 'landing', 'dashboard', 'studio', 'cataloger', 'pricing', 'catalog', 'marketplace', 'orders', 'profile'
  const [currentTab, setCurrentTab] = useState("landing");
  const [currentLang, setCurrentLang] = useState("en");
  
  // Accessibility & low-literacy features
  const [audioAssistEnabled, setAudioAssistEnabled] = useState(true);
  const [largeFontMode, setLargeFontMode] = useState(false);

  // Core Data
  const [artisan, setArtisan] = useState(initialArtisanProfile);
  const [products, setProducts] = useState(sampleProducts);
  const [orders, setOrders] = useState(sampleOrders);
  const [buyers] = useState(sampleBuyers);

  // Staged product being created across Studio -> Cataloger -> Pricing pipeline
  const [stagedProduct, setStagedProduct] = useState({
    id: `prod_draft_${Date.now()}`,
    name: "Handwoven Pochampally Cotton Saree",
    nameHindi: "पारंपरिक हथकरघा पोचमपल्ली सूती साड़ी",
    category: "Textiles",
    craftType: "Pochampally Ikat Weaving",
    price: 2450,
    costPrice: 1700,
    marketPriceRange: "₹2,200 – ₹2,700",
    stock: 12,
    status: "Draft",
    rawImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=80",
    enhancedImage: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=85",
    shortDescription: "Authentic double-ikat pure cotton saree woven with geometric heritage motifs and natural dyes.",
    detailedDescription: "Woven on traditional pit-looms by artisan Lakshmi Devi, this Pochampally Ikat saree reflects 400 years of Telangana weaving heritage. Every warp and weft thread is precision tie-dyed before weaving to create subtle, geometric feather patterns. Breathable, hypoallergenic 100% fine count cotton suited for all-day elegance.",
    materials: "100% Handspun Combed Cotton (80s count), Natural Vegetable Dyes",
    dimensions: "5.5 meters length + 0.8 meter unstitched blouse piece",
    weight: "480 grams",
    color: "Indigo Blue with Terracotta Rust Border",
    careInstructions: "First wash dry clean recommended. Subsequent gentle hand wash in cold water with mild liquid detergent. Dry in indirect shade.",
    keywords: ["handloom", "ikat saree", "pochampally", "sustainable fashion", "pure cotton", "gi certified"],
    hsnCode: "50072010",
    rawMaterialCost: 750,
    labourHours: 18,
    labourCost: 950,
    packagingCost: 120,
    platformFee: 180,
    profitMargin: 450,
    location: "Pochampally, Telangana",
    artisanName: "Lakshmi Devi",
  });

  // Notifications
  const [notifications, setNotifications] = useState([
    {
      id: "notif_welcome",
      title: "Welcome to ArtisanAI",
      message: "Ready to digitize your handcrafted products and reach bulk buyers.",
      type: "info",
      time: "Just now",
    },
  ]);

  // Guided Tour State for Evaluator / Hackathon Demo (Steps 1 to 7)
  const [guidedTourStep, setGuidedTourStep] = useState(null);

  // Active Modals & Drawers
  const [activeModal, setActiveModal] = useState(null); // 'productDetail', 'quoteModal', 'orderChat', 'architectureModal', 'aiAssistant'
  const [modalData, setModalData] = useState(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  // Active translation dictionary
  const t = translations[currentLang] || translations.en;

  // Add toast notification
  const notify = (title, message, type = "success") => {
    const id = `notif_${Date.now()}`;
    setNotifications((prev) => [
      { id, title, message, type, time: "Just now" },
      ...prev.slice(0, 7),
    ]);
    if (type === "success") {
      playAudioFeedback("success");
    }

    // Auto dismiss after 5s
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5500);
  };

  // Trigger low-literacy read aloud if audio assist is on
  const speakIfEnabled = (text) => {
    if (audioAssistEnabled) {
      speakText(text, currentLang);
    }
  };

  // Add or update staged product
  const updateStagedProduct = (fields) => {
    setStagedProduct((prev) => ({ ...prev, ...fields }));
  };

  // Publish staged product to catalog
  const publishStagedProduct = () => {
    const newProduct = {
      ...stagedProduct,
      id: `prod_${Date.now().toString().slice(-4)}`,
      status: "Published",
      views: 1,
      enquiriesCount: 0,
      createdDate: new Date().toISOString().split("T")[0],
    };

    setProducts((prev) => [newProduct, ...prev]);
    notify("Product Published Successfully", "Your handcrafted item is now live and discoverable by B2B buyers.", "success");
    
    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#A73A24", "#2D6A4F", "#D4A373", "#E76F51"],
      });
    } catch {
      // safe fallback
    }

    return newProduct;
  };

  // Toggle or update status of any product
  const updateProductStatus = (productId, newStatus) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, status: newStatus } : p))
    );
    notify("Status Updated", `Product status changed to ${newStatus}.`, "info");
  };

  // Delete product
  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    notify("Product Removed", "The product has been removed from your digital catalog.", "info");
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    notify("Order Updated", `Order ${orderId} is now marked as ${newStatus}.`, "success");
  };

  // Send a quote or enquiry to a B2B buyer
  const sendBuyerEnquiry = ({ buyerId, buyerName, productName, quantity, proposedPrice, notes }) => {
    const newOrder = {
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      buyerName: buyerName,
      buyerContact: "+91 98450 " + Math.floor(10000 + Math.random() * 90000),
      buyerEmail: `procure@${buyerName.toLowerCase().replace(/[^a-z]/g, "")}.in`,
      productName: productName,
      productId: "prod_001",
      category: "Textiles",
      quantity: Number(quantity) || 50,
      unitPrice: Number(proposedPrice) || 2200,
      totalAmount: (Number(quantity) || 50) * (Number(proposedPrice) || 2200),
      advancePaid: 0,
      balanceDue: (Number(quantity) || 50) * (Number(proposedPrice) || 2200),
      status: "New Enquiry",
      statusColor: "amber",
      date: new Date().toISOString().split("T")[0],
      deadline: "2026-11-15",
      shippingAddress: "Buyer Regional Fulfillment Hub",
      notes: notes || "Direct quotation submitted by artisan.",
      messages: [
        {
          sender: "artisan",
          text: `Namaste, we have submitted a formal quotation for ${quantity} units at ₹${proposedPrice}/unit. ${notes}`,
          time: "Just now",
        },
      ],
    };

    setOrders((prev) => [newOrder, ...prev]);
    notify("Enquiry Sent Successfully", `Your quotation has been delivered to ${buyerName}. A new enquiry is logged in Orders.`, "success");
    return newOrder;
  };

  // Guided 7-step demo walkthrough controller
  const startGuidedTour = () => {
    setGuidedTourStep(1);
    setCurrentTab("dashboard");
    notify("Interactive Walkthrough Started", "Step 1: Welcome to the Artisan Dashboard. Click 'Add Product' to begin.", "info");
  };

  const nextTourStep = () => {
    if (guidedTourStep === null) return;
    const next = guidedTourStep + 1;
    if (next > 7) {
      setGuidedTourStep(null);
      notify("Walkthrough Completed! 🎉", "You completed the full Digitize → Enhance → Catalog → Price → Publish → Connect → Sell workflow!", "success");
      try {
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
      } catch {}
      return;
    }

    setGuidedTourStep(next);

    // Navigate to appropriate screen for each step
    if (next === 2) {
      setCurrentTab("studio");
      notify("Step 2: AI Image Studio", "Upload raw workshop photo and enhance it with studio lighting & clean background.", "info");
    } else if (next === 3) {
      setCurrentTab("cataloger");
      notify("Step 3: AI Product Cataloger", "Speak in your regional language. AI transcribes and generates rich bilingual descriptions.", "info");
    } else if (next === 4) {
      setCurrentTab("pricing");
      notify("Step 4: AI Smart Pricing", "Review calculated production costs, fair wages, and market benchmarks.", "info");
    } else if (next === 5) {
      setCurrentTab("catalog");
      publishStagedProduct();
      notify("Step 5: Published to Digital Catalog", "Your product is now listed and ready for domestic and global B2B buyers.", "success");
    } else if (next === 6) {
      setCurrentTab("marketplace");
      notify("Step 6: Connect With Buyers", "Browse verified B2B bulk requirements and government marketplace opportunities.", "info");
    } else if (next === 7) {
      setCurrentTab("orders");
      // Add incoming simulated enquiry
      notify("Step 7: Buyer Enquiry Received!", "IndieCraft Retailer sent a bulk enquiry for 100 units. View in Orders & Enquiries.", "success");
    }
  };

  const stopGuidedTour = () => {
    setGuidedTourStep(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        currentLang,
        setCurrentLang,
        t,
        audioAssistEnabled,
        setAudioAssistEnabled,
        largeFontMode,
        setLargeFontMode,
        artisan,
        setArtisan,
        products,
        orders,
        buyers,
        stagedProduct,
        updateStagedProduct,
        publishStagedProduct,
        updateProductStatus,
        deleteProduct,
        updateOrderStatus,
        sendBuyerEnquiry,
        notifications,
        notify,
        speakIfEnabled,
        guidedTourStep,
        startGuidedTour,
        nextTourStep,
        stopGuidedTour,
        activeModal,
        setActiveModal,
        modalData,
        setModalData,
        aiAssistantOpen,
        setAiAssistantOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
