



import React, { useState, useEffect } from "react";
import axios from "axios";
import RobotAssistant from "./June";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [chatLog, setChatLog] = useState([]);
  const [femaleVoice, setFemaleVoice] = useState(null);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onstart = () => {
    setIsListening(true);
    console.log("🎙️ Listening...");
  };

  recognition.onend = () => {
    setIsListening(false);
    console.log("🛑 Stopped listening.");
  };

  recognition.onerror = (event) => {
    console.error("❌ Speech recognition error:", event.error);
    setIsListening(false);
  };

  recognition.onresult = async (event) => {
    const userMessage = event.results[0][0].transcript;
    console.log("You said:", userMessage);

    try {
      const res = await axios.post("https://localhost:7069/api/Assistant", {
        message: userMessage,
      });

      const assistantReply = res.data.reply;

      setChatLog((prev) => [
        ...prev,
        { user: userMessage, assistant: assistantReply },
      ]);

      const utterance = new SpeechSynthesisUtterance(assistantReply);
      utterance.lang = "en-US";

      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.error("💥 Error talking to backend:", err.message);
    }
  };

  const startListening = () => {
    if (!isListening) recognition.start();
  };

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const female = voices.find((v) =>
        ["female", "zira", "susan", "hayley", "libby", "natasha"].some((keyword) =>
          v.name.toLowerCase().includes(keyword)
        )
      );
      setFemaleVoice(female || voices[0]);
    };

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }

    loadVoices();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Hi, I'm June 🧠</h2>

      <RobotAssistant onClick={startListening} isListening={isListening} />

      <div style={styles.chatContainer}>
        {chatLog.map((chat, i) => (
          <div key={i} style={styles.chatBubble}>
            <p><strong>🧍 You:</strong> {chat.user}</p>
            <p><strong>🤖 June:</strong> {chat.assistant}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    textAlign: "center",
    padding: "30px 15px",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: 20,
    color: "#333",
  },
  chatContainer: {
    maxWidth: 600,
    margin: "40px auto 0",
    textAlign: "left",
  },
  chatBubble: {
    backgroundColor: "#fff",
    padding: "15px 20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    marginBottom: "20px",
  },
};

export default VoiceAssistant;
