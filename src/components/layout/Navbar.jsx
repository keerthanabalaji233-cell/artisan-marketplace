import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { languages } from "../../data/translations";
import {
  Volume2,
  VolumeX,
  Languages,
  Database,
  Bell,
  Sparkles,
  ChevronDown,
  Layers,
  Compass,
} from "lucide-react";

export const Navbar = ({ onOpenArchitecture }) => {
  const {
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
    notifications,
    startGuidedTour,
    guidedTourStep,
  } = useApp();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 35,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid var(--border-subtle)",
        boxShadow: "var(--shadow-sm)",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 1.25rem",
      }}
    >
      {/* Brand & Tagline */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          onClick={() => setCurrentTab("landing")}
          style={{
            background: "none",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            textAlign: "left",
            padding: 0,
          }}
        >
          {/* Logo Icon with Indian Handicraft terracotta badge */}
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              backgroundColor: "var(--primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "1.2rem",
              boxShadow: "0 3px 8px rgba(167, 58, 36, 0.3)",
              border: "2px solid #F5EFE6",
            }}
          >
            अ
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 800,
                  fontSize: "1.25rem",
                  color: "var(--primary)",
                  letterSpacing: "-0.01em",
                }}
              >
                ArtisanAI
              </span>
              <span
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  backgroundColor: "var(--accent-green-light)",
                  color: "var(--accent-green)",
                  padding: "2px 6px",
                  borderRadius: "6px",
                  border: "1px solid #C1E1D2",
                }}
              >
                GI & ONDC Ready
              </span>
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                display: "none",
              }}
              className="tagline-desktop"
            >
              AI-Driven Market Linkage & Smart Cataloging
            </div>
          </div>
        </button>

        {/* Guided Tour Trigger Button */}
        {guidedTourStep === null && (
          <button
            onClick={startGuidedTour}
            className="btn btn-sm"
            style={{
              backgroundColor: "var(--ochre-light)",
              color: "#8F2F1C",
              border: "1.5px solid var(--ochre)",
              borderRadius: "9999px",
              fontSize: "0.8rem",
              fontWeight: 700,
              marginLeft: "8px",
            }}
            title="Launch step-by-step interactive workflow demonstration"
          >
            <Sparkles size={14} color="#A73A24" />
            <span style={{ display: "inline" }}>Guided Demo (7-Steps)</span>
          </button>
        )}
      </div>

      {/* Action Controls: Language Switcher, Audio Assist, DB Inspector, Profile */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        {/* Audio Assist Toggle for Low-Literacy */}
        <button
          onClick={() => setAudioAssistEnabled(!audioAssistEnabled)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            backgroundColor: audioAssistEnabled ? "var(--primary-light)" : "var(--secondary)",
            color: audioAssistEnabled ? "var(--primary)" : "var(--text-secondary)",
            border: `1.5px solid ${audioAssistEnabled ? "var(--primary)" : "var(--secondary-border)"}`,
            borderRadius: "var(--radius-full)",
            padding: "6px 12px",
            fontSize: "0.82rem",
            fontWeight: 700,
            cursor: "pointer",
            height: "38px",
          }}
          title={audioAssistEnabled ? "Voice Assistance is Active (Click to mute)" : "Enable Voice Assistance for Low-Literacy users"}
        >
          {audioAssistEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          <span className="hide-on-mobile">{audioAssistEnabled ? "Voice Assist: ON" : "Voice: OFF"}</span>
        </button>

        {/* Multilingual Selector (8 Indian Languages) */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              backgroundColor: "var(--sand-card)",
              border: "1.5px solid var(--border-medium)",
              borderRadius: "var(--radius-full)",
              padding: "6px 12px",
              fontSize: "0.85rem",
              fontWeight: 700,
              cursor: "pointer",
              height: "38px",
              color: "var(--text-primary)",
            }}
            aria-label="Select language"
          >
            <Languages size={16} color="var(--primary)" />
            <span>
              {languages.find((l) => l.code === currentLang)?.native || "English"}
            </span>
            <ChevronDown size={14} />
          </button>

          {langDropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "44px",
                right: 0,
                backgroundColor: "#FFFFFF",
                border: "1px solid var(--border-medium)",
                borderRadius: "var(--radius-md)",
                boxShadow: "var(--shadow-lg)",
                width: "200px",
                padding: "6px",
                zIndex: 50,
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "2px",
              }}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang.code);
                    setLangDropdownOpen(false);
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    border: "none",
                    backgroundColor: currentLang === lang.code ? "var(--primary-light)" : "transparent",
                    color: currentLang === lang.code ? "var(--primary)" : "var(--text-primary)",
                    fontWeight: currentLang === lang.code ? 700 : 500,
                    cursor: "pointer",
                    fontSize: "0.88rem",
                    textAlign: "left",
                    width: "100%",
                  }}
                >
                  <span>{lang.native}</span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    {lang.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Database & Architecture Modal Trigger */}
        <button
          onClick={onOpenArchitecture}
          className="btn btn-outline btn-sm hide-on-mobile"
          style={{ height: "38px", borderColor: "var(--border-medium)" }}
          title="Inspect Relational Database Schema & System Architecture"
        >
          <Database size={15} color="var(--primary)" />
          <span>DB Schema</span>
        </button>

        {/* Artisan Avatar Profile Trigger */}
        <button
          onClick={() => setCurrentTab("profile")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "2px 4px",
          }}
          title="Artisan Profile"
        >
          <img
            src={artisan.avatar}
            alt={artisan.name}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid var(--primary)",
            }}
          />
        </button>
      </div>
    </header>
  );
};
