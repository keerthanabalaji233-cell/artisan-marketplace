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
} from "lucide-react";

export const BottomNav = () => {
  const { currentTab, setCurrentTab, t, orders } = useApp();

  const newOrdersCount = orders.filter((o) => o.status === "New Enquiry" || o.status === "Pending Orders").length;

  const tabs = [
    { id: "dashboard", label: t.navHome, icon: Home },
    { id: "catalog", label: "Products", icon: Package },
    { id: "studio", label: "Studio", icon: Wand2 },
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "marketplace", label: "Market", icon: Store },
    { id: "orders", label: "Orders", icon: Inbox, badge: newOrdersCount },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <nav
      className="bottom-nav-mobile"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "64px",
        backgroundColor: "#FFFFFF",
        borderTop: "1.5px solid var(--border-subtle)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 40,
        boxShadow: "0 -2px 10px rgba(0,0,0,0.06)",
        padding: "0 4px",
      }}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "none",
              border: "none",
              padding: "6px 2px",
              cursor: "pointer",
              position: "relative",
              color: isActive ? "var(--primary)" : "var(--text-secondary)",
              minWidth: 0,
            }}
          >
            <div style={{ position: "relative" }}>
              <Icon size={20} color={isActive ? "var(--primary)" : "var(--text-secondary)"} strokeWidth={isActive ? 2.5 : 1.8} />
              {tab.badge && tab.badge > 0 ? (
                <span
                  style={{
                    position: "absolute",
                    top: "-4px",
                    right: "-8px",
                    backgroundColor: "var(--primary)",
                    color: "#FFFFFF",
                    fontSize: "0.65rem",
                    fontWeight: 800,
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {tab.badge}
                </span>
              ) : null}
            </div>
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: isActive ? 800 : 500,
                marginTop: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "100%",
              }}
            >
              {tab.label}
            </span>
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  width: "28px",
                  height: "3px",
                  backgroundColor: "var(--primary)",
                  borderRadius: "0 0 3px 3px",
                }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
};
