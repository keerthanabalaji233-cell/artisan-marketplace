import React, { useState, useId } from "react";
import { useApp } from "../../context/AppContext";
import { AudioSpeakerBtn } from "../common/AudioSpeakerBtn";
import {
  DollarSign,
  TrendingUp,
  Sliders,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
  FileCheck,
  Info,
  Scale,
  Sparkles,
} from "lucide-react";

export const DynamicPricing = () => {
  const {
    t,
    stagedProduct,
    updateStagedProduct,
    publishStagedProduct,
    setCurrentTab,
    notify,
  } = useApp();

  // Pricing Parameters Input State
  const [category, setCategory] = useState(stagedProduct.category || "Textiles");
  const [rawMaterialsCost, setRawMaterialsCost] = useState(stagedProduct.rawMaterialCost || 750);
  const [labourHours, setLabourHours] = useState(stagedProduct.labourHours || 18);
  const [artisanHourlyRate, setArtisanHourlyRate] = useState(55); // Fair living wage benchmark
  const [productionDays, setProductionDays] = useState(3);
  const [packagingCost, setPackagingCost] = useState(stagedProduct.packagingCost || 120);
  const [batchQuantity, setBatchQuantity] = useState(stagedProduct.stock || 12);
  const [complexityFactor, setComplexityFactor] = useState(1.15); // 1.0 simple, 1.15 moderate, 1.3 intricate
  const [customPrice, setCustomPrice] = useState(null);

  // Derived Calculations
  const labourCost = Math.round(labourHours * artisanHourlyRate * complexityFactor);
  const platformFee = Math.round((rawMaterialsCost + labourCost) * 0.08); // 8% escrow & logistics contingency
  const baseCost = rawMaterialsCost + labourCost + packagingCost + platformFee;
  const fairMargin = Math.round(baseCost * 0.22); // 22% fair artisan profit margin
  const calculatedSuggestedPrice = baseCost + fairMargin;
  const minMarketRange = Math.round(calculatedSuggestedPrice * 0.9);
  const maxMarketRange = Math.round(calculatedSuggestedPrice * 1.12);

  const displayPrice = customPrice !== null ? customPrice : calculatedSuggestedPrice;

  const handleUseSuggestedPrice = () => {
    updateStagedProduct({
      price: calculatedSuggestedPrice,
      costPrice: baseCost,
      marketPriceRange: `₹${minMarketRange.toLocaleString("en-IN")} – ₹${maxMarketRange.toLocaleString("en-IN")}`,
    });
    setCustomPrice(null);
    notify("Suggested Price Applied", `Price set to ₹${calculatedSuggestedPrice.toLocaleString("en-IN")}`, "success");
  };

  const handlePublishNow = () => {
    updateStagedProduct({
      price: displayPrice,
      costPrice: baseCost,
      marketPriceRange: `₹${minMarketRange.toLocaleString("en-IN")} – ₹${maxMarketRange.toLocaleString("en-IN")}`,
    });
    publishStagedProduct();
    setCurrentTab("catalog");
  };

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
            {t.pricingTitle}
          </h1>
          <AudioSpeakerBtn text={`${t.pricingTitle}. ${t.pricingSubtitle}`} />
        </div>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "4px" }}>
          {t.pricingSubtitle}
        </p>
      </div>

      {/* Main Grid: Inputs on Left, AI Price Analysis on Right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Cost Input Sliders & Craft Attributes */}
        <div className="card" style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "8px" }}>
              <Sliders size={18} color="var(--primary)" />
              <span>Input Production Costs</span>
            </h3>
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-green)", backgroundColor: "var(--accent-green-light)", padding: "3px 8px", borderRadius: "6px" }}>
              Fair Wage Model
            </span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Raw Material Cost */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                <span>1. Raw Materials (Yarn, Dyes, Cane, Clay):</span>
                <span style={{ color: "var(--primary)" }}>₹{rawMaterialsCost}</span>
              </div>
              <input
                type="range"
                min="100"
                max="3000"
                step="50"
                value={rawMaterialsCost}
                onChange={(e) => setRawMaterialsCost(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--primary)" }}
              />
            </div>

            {/* Labour Hours */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                <span>2. Artisan Weaving / Crafting Time:</span>
                <span style={{ color: "var(--primary)" }}>{labourHours} Hours ({productionDays} Days)</span>
              </div>
              <input
                type="range"
                min="2"
                max="60"
                step="1"
                value={labourHours}
                onChange={(e) => {
                  const hrs = Number(e.target.value);
                  setLabourHours(hrs);
                  setProductionDays(Math.max(1, Math.round(hrs / 6)));
                }}
                style={{ width: "100%", accentColor: "var(--primary)" }}
              />
            </div>

            {/* Fair Wage Hourly Rate Benchmark */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                <span>3. Artisan Fair Wage Rate:</span>
                <span style={{ color: "var(--accent-green)" }}>₹{artisanHourlyRate}/Hour (Living Wage)</span>
              </div>
              <input
                type="range"
                min="35"
                max="120"
                step="5"
                value={artisanHourlyRate}
                onChange={(e) => setArtisanHourlyRate(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--accent-green)" }}
              />
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "2px" }}>
                *Aligned with Ministry of Textiles minimum artisan skilled handloom wage benchmarks.
              </div>
            </div>

            {/* Craft Intricacy / Complexity Factor */}
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "6px" }}>
                4. Craft Design Complexity:
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { label: "Simple Weave", factor: 1.0 },
                  { label: "Moderate Pattern", factor: 1.15 },
                  { label: "Highly Intricate", factor: 1.35 },
                ].map((c) => (
                  <button
                    key={c.label}
                    onClick={() => setComplexityFactor(c.factor)}
                    style={{
                      flex: 1,
                      padding: "8px 4px",
                      borderRadius: "6px",
                      border: `1.5px solid ${complexityFactor === c.factor ? "var(--primary)" : "var(--border-subtle)"}`,
                      backgroundColor: complexityFactor === c.factor ? "var(--primary-light)" : "#FFFFFF",
                      color: complexityFactor === c.factor ? "var(--primary)" : "var(--text-primary)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Packaging & Fragility */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                <span>5. Packaging & Eco-Friendly Box:</span>
                <span>₹{packagingCost}</span>
              </div>
              <input
                type="range"
                min="20"
                max="400"
                step="10"
                value={packagingCost}
                onChange={(e) => setPackagingCost(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--ochre)" }}
              />
            </div>

            {/* Quantity Batch Size */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "4px" }}>
                <span>6. Production Batch Size:</span>
                <span>{batchQuantity} Units Available</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={batchQuantity}
                onChange={(e) => setBatchQuantity(Number(e.target.value))}
                style={{ width: "100%", accentColor: "var(--primary)" }}
              />
            </div>
          </div>
        </div>

        {/* Right Column: AI Smart Price Breakdown & Market Comparison */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            className="card"
            style={{
              padding: "1.75rem",
              border: "1.5px solid var(--border-subtle)",
              backgroundColor: "#FFFFFF",
            }}
          >
            {/* Main AI Price Display */}
            <div
              style={{
                backgroundColor: "var(--sand-card)",
                borderRadius: "var(--radius-md)",
                padding: "1.5rem",
                textAlign: "center",
                border: "2px solid var(--secondary-border)",
                marginBottom: "1.5rem",
              }}
            >
              <div style={{ fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-secondary)", marginBottom: "4px" }}>
                {t.suggestedPrice}
              </div>

              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "3.2rem",
                  fontWeight: 800,
                  color: "var(--primary)",
                  lineHeight: 1,
                  margin: "8px 0",
                }}
              >
                ₹{displayPrice.toLocaleString("en-IN")}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "0.95rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                <span>{t.priceRange}:</span>
                <strong style={{ color: "var(--text-primary)" }}>
                  ₹{minMarketRange.toLocaleString("en-IN")} – ₹{maxMarketRange.toLocaleString("en-IN")}
                </strong>
              </div>

              {/* Action Buttons to Accept or Adjust */}
              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "16px" }}>
                <button
                  onClick={handleUseSuggestedPrice}
                  className="btn btn-primary btn-sm"
                  style={{ fontWeight: 700 }}
                >
                  <CheckCircle2 size={16} />
                  <span>{t.useSuggestedPrice}</span>
                </button>

                <button
                  onClick={() => {
                    const custom = prompt("Enter your desired selling price in ₹:", displayPrice);
                    if (custom && !isNaN(Number(custom))) {
                      setCustomPrice(Number(custom));
                      notify("Custom Price Set", `Price adjusted to ₹${Number(custom).toLocaleString("en-IN")}`, "info");
                    }
                  }}
                  className="btn btn-outline btn-sm"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  <span>{t.editPrice}</span>
                </button>
              </div>
            </div>

            {/* Transparent Cost Breakdown */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <h4 style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)" }}>
                  {t.costBreakdown}
                </h4>
                <AudioSpeakerBtn text={`Cost breakdown: Raw materials ₹${rawMaterialsCost}, Artisan labour ₹${labourCost}, Packaging ₹${packagingCost}, Platform escrow ₹${platformFee}, and fair profit margin ₹${fairMargin}. Suggested price is ₹${displayPrice}.`} />
              </div>

              {/* Stacked Visual Bar */}
              <div
                style={{
                  height: "18px",
                  borderRadius: "999px",
                  overflow: "hidden",
                  display: "flex",
                  marginBottom: "12px",
                  border: "1px solid var(--border-medium)",
                }}
              >
                <div style={{ width: `${(rawMaterialsCost / calculatedSuggestedPrice) * 100}%`, backgroundColor: "#A73A24" }} title="Raw Materials" />
                <div style={{ width: `${(labourCost / calculatedSuggestedPrice) * 100}%`, backgroundColor: "#2D6A4F" }} title="Artisan Labour" />
                <div style={{ width: `${(packagingCost / calculatedSuggestedPrice) * 100}%`, backgroundColor: "#D4A373" }} title="Packaging" />
                <div style={{ width: `${(platformFee / calculatedSuggestedPrice) * 100}%`, backgroundColor: "#3B82F6" }} title="Platform Fee" />
                <div style={{ width: `${(fairMargin / calculatedSuggestedPrice) * 100}%`, backgroundColor: "#10B981" }} title="Fair Profit" />
              </div>

              {/* Breakdown Legend Table */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#A73A24" }} />
                    {t.rawMaterials}
                  </span>
                  <span style={{ fontWeight: 700 }}>₹{rawMaterialsCost.toLocaleString("en-IN")}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#2D6A4F" }} />
                    {t.labourCost} ({labourHours} hrs)
                  </span>
                  <span style={{ fontWeight: 700, color: "var(--accent-green)" }}>₹{labourCost.toLocaleString("en-IN")}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#D4A373" }} />
                    {t.packaging}
                  </span>
                  <span style={{ fontWeight: 700 }}>₹{packagingCost.toLocaleString("en-IN")}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: "1px solid var(--border-subtle)" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#3B82F6" }} />
                    {t.platformFee}
                  </span>
                  <span style={{ fontWeight: 700 }}>₹{platformFee.toLocaleString("en-IN")}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", backgroundColor: "var(--accent-green-light)", borderRadius: "6px", paddingInline: "8px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 700, color: "var(--accent-green)" }}>
                    <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#10B981" }} />
                    {t.fairProfit} (22%)
                  </span>
                  <span style={{ fontWeight: 800, color: "var(--accent-green)" }}>+₹{fairMargin.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* Clear Regulatory Disclaimer Note (Required by Section 6) */}
            <div
              style={{
                padding: "12px 14px",
                backgroundColor: "#FFFBEB",
                borderRadius: "var(--radius-sm)",
                border: "1px solid #FDE68A",
                display: "flex",
                gap: "10px",
                marginBottom: "1.5rem",
              }}
            >
              <Info size={18} color="#B45309" style={{ flexShrink: 0, marginTop: "2px" }} />
              <div style={{ fontSize: "0.78rem", color: "#92400E", lineHeight: 1.45 }}>
                <strong>Transparent Pricing Notice:</strong> {t.pricingDisclaimer} Simulated benchmark version v2.4 (Ministry of Textiles Handloom Index).
              </div>
            </div>

            {/* Save & Publish Final CTA */}
            <button
              onClick={handlePublishNow}
              className="btn btn-accent btn-lg"
              style={{ width: "100%", fontWeight: 800, fontSize: "1.05rem" }}
            >
              <FileCheck size={20} />
              <span>Apply Price & Publish to Digital Catalog ➔</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
