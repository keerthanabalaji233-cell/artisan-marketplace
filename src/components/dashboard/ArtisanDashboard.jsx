import React from "react";
import { useApp } from "../../context/AppContext";
import { AudioSpeakerBtn } from "../common/AudioSpeakerBtn";
import {
  Package,
  ShoppingBag,
  MessageSquare,
  IndianRupee,
  Camera,
  Wand2,
  Mic,
  DollarSign,
  Sparkles,
  ArrowRight,
  Edit3,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Clock,
  TrendingUp,
  Share2,
} from "lucide-react";

export const ArtisanDashboard = () => {
  const {
    t,
    artisan,
    products,
    orders,
    setCurrentTab,
    speakIfEnabled,
    updateProductStatus,
    setActiveModal,
    setModalData,
    notify,
  } = useApp();

  // Metrics
  const productsCount = products.length;
  const ordersCount = orders.filter((o) => o.status !== "Completed").length;
  const enquiriesCount = orders.filter((o) => o.status === "New Enquiry").length + 4;
  const estimatedRevenue = products.reduce((acc, p) => acc + (p.price || 0) * (p.stock || 1), 0);

  const greetingSpeech = `${t.greetingMorning}. ${t.greetingSubtitle}`;

  const aiSuggestions = [
    {
      id: "sug_1",
      title: t.sugPhoto,
      desc: "3 of your textile listings have uneven room shadows. 1-tap AI Studio balance can increase buyer clicks by 42%.",
      actionLabel: "✨ Fix in AI Studio",
      actionTab: "studio",
      type: "studio",
      icon: Wand2,
      color: "#A73A24",
    },
    {
      id: "sug_2",
      title: t.sugDetails,
      desc: "B2B institutional buyers frequently filter by 'Natural Azo-Free Dyes' and 'Care Instructions'.",
      actionLabel: "🎤 Voice Update",
      actionTab: "cataloger",
      type: "cataloger",
      icon: Mic,
      color: "#D4A373",
    },
    {
      id: "sug_3",
      title: t.sugPrice,
      desc: "Festive Diwali demand for Pochampally cotton sarees has pushed wholesale market rates to ₹2,550 (+₹100).",
      actionLabel: "💰 Review Price",
      actionTab: "pricing",
      type: "pricing",
      icon: DollarSign,
      color: "#2D6A4F",
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 1.25rem 4rem" }}>
      {/* Top Greeting Section */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <img
            src={artisan.avatar}
            alt={artisan.name}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid var(--primary)",
              boxShadow: "var(--shadow-sm)",
            }}
          />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 800,
                  color: "var(--text-primary)",
                  lineHeight: 1.2,
                }}
              >
                {t.greetingMorning}
              </h1>
              <AudioSpeakerBtn text={greetingSpeech} />
            </div>
            <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", marginTop: "2px" }}>
              {artisan.name} • {artisan.businessName} ({artisan.village}, {artisan.state})
            </p>
          </div>
        </div>

        {/* Verification Status Pill */}
        <div
          style={{
            backgroundColor: "var(--sand-card)",
            border: "1.5px solid var(--secondary-border)",
            borderRadius: "var(--radius-md)",
            padding: "8px 14px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#2D6A4F" }} />
          <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-primary)" }}>
            Digital Storefront: ACTIVE
          </span>
        </div>
      </div>

      {/* Summary KPI Stats Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "14px",
          marginBottom: "2rem",
        }}
      >
        {/* Products Listed */}
        <div
          className="card"
          onClick={() => setCurrentTab("catalog")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", padding: "1.25rem" }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "var(--primary-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Package size={24} color="var(--primary)" />
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: 600 }}>
              {t.statProducts}
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
              {productsCount}
            </div>
          </div>
        </div>

        {/* Orders */}
        <div
          className="card"
          onClick={() => setCurrentTab("orders")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", padding: "1.25rem" }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#EFF6FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ShoppingBag size={24} color="#2563EB" />
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: 600 }}>
              {t.statOrders}
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
              {ordersCount}
            </div>
          </div>
        </div>

        {/* Buyer Enquiries */}
        <div
          className="card"
          onClick={() => setCurrentTab("orders")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "14px", padding: "1.25rem" }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#FEF3C7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MessageSquare size={24} color="#D97706" />
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: 600 }}>
              {t.statEnquiries}
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
              {enquiriesCount}
            </div>
          </div>
        </div>

        {/* Estimated Revenue */}
        <div
          className="card"
          style={{ display: "flex", alignItems: "center", gap: "14px", padding: "1.25rem" }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "var(--accent-green-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IndianRupee size={24} color="var(--accent-green)" />
          </div>
          <div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: 600 }}>
              {t.statRevenue}
            </div>
            <div style={{ fontSize: "1.7rem", fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.1 }}>
              ₹{estimatedRevenue.toLocaleString("en-IN")}
            </div>
          </div>
        </div>
      </div>

      {/* Large Low-Literacy Quick Action Buttons (Section 3 Requirement) */}
      <div style={{ marginBottom: "2.5rem" }}>
        <div
          style={{
            fontSize: "0.82rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "var(--primary)",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>QUICK ACTIONS</span>
          <AudioSpeakerBtn text="Quick actions: Add product, Enhance photo, Create catalog by voice, and Get smart price." />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
          }}
        >
          {/* Action 1: Add Product */}
          <div
            className="action-big-card"
            onClick={() => setCurrentTab("studio")}
            role="button"
            tabIndex={0}
          >
            <div className="action-icon-wrap" style={{ backgroundColor: "var(--primary-light)" }}>
              <Camera size={28} color="var(--primary)" />
            </div>
            <div className="action-label">📷 {t.actionAddProduct}</div>
            <div className="action-sub">Take photo with phone camera</div>
          </div>

          {/* Action 2: Enhance Photo */}
          <div
            className="action-big-card"
            onClick={() => setCurrentTab("studio")}
            role="button"
            tabIndex={0}
          >
            <div className="action-icon-wrap" style={{ backgroundColor: "var(--ochre-light)" }}>
              <Wand2 size={28} color="#A73A24" />
            </div>
            <div className="action-label">✨ {t.actionEnhancePhoto}</div>
            <div className="action-sub">Clean background & studio lighting</div>
          </div>

          {/* Action 3: Create Catalog by Voice */}
          <div
            className="action-big-card"
            onClick={() => setCurrentTab("cataloger")}
            role="button"
            tabIndex={0}
          >
            <div className="action-icon-wrap" style={{ backgroundColor: "#EFF6FF" }}>
              <Mic size={28} color="#2563EB" />
            </div>
            <div className="action-label">🎤 {t.actionVoiceCatalog}</div>
            <div className="action-sub">Speak in Hindi, Tamil, Telugu</div>
          </div>

          {/* Action 4: Get Smart Price */}
          <div
            className="action-big-card"
            onClick={() => setCurrentTab("pricing")}
            role="button"
            tabIndex={0}
          >
            <div className="action-icon-wrap" style={{ backgroundColor: "var(--accent-green-light)" }}>
              <DollarSign size={28} color="var(--accent-green)" />
            </div>
            <div className="action-label">💰 {t.actionGetPrice}</div>
            <div className="action-sub">Fair wages & market pricing</div>
          </div>
        </div>
      </div>

      {/* AI Suggestions Card (Section 3 Requirement) */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "var(--radius-lg)",
          padding: "1.5rem",
          border: "1.5px solid var(--border-subtle)",
          marginBottom: "2.5rem",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                backgroundColor: "var(--ochre-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Sparkles size={20} color="var(--primary)" />
            </div>
            <div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {t.aiSuggestions}
              </h3>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                Contextual business intelligence derived from B2B wholesale demand.
              </p>
            </div>
          </div>
          <AudioSpeakerBtn text="AI suggestions: Your product photo can be improved, add more product details, suggested price updated based on market trends." />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "14px",
          }}
        >
          {aiSuggestions.map((sug) => {
            const Icon = sug.icon;
            return (
              <div
                key={sug.id}
                style={{
                  backgroundColor: "var(--sand-card)",
                  borderRadius: "var(--radius-md)",
                  padding: "1rem 1.15rem",
                  border: "1px solid var(--secondary-border)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <Icon size={16} color={sug.color} />
                    <span style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-primary)" }}>
                      {sug.title}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.45, marginBottom: "12px" }}>
                    {sug.desc}
                  </p>
                </div>
                <button
                  onClick={() => setCurrentTab(sug.actionTab)}
                  className="btn btn-sm btn-outline"
                  style={{
                    backgroundColor: "#FFFFFF",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    width: "fit-content",
                  }}
                >
                  <span>{sug.actionLabel}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Your Products Section (Section 3 Requirement) */}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1rem",
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--text-primary)" }}>
              {t.yourProducts}
            </h2>
            <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              Manage, edit pricing, or share your digital catalog directly with buyers.
            </p>
          </div>
          <button
            onClick={() => setCurrentTab("catalog")}
            className="btn btn-secondary btn-sm"
          >
            <span>{t.viewAll} ({products.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "18px",
          }}
        >
          {products.slice(0, 5).map((prod) => (
            <div
              key={prod.id}
              className="card card-hover"
              style={{
                padding: "0",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                border: "1.5px solid var(--border-subtle)",
              }}
            >
              {/* Product Image */}
              <div style={{ position: "relative", height: "180px", backgroundColor: "#F0ECE1" }}>
                <img
                  src={prod.enhancedImage || prod.rawImage}
                  alt={prod.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                {/* Status Badge */}
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    backgroundColor: prod.status === "Published" ? "var(--accent-green)" : "#D97706",
                    color: "#FFFFFF",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    padding: "3px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {prod.status}
                </span>

                {/* Category Pill */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "10px",
                    left: "10px",
                    backgroundColor: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(4px)",
                    color: "var(--text-primary)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {prod.category}
                </span>
              </div>

              {/* Product Body */}
              <div style={{ padding: "1rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: "0.98rem", color: "var(--text-primary)", marginBottom: "4px", lineHeight: 1.3 }}>
                    {prod.name}
                  </h4>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginBottom: "8px" }}>
                    Stock: {prod.stock} units • {prod.craftType}
                  </div>
                  <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--primary)" }}>
                    ₹{prod.price.toLocaleString("en-IN")}
                  </div>
                </div>

                {/* Edit & Details Action */}
                <div style={{ display: "flex", gap: "8px", marginTop: "12px", borderTop: "1px solid var(--border-subtle)", paddingTop: "10px" }}>
                  <button
                    onClick={() => {
                      setModalData(prod);
                      setActiveModal("productDetail");
                    }}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, fontSize: "0.8rem" }}
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => {
                      setCurrentTab("cataloger");
                      notify("Edit Mode", `Editing details for ${prod.name}`, "info");
                    }}
                    className="btn btn-outline btn-sm"
                    style={{ padding: "0 10px" }}
                    title="Edit listing"
                  >
                    <Edit3 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
