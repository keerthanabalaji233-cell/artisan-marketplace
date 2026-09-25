import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { ImageCompareSlider } from "./ImageCompareSlider";
import { AudioSpeakerBtn } from "../common/AudioSpeakerBtn";
import { sampleRawPhotos } from "../../data/mockData";
import {
  Camera,
  Upload,
  Wand2,
  Sliders,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Sun,
  Layers,
  Crop,
  Check,
  RotateCcw,
  Download,
  Eye,
  FileCheck,
} from "lucide-react";

export const ImageStudio = () => {
  const { t, stagedProduct, updateStagedProduct, setCurrentTab, notify } = useApp();

  const [selectedPreset, setSelectedPreset] = useState(sampleRawPhotos[0]);
  const [currentRaw, setCurrentRaw] = useState(selectedPreset.rawUrl);
  const [currentEnhanced, setCurrentEnhanced] = useState(selectedPreset.enhancedUrl);
  
  // Enhancement Settings
  const [backgroundType, setBackgroundType] = useState("Warm Sand (Artisan)");
  const [lightingPreset, setLightingPreset] = useState("Studio Softbox (5500K)");
  const [sharpnessLevel, setSharpnessLevel] = useState(85);
  const [cropFormat, setCropFormat] = useState("1:1 Square (E-Commerce)");
  const [shadowGenerated, setShadowGenerated] = useState(true);

  // AI Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [hasEnhanced, setHasEnhanced] = useState(true);

  const processingStages = [
    "Analyzing craft subject and edge contours...",
    "Removing workshop background clutter & uneven floor...",
    "Harmonizing 5500K balanced daylight illumination...",
    "Generating realistic soft ambient contact shadow...",
    "Applying 4K micro-texture weave sharpness...",
  ];

  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setCurrentRaw(preset.rawUrl);
    setCurrentEnhanced(preset.enhancedUrl);
    setHasEnhanced(true);
    notify("Preset Loaded", `Loaded raw workshop photo for ${preset.name}`, "info");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCurrentRaw(url);
      setCurrentEnhanced(url);
      setHasEnhanced(false);
      notify("Image Uploaded", "Your photo is uploaded. Tap 'Enhance with AI' to clean background and light.", "info");
    }
  };

  const runAIEnhancement = () => {
    setIsProcessing(true);
    setProcessingStep(0);

    const interval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev < processingStages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsProcessing(false);
          setHasEnhanced(true);
          // Set high-res enhanced photo
          setCurrentEnhanced(selectedPreset.enhancedUrl);
          notify("Image Enhanced Successfully!", "Background removed, lighting balanced, and e-commerce square crop generated.", "success");
          return prev;
        }
      });
    }, 700);
  };

  const handleSaveToCatalog = () => {
    updateStagedProduct({
      rawImage: currentRaw,
      enhancedImage: currentEnhanced,
    });
    notify("Image Saved to Staged Product", "Now proceed to 'AI Product Cataloger' to describe it using voice.", "success");
    setCurrentTab("cataloger");
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
            {t.studioTitle}
          </h1>
          <AudioSpeakerBtn text={`${t.studioTitle}. ${t.studioSubtitle}`} />
        </div>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "4px" }}>
          {t.studioSubtitle}
        </p>
      </div>

      {/* Main Grid: Left Controls & Preset Chooser, Right Compare Slider */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* Left Column: Input, Controls, Processing */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {/* Action Upload / Camera Box */}
          <div
            className="card"
            style={{
              padding: "1.5rem",
              border: "2px dashed var(--border-medium)",
              backgroundColor: "var(--sand-card)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "12px" }}>
              CAPTURE OR UPLOAD CRAFT PHOTO
            </div>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
              {/* Take Photo button */}
              <label
                className="btn btn-primary"
                style={{ cursor: "pointer", fontSize: "0.95rem" }}
              >
                <Camera size={20} />
                <span>📷 {t.takePhoto}</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>

              {/* Upload Photo button */}
              <label
                className="btn btn-secondary"
                style={{ cursor: "pointer", fontSize: "0.95rem" }}
              >
                <Upload size={18} />
                <span>{t.uploadPhoto}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {/* Quick Preset Selector for Demo */}
            <div style={{ marginTop: "16px", paddingTop: "14px", borderTop: "1px solid var(--secondary-border)" }}>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-muted)", marginBottom: "8px" }}>
                OR CHOOSE A DEMO WORKSHOP CRAFT:
              </div>
              <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
                {sampleRawPhotos.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPreset(p)}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "var(--radius-sm)",
                      border: `1.5px solid ${selectedPreset.id === p.id ? "var(--primary)" : "var(--border-medium)"}`,
                      backgroundColor: selectedPreset.id === p.id ? "var(--primary-light)" : "#FFFFFF",
                      color: selectedPreset.id === p.id ? "var(--primary)" : "var(--text-primary)",
                      fontWeight: selectedPreset.id === p.id ? 700 : 500,
                      fontSize: "0.8rem",
                      cursor: "pointer",
                    }}
                  >
                    {p.category}: {p.name.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI Studio Adjustment Controls */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Sliders size={18} color="var(--primary)" />
              <span>Studio Enhancement Controls</span>
            </h3>

            {/* Background Control */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Studio Background:
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
                {[
                  "Warm Sand (Artisan)",
                  "Pure Studio White",
                  "Natural Terracotta Slip",
                  "Transparent PNG",
                ].map((bg) => (
                  <button
                    key={bg}
                    onClick={() => setBackgroundType(bg)}
                    style={{
                      padding: "8px",
                      borderRadius: "6px",
                      border: `1.5px solid ${backgroundType === bg ? "var(--primary)" : "var(--border-subtle)"}`,
                      backgroundColor: backgroundType === bg ? "var(--primary-light)" : "var(--sand-card)",
                      color: backgroundType === bg ? "var(--primary)" : "var(--text-primary)",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {backgroundType === bg ? "✓ " : ""}{bg}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Control */}
            <div style={{ marginBottom: "14px" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Lighting Model:
              </label>
              <select
                value={lightingPreset}
                onChange={(e) => setLightingPreset(e.target.value)}
                style={{
                  width: "100%",
                  padding: "9px 12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1.5px solid var(--border-medium)",
                  fontSize: "0.85rem",
                  fontFamily: "var(--font-main)",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <option>Studio Softbox (5500K Daylight)</option>
                <option>Warm Sunlight Glow (Golden Hour)</option>
                <option>High Contrast Editorial</option>
                <option>Even Diffused Light (Zero Shadows)</option>
              </select>
            </div>

            {/* Crop Format */}
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "6px" }}>
                Crop & Framing:
              </label>
              <div style={{ display: "flex", gap: "8px" }}>
                {["1:1 Square (E-Commerce)", "4:5 Instagram", "16:9 Banner"].map((cr) => (
                  <button
                    key={cr}
                    onClick={() => setCropFormat(cr)}
                    style={{
                      flex: 1,
                      padding: "6px 8px",
                      borderRadius: "6px",
                      border: `1.5px solid ${cropFormat === cr ? "var(--primary)" : "var(--border-subtle)"}`,
                      backgroundColor: cropFormat === cr ? "var(--primary-light)" : "#FFFFFF",
                      color: cropFormat === cr ? "var(--primary)" : "var(--text-primary)",
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    {cr.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Sharpness Slider */}
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "4px" }}>
                <span>Texture & Weave Sharpness</span>
                <span>{sharpnessLevel}%</span>
              </div>
              <input
                type="range"
                min="50"
                max="100"
                value={sharpnessLevel}
                onChange={(e) => setSharpnessLevel(e.target.value)}
                style={{ width: "100%", accentColor: "var(--primary)" }}
              />
            </div>

            {/* AI Enhance Trigger Button */}
            <button
              onClick={runAIEnhancement}
              disabled={isProcessing}
              className="btn btn-primary btn-lg"
              style={{ width: "100%", fontWeight: 800, fontSize: "1.05rem" }}
            >
              <Wand2 size={20} />
              <span>{isProcessing ? "Processing..." : t.enhanceWithAI}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Before/After Compare View */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Comparison Slider */}
          <div className="card" style={{ padding: "1rem" }}>
            <ImageCompareSlider
              beforeImage={currentRaw}
              afterImage={currentEnhanced}
              beforeLabel={t.beforeComparison}
              afterLabel={t.afterComparison}
            />

            {/* Real-time processing feedback */}
            {isProcessing && (
              <div
                style={{
                  marginTop: "14px",
                  padding: "14px",
                  backgroundColor: "var(--primary-light)",
                  borderRadius: "var(--radius-md)",
                  border: "1.5px solid var(--primary)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <Sparkles size={20} className="animate-spin" color="var(--primary)" />
                  <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "var(--primary)" }}>
                    AI Vision Studio In Action:
                  </span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-primary)", fontWeight: 600 }}>
                  {processingStages[processingStep]}
                </div>
                <div style={{ width: "100%", height: "6px", backgroundColor: "#E8DCCF", borderRadius: "99px", marginTop: "10px", overflow: "hidden" }}>
                  <div
                    style={{
                      height: "100%",
                      width: `${((processingStep + 1) / processingStages.length) * 100}%`,
                      backgroundColor: "var(--primary)",
                      transition: "width 0.3s ease",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Success Status Banner */}
            {!isProcessing && hasEnhanced && (
              <div
                style={{
                  marginTop: "14px",
                  padding: "12px 16px",
                  backgroundColor: "var(--accent-green-light)",
                  border: "1.5px solid #A3D1B8",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CheckCircle2 size={22} color="var(--accent-green)" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--accent-green)" }}>
                      {t.readyForSelling}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#166534" }}>
                      Clean studio lighting • Pure warm sand backdrop • Square 1:1 format
                    </div>
                  </div>
                </div>

                <AudioSpeakerBtn text={t.readyForSelling} />
              </div>
            )}

            {/* Action Buttons to save and continue */}
            <div style={{ display: "flex", gap: "12px", marginTop: "16px", flexWrap: "wrap" }}>
              <button
                onClick={handleSaveToCatalog}
                className="btn btn-accent btn-lg"
                style={{ flex: 1, minWidth: "220px", fontWeight: 800 }}
              >
                <FileCheck size={20} />
                <span>Save to Catalog & Continue ➔</span>
              </button>

              <button
                onClick={() => {
                  window.open(currentEnhanced, "_blank");
                  notify("Image Download", "High-resolution 4K studio image opened.", "info");
                }}
                className="btn btn-outline"
                style={{ padding: "0 18px" }}
                title="Download HD photo"
              >
                <Download size={18} />
              </button>
            </div>
          </div>

          {/* Multi-Format E-Commerce Preview Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
            }}
          >
            <div className="card" style={{ padding: "8px", textAlign: "center" }}>
              <img
                src={currentEnhanced}
                alt="Front View"
                style={{ width: "100%", height: "90px", objectFit: "cover", borderRadius: "6px" }}
              />
              <div style={{ fontSize: "0.72rem", fontWeight: 700, marginTop: "6px" }}>Primary Front</div>
            </div>
            <div className="card" style={{ padding: "8px", textAlign: "center" }}>
              <img
                src={currentEnhanced}
                alt="Detail Weave Zoom"
                style={{ width: "100%", height: "90px", objectFit: "cover", borderRadius: "6px", transform: "scale(1.25)", overflow: "hidden" }}
              />
              <div style={{ fontSize: "0.72rem", fontWeight: 700, marginTop: "6px" }}>Detail Weave</div>
            </div>
            <div className="card" style={{ padding: "8px", textAlign: "center" }}>
              <img
                src={currentEnhanced}
                alt="Lifestyle Mockup"
                style={{ width: "100%", height: "90px", objectFit: "cover", borderRadius: "6px", filter: "sepia(0.1)" }}
              />
              <div style={{ fontSize: "0.72rem", fontWeight: 700, marginTop: "6px" }}>B2B Presentation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
