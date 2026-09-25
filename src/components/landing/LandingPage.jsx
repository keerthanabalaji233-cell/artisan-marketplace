import React from "react";
import { useApp } from "../../context/AppContext";
import { WorkflowStages } from "./WorkflowStages";
import { AudioSpeakerBtn } from "../common/AudioSpeakerBtn";
import {
  Camera,
  Wand2,
  Mic,
  DollarSign,
  Store,
  ShieldCheck,
  Globe2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Users,
  Building,
  CheckCircle2,
} from "lucide-react";

export const LandingPage = () => {
  const { setCurrentTab, startGuidedTour } = useApp();

  const heroHeadline = "From Traditional Craft to Digital Marketplace";
  const heroSub =
    "Empowering artisans with AI-powered product cataloging, smart pricing, professional product photography, and direct access to digital markets.";

  const howItWorksSteps = [
    {
      num: "01",
      title: "Capture Product",
      desc: "Take a simple mobile phone photo of your handicraft inside your workshop or weaving pit.",
      icon: Camera,
      tag: "Easy Mobile Snap",
    },
    {
      num: "02",
      title: "Enhance with AI",
      desc: "Our vision AI removes cluttered workshop backgrounds, cleans shadows, and creates crisp studio lighting.",
      icon: Wand2,
      tag: "1-Click Studio Light",
    },
    {
      num: "03",
      title: "Create Smart Catalog",
      desc: "Speak naturally in your mother tongue (Hindi, Tamil, Telugu). AI generates rich bilingual descriptions & HSN codes.",
      icon: Mic,
      tag: "Voice in 8 Languages",
    },
    {
      num: "04",
      title: "Connect with Buyers",
      desc: "Publish instantly to verified B2B retail buyers, corporate gifting agencies, and government e-marketplaces (ONDC / GeM).",
      icon: Store,
      tag: "Fair Direct Trade",
    },
  ];

  const whyArtisanAI = [
    {
      title: "AI-Powered Product Photography",
      desc: "No expensive photography studio required. Automatic subject segmentation, 5500K daylight white balancing, and e-commerce square framing.",
      icon: Wand2,
    },
    {
      title: "Multilingual Voice-Based Cataloging",
      desc: "Artisans describe weaves, clay purity, or wood seasoning in regional dialects. AI extracts structured materials, care, and storytelling.",
      icon: Mic,
    },
    {
      title: "Smart Pricing Recommendations",
      desc: "Guarantees fair living wages for artisan labour hours, computes raw material indices, and benchmarks against wholesale market bands.",
      icon: DollarSign,
    },
    {
      title: "B2B Buyer Connections",
      desc: "Direct linkage to verified boutique retail chains and export houses with automated RFQ quotation generation and advance escrow.",
      icon: Building,
    },
    {
      title: "Government Marketplace Integration",
      desc: "Built-in readiness for GeM (Government e-Marketplace), ONDC Open Network, and TRIFED tribal craft emporium procurement channels.",
      icon: ShieldCheck,
    },
    {
      title: "Year-Round Digital Market Access",
      desc: "Break free from seasonal physical exhibitions (melas) with a persistent, searchable digital portfolio accessible 365 days a year.",
      icon: Globe2,
    },
  ];

  const impactMetrics = [
    {
      stat: "365 Days",
      label: "Year-Round Market Access",
      desc: "Eliminates reliance on seasonal physical melas by providing constant digital buyer visibility.",
    },
    {
      stat: "Zero Typing",
      label: "Reduced Digital Barriers",
      desc: "Voice-first interaction in 8 Indian regional languages empowers weavers with limited literacy.",
    },
    {
      stat: "3 Minutes",
      label: "AI-Assisted Cataloging",
      desc: "From raw workshop snapshot to complete bilingual digital catalog with HSN code & care guide.",
    },
    {
      stat: "100% Direct",
      label: "Direct Buyer Connections",
      desc: "Connects SHGs and master artisans straight to bulk buyers without intermediary commission cuts.",
    },
  ];

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 1.25rem 4rem" }}>
      {/* Hero Section */}
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          alignItems: "center",
          padding: "2rem 0 3rem",
        }}
      >
        <div>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              backgroundColor: "var(--ochre-light)",
              border: "1px solid var(--ochre)",
              borderRadius: "9999px",
              padding: "5px 14px",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#8F2F1C",
              marginBottom: "1rem",
            }}
          >
            <Sparkles size={16} color="var(--primary)" />
            <span>Digital Empowerment for Indian Craft Collectives</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {heroHeadline}
            </h1>
            <AudioSpeakerBtn text={`${heroHeadline}. ${heroSub}`} />
          </div>

          <p
            style={{
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
              marginTop: "1.2rem",
              lineHeight: 1.6,
              maxWidth: "540px",
            }}
          >
            {heroSub}
          </p>

          {/* Action CTAs */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "12px",
              marginTop: "2rem",
            }}
          >
            <button
              onClick={() => setCurrentTab("dashboard")}
              className="btn btn-primary btn-lg"
              style={{ fontSize: "1.05rem" }}
            >
              <span>Start Selling</span>
              <ArrowRight size={20} />
            </button>

            <button
              onClick={startGuidedTour}
              className="btn btn-secondary btn-lg"
              style={{ fontSize: "1.05rem" }}
            >
              <Sparkles size={18} color="var(--primary)" />
              <span>Explore How It Works (Demo)</span>
            </button>
          </div>

          {/* Quick trust badges */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "18px",
              marginTop: "2.5rem",
              paddingTop: "1.5rem",
              borderTop: "1px solid var(--border-subtle)",
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={16} color="var(--accent-green)" />
              <span>Low-Literacy Voice First</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={16} color="var(--accent-green)" />
              <span>ONDC & GeM Protocol Ready</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <CheckCircle2 size={16} color="var(--accent-green)" />
              <span>Fair Living Wage Guarantee</span>
            </div>
          </div>
        </div>

        {/* Hero Visual Mockup */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "relative",
              borderRadius: "24px",
              overflow: "hidden",
              boxShadow: "var(--shadow-xl)",
              border: "4px solid #FFFFFF",
              backgroundColor: "var(--sand-card)",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=85"
              alt="Artisan digitizing handwoven textiles with smartphone"
              style={{
                width: "100%",
                height: "440px",
                objectFit: "cover",
                display: "block",
              }}
            />
            {/* Overlay Gradient */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(31,36,33,0.75) 100%)",
              }}
            />

            {/* Floating Mobile Smartphone Simulation Pill */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
                backgroundColor: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(8px)",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
                border: "1px solid rgba(255,255,255,0.8)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      backgroundColor: "var(--primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Wand2 size={20} color="#FFFFFF" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--text-primary)" }}>
                      AI Studio: Background Removed & Studio Light Added
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--accent-green)", fontWeight: 700 }}>
                      ✓ 100% E-Commerce Ready Catalog Generated
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    backgroundColor: "var(--accent-green-light)",
                    color: "var(--accent-green)",
                    fontWeight: 800,
                    padding: "4px 10px",
                    borderRadius: "8px",
                    fontSize: "0.85rem",
                  }}
                >
                  ₹2,450
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7-Stage Virtual Business Manager Workflow */}
      <WorkflowStages />

      {/* How It Works - 4 Steps */}
      <section style={{ margin: "4rem 0" }}>
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 2.5rem" }}>
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--accent-green)",
              marginBottom: "8px",
            }}
          >
            Simple 4-Step Process
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 800,
              color: "var(--text-primary)",
            }}
          >
            How ArtisanAI Works
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
            Designed specifically for artisans and weavers with zero prior computer experience.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "20px",
          }}
        >
          {howItWorksSteps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="card card-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  padding: "1.75rem 1.25rem",
                  border: "1.5px solid var(--border-subtle)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "14px",
                      backgroundColor: "var(--primary-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Icon size={26} color="var(--primary)" />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 800,
                      color: "var(--secondary-border)",
                    }}
                  >
                    {step.num}
                  </span>
                </div>

                <div
                  style={{
                    display: "inline-block",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: "var(--primary)",
                    marginBottom: "6px",
                  }}
                >
                  {step.tag}
                </div>

                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "8px" }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.5, flex: 1 }}>
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Why ArtisanAI? Section */}
      <section
        style={{
          margin: "4rem 0",
          backgroundColor: "#FFFFFF",
          borderRadius: "24px",
          padding: "3rem 2rem",
          border: "1px solid var(--border-subtle)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 3rem" }}>
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--primary)",
              marginBottom: "8px",
            }}
          >
            Digital Inclusion
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 800,
              color: "var(--text-primary)",
            }}
          >
            Why ArtisanAI?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", marginTop: "6px" }}>
            Solving the core market disconnection and cataloging challenges facing India's 7 million+ rural artisans.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {whyArtisanAI.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  gap: "16px",
                  padding: "1.2rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--sand-card)",
                  border: "1px solid var(--secondary-border)",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    backgroundColor: "#FFFFFF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: "var(--shadow-sm)",
                  }}
                >
                  <Icon size={22} color="var(--primary)" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text-primary)", marginBottom: "6px" }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.45 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Platform Goals & Impact Section */}
      <section style={{ margin: "4rem 0" }}>
        <div style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 2.5rem" }}>
          <div
            style={{
              fontSize: "0.8rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--accent-green)",
              marginBottom: "8px",
            }}
          >
            Measurable Platform Goals
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2rem",
              fontWeight: 800,
              color: "var(--text-primary)",
            }}
          >
            Real Benefits for Grassroots Producers
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginTop: "6px" }}>
            *Platform feature goals and modeled operational efficiency benchmarks.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          {impactMetrics.map((card, idx) => (
            <div
              key={idx}
              className="card"
              style={{
                textAlign: "center",
                padding: "2rem 1.25rem",
                border: "1.5px solid var(--border-subtle)",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.4rem",
                  fontWeight: 800,
                  color: "var(--primary)",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {card.stat}
              </div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--text-primary)", marginBottom: "8px" }}>
                {card.label}
              </div>
              <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #A73A24 0%, #8F2F1C 100%)",
          borderRadius: "24px",
          padding: "3rem 2rem",
          color: "#FFFFFF",
          textAlign: "center",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.2rem",
            fontWeight: 800,
            marginBottom: "0.75rem",
          }}
        >
          Ready to Digitize Your Handcrafted Art?
        </h3>
        <p style={{ fontSize: "1.05rem", opacity: 0.9, maxWidth: "600px", margin: "0 auto 2rem" }}>
          Experience the complete end-to-end prototype: from camera capture to voice cataloging, fair pricing, and bulk buyer orders.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          <button
            onClick={() => setCurrentTab("dashboard")}
            style={{
              backgroundColor: "#FFFFFF",
              color: "var(--primary)",
              border: "none",
              borderRadius: "var(--radius-md)",
              padding: "14px 28px",
              fontWeight: 800,
              fontSize: "1.05rem",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            Launch Artisan Dashboard
          </button>
          <button
            onClick={startGuidedTour}
            style={{
              backgroundColor: "rgba(255,255,255,0.18)",
              color: "#FFFFFF",
              border: "1.5px solid rgba(255,255,255,0.5)",
              borderRadius: "var(--radius-md)",
              padding: "14px 24px",
              fontWeight: 700,
              fontSize: "1.05rem",
              cursor: "pointer",
            }}
          >
            Start 7-Step Interactive Tour
          </button>
        </div>
      </div>
    </div>
  );
};
