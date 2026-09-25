import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { useApp } from "../../context/AppContext";
import { Send, Phone, Mail, CheckCircle2, Truck, Package, Clock } from "lucide-react";

export const OrderChatModal = ({ order, isOpen, onClose }) => {
  const { updateOrderStatus, notify } = useApp();
  const [messages, setMessages] = useState(order?.messages || []);
  const [inputText, setInputText] = useState("");

  if (!order) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      sender: "artisan",
      text: inputText,
      time: "Just now",
    };
    setMessages([...messages, newMsg]);
    setInputText("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "buyer",
          text: "Thank you for the update! We are coordinating logistics with India Post Speed Post.",
          time: "Just now",
        },
      ]);
    }, 1000);
  };

  const handleStatusChange = (newStatus) => {
    updateOrderStatus(order.id, newStatus);
    notify("Status Updated", `Order ${order.id} marked as ${newStatus}`, "success");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Order & Negotiation: ${order.id}`}
      subtitle={`${order.buyerName} • ${order.productName} (${order.quantity} units)`}
      maxWidth="680px"
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Order Financial & Delivery Summary */}
        <div
          style={{
            backgroundColor: "var(--sand-card)",
            padding: "14px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--secondary-border)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "10px",
            fontSize: "0.85rem",
          }}
        >
          <div>
            <span style={{ color: "var(--text-secondary)" }}>Total Value:</span>
            <div style={{ fontWeight: 800, fontSize: "1.1rem", color: "var(--primary)" }}>
              ₹{order.totalAmount.toLocaleString("en-IN")}
            </div>
          </div>
          <div>
            <span style={{ color: "var(--text-secondary)" }}>Unit Price:</span>
            <div style={{ fontWeight: 700 }}>₹{order.unitPrice} / unit</div>
          </div>
          <div>
            <span style={{ color: "var(--text-secondary)" }}>Advance Escrow:</span>
            <div style={{ fontWeight: 700, color: "var(--accent-green)" }}>
              ₹{order.advancePaid.toLocaleString("en-IN")} Received
            </div>
          </div>
          <div>
            <span style={{ color: "var(--text-secondary)" }}>Target Deadline:</span>
            <div style={{ fontWeight: 700 }}>{order.deadline}</div>
          </div>
        </div>

        {/* Status Transition Control Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", padding: "8px 0" }}>
          <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--text-secondary)" }}>
            UPDATE STATUS:
          </span>
          {["New Enquiry", "Confirmed", "In Production", "Completed"].map((st) => (
            <button
              key={st}
              onClick={() => handleStatusChange(st)}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                border: `1px solid ${order.status === st ? "var(--primary)" : "var(--border-medium)"}`,
                backgroundColor: order.status === st ? "var(--primary-light)" : "#FFFFFF",
                color: order.status === st ? "var(--primary)" : "var(--text-primary)",
                fontWeight: order.status === st ? 700 : 500,
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Messaging Box */}
        <div
          style={{
            height: "240px",
            overflowY: "auto",
            padding: "12px",
            backgroundColor: "#FAF9F6",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-subtle)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {messages.map((m, idx) => {
            const isArtisan = m.sender === "artisan";
            return (
              <div
                key={idx}
                style={{
                  alignSelf: isArtisan ? "flex-end" : "flex-start",
                  maxWidth: "80%",
                  padding: "8px 12px",
                  borderRadius: isArtisan ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  backgroundColor: isArtisan ? "var(--primary)" : "#FFFFFF",
                  color: isArtisan ? "#FFFFFF" : "var(--text-primary)",
                  boxShadow: "var(--shadow-sm)",
                  border: isArtisan ? "none" : "1px solid var(--border-subtle)",
                  fontSize: "0.88rem",
                  lineHeight: 1.4,
                }}
              >
                <div>{m.text}</div>
                <div style={{ fontSize: "0.68rem", opacity: 0.8, textAlign: "right", marginTop: "4px" }}>
                  {m.time}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} style={{ display: "flex", gap: "8px" }}>
          <input
            type="text"
            placeholder="Type message or delivery update to buyer..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              border: "1.5px solid var(--border-medium)",
              fontSize: "0.9rem",
            }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: "0 16px" }}>
            <Send size={18} />
          </button>
        </form>

        {/* Contact Links */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border-subtle)", paddingTop: "12px", fontSize: "0.85rem" }}>
          <div style={{ display: "flex", gap: "14px", color: "var(--text-secondary)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Phone size={14} color="var(--accent-green)" />
              {order.buyerContact}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <Mail size={14} color="var(--primary)" />
              {order.buyerEmail}
            </span>
          </div>

          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};
