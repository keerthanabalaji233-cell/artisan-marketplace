import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Sliders } from "lucide-react";

export const ImageCompareSlider = ({
  beforeImage,
  afterImage,
  beforeLabel = "Original Workshop Photo",
  afterLabel = "AI Studio Enhanced",
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let pos = (x / rect.width) * 100;
    if (pos < 0) pos = 0;
    if (pos > 100) pos = 100;
    setSliderPosition(pos);
  }, []);

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    const onUp = () => setIsDragging(false);
    window.addEventListener("mouseup", onUp);
    return () => window.removeEventListener("mouseup", onUp);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      style={{
        position: "relative",
        width: "100%",
        height: "440px",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        userSelect: "none",
        border: "2px solid var(--border-medium)",
        boxShadow: "var(--shadow-md)",
        backgroundColor: "#F7F4EE",
        cursor: isDragging ? "ew-resize" : "default",
      }}
    >
      {/* After Image (Background full layer) */}
      <img
        src={afterImage}
        alt={afterLabel}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />

      {/* After Badge */}
      <div
        style={{
          position: "absolute",
          top: "14px",
          right: "14px",
          backgroundColor: "var(--accent-green)",
          color: "#FFFFFF",
          fontSize: "0.75rem",
          fontWeight: 800,
          padding: "5px 12px",
          borderRadius: "9999px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          zIndex: 10,
        }}
      >
        <Sparkles size={14} />
        <span>{afterLabel}</span>
      </div>

      {/* Before Image (Clipped layer) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: `${sliderPosition}%`,
          overflow: "hidden",
          borderRight: "3px solid #FFFFFF",
          boxShadow: "2px 0 10px rgba(0,0,0,0.3)",
          zIndex: 5,
        }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: containerRef.current ? containerRef.current.clientWidth : "100%",
            height: "100%",
            maxWidth: "none",
            objectFit: "cover",
            filter: "brightness(0.9) contrast(0.92)",
          }}
        />

        {/* Before Badge */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            backgroundColor: "rgba(31,36,33,0.85)",
            backdropFilter: "blur(4px)",
            color: "#FFFFFF",
            fontSize: "0.75rem",
            fontWeight: 700,
            padding: "5px 12px",
            borderRadius: "9999px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {beforeLabel}
        </div>
      </div>

      {/* Slider Divider Handle */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={() => setIsDragging(true)}
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${sliderPosition}%`,
          transform: "translateX(-50%)",
          width: "42px",
          cursor: "ew-resize",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundColor: "#FFFFFF",
            border: "2px solid var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            color: "var(--primary)",
          }}
        >
          <Sliders size={18} />
        </div>
      </div>

      {/* Drag instruction helper at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: "12px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "rgba(0,0,0,0.65)",
          backdropFilter: "blur(4px)",
          color: "#FFFFFF",
          fontSize: "0.72rem",
          fontWeight: 600,
          padding: "4px 12px",
          borderRadius: "9999px",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        ↔ Drag slider left/right to compare
      </div>
    </div>
  );
};
