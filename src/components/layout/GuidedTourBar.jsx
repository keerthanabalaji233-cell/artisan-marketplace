import React from "react";
import { useApp } from "../../context/AppContext";
import { Sparkles, ArrowRight, X, CheckCircle2 } from "lucide-react";

export const GuidedTourBar = () => {
  const { guidedTourStep, nextTourStep, stopGuidedTour } = useApp();

  if (guidedTourStep === null) return null;

  const tourSteps = [
    {
      step: 1,
      title: "Step 1: Artisan Dashboard",
      instruction: "Welcome! Tap '📷 Add Product' or 'Next' to digitize a handcrafted Pochampally Saree.",
      nextBtn: "Go to AI Studio ➔",
    },
    {
      step: 2,
      title: "Step 2: AI Image Studio",
      instruction: "The raw workshop photo has dim light and creases. Tap '✨ Enhance with AI' to clean background and balance lighting.",
      nextBtn: "Next: Voice Cataloger ➔",
    },
    {
      step: 3,
      title: "Step 3: Multilingual Voice Cataloger",
      instruction: "Tap 'Tap to Speak' or select a regional voice preset (Tamil/Hindi). AI transcribes speech & writes structured catalog.",
      nextBtn: "Next: Smart Pricing ➔",
    },
    {
      step: 4,
      title: "Step 4: AI Dynamic Pricing Assistant",
      instruction: "AI analyzes raw materials, loom weaving hours, and fair artisan living wages to suggest a fair ₹2,450 price.",
      nextBtn: "Next: Publish Product ➔",
    },
    {
      step: 5,
      title: "Step 5: Published to Digital Catalog",
      instruction: "Your product is now published with high-res photos, craft provenance, and B2B wholesale tiers.",
      nextBtn: "Next: Connect With Buyers ➔",
    },
    {
      step: 6,
      title: "Step 6: B2B Marketplace & Linkage",
      instruction: "Connect with verified boutique chains & government marketplace tenders. Send custom quotes with 1 click.",
      nextBtn: "Next: View Orders ➔",
    },
    {
      step: 7,
      title: "Step 7: Orders & Buyer Enquiry Received",
      instruction: "A retail buyer has sent an enquiry for 100 units. You can accept, negotiate, and view advance payments.",
      nextBtn: "Finish Demo 🎉",
    },
  ];

  const current = tourSteps.find((s) => s.step === guidedTourStep) || tourSteps[0];

  return (
    <div className="guided-tour-bar">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.25)",
            borderRadius: "50%",
            width: "32px",
            height: "32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Sparkles size={18} color="#FFFFFF" />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 800, fontSize: "0.92rem", display: "flex", alignItems: "center", gap: "6px" }}>
            <span>{current.title}</span>
            <span style={{ fontSize: "0.75rem", backgroundColor: "rgba(0,0,0,0.2)", padding: "1px 6px", borderRadius: "10px" }}>
              {guidedTourStep} / 7
            </span>
          </div>
          <div style={{ fontSize: "0.8rem", opacity: 0.95, whiteSpace: "normal", lineHeight: 1.3 }}>
            {current.instruction}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={nextTourStep}
          style={{
            backgroundColor: "#FFFFFF",
            color: "var(--primary)",
            border: "none",
            borderRadius: "9999px",
            fontWeight: 800,
            fontSize: "0.82rem",
            padding: "8px 16px",
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <span>{current.nextBtn}</span>
        </button>

        <button
          onClick={stopGuidedTour}
          style={{
            backgroundColor: "transparent",
            color: "#FFFFFF",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            opacity: 0.8,
          }}
          title="Exit Walkthrough"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};
