import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AudioSpeakerBtn } from "../common/AudioSpeakerBtn";
import { languages } from "../../data/translations";
import {
  User,
  MapPin,
  Award,
  ShieldCheck,
  Languages,
  Volume2,
  Bell,
  Eye,
  HelpCircle,
  Edit2,
  CheckCircle2,
  FileText,
  Phone,
  PlayCircle,
  ExternalLink,
} from "lucide-react";

export const ArtisanProfile = () => {
  const {
    t,
    artisan,
    setArtisan,
    currentLang,
    setCurrentLang,
    audioAssistEnabled,
    setAudioAssistEnabled,
    largeFontMode,
    setLargeFontMode,
    products,
    notify,
  } = useApp();

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ ...artisan });

  const handleSave = (e) => {
    e.preventDefault();
    setArtisan({ ...form });
    setEditMode(false);
    notify("Profile Updated", "Your artisan details and SHG business capacity have been saved.", "success");
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "1.5rem 1.25rem 4rem" }}>
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
            {t.profileTitle}
          </h1>
          <AudioSpeakerBtn text="Artisan profile and digital accessibility settings. Manage your craft lineage, production capacity, and voice preferences." />
        </div>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "4px" }}>
          Manage your verified artisan profile, craft lineage, and accessibility preferences.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
        {/* Left Column: Profile Card & Lineage */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div className="card" style={{ padding: "1.75rem", textAlign: "center", position: "relative" }}>
            {/* Avatar */}
            <div style={{ position: "relative", width: "110px", height: "110px", margin: "0 auto 1rem" }}>
              <img
                src={artisan.avatar}
                alt={artisan.name}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "4px solid var(--primary)",
                  boxShadow: "var(--shadow-md)",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: "4px",
                  right: "4px",
                  backgroundColor: "var(--accent-green)",
                  color: "#FFFFFF",
                  borderRadius: "50%",
                  width: "28px",
                  height: "28px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #FFFFFF",
                }}
                title="Verified Master Artisan"
              >
                <ShieldCheck size={16} />
              </span>
            </div>

            <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>
              {artisan.name}
            </h2>
            <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--primary)", marginTop: "2px" }}>
              {artisan.title}
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "8px" }}>
              <MapPin size={15} color="var(--primary)" />
              <span>{artisan.village}, {artisan.district}, {artisan.state}</span>
            </div>

            {/* GI Tag Certified Badge */}
            <div
              style={{
                marginTop: "14px",
                padding: "8px 12px",
                backgroundColor: "var(--accent-green-light)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid #A3D1B8",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "var(--accent-green)",
              }}
            >
              <Award size={16} />
              <span>{artisan.giTagNumber}</span>
            </div>

            <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--border-subtle)", textAlign: "left", fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              {artisan.bio}
            </div>

            <button
              onClick={() => setEditMode(!editMode)}
              className="btn btn-secondary btn-sm"
              style={{ width: "100%", marginTop: "16px" }}
            >
              <Edit2 size={14} />
              <span>{editMode ? "Cancel Editing" : "Edit Profile Info"}</span>
            </button>
          </div>

          {/* Business & Collective Specifications */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "12px" }}>
              Enterprise & Capacity Information
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "0.88rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "6px" }}>
                <span style={{ color: "var(--text-secondary)" }}>Collective / SHG:</span>
                <span style={{ fontWeight: 700 }}>{artisan.businessName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "6px" }}>
                <span style={{ color: "var(--text-secondary)" }}>Experience:</span>
                <span style={{ fontWeight: 700 }}>{artisan.yearsOfExperience} Years</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "6px" }}>
                <span style={{ color: "var(--text-secondary)" }}>Monthly Capacity:</span>
                <span style={{ fontWeight: 700 }}>{artisan.productionCapacity}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "6px" }}>
                <span style={{ color: "var(--text-secondary)" }}>Preferred Price Range:</span>
                <span style={{ fontWeight: 700 }}>{artisan.preferredPriceRange}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--border-subtle)", paddingBottom: "6px" }}>
                <span style={{ color: "var(--text-secondary)" }}>Bank DBT Account:</span>
                <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>✓ Aadhaar & NPCI Verified</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Active Catalog Items:</span>
                <span style={{ fontWeight: 700 }}>{products.length} Products</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings, Low-Literacy Accessibility & Tutorials */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Settings Card */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "14px" }}>
              App Settings & Accessibility
            </h3>

            {/* Language Preference */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Preferred Display & Voice Language:
              </label>
              <select
                value={currentLang}
                onChange={(e) => {
                  setCurrentLang(e.target.value);
                  notify("Language Changed", `Switched interface language to ${e.target.value.toUpperCase()}`, "info");
                }}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1.5px solid var(--border-medium)",
                  fontSize: "0.9rem",
                  fontFamily: "var(--font-main)",
                  backgroundColor: "#FFFFFF",
                }}
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native} ({l.name})
                  </option>
                ))}
              </select>
            </div>

            {/* Audio Voice Assistance Toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                backgroundColor: "var(--sand-card)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--secondary-border)",
                marginBottom: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Volume2 size={20} color="var(--primary)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                    Voice Assistance (TTS)
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                    Automatically read screen prompts and buttons aloud
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={audioAssistEnabled}
                onChange={(e) => setAudioAssistEnabled(e.target.checked)}
                style={{ width: "20px", height: "20px", accentColor: "var(--primary)", cursor: "pointer" }}
              />
            </div>

            {/* Large Font / Low-Literacy Mode Toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                backgroundColor: "var(--sand-card)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--secondary-border)",
                marginBottom: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Eye size={20} color="var(--primary)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                    Large Fonts & Touch Targets
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                    High-contrast typography for easier readability
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={largeFontMode}
                onChange={(e) => {
                  setLargeFontMode(e.target.checked);
                  if (e.target.checked) {
                    document.body.classList.add("large-font-mode");
                  } else {
                    document.body.classList.remove("large-font-mode");
                  }
                }}
                style={{ width: "20px", height: "20px", accentColor: "var(--primary)", cursor: "pointer" }}
              />
            </div>

            {/* SMS / WhatsApp Alerts */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px",
                backgroundColor: "var(--sand-card)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--secondary-border)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Bell size={20} color="var(--primary)" />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)" }}>
                    WhatsApp Enquiry Alerts
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)" }}>
                    Receive instant alerts on phone when buyers send quotes
                  </div>
                </div>
              </div>
              <input
                type="checkbox"
                defaultChecked={true}
                style={{ width: "20px", height: "20px", accentColor: "var(--accent-green)", cursor: "pointer" }}
              />
            </div>
          </div>

          {/* Simple Visual Help & Tutorials for Low-Literacy Users */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: "10px", display: "flex", alignItems: "center", gap: "8px" }}>
              <HelpCircle size={18} color="var(--primary)" />
              <span>Visual How-To Guides (Audio & Video)</span>
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { title: "How to photograph saree on pit-loom", duration: "1 min audio", color: "#A73A24" },
                { title: "How to speak to Sahayak AI in Telugu / Hindi", duration: "45 sec audio", color: "#2563EB" },
                { title: "Packaging terracotta pots without breakage", duration: "2 min audio", color: "#2D6A4F" },
                { title: "How bank DBT advance payments work", duration: "1 min audio", color: "#D97706" },
              ].map((guide, idx) => (
                <div
                  key={idx}
                  onClick={() => notify("Audio Tutorial", `Playing: ${guide.title}`, "info")}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 12px",
                    backgroundColor: "var(--sand-card)",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid var(--border-subtle)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <PlayCircle size={20} color={guide.color} />
                    <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-primary)" }}>
                      {guide.title}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    {guide.duration}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
