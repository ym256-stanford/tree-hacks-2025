import React, { useState } from "react";

const ClickableWords = ({ text }) => {
  const [highlightedWords, setHighlightedWords] = useState([]);

  const handleWordClick = (word) => {
    // Toggle highlight on the clicked word
    setHighlightedWords((prev) =>
      prev.includes(word) ? prev.filter((w) => w !== word) : [...prev, word]
    );
  };

  const renderText = () => {
    // Split the text into words, and wrap them in span tags
    const words = text.split(" ");
    return words.map((word, index) => {
      const isHighlighted = highlightedWords.includes(word);
      return (
        <span
          key={index}
          onClick={() => handleWordClick(word)}
          style={{
            backgroundColor: isHighlighted ? "yellow" : "transparent",
            cursor: "pointer",
          }}
        >
          {word}{" "}
        </span>
      );
    });
  };

  return <div>{renderText()}</div>;
};

export default ClickableWords;