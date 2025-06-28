



import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const RobotAssistant = ({ onClick, isListening }) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        width: 300,
        margin: "0 auto",
        transition: "transform 0.2s",
      }}
    >
      <DotLottieReact
        src="https://lottie.host/f2d3a6e9-4b00-478a-bf37-db837eb296d7/WoyYfWKBBm.lottie"
        loop
        autoplay
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "12px",
          border: isListening ? "3px solid #4CAF50" : "3px solid transparent",
        }}
      />
      <p
        style={{
          fontSize: 16,
          fontWeight: "bold",
          marginTop: 10,
          color: isListening ? "#4CAF50" : "#555",
        }}
      >
        👆 {isListening ? "Listening..." : "Tap June to Talk"}
      </p>
    </div>
  );
};

export default RobotAssistant;
