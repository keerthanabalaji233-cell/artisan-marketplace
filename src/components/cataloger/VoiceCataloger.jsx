import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../../context/AppContext";
import { AudioSpeakerBtn } from "../common/AudioSpeakerBtn";
import { regionalVoicePresets } from "../../data/mockData";
import { languages } from "../../data/translations";
import { speakText, playAudioFeedback } from "../../utils/speechHelper";
import {
  Mic,
  MicOff,
  Keyboard,
  Sparkles,
  RotateCcw,
  Edit3,
  Languages,
  CheckCircle2,
  FileCheck,
  Tag,
  Layers,
  Palette,
  Ruler,
  ShieldCheck,
  Volume2,
} from "lucide-react";

export const VoiceCataloger = () => {
  const {
    t,
    currentLang,
    setCurrentLang,
    stagedProduct,
    updateStagedProduct,
    setCurrentTab,
    notify,
  } = useApp();

  const [inputMode, setInputMode] = useState("speak"); // 'speak' | 'type'
  const [selectedVoiceLang, setSelectedVoiceLang] = useState(currentLang || "hi");
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [transcript, setTranscript] = useState(
    regionalVoicePresets[currentLang]?.sampleSpeech || regionalVoicePresets.hi.sampleSpeech
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeCatalogLang, setActiveCatalogLang] = useState("en"); // 'en' | 'hi'

  // Generated Catalog Fields
  const [catalogData, setCatalogData] = useState({
    name: stagedProduct.name || "Handwoven Pochampally Cotton Saree",
    nameHindi: stagedProduct.nameHindi || "पारंपरिक हथकरघा पोचमपल्ली सूती साड़ी",
    category: stagedProduct.category || "Textiles",
    craftType: stagedProduct.craftType || "Pochampally Ikat Weaving",
    shortDescription: stagedProduct.shortDescription || "Authentic double-ikat pure cotton saree woven with geometric heritage motifs and natural dyes.",
    detailedDescription: stagedProduct.detailedDescription || "Woven on traditional pit-looms by master artisan Lakshmi Devi, this Pochampally Ikat saree reflects 400 years of Telangana weaving heritage. Every warp and weft thread is precision tie-dyed before weaving to create subtle, geometric feather patterns. Breathable, hypoallergenic 100% fine count cotton suited for all-day elegance.",
    materials: stagedProduct.materials || "100% Handspun Combed Cotton (80s count), Natural Vegetable Dyes",
    color: stagedProduct.color || "Indigo Blue with Terracotta Rust Border",
    dimensions: stagedProduct.dimensions || "5.5 meters length + 0.8 meter unstitched blouse piece",
    careInstructions: stagedProduct.careInstructions || "First wash dry clean recommended. Subsequent gentle hand wash in cold water with mild liquid detergent. Dry in indirect shade.",
    keywords: stagedProduct.keywords || ["handloom", "ikat saree", "pochampally", "sustainable fashion", "pure cotton", "gi certified"],
    hsnCode: stagedProduct.hsnCode || "50072010",
  });

  const timerRef = useRef(null);

  // Sync selected voice language preset when voice language changes
  const handleVoiceLangChange = (code) => {
    setSelectedVoiceLang(code);
    if (regionalVoicePresets[code]) {
      setTranscript(regionalVoicePresets[code].sampleSpeech);
    }
  };

  const startVoiceRecording = () => {
    playAudioFeedback("mic_start");
    setIsRecording(true);
    setRecordingSeconds(0);
    setTranscript("");

    timerRef.current = setInterval(() => {
      setRecordingSeconds((prev) => prev + 1);
    }, 1000);

    // Simulate real-time speech-to-text accretion
    const targetText = regionalVoicePresets[selectedVoiceLang]?.sampleSpeech || regionalVoicePresets.hi.sampleSpeech;
    const words = targetText.split(" ");
    let curIndex = 0;

    const wordInterval = setInterval(() => {
      if (curIndex < words.length) {
        setTranscript(words.slice(0, curIndex + 1).join(" "));
        curIndex++;
      } else {
        clearInterval(wordInterval);
      }
    }, 280);
  };

  const stopVoiceRecordingAndProcess = () => {
    setIsRecording(false);
    if (timerRef.current) clearInterval(timerRef.current);
    playAudioFeedback("success");

    // Run AI Catalog extraction
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      notify("AI Catalog Generated!", "Product description, materials, craft type, and care guide extracted from your voice.", "success");
    }, 1200);
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      notify("Catalog Regenerated", "Fresh SEO keywords and storytelling description compiled.", "info");
    }, 900);
  };

  const handleSaveProduct = () => {
    updateStagedProduct({
      ...catalogData,
      status: "Draft",
    });
    notify("Product Catalog Saved!", "Now let's review fair artisan pricing in AI Smart Pricing.", "success");
    setCurrentTab("pricing");
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
            {t.catalogerTitle}
          </h1>
          <AudioSpeakerBtn text={`${t.catalogerTitle}. ${t.catalogerSubtitle}`} />
        </div>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "4px" }}>
          {t.catalogerSubtitle}
        </p>
      </div>

      {/* Main Grid: Input panel (Voice/Type) on Left, Generated Listing on Right */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Voice Input & Transcription */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Input Method Toggle */}
          <div
            style={{
              display: "flex",
              backgroundColor: "var(--sand-card)",
              borderRadius: "var(--radius-md)",
              padding: "4px",
              border: "1.5px solid var(--secondary-border)",
            }}
          >
            <button
              onClick={() => setInputMode("speak")}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "10px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                backgroundColor: inputMode === "speak" ? "var(--primary)" : "transparent",
                color: inputMode === "speak" ? "#FFFFFF" : "var(--text-primary)",
                fontWeight: 700,
                fontSize: "0.92rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <Mic size={18} />
              <span>🎤 {t.tabSpeak}</span>
            </button>

            <button
              onClick={() => setInputMode("type")}
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "10px",
                borderRadius: "var(--radius-sm)",
                border: "none",
                backgroundColor: inputMode === "type" ? "var(--primary)" : "transparent",
                color: inputMode === "type" ? "#FFFFFF" : "var(--text-primary)",
                fontWeight: 700,
                fontSize: "0.92rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              <Keyboard size={18} />
              <span>⌨️ {t.tabType}</span>
            </button>
          </div>

          {/* Voice Input Container */}
          {inputMode === "speak" ? (
            <div
              className="card"
              style={{
                padding: "1.75rem 1.5rem",
                textAlign: "center",
                backgroundColor: isRecording ? "#FFF8F5" : "var(--bg-surface)",
                border: isRecording ? "2px solid var(--primary)" : "1.5px solid var(--border-subtle)",
              }}
            >
              {/* Language Selector */}
              <div style={{ marginBottom: "1.25rem", textAlign: "left" }}>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "6px" }}>
                  Select Your Mother Tongue:
                </label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleVoiceLangChange(l.code)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: "var(--radius-sm)",
                        border: `1.5px solid ${selectedVoiceLang === l.code ? "var(--primary)" : "var(--border-subtle)"}`,
                        backgroundColor: selectedVoiceLang === l.code ? "var(--primary-light)" : "var(--sand-card)",
                        color: selectedVoiceLang === l.code ? "var(--primary)" : "var(--text-primary)",
                        fontWeight: selectedVoiceLang === l.code ? 700 : 500,
                        fontSize: "0.8rem",
                        cursor: "pointer",
                      }}
                    >
                      {l.native}
                    </button>
                  ))}
                </div>
              </div>

              {/* Large Microphone Push-to-Talk Button */}
              <div style={{ margin: "1.5rem 0" }}>
                {!isRecording ? (
                  <button
                    onClick={startVoiceRecording}
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      backgroundColor: "var(--primary)",
                      color: "#FFFFFF",
                      border: "4px solid var(--secondary)",
                      boxShadow: "0 6px 20px rgba(167, 58, 36, 0.4)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      cursor: "pointer",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    title="Tap to speak"
                  >
                    <Mic size={36} />
                  </button>
                ) : (
                  <button
                    onClick={stopVoiceRecordingAndProcess}
                    style={{
                      width: "90px",
                      height: "90px",
                      borderRadius: "50%",
                      backgroundColor: "#DC2626",
                      color: "#FFFFFF",
                      border: "4px solid #FEE2E2",
                      boxShadow: "0 0 0 10px rgba(220, 38, 38, 0.25)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      cursor: "pointer",
                      animation: "pulse-ring 1.5s infinite",
                    }}
                    title="Tap to stop and process"
                  >
                    <MicOff size={36} />
                  </button>
                )}

                <div style={{ marginTop: "14px", fontWeight: 700, fontSize: "1.05rem", color: isRecording ? "#DC2626" : "var(--text-primary)" }}>
                  {isRecording ? `Recording (${recordingSeconds}s)... Tap to Finish` : "Tap Microphone to Speak"}
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                  {t.speakInstructions}
                </div>
              </div>

              {/* Live Waveform Indicator when recording */}
              {isRecording && (
                <div className="voice-wave-container" style={{ margin: "1rem 0" }}>
                  <div className="voice-wave-bar" />
                  <div className="voice-wave-bar" />
                  <div className="voice-wave-bar" />
                  <div className="voice-wave-bar" />
                  <div className="voice-wave-bar" />
                  <div className="voice-wave-bar" />
                </div>
              )}

              {/* Transcript Display Box */}
              <div
                style={{
                  textAlign: "left",
                  marginTop: "1rem",
                  padding: "1rem",
                  backgroundColor: "var(--sand-card)",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--secondary-border)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                  <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                    LIVE SPEECH TRANSCRIPT ({languages.find((l) => l.code === selectedVoiceLang)?.name}):
                  </span>
                  {transcript && <AudioSpeakerBtn text={transcript} />}
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--text-primary)", fontStyle: "italic", lineHeight: 1.5 }}>
                  "{transcript || "Speak about your product..."}"
                </p>
              </div>

              {/* Process Button */}
              {!isRecording && (
                <button
                  onClick={stopVoiceRecordingAndProcess}
                  disabled={!transcript || isGenerating}
                  className="btn btn-primary"
                  style={{ width: "100%", marginTop: "1rem", fontWeight: 800 }}
                >
                  <Sparkles size={18} />
                  <span>{isGenerating ? "Analyzing Craft Details..." : "Generate AI Catalog Listing"}</span>
                </button>
              )}
            </div>
          ) : (
            /* Type Input Form */
            <div className="card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "4px" }}>
                    Product Name:
                  </label>
                  <input
                    type="text"
                    value={catalogData.name}
                    onChange={(e) => setCatalogData({ ...catalogData, name: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1.5px solid var(--border-medium)" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "4px" }}>
                    Tell us about the craft, yarn, and weaving process:
                  </label>
                  <textarea
                    rows={4}
                    value={catalogData.detailedDescription}
                    onChange={(e) => setCatalogData({ ...catalogData, detailedDescription: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", borderRadius: "8px", border: "1.5px solid var(--border-medium)" }}
                  />
                </div>
                <button
                  onClick={handleRegenerate}
                  className="btn btn-primary"
                  style={{ marginTop: "8px" }}
                >
                  <Sparkles size={18} />
                  <span>Update & Refine with AI</span>
                </button>
              </div>
            </div>
          )}

          {/* Staged Product Image Thumbnail */}
          <div
            className="card"
            style={{
              padding: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "14px",
              backgroundColor: "var(--sand-card)",
            }}
          >
            <img
              src={stagedProduct.enhancedImage || stagedProduct.rawImage}
              alt="Active Craft"
              style={{ width: "68px", height: "68px", objectFit: "cover", borderRadius: "10px", border: "2px solid var(--primary)" }}
            />
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--accent-green)" }}>
                ✓ AI Studio Enhanced Image Attached
              </div>
              <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-primary)" }}>
                {stagedProduct.name}
              </div>
              <button
                onClick={() => setCurrentTab("studio")}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--primary)",
                  fontSize: "0.78rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                  marginTop: "2px",
                }}
              >
                Change Photo in Studio ➔
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: AI Generated Structured Catalog Result */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            className="card"
            style={{
              padding: "1.5rem",
              border: "1.5px solid var(--border-subtle)",
              position: "relative",
            }}
          >
            {/* Bilingual View Selector */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
                paddingBottom: "10px",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)" }}>
                  CATALOG PREVIEW:
                </span>
                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => setActiveCatalogLang("en")}
                    style={{
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      border: "none",
                      backgroundColor: activeCatalogLang === "en" ? "var(--primary)" : "var(--sand-card)",
                      color: activeCatalogLang === "en" ? "#FFFFFF" : "var(--text-primary)",
                      cursor: "pointer",
                    }}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setActiveCatalogLang("hi")}
                    style={{
                      padding: "3px 8px",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      border: "none",
                      backgroundColor: activeCatalogLang === "hi" ? "var(--primary)" : "var(--sand-card)",
                      color: activeCatalogLang === "hi" ? "#FFFFFF" : "var(--text-primary)",
                      cursor: "pointer",
                    }}
                  >
                    हिन्दी (Hindi)
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <AudioSpeakerBtn
                  text={activeCatalogLang === "en" ? catalogData.detailedDescription : catalogData.nameHindi}
                  title="Read catalog aloud"
                />
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="btn btn-sm btn-outline"
                  style={{ height: "34px", padding: "0 10px" }}
                >
                  <Edit3 size={14} />
                  <span>{editMode ? "Done" : "Edit"}</span>
                </button>
              </div>
            </div>

            {/* Generated Product Header */}
            <div style={{ marginBottom: "1rem" }}>
              <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
                <span className="badge badge-published">{catalogData.category}</span>
                <span className="badge badge-review">GI-Certified Handloom</span>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "auto", fontFamily: "monospace" }}>
                  HSN: {catalogData.hsnCode}
                </span>
              </div>

              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, color: "var(--text-primary)" }}>
                {activeCatalogLang === "en" ? catalogData.name : catalogData.nameHindi}
              </h2>
            </div>

            {/* Short Description */}
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "4px" }}>
                SHORT DESCRIPTION (FOR WHATSAPP & BUYER CARDS):
              </label>
              <p style={{ fontSize: "0.92rem", color: "var(--text-primary)", backgroundColor: "var(--sand-card)", padding: "10px", borderRadius: "8px", lineHeight: 1.45 }}>
                {catalogData.shortDescription}
              </p>
            </div>

            {/* Detailed Description */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "4px" }}>
                DETAILED ARTISAN STORY & CRAFTSMANSHIP:
              </label>
              <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                {catalogData.detailedDescription}
              </p>
            </div>

            {/* Structured Specifications Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
                marginBottom: "1.2rem",
                padding: "12px",
                backgroundColor: "var(--sand-card)",
                borderRadius: "var(--radius-md)",
                fontSize: "0.82rem",
              }}
            >
              <div>
                <span style={{ fontWeight: 700, color: "var(--text-secondary)" }}>Materials:</span>
                <div style={{ color: "var(--text-primary)", fontWeight: 600, marginTop: "2px" }}>
                  {catalogData.materials}
                </div>
              </div>

              <div>
                <span style={{ fontWeight: 700, color: "var(--text-secondary)" }}>Craft Technique:</span>
                <div style={{ color: "var(--text-primary)", fontWeight: 600, marginTop: "2px" }}>
                  {catalogData.craftType}
                </div>
              </div>

              <div>
                <span style={{ fontWeight: 700, color: "var(--text-secondary)" }}>Color & Dye:</span>
                <div style={{ color: "var(--text-primary)", fontWeight: 600, marginTop: "2px" }}>
                  {catalogData.color}
                </div>
              </div>

              <div>
                <span style={{ fontWeight: 700, color: "var(--text-secondary)" }}>Dimensions:</span>
                <div style={{ color: "var(--text-primary)", fontWeight: 600, marginTop: "2px" }}>
                  {catalogData.dimensions}
                </div>
              </div>
            </div>

            {/* Care Instructions */}
            <div style={{ marginBottom: "1.2rem" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "4px" }}>
                CARE INSTRUCTIONS:
              </label>
              <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", backgroundColor: "#FFFFFF", border: "1px solid var(--secondary-border)", padding: "8px 12px", borderRadius: "8px" }}>
                {catalogData.careInstructions}
              </div>
            </div>

            {/* SEO Keywords */}
            <div style={{ marginBottom: "1.5rem" }}>
              <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "6px" }}>
                BUYER SEARCH KEYWORDS & TAGS:
              </label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {catalogData.keywords.map((kw, i) => (
                  <span
                    key={i}
                    style={{
                      backgroundColor: "var(--primary-light)",
                      color: "var(--primary)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: "6px",
                    }}
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar (Regenerate, Edit, Translate, Save Product) */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "14px",
              }}
            >
              <button
                onClick={handleRegenerate}
                className="btn btn-secondary btn-sm"
                title="Regenerate with fresh AI phrasing"
              >
                <RotateCcw size={15} />
                <span>{t.regenerate}</span>
              </button>

              <button
                onClick={() => {
                  setActiveCatalogLang(activeCatalogLang === "en" ? "hi" : "en");
                  notify("Translated Listing", `Toggled description to ${activeCatalogLang === "en" ? "Hindi" : "English"}`, "info");
                }}
                className="btn btn-secondary btn-sm"
              >
                <Languages size={15} />
                <span>{t.translateListing} ({activeCatalogLang === "en" ? "हिन्दी" : "English"})</span>
              </button>

              <button
                onClick={handleSaveProduct}
                className="btn btn-primary"
                style={{ marginLeft: "auto", fontWeight: 800, padding: "0.65rem 1.4rem" }}
              >
                <FileCheck size={18} />
                <span>Save & Get Smart Price ➔</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
