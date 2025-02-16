import React, { useState, useRef } from "react";
import axios from "axios";

const ClickableWordsDefinition = ({ text }) => {
  const longPressTimeoutRef = useRef(null);
  const [definition, setDefinition] = useState("");
  const [showDefinition, setShowDefinition] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");

  // Function to fetch definition from the backend
  const fetchDefinition = async (word) => {
    try {
      const response = await axios.post("http://localhost:5005/define", { message: word });
      setDefinition(response.data.reply);
      setSelectedWord(word);
      setShowDefinition(true);
    } catch (error) {
      console.error("Error fetching definition:", error);
      setDefinition("Definition not available.");
      setShowDefinition(true);
    }
  };

  // Function to detect long press (2 seconds)
  const handleLongPress = (word) => {
    longPressTimeoutRef.current = setTimeout(() => {
      fetchDefinition(word);
    }, 2000); // 2-second hold
  };

  // Function to cancel long press if released early
  const cancelLongPress = () => {
    if (longPressTimeoutRef.current) {
      clearTimeout(longPressTimeoutRef.current);
    }
  };

  const renderText = () => {
    return text.split(" ").map((word, index) => (
      <span
        key={index}
        onMouseDown={() => handleLongPress(word)}
        onMouseUp={cancelLongPress}
        onMouseLeave={cancelLongPress}
        style={{
          cursor: "pointer",
          color: "blue",
          fontWeight: "bold",
          transition: "color 0.3s",
          marginRight: "5px",
        }}
      >
        {word}{" "}
      </span>
    ));
  };

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      {renderText()}

      {/* Definition Tooltip */}
      {showDefinition && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "white",
            border: "1px solid black",
            padding: "10px",
            borderRadius: "8px",
            boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.2)",
            maxWidth: "300px",
            zIndex: "1000",
          }}
        >
          <strong>{selectedWord}</strong>: {definition}
          <button
            onClick={() => setShowDefinition(false)}
            style={{
              display: "block",
              marginTop: "5px",
              background: "red",
              color: "white",
              border: "none",
              padding: "5px",
              cursor: "pointer",
              borderRadius: "5px",
            }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default ClickableWordsDefinition;
