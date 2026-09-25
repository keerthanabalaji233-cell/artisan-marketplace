import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { speakText, stopSpeaking } from "../../utils/speechHelper";
import { useApp } from "../../context/AppContext";

export const AudioSpeakerBtn = ({ text, title = "Listen aloud", className = "" }) => {
  const { currentLang } = useApp();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakText(text, currentLang, () => {
        setIsSpeaking(false);
      });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`audio-speak-btn ${isSpeaking ? "speaking" : ""} ${className}`}
      title={title}
      aria-label={title}
    >
      {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
    </button>
  );
};
