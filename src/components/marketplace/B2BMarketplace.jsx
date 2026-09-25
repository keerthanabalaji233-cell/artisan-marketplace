import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AudioSpeakerBtn } from "../common/AudioSpeakerBtn";
import { SendQuoteModal } from "./SendQuoteModal";
import { Modal } from "../common/Modal";
import {
  Building2,
  MapPin,
  Calendar,
  IndianRupee,
  ShieldCheck,
  Send,
  Eye,
  Sparkles,
  AlertCircle,
  FileCheck,
  PackageCheck,
  Clock,
  ExternalLink,
} from "lucide-react";

export const B2BMarketplace = () => {
  const { t, buyers, notify } = useApp();

  const [activeTab, setActiveTab] = useState("all");
  const [selectedBuyerForQuote, setSelectedBuyerForQuote] = useState(null);
  const [selectedBuyerForView, setSelectedBuyerForView] = useState(null);

  const filteredBuyers = buyers.filter((b) => {
    if (activeTab === "recommended") return b.urgent;
    if (activeTab === "b2b") return b.type.includes("B2B") || b.type.includes("Corporate");
    if (activeTab === "govt") return b.type.includes("Public") || b.type.includes("Council") || b.type.includes("Digital");
    return true;
  });

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 1.25rem 4rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
              fontWeight: 800,
              color: "var(--text-primary)",
            }}
          >
            {t.marketplaceTitle}
          </h1>
          <AudioSpeakerBtn text={`${t.marketplaceTitle}. ${t.marketplaceSubtitle}`} />
        </div>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "4px" }}>
          {t.marketplaceSubtitle}
        </p>
      </div>

      {/* Notice Pill for Demo Clarity (Section 8 Requirement) */}
      <div
        style={{
          padding: "10px 16px",
          backgroundColor: "var(--sand-card)",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--secondary-border)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "1.5rem",
          fontSize: "0.85rem",
          color: "var(--text-secondary)",
        }}
      >
        <ShieldCheck size={18} color="var(--accent-green)" style={{ flexShrink: 0 }} />
        <span>
          <strong>Transparent Prototype Notice:</strong> Institutional buyers and government initiatives below are realistic <em>Sample & Demo Buyers</em> designed for simulated procurement workflows.
        </span>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "8px",
          marginBottom: "1.75rem",
        }}
      >
        {[
          { id: "all", label: "All Opportunities (5)" },
          { id: "recommended", label: "Recommended Urgent (2)" },
          { id: "b2b", label: "B2B Retail & Corporate (3)" },
          { id: "govt", label: "Govt / ONDC Portals (2)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              border: `1.5px solid ${activeTab === tab.id ? "var(--primary)" : "var(--border-medium)"}`,
              backgroundColor: activeTab === tab.id ? "var(--primary)" : "#FFFFFF",
              color: activeTab === tab.id ? "#FFFFFF" : "var(--text-primary)",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Buyer Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        {filteredBuyers.map((b) => (
          <div
            key={b.id}
            className="card card-hover"
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              border: "1.5px solid var(--border-subtle)",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div>
              {/* Buyer Type Badges */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    backgroundColor: "var(--sand-card)",
                    color: "var(--primary)",
                    padding: "3px 8px",
                    borderRadius: "6px",
                    border: "1px solid var(--secondary-border)",
                  }}
                >
                  {b.tag}
                </span>

                {b.urgent && (
                  <span className="badge badge-urgent">
                    ⚡ Fast Turnaround
                  </span>
                )}
              </div>

              {/* Organization Name */}
              <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "4px" }}>
                {b.name}
              </h3>

              {/* Location & Verification */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "14px" }}>
                <MapPin size={14} color="var(--primary)" />
                <span>{b.location}</span>
                <span>•</span>
                <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>
                  ✓ {b.verificationBadge}
                </span>
              </div>

              {/* Requirement Box */}
              <div
                style={{
                  backgroundColor: "var(--sand-card)",
                  borderRadius: "var(--radius-md)",
                  padding: "12px",
                  border: "1px solid var(--secondary-border)",
                  marginBottom: "14px",
                }}
              >
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "2px" }}>
                  REQUIRED HANDICRAFT PRODUCT:
                </div>
                <div style={{ fontWeight: 800, fontSize: "1rem", color: "var(--primary)" }}>
                  {b.requiredProduct}
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-primary)", marginTop: "4px" }}>
                  Quantity: <strong>{b.quantity} units</strong> • Category: {b.category}
                </div>
              </div>

              {/* Budget Range & Deadline */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px", fontSize: "0.85rem" }}>
                <div>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.78rem" }}>Budget Range:</span>
                  <div style={{ fontWeight: 800, color: "var(--text-primary)" }}>
                    {b.budgetRange}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--accent-green)" }}>
                    ({b.unitTargetBudget} / unit)
                  </div>
                </div>

                <div>
                  <span style={{ color: "var(--text-secondary)", fontSize: "0.78rem" }}>Target Deadline:</span>
                  <div style={{ fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <Calendar size={14} />
                    <span>{b.deadline}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions: View Requirement & Send Enquiry */}
            <div
              style={{
                display: "flex",
                gap: "10px",
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "14px",
              }}
            >
              <button
                onClick={() => setSelectedBuyerForView(b)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                <Eye size={15} />
                <span>{t.viewRequirement}</span>
              </button>

              <button
                onClick={() => setSelectedBuyerForQuote(b)}
                className="btn btn-primary btn-sm"
                style={{ flex: 1, fontWeight: 800 }}
              >
                <Send size={15} />
                <span>{t.sendEnquiry}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Requirement Details Modal */}
      {selectedBuyerForView && (
        <Modal
          isOpen={!!selectedBuyerForView}
          onClose={() => setSelectedBuyerForView(null)}
          title={`Buyer Demands: ${selectedBuyerForView.name}`}
          subtitle={`${selectedBuyerForView.tag} • ${selectedBuyerForView.location}`}
          maxWidth="640px"
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "0.92rem" }}>
            <div>
              <h4 style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                Procurement Specifications:
              </h4>
              <p style={{ color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {selectedBuyerForView.description}
              </p>
            </div>

            <div style={{ backgroundColor: "var(--sand-card)", padding: "14px", borderRadius: "var(--radius-md)", border: "1px solid var(--secondary-border)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div>
                <strong>Procurement Lead:</strong>
                <div>{selectedBuyerForView.contactPerson}</div>
              </div>
              <div>
                <strong>Payment Schedule:</strong>
                <div>{selectedBuyerForView.paymentTerms}</div>
              </div>
              <div>
                <strong>Required Units:</strong>
                <div>{selectedBuyerForView.quantity} units</div>
              </div>
              <div>
                <strong>Estimated Total Value:</strong>
                <div style={{ color: "var(--primary)", fontWeight: 800 }}>{selectedBuyerForView.budgetRange}</div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
              <button onClick={() => setSelectedBuyerForView(null)} className="btn btn-secondary">
                Back
              </button>
              <button
                onClick={() => {
                  const b = selectedBuyerForView;
                  setSelectedBuyerForView(null);
                  setSelectedBuyerForQuote(b);
                }}
                className="btn btn-primary"
                style={{ fontWeight: 800 }}
              >
                <Send size={16} />
                <span>Send Formal Quote ➔</span>
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Send Quotation Modal */}
      {selectedBuyerForQuote && (
        <SendQuoteModal
          buyer={selectedBuyerForQuote}
          isOpen={!!selectedBuyerForQuote}
          onClose={() => setSelectedBuyerForQuote(null)}
        />
      )}
    </div>
  );
};
