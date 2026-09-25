import React from "react";
import { useApp } from "../../context/AppContext";
import {
  Home,
  Package,
  Wand2,
  DollarSign,
  Store,
  Inbox,
  User,
  Sparkles,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export const Sidebar = () => {
  const { currentTab, setCurrentTab, t, products, orders, artisan } = useApp();

  const newOrdersCount = orders.filter((o) => o.status === "New Enquiry" || o.status === "Pending Orders").length;

  const navItems = [
    { id: "dashboard", label: t.navHome, icon: Home, badge: null },
    { id: "catalog", label: t.navProducts, icon: Package, badge: products.length },
    { id: "studio", label: t.navStudio, icon: Wand2, badge: "AI" },
    { id: "pricing", label: t.navPricing, icon: DollarSign, badge: "AI" },
    { id: "marketplace", label: t.navMarketplace, icon: Store, badge: "5 Leads" },
    { id: "orders", label: t.navOrders, icon: Inbox, badge: newOrdersCount > 0 ? newOrdersCount : null },
    { id: "profile", label: t.navProfile, icon: User, badge: null },
  ];

  return (
    <aside
      className="sidebar-desktop"
      style={{
        position: "fixed",
        top: "68px",
        left: 0,
        bottom: 0,
        width: "260px",
        backgroundColor: "#FFFFFF",
        borderRight: "1px solid var(--border-subtle)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.25rem 0.85rem",
        zIndex: 30,
        overflowY: "auto",
      }}
    >
      {/* Navigation List */}
      <div>
        <div
          style={{
            fontSize: "0.72rem",
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--text-muted)",
            padding: "0 0.75rem 0.65rem",
          }}
        >
          Artisan Workspace
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0.75rem 1rem",
                  borderRadius: "var(--radius-md)",
                  border: "none",
                  backgroundColor: isActive ? "var(--primary-light)" : "transparent",
                  color: isActive ? "var(--primary)" : "var(--text-primary)",
                  fontWeight: isActive ? 700 : 500,
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "var(--sand-card)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Icon size={20} color={isActive ? "var(--primary)" : "var(--text-secondary)"} />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    style={{
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      backgroundColor: isActive ? "var(--primary)" : "var(--secondary-border)",
                      color: isActive ? "#FFFFFF" : "var(--text-secondary)",
                      padding: "2px 7px",
                      borderRadius: "9999px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Artisan Profile & Craft Credential Card */}
      <div
        style={{
          backgroundColor: "var(--sand-card)",
          borderRadius: "var(--radius-md)",
          padding: "1rem",
          border: "1px solid var(--secondary-border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={artisan.avatar}
            alt={artisan.name}
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid var(--primary)",
            }}
          />
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {artisan.name}
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
              {artisan.village}, {artisan.state}
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "10px",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "0.72rem",
            color: "var(--accent-green)",
            fontWeight: 700,
          }}
        >
          <ShieldCheck size={14} />
          <span>GI Tag Certified Artisan</span>
        </div>
      </div>
    </aside>
  );
};
