import React, { useState } from "react";
import { Modal } from "./Modal";
import { databaseSchema } from "../../data/dbSchema";
import { Database, Layers, Server, Cpu, Network, Check } from "lucide-react";

export const ArchitectureModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("schema"); // 'schema' | 'architecture' | 'ai_pipeline'

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="System Architecture & Database Specifications"
      subtitle="Complete relational schema, AI pipeline microservices, and ONDC/GeM integration blueprints"
      maxWidth="860px"
    >
      {/* Sub tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          borderBottom: "2px solid var(--border-subtle)",
          paddingBottom: "12px",
          marginBottom: "16px",
        }}
      >
        <button
          className={`btn ${activeTab === "schema" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveTab("schema")}
          style={{ minHeight: "40px", padding: "6px 14px" }}
        >
          <Database size={16} /> Relational DB Schema ({databaseSchema.tables.length} Tables)
        </button>
        <button
          className={`btn ${activeTab === "architecture" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveTab("architecture")}
          style={{ minHeight: "40px", padding: "6px 14px" }}
        >
          <Layers size={16} /> 5-Layer Platform Architecture
        </button>
        <button
          className={`btn ${activeTab === "ai_pipeline" ? "btn-primary" : "btn-secondary"}`}
          onClick={() => setActiveTab("ai_pipeline")}
          style={{ minHeight: "40px", padding: "6px 14px" }}
        >
          <Cpu size={16} /> AI & Speech Microservices
        </button>
      </div>

      {/* Schema Tab */}
      {activeTab === "schema" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              padding: "10px 14px",
              backgroundColor: "var(--ochre-light)",
              borderRadius: "var(--radius-sm)",
              border: "1px solid var(--ochre)",
              fontSize: "0.85rem",
              color: "#6D2213",
            }}
          >
            <strong>PostgreSQL 16 Enterprise Relational Schema</strong> – Designed for high scalability, postGIS cluster queries, Row Level Security (RLS) for artisan privacy, and direct integration with government e-marketplaces.
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxHeight: "500px", overflowY: "auto" }}>
            {databaseSchema.tables.map((table) => (
              <div
                key={table.name}
                style={{
                  border: "1px solid var(--border-medium)",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div
                  style={{
                    backgroundColor: "var(--sand-card)",
                    padding: "8px 14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid var(--border-subtle)",
                  }}
                >
                  <span style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "0.95rem", color: "var(--primary)" }}>
                    table: {table.name}
                  </span>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                    {table.columns.length} columns
                  </span>
                </div>
                <div style={{ padding: "8px 14px", fontSize: "0.82rem", color: "var(--text-secondary)", borderBottom: "1px solid var(--border-subtle)" }}>
                  {table.description}
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.78rem", textAlign: "left" }}>
                    <thead>
                      <tr style={{ backgroundColor: "#F7F5F0", borderBottom: "1px solid #E5DFD5" }}>
                        <th style={{ padding: "6px 12px" }}>Column</th>
                        <th style={{ padding: "6px 12px" }}>Data Type</th>
                        <th style={{ padding: "6px 12px" }}>Constraints</th>
                        <th style={{ padding: "6px 12px" }}>Notes / Blueprint</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.columns.map((col, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid #F0ECE4" }}>
                          <td style={{ padding: "6px 12px", fontFamily: "monospace", fontWeight: 600 }}>{col.name}</td>
                          <td style={{ padding: "6px 12px", color: "#2563EB", fontFamily: "monospace" }}>{col.type}</td>
                          <td style={{ padding: "6px 12px" }}>
                            {col.isPrimary && <span style={{ color: "#DC2626", fontWeight: 700 }}>PK</span>}
                            {col.foreignKey && <span style={{ color: "#2D6A4F", fontWeight: 600 }}>FK ({col.foreignKey})</span>}
                            {col.isUnique && <span style={{ color: "#D97706" }}>UNIQUE</span>}
                          </td>
                          <td style={{ padding: "6px 12px", color: "#565C58" }}>{col.note || col.defaultValue || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Platform Architecture */}
      {activeTab === "architecture" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {databaseSchema.architectureLayers.map((layer, idx) => (
            <div
              key={idx}
              style={{
                padding: "14px 18px",
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--sand-card)",
                border: "1.5px solid var(--secondary-border)",
              }}
            >
              <h4 style={{ color: "var(--primary)", fontWeight: 700, fontSize: "1rem", marginBottom: "4px" }}>
                {layer.title}
              </h4>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: "1.5" }}>
                {layer.details}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* AI & Speech Microservices */}
      {activeTab === "ai_pipeline" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "0.9rem" }}>
          <div style={{ padding: "14px", backgroundColor: "#EFF6FF", borderRadius: "var(--radius-md)", border: "1px solid #BFDBFE" }}>
            <h4 style={{ color: "#1D4ED8", fontWeight: 700, marginBottom: "6px" }}>
              Vision Processing Pipeline (Studio)
            </h4>
            <p style={{ color: "#1E3A8A", fontSize: "0.85rem", lineHeight: "1.4" }}>
              1. <strong>Foreground Subject Extraction</strong> via segment-anything / edge U-Net models.<br />
              2. <strong>Color Temperature & Exposure Normalization</strong> (5500K daylight white balancing).<br />
              3. <strong>Shadow Synthesis</strong> generates soft ambient contact shadows for natural realism.<br />
              4. <strong>Automated Square Crop</strong> with 12% border padding compliant with Amazon, ONDC, and GeM standards.
            </p>
          </div>

          <div style={{ padding: "14px", backgroundColor: "#F0FDF4", borderRadius: "var(--radius-md)", border: "1px solid #BBF7D0" }}>
            <h4 style={{ color: "#15803D", fontWeight: 700, marginBottom: "6px" }}>
              Multilingual Voice Pipeline (Indic-Whisper & LLM)
            </h4>
            <p style={{ color: "#166534", fontSize: "0.85rem", lineHeight: "1.4" }}>
              1. <strong>Acoustic Front-end:</strong> Noise suppression for rural workshop background sound.<br />
              2. <strong>Indic STT:</strong> Transcribes Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi.<br />
              3. <strong>Information Extraction LLM:</strong> Parses unstructured voice narration into schema: materials, yarn count, dye technique, dimensions, care instructions, and artisan cultural story.
            </p>
          </div>

          <div style={{ padding: "14px", backgroundColor: "#FFFBEB", borderRadius: "var(--radius-md)", border: "1px solid #FDE68A" }}>
            <h4 style={{ color: "#B45309", fontWeight: 700, marginBottom: "6px" }}>
              Fair Wage & Dynamic Pricing Formula
            </h4>
            <div style={{ fontFamily: "monospace", backgroundColor: "#FFFFFF", padding: "10px", borderRadius: "6px", border: "1px solid #E5E7EB", marginTop: "6px" }}>
              P_suggested = (Raw_Materials + (Labour_Hours × Min_Artisan_Wage_Rate) + Packaging + Platform_Escrow) × (1 + Fair_Margin_Index [20-25%]) × Season_Demand_Multiplier
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: "20px", display: "flex", justifyContent: "flex-end" }}>
        <button className="btn btn-secondary" onClick={onClose}>
          Close Inspector
        </button>
      </div>
    </Modal>
  );
};
