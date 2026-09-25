import React from "react";
import { Modal } from "../common/Modal";
import { AudioSpeakerBtn } from "../common/AudioSpeakerBtn";
import {
  Share2,
  Package,
  Layers,
  Palette,
  Ruler,
  ShieldCheck,
  Building,
  CheckCircle2,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export const ProductDetailModal = ({ product, isOpen, onClose }) => {
  const { notify } = useApp();

  if (!product) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: `Check out ${product.name} handcrafted by master artisan ${product.artisanName} on ArtisanAI:`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}?product=${product.id}`);
      notify("Link Copied!", "Shareable catalog link copied to clipboard.", "info");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={product.name}
      subtitle={`${product.category} • Handcrafted by ${product.artisanName} in ${product.location}`}
      maxWidth="780px"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {/* Top Media & Key Specs Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Main Photo */}
          <div style={{ borderRadius: "var(--radius-md)", overflow: "hidden", border: "1.5px solid var(--border-subtle)" }}>
            <img
              src={product.enhancedImage || product.rawImage}
              alt={product.name}
              style={{ width: "100%", height: "300px", objectFit: "cover", display: "block" }}
            />
          </div>

          {/* Quick Specs & Direct Order Callout */}
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                <span className="badge badge-published">{product.status}</span>
                <span className="badge badge-review">GI Tag Certified</span>
                <AudioSpeakerBtn text={`${product.name}. Price ₹${product.price}. ${product.shortDescription}`} />
              </div>

              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 800,
                  color: "var(--primary)",
                  marginBottom: "4px",
                }}
              >
                ₹{product.price?.toLocaleString("en-IN")}
              </div>

              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "12px" }}>
                Estimated Market Benchmark: {product.marketPriceRange}
              </div>

              <p style={{ fontSize: "0.92rem", color: "var(--text-primary)", lineHeight: 1.5, marginBottom: "14px" }}>
                {product.shortDescription}
              </p>
            </div>

            {/* Availability & Location */}
            <div style={{ backgroundColor: "var(--sand-card)", padding: "12px", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", border: "1px solid var(--secondary-border)" }}>
              <div><strong>Available Stock:</strong> {product.stock} units ready for dispatch</div>
              <div><strong>Provenance:</strong> {product.location}</div>
              <div><strong>Craft Lineage:</strong> {product.craftType}</div>
            </div>
          </div>
        </div>

        {/* Detailed Artisan Story */}
        <div>
          <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "6px" }}>
            Artisan Lineage & Craft Story
          </h4>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            {product.detailedDescription}
          </p>
        </div>

        {/* Technical Specs Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            backgroundColor: "#FAF9F6",
            padding: "16px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            fontSize: "0.85rem",
          }}
        >
          <div>
            <span style={{ color: "var(--text-secondary)", fontWeight: 700 }}>Materials:</span>
            <div style={{ color: "var(--text-primary)", marginTop: "2px" }}>{product.materials || "Natural artisan components"}</div>
          </div>
          <div>
            <span style={{ color: "var(--text-secondary)", fontWeight: 700 }}>Color & Natural Dyes:</span>
            <div style={{ color: "var(--text-primary)", marginTop: "2px" }}>{product.color || "Traditional tones"}</div>
          </div>
          <div>
            <span style={{ color: "var(--text-secondary)", fontWeight: 700 }}>Dimensions / Size:</span>
            <div style={{ color: "var(--text-primary)", marginTop: "2px" }}>{product.dimensions || "Standard artisan dimensions"}</div>
          </div>
          <div>
            <span style={{ color: "var(--text-secondary)", fontWeight: 700 }}>HSN Code:</span>
            <div style={{ color: "var(--text-primary)", marginTop: "2px", fontFamily: "monospace" }}>{product.hsnCode || "50072010"}</div>
          </div>
        </div>

        {/* Care Instructions */}
        {product.careInstructions && (
          <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-primary)" }}>Care Instructions: </strong>
            {product.careInstructions}
          </div>
        )}

        {/* B2B Wholesale Volume Pricing Tier Table */}
        {product.b2bTiers && (
          <div>
            <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
              B2B Wholesale Bulk Pricing Tiers
            </h4>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem" }}>
                <thead>
                  <tr style={{ backgroundColor: "var(--sand-card)", borderBottom: "1px solid var(--border-medium)" }}>
                    <th style={{ padding: "8px 12px", textAlign: "left" }}>Order Volume</th>
                    <th style={{ padding: "8px 12px", textAlign: "left" }}>Wholesale Unit Price</th>
                    <th style={{ padding: "8px 12px", textAlign: "left" }}>Savings</th>
                  </tr>
                </thead>
                <tbody>
                  {product.b2bTiers.map((tier, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                      <td style={{ padding: "8px 12px", fontWeight: 600 }}>{tier.minUnits}+ units</td>
                      <td style={{ padding: "8px 12px", fontWeight: 700, color: "var(--primary)" }}>₹{tier.pricePerUnit.toLocaleString("en-IN")} / unit</td>
                      <td style={{ padding: "8px 12px", color: "var(--accent-green)", fontWeight: 600 }}>
                        Save ₹{(product.price - tier.pricePerUnit).toLocaleString("en-IN")} per unit
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: "16px" }}>
          <button onClick={handleShare} className="btn btn-secondary">
            <Share2 size={16} />
            <span>Share Product (WhatsApp / Link)</span>
          </button>

          <button onClick={onClose} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
