import React, { useState } from "react";
import axios from "axios";

const ClickableWords = ({ text }) => {
  const [highlightedWords, setHighlightedWords] = useState(new Set());
  const [modifiedText, modifyText] = useState(text)
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false);

  const handleWordClick = async (word) => {
    if (loading) return;
    setLoading(true)
    const message = word
    console.log(message)
        try {
          const res = await axios.post(`http://localhost:5005/chat`,  { message } );;

          modifyText((prev) =>
            prev.replace(new RegExp(`\\b${word}\\b`, "g"), res.data.reply)
            )
            setHighlightedWords((prev) =>
                 highlightedWords.add(res.data.reply)
              );
        } catch (error) {
          console.error("Error:", error);
        } finally{
            setLoading(false)
        }
  };

  const renderText = () => {
    // Split the text into words, and wrap them in span tags
    console.log(highlightedWords)
    const words = modifiedText.split(" ");
    const originalWords = text.split(" ");
    return words.map((word, index) => {
      const isHighlighted = highlightedWords.has(word);
      return (
        <span
          key={index}
          onClick={() => handleWordClick(word)}
          style={{
            color: isHighlighted ? "red" : "black",
            cursor: "pointer",
          }}
        >
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <>
    {loading && <p>Loading replacement...</p>}
    <div>{renderText()}</div>
    </>
  )
};

export default ClickableWords;