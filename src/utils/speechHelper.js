// Web Speech API helper for low-literacy accessibility
// Provides Text-to-Speech (TTS) read-aloud and Speech-to-Text (STT) helpers

export const speakText = (text, langCode = "en", onEnd = null) => {
  if (!("speechSynthesis" in window)) {
    console.warn("Speech synthesis not supported in this browser environment.");
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  if (!text || text.trim() === "") return false;

  const utterance = new SpeechSynthesisUtterance(text);
  
  // Map our language codes to BCP 47 tags
  const langMap = {
    en: "en-IN",
    hi: "hi-IN",
    ta: "ta-IN",
    te: "te-IN",
    kn: "kn-IN",
    ml: "ml-IN",
    bn: "bn-IN",
    mr: "mr-IN",
  };

  utterance.lang = langMap[langCode] || "en-IN";
  utterance.rate = 0.95; // Slightly slower, clearer tempo for clarity
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopSpeaking = () => {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
};

export const isSpeechRecognitionSupported = () => {
  return "webkitSpeechRecognition" in window || "SpeechRecognition" in window;
};

export const createSpeechRecognizer = (langCode = "hi", onResult, onError, onEnd) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const recognizer = new SpeechRecognition();
  const langMap = {
    en: "en-IN",
    hi: "hi-IN",
    ta: "ta-IN",
    te: "te-IN",
    kn: "kn-IN",
    ml: "ml-IN",
    bn: "bn-IN",
    mr: "mr-IN",
  };

  recognizer.lang = langMap[langCode] || "hi-IN";
  recognizer.continuous = false;
  recognizer.interimResults = true;

  recognizer.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    if (onResult) onResult(transcript, event.results[0].isFinal);
  };

  recognizer.onerror = (event) => {
    if (onError) onError(event.error);
  };

  recognizer.onend = () => {
    if (onEnd) onEnd();
  };

  return recognizer;
};

// Play brief audio chime feedback
export const playAudioFeedback = (type = "chime") => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } else if (type === "mic_start") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    }
  } catch {
    // Silent fail if AudioContext is restricted before user gesture
  }
};
