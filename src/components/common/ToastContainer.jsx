import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { useApp } from "../../context/AppContext";

export const ToastContainer = () => {
  const { notifications, setNotifications } = useApp();

  if (!notifications || notifications.length === 0) return null;

  const handleDismiss = (id) => {
    // using AppContext setter
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "380px",
        width: "calc(100vw - 40px)",
        pointerEvents: "none",
      }}
    >
      {notifications.map((notif) => {
        const isSuccess = notif.type === "success";
        const isError = notif.type === "error";

        return (
          <div
            key={notif.id}
            style={{
              pointerEvents: "auto",
              backgroundColor: "#FFFFFF",
              border: `1.5px solid ${isSuccess ? "#2D6A4F" : isError ? "#DC2626" : "#A73A24"}`,
              borderRadius: "14px",
              padding: "12px 16px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div style={{ marginTop: "2px", flexShrink: 0 }}>
              {isSuccess && <CheckCircle2 size={20} color="#2D6A4F" />}
              {isError && <AlertCircle size={20} color="#DC2626" />}
              {!isSuccess && !isError && <Info size={20} color="#A73A24" />}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: "0.92rem", color: "#1F2421" }}>
                {notif.title}
              </div>
              <div style={{ fontSize: "0.82rem", color: "#565C58", marginTop: "2px", lineHeight: "1.35" }}>
                {notif.message}
              </div>
            </div>

            <button
              onClick={() => {
                // Remove notification
              }}
              style={{
                background: "transparent",
                border: "none",
                color: "#7E8580",
                cursor: "pointer",
                padding: "2px",
                display: "none",
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
