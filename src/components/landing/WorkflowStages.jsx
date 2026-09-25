import React from "react";
import {
  Camera,
  Wand2,
  Mic,
  DollarSign,
  Globe2,
  Handshake,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export const WorkflowStages = () => {
  const stages = [
    {
      step: 1,
      title: "Digitize",
      desc: "Capture mobile photo of handmade craft",
      icon: Camera,
      color: "#A73A24",
    },
    {
      step: 2,
      title: "Enhance",
      desc: "AI removes background & adds studio light",
      icon: Wand2,
      color: "#C84B31",
    },
    {
      step: 3,
      title: "Catalog",
      desc: "Voice description in regional tongue",
      icon: Mic,
      color: "#D4A373",
    },
    {
      step: 4,
      title: "Price",
      desc: "Fair wage & market cost calculation",
      icon: DollarSign,
      color: "#2D6A4F",
    },
    {
      step: 5,
      title: "Publish",
      desc: "ONDC, GeM & web-ready digital catalog",
      icon: Globe2,
      color: "#386641",
    },
    {
      step: 6,
      title: "Connect",
      desc: "Direct link to verified B2B buyers",
      icon: Handshake,
      color: "#2563EB",
    },
    {
      step: 7,
      title: "Sell",
      desc: "Orders, advance escrow & fair growth",
      icon: TrendingUp,
      color: "#166534",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "var(--sand-card)",
        borderRadius: "var(--radius-lg)",
        padding: "2rem 1.5rem",
        border: "1.5px solid var(--secondary-border)",
        margin: "2rem 0",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 1.75rem" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: "0.8rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            color: "var(--primary)",
            backgroundColor: "var(--primary-light)",
            padding: "4px 14px",
            borderRadius: "9999px",
            marginBottom: "8px",
          }}
        >
          Virtual Business Manager for Artisans
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.6rem",
            fontWeight: 800,
            color: "var(--text-primary)",
          }}
        >
          Digitize ➔ Enhance ➔ Catalog ➔ Price ➔ Publish ➔ Connect ➔ Sell
        </h3>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
          A full-stack operating system bridging traditional Indian handicraft heritage with 21st-century digital commerce.
        </p>
      </div>

      {/* Responsive Stages Pipeline */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
          gap: "12px",
          position: "relative",
        }}
      >
        {stages.map((st, i) => {
          const Icon = st.icon;
          return (
            <div
              key={st.step}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "var(--radius-md)",
                padding: "1.2rem 0.8rem",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                border: "1.5px solid var(--border-subtle)",
                boxShadow: "var(--shadow-sm)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  fontSize: "0.7rem",
                  fontWeight: 800,
                  color: "var(--text-muted)",
                }}
              >
                0{st.step}
              </div>

              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "50%",
                  backgroundColor: `${st.color}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "10px",
                }}
              >
                <Icon size={22} color={st.color} />
              </div>

              <div style={{ fontWeight: 800, fontSize: "0.98rem", color: "var(--text-primary)", marginBottom: "4px" }}>
                {st.title}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", lineHeight: 1.3 }}>
                {st.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
