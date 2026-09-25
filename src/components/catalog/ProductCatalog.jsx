import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AudioSpeakerBtn } from "../common/AudioSpeakerBtn";
import { ProductDetailModal } from "./ProductDetailModal";
import {
  Search,
  Filter,
  Plus,
  Share2,
  Edit3,
  Trash2,
  Eye,
  CheckCircle2,
  AlertCircle,
  Tag,
  ArrowUpDown,
  Camera,
} from "lucide-react";

export const ProductCatalog = () => {
  const {
    products,
    updateProductStatus,
    deleteProduct,
    setCurrentTab,
    notify,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [availabilityFilter, setAvailabilityFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState(3000);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ["All", "Textiles", "Handicrafts", "Pottery", "Embroidery", "Woodcraft"];

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.craftType && p.craftType.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesPrice = (p.price || 0) <= maxPrice;

    const matchesAvailability =
      availabilityFilter === "All" ||
      (availabilityFilter === "Published" && p.status === "Published") ||
      (availabilityFilter === "Draft" && p.status !== "Published");

    return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
  });

  const handleShareProduct = (prod) => {
    if (navigator.share) {
      navigator.share({
        title: prod.name,
        text: `Handcrafted ${prod.name} on ArtisanAI:`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}?prod=${prod.id}`);
      notify("Link Copied", `Direct product link for ${prod.name} copied to clipboard!`, "info");
    }
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "1.5rem 1.25rem 4rem" }}>
      {/* Header */}
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
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.6rem, 3.2vw, 2.2rem)",
                fontWeight: 800,
                color: "var(--text-primary)",
              }}
            >
              My Digital Catalog
            </h1>
            <AudioSpeakerBtn text="My Digital Catalog. Search, filter, edit pricing, or publish products to B2B buyers." />
          </div>
          <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "4px" }}>
            Manage your digitized handicraft inventory, pricing, and live marketplace status.
          </p>
        </div>

        <button
          onClick={() => setCurrentTab("studio")}
          className="btn btn-primary"
          style={{ fontWeight: 700 }}
        >
          <Plus size={18} />
          <span>📷 Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: "1.25rem",
          marginBottom: "2rem",
          backgroundColor: "#FFFFFF",
          border: "1.5px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "14px",
            alignItems: "center",
          }}
        >
          {/* Search Input */}
          <div style={{ position: "relative" }}>
            <Search
              size={18}
              color="var(--text-secondary)"
              style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)" }}
            />
            <input
              type="text"
              placeholder="Search by craft, material, or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px 9px 38px",
                borderRadius: "var(--radius-sm)",
                border: "1.5px solid var(--border-medium)",
                fontSize: "0.88rem",
                fontFamily: "var(--font-main)",
              }}
            />
          </div>

          {/* Availability Status Filter */}
          <div>
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              style={{
                width: "100%",
                padding: "9px 12px",
                borderRadius: "var(--radius-sm)",
                border: "1.5px solid var(--border-medium)",
                fontSize: "0.88rem",
                fontFamily: "var(--font-main)",
                backgroundColor: "#FFFFFF",
              }}
            >
              <option value="All">All Availability Statuses</option>
              <option value="Published">Published Only</option>
              <option value="Draft">Drafts / In Review</option>
            </select>
          </div>

          {/* Price Range Filter */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "4px" }}>
              <span>Max Price:</span>
              <span style={{ color: "var(--primary)" }}>₹{maxPrice.toLocaleString("en-IN")}</span>
            </div>
            <input
              type="range"
              min="500"
              max="5000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              style={{ width: "100%", accentColor: "var(--primary)" }}
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px", paddingTop: "12px", borderTop: "1px solid var(--border-subtle)" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)", alignSelf: "center", marginRight: "4px" }}>
            CATEGORY:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "5px 12px",
                borderRadius: "9999px",
                fontSize: "0.82rem",
                fontWeight: 700,
                border: `1.5px solid ${selectedCategory === cat ? "var(--primary)" : "var(--secondary-border)"}`,
                backgroundColor: selectedCategory === cat ? "var(--primary)" : "var(--sand-card)",
                color: selectedCategory === cat ? "#FFFFFF" : "var(--text-primary)",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div
          className="card"
          style={{
            textAlign: "center",
            padding: "3rem 1.5rem",
            backgroundColor: "var(--sand-card)",
          }}
        >
          <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-secondary)" }}>
            No products match your selected filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
              setMaxPrice(5000);
              setAvailabilityFilter("All");
            }}
            className="btn btn-secondary btn-sm"
            style={{ marginTop: "12px" }}
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
          }}
        >
          {filteredProducts.map((prod) => (
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
              {/* Product Photo */}
              <div
                style={{
                  position: "relative",
                  height: "220px",
                  backgroundColor: "#EFEBE4",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedProduct(prod)}
              >
                <img
                  src={prod.enhancedImage || prod.rawImage}
                  alt={prod.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />

                {/* Status Toggle Button on Image */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newStatus = prod.status === "Published" ? "Draft" : "Published";
                    updateProductStatus(prod.id, newStatus);
                  }}
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    backgroundColor: prod.status === "Published" ? "var(--accent-green)" : "#D97706",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: "9999px",
                    padding: "4px 10px",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                  title="Click to toggle publish status"
                >
                  {prod.status === "Published" ? "✓ Published" : "Draft"}
                </button>

                {/* Category Pill */}
                <span
                  style={{
                    position: "absolute",
                    bottom: "12px",
                    left: "12px",
                    backgroundColor: "rgba(255,255,255,0.92)",
                    backdropFilter: "blur(4px)",
                    color: "var(--text-primary)",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    padding: "3px 8px",
                    borderRadius: "6px",
                  }}
                >
                  {prod.category}
                </span>
              </div>

              {/* Product Info */}
              <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <h3
                    onClick={() => setSelectedProduct(prod)}
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 800,
                      color: "var(--text-primary)",
                      marginBottom: "6px",
                      lineHeight: 1.3,
                      cursor: "pointer",
                    }}
                  >
                    {prod.name}
                  </h3>

                  <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginBottom: "10px" }}>
                    By {prod.artisanName} • {prod.stock} units available
                  </div>

                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.45, marginBottom: "12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {prod.shortDescription}
                  </p>

                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "12px" }}>
                    <span style={{ fontSize: "1.35rem", fontWeight: 800, color: "var(--primary)" }}>
                      ₹{prod.price?.toLocaleString("en-IN")}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>
                      Range: {prod.marketPriceRange}
                    </span>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid var(--border-subtle)",
                    paddingTop: "12px",
                  }}
                >
                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1, marginRight: "8px" }}
                  >
                    <Eye size={15} />
                    <span>View Details</span>
                  </button>

                  <div style={{ display: "flex", gap: "4px" }}>
                    <button
                      onClick={() => handleShareProduct(prod)}
                      className="btn btn-outline btn-sm"
                      style={{ padding: "0 8px" }}
                      title="Share product"
                    >
                      <Share2 size={15} />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                          deleteProduct(prod.id);
                        }
                      }}
                      className="btn btn-outline btn-sm"
                      style={{ padding: "0 8px", color: "#DC2626" }}
                      title="Delete product"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};
