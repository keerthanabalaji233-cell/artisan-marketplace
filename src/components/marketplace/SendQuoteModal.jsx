import React, { useState } from "react";
import { Modal } from "../common/Modal";
import { useApp } from "../../context/AppContext";
import { Send, CheckCircle2, ShieldCheck } from "lucide-react";

export const SendQuoteModal = ({ buyer, isOpen, onClose }) => {
  const { products, sendBuyerEnquiry } = useApp();

  const [selectedProduct, setSelectedProduct] = useState(products[0]?.name || "Handwoven Pochampally Cotton Saree");
  const [quotedQuantity, setQuotedQuantity] = useState(buyer?.quantity || 50);
  const [proposedPrice, setProposedPrice] = useState(
    buyer ? Math.round(Number(buyer.budgetRange.replace(/[^0-9]/g, "").slice(0, 5)) / (buyer.quantity || 1)) || 2200 : 2200
  );
  const [customMessage, setCustomMessage] = useState(
    `Namaste ${buyer?.contactPerson?.split(" ")[0] || "Buyer"}, our artisan collective can deliver handcrafted units with verified GI certification within your required deadline.`
  );

  if (!buyer) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    sendBuyerEnquiry({
      buyerId: buyer.id,
      buyerName: buyer.name,
      productName: selectedProduct,
      quantity: quotedQuantity,
      proposedPrice: proposedPrice,
      notes: customMessage,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Send Quotation to ${buyer.name}`}
      subtitle={`Requirement: ${buyer.requiredProduct} (${buyer.quantity} units)`}
      maxWidth="600px"
    >
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {/* Buyer Summary */}
        <div style={{ backgroundColor: "var(--sand-card)", padding: "12px 14px", borderRadius: "var(--radius-md)", fontSize: "0.85rem", border: "1px solid var(--secondary-border)" }}>
          <div><strong>Target Budget:</strong> {buyer.budgetRange} ({buyer.unitTargetBudget} / unit)</div>
          <div><strong>Delivery Deadline:</strong> {buyer.deadline}</div>
          <div><strong>Buyer Terms:</strong> {buyer.paymentTerms}</div>
        </div>

        {/* Select Artisan Product to Offer */}
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "4px" }}>
            Select Product from Your Catalog:
          </label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--border-medium)" }}
          >
            {products.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name} (Catalog Price: ₹{p.price})
              </option>
            ))}
          </select>
        </div>

        {/* Quantity & Proposed Unit Price */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "4px" }}>
              Quantity Offered:
            </label>
            <input
              type="number"
              value={quotedQuantity}
              onChange={(e) => setQuotedQuantity(Number(e.target.value))}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--border-medium)" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "4px" }}>
              Proposed Unit Price (₹):
            </label>
            <input
              type="number"
              value={proposedPrice}
              onChange={(e) => setProposedPrice(Number(e.target.value))}
              style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--border-medium)" }}
            />
          </div>
        </div>

        {/* Total Calculated Value */}
        <div style={{ padding: "10px 14px", backgroundColor: "var(--accent-green-light)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.88rem", fontWeight: 700, color: "var(--accent-green)" }}>
            Total Quotation Amount:
          </span>
          <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--accent-green)" }}>
            ₹{(quotedQuantity * proposedPrice).toLocaleString("en-IN")}
          </span>
        </div>

        {/* Message Note */}
        <div>
          <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "4px" }}>
            Note to Procurement Team:
          </label>
          <textarea
            rows={3}
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1.5px solid var(--border-medium)" }}
          />
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" style={{ fontWeight: 800 }}>
            <Send size={16} />
            <span>Submit Official Quotation</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
