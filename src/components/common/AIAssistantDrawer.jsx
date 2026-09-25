import React, { useState } from "react";
import { Sparkles, MessageSquare, Send, X, Bot, User, Volume2, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { speakText } from "../../utils/speechHelper";

export const AIAssistantDrawer = () => {
  const { aiAssistantOpen, setAiAssistantOpen, setCurrentTab, currentLang } = useApp();

  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Namaste! I am Sahayak, your ArtisanAI Business Assistant. How can I assist you with your craft today?",
      time: "Just now",
    },
  ]);

  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: "📷 How can I add a product?", action: "add_product", response: "To add a product, simply tap '📷 Add Product' on your dashboard. You can take a photo of your craft, enhance the lighting with AI, and describe it in your own language using voice!" },
    { label: "✨ Improve my product photo", action: "photo", response: "Our AI Image Studio automatically removes workshop clutter, adds clean studio lighting, and generates high-resolution square images ready for e-commerce and export catalogs." },
    { label: "🎤 Create my product description", action: "desc", response: "You can use the 'AI Product Cataloger'. Just tap the microphone and speak naturally in Hindi, Tamil, Telugu, or English. Our AI will extract materials, dimensions, and craft story." },
    { label: "💰 Suggest a price", action: "price", response: "The AI Smart Pricing Assistant calculates fair artisan wages, raw materials, packaging, and compares with wholesale market trends so you never undersell your heritage craft." },
    { label: "🤝 Find buyers", action: "buyers", response: "Head to the 'Connect With Buyers' marketplace to view verified bulk requirements from boutique retail chains, corporate gifting firms, and government e-marketplaces (like ONDC and GeM)." },
  ];

  const handleSend = (textToSend = null) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg = { sender: "user", text, time: "Just now" };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Contextual matching
    setTimeout(() => {
      let reply = "I am here to help you digitize your craft, calculate fair pricing, or connect with bulk buyers. What craft are you creating today?";
      const lower = text.toLowerCase();
      
      if (lower.includes("photo") || lower.includes("image") || lower.includes("camera")) {
        reply = "You can go to AI Image Studio to upload your craft photo. It will remove shadows, clean the background, and provide professional studio lighting.";
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("rate")) {
        reply = "Our AI Smart Pricing tool factors in raw material costs, hours spent on the loom or wheel, and suggests a fair price that guarantees an artisan profit margin of 20-25%.";
      } else if (lower.includes("buyer") || lower.includes("market") || lower.includes("order") || lower.includes("sell")) {
        reply = "We currently have 5 active buyer requirements in the B2B Marketplace, including retail chains and corporate gifting buyers looking for baskets, sarees, and pottery!";
      } else if (lower.includes("voice") || lower.includes("catalog") || lower.includes("speak") || lower.includes("hindi") || lower.includes("tamil")) {
        reply = "The Multilingual Voice Cataloger allows you to speak in your regional language. It automatically transcribes and translates your craft story into professional English and Hindi.";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: reply, time: "Just now" }]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickPrompt = (prompt) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: prompt.label, time: "Just now" },
      { sender: "ai", text: prompt.response, time: "Just now" },
    ]);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setAiAssistantOpen(true)}
        style={{
          position: "fixed",
          bottom: "95px",
          right: "22px",
          zIndex: 45,
          backgroundColor: "var(--primary)",
          color: "#FFFFFF",
          border: "2px solid #FFFFFF",
          borderRadius: "9999px",
          padding: "12px 18px",
          boxShadow: "0 8px 24px rgba(167, 58, 36, 0.4)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
          fontWeight: 700,
          fontSize: "0.95rem",
          transition: "transform 0.2s, background-color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        aria-label="Open AI Assistant"
      >
        <Sparkles size={20} color="#F5EFE6" />
        <span>Ask Sahayak AI</span>
      </button>

      {/* Slide-out Drawer */}
      {aiAssistantOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 60,
            display: "flex",
            justifyContent: "flex-end",
          }}
          onClick={() => setAiAssistantOpen(false)}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "420px",
              height: "100%",
              backgroundColor: "var(--bg-surface)",
              boxShadow: "var(--shadow-xl)",
              display: "flex",
              flexDirection: "column",
              borderLeft: "1px solid var(--border-medium)",
              animation: "slideLeft 0.25s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div
              style={{
                padding: "1.25rem",
                backgroundColor: "var(--primary)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bot size={22} color="#FFFFFF" />
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, fontSize: "1.1rem" }}>Sahayak AI</h4>
                  <p style={{ fontSize: "0.8rem", opacity: 0.9 }}>Virtual Business Manager for Artisans</p>
                </div>
              </div>
              <button
                onClick={() => setAiAssistantOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                <X size={22} />
              </button>
            </div>

            {/* Quick Context Prompts */}
            <div
              style={{
                padding: "0.85rem 1rem",
                backgroundColor: "var(--sand-card)",
                borderBottom: "1px solid var(--border-subtle)",
              }}
            >
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "6px" }}>
                QUICK ARTISAN ACTIONS:
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {quickPrompts.map((qp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickPrompt(qp)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      border: "1px solid var(--secondary-border)",
                      borderRadius: "9999px",
                      padding: "4px 10px",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {qp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Thread */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                backgroundColor: "#FAF9F6",
              }}
            >
              {messages.map((m, i) => {
                const isUser = m.sender === "user";
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isUser ? "flex-end" : "flex-start",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "85%",
                        padding: "10px 14px",
                        borderRadius: isUser ? "16px 16px 2px 16px" : "16px 16px 16px 2px",
                        backgroundColor: isUser ? "var(--primary)" : "#FFFFFF",
                        color: isUser ? "#FFFFFF" : "var(--text-primary)",
                        boxShadow: "var(--shadow-sm)",
                        border: isUser ? "none" : "1px solid var(--border-subtle)",
                        fontSize: "0.92rem",
                        lineHeight: 1.45,
                      }}
                    >
                      {m.text}
                      {!isUser && (
                        <div style={{ marginTop: "6px", display: "flex", justifyContent: "flex-end" }}>
                          <button
                            onClick={() => speakText(m.text, currentLang)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--primary)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "4px",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}
                          >
                            <Volume2 size={14} /> Listen
                          </button>
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "2px", marginInline: "4px" }}>
                      {m.time}
                    </span>
                  </div>
                );
              })}
              {isTyping && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--text-muted)", fontSize: "0.85rem", padding: "6px" }}>
                  <Sparkles size={16} className="animate-spin" color="var(--primary)" />
                  Sahayak is analyzing...
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div
              style={{
                padding: "0.85rem 1rem",
                borderTop: "1px solid var(--border-subtle)",
                backgroundColor: "#FFFFFF",
                display: "flex",
                gap: "8px",
              }}
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Sahayak about cataloging, pricing, buyers..."
                style={{
                  flex: 1,
                  padding: "10px 14px",
                  borderRadius: "var(--radius-md)",
                  border: "1.5px solid var(--border-medium)",
                  fontSize: "0.92rem",
                  fontFamily: "var(--font-main)",
                }}
              />
              <button
                onClick={() => handleSend()}
                className="btn btn-primary"
                style={{ minHeight: "44px", padding: "0 16px" }}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
