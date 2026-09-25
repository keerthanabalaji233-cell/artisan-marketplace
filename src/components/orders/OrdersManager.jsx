import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { AudioSpeakerBtn } from "../common/AudioSpeakerBtn";
import { OrderChatModal } from "./OrderChatModal";
import {
  Inbox,
  ShoppingBag,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck,
  MessageSquare,
  Eye,
  Calendar,
  IndianRupee,
  Phone,
  FileCheck,
} from "lucide-react";

export const OrdersManager = () => {
  const { t, orders, notify } = useApp();

  const [activeStatusTab, setActiveStatusTab] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statusCategories = [
    { id: "All", label: "All Orders", count: orders.length },
    { id: "New Enquiry", label: t.newEnquiries, count: orders.filter((o) => o.status === "New Enquiry").length },
    { id: "Pending Orders", label: t.pendingOrders, count: orders.filter((o) => o.status === "Pending Orders").length },
    { id: "Confirmed", label: t.confirmedOrders, count: orders.filter((o) => o.status === "Confirmed").length },
    { id: "Completed", label: t.completedOrders, count: orders.filter((o) => o.status === "Completed").length },
  ];

  const filteredOrders = orders.filter((o) => {
    if (activeStatusTab === "All") return true;
    return o.status === activeStatusTab;
  });

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
            {t.ordersTitle}
          </h1>
          <AudioSpeakerBtn text="Orders and Buyer Enquiries. Track new wholesale enquiries, pending dispatches, and confirmed institutional buyer orders." />
        </div>
        <p style={{ fontSize: "1rem", color: "var(--text-secondary)", marginTop: "4px" }}>
          Track B2B wholesale enquiries, payment escrows, and dispatch commitments in one simple place.
        </p>
      </div>

      {/* Status Filter Tabs */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "8px",
          marginBottom: "1.75rem",
        }}
      >
        {statusCategories.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveStatusTab(tab.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "9999px",
              border: `1.5px solid ${activeStatusTab === tab.id ? "var(--primary)" : "var(--border-medium)"}`,
              backgroundColor: activeStatusTab === tab.id ? "var(--primary)" : "#FFFFFF",
              color: activeStatusTab === tab.id ? "#FFFFFF" : "var(--text-primary)",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            <span>{tab.label}</span>
            <span
              style={{
                backgroundColor: activeStatusTab === tab.id ? "rgba(255,255,255,0.25)" : "var(--secondary-border)",
                color: activeStatusTab === tab.id ? "#FFFFFF" : "var(--text-secondary)",
                borderRadius: "999px",
                padding: "1px 7px",
                fontSize: "0.72rem",
              }}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Orders List / Cards Grid */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filteredOrders.length === 0 ? (
          <div className="card" style={{ padding: "3rem 1.5rem", textAlign: "center", backgroundColor: "var(--sand-card)" }}>
            <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-secondary)" }}>
              No orders found under "{activeStatusTab}".
            </p>
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const isNew = ord.status === "New Enquiry";
            const isConfirmed = ord.status === "Confirmed";
            const isCompleted = ord.status === "Completed";

            return (
              <div
                key={ord.id}
                className="card card-hover"
                style={{
                  padding: "1.5rem",
                  borderLeft: `5px solid ${isCompleted ? "#2D6A4F" : isConfirmed ? "#2563EB" : isNew ? "#D97706" : "#A73A24"}`,
                  backgroundColor: "#FFFFFF",
                  borderTop: "1px solid var(--border-subtle)",
                  borderRight: "1px solid var(--border-subtle)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: "1rem",
                    marginBottom: "12px",
                  }}
                >
                  {/* Order ID & Buyer */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontFamily: "monospace", fontWeight: 800, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                        {ord.id}
                      </span>
                      <span
                        style={{
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          padding: "2px 8px",
                          borderRadius: "999px",
                          backgroundColor: isCompleted ? "var(--accent-green-light)" : isConfirmed ? "#EFF6FF" : "#FEF3C7",
                          color: isCompleted ? "var(--accent-green)" : isConfirmed ? "#1D4ED8" : "#B45309",
                        }}
                      >
                        {ord.status}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)", marginTop: "4px" }}>
                      {ord.productName}
                    </h3>
                    <div style={{ fontSize: "0.88rem", color: "var(--text-secondary)" }}>
                      Buyer: <strong>{ord.buyerName}</strong> • Quantity: <strong>{ord.quantity} units</strong>
                    </div>
                  </div>

                  {/* Financial Value Callout */}
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", fontWeight: 600 }}>
                      ORDER TOTAL
                    </div>
                    <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--primary)", lineHeight: 1.1 }}>
                      ₹{ord.totalAmount.toLocaleString("en-IN")}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: ord.advancePaid > 0 ? "var(--accent-green)" : "var(--text-muted)", fontWeight: 700 }}>
                      {ord.advancePaid > 0 ? `✓ ₹${ord.advancePaid.toLocaleString("en-IN")} in Escrow` : "Payment on Acceptance"}
                    </div>
                  </div>
                </div>

                {/* Key Details Strip */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "18px",
                    backgroundColor: "var(--sand-card)",
                    padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.82rem",
                    color: "var(--text-primary)",
                    marginBottom: "14px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Calendar size={14} color="var(--primary)" />
                    <span>Ordered: <strong>{ord.date}</strong></span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Clock size={14} color="var(--accent-green)" />
                    <span>Target Delivery: <strong>{ord.deadline}</strong></span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <IndianRupee size={14} color="var(--primary)" />
                    <span>Rate: <strong>₹{ord.unitPrice} / unit</strong></span>
                  </div>
                </div>

                {/* Latest Negotiation Snippet */}
                {ord.notes && (
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontStyle: "italic", marginBottom: "14px" }}>
                    "{ord.notes}"
                  </div>
                )}

                {/* Action Buttons */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderTop: "1px solid var(--border-subtle)",
                    paddingTop: "12px",
                    flexWrap: "wrap",
                    gap: "8px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                    <Phone size={14} color="var(--accent-green)" />
                    <span>{ord.buyerContact}</span>
                  </div>

                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="btn btn-secondary btn-sm"
                    >
                      <Eye size={15} />
                      <span>{t.viewOrder}</span>
                    </button>

                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="btn btn-primary btn-sm"
                      style={{ fontWeight: 700 }}
                    >
                      <MessageSquare size={15} />
                      <span>{t.contactBuyer}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Order Detail & Negotiation Chat Modal */}
      {selectedOrder && (
        <OrderChatModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};
