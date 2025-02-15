import React, { useState } from "react";
import axios from "axios";

const ClickableWordsPreloaded = ({ text }) => {
  const [highlightedWords, setHighlightedWords] = useState(new Set());
  const [modifiedText, modifyText] = useState(text)
  const wordReplacements = {"Flummoxed" : ["confused", "baffled"],
                             "intricate" : ["complex", "ornate"],
                             "magnanimous" : ["generous","giving"],
                             "inorganic" : ["fake", "nonliving"]}
    const initialState = {"Flummoxed" : 0,
                             "intricate" : 0,
                             "magnanimous" : 0,
                             "inorganic" : 0}
  const [wordStates, setWordState] = useState(initialState)
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false);

  const handleWordClick = (word,originalWord) => {
    if (loading) return;
    const curWordState = wordStates[originalWord]
    const possibleSwaps = wordReplacements[originalWord]
    if (curWordState < possibleSwaps.length) {
        const newWord = possibleSwaps[curWordState]
        modifyText((prev) =>
            prev.replace(new RegExp(`\\b${word}\\b`, "g"), newWord)
        )
        setHighlightedWords((prev) =>
            highlightedWords.add(originalWord)
        );
        wordStates[originalWord] += 1
        setWordState(wordStates)
    } else {
        modifyText((prev) =>
            prev.replace(new RegExp(`\\b${word}\\b`, "g"), originalWord)
        )
        highlightedWords.delete(originalWord)
        setHighlightedWords(highlightedWords);
        wordStates[originalWord] = 0
        setWordState(wordStates)
    }
  };

  const renderText = () => {
    // Split the text into words, and wrap them in span tags
    console.log(highlightedWords)
    const words = modifiedText.split(" ");
    const originalWords = text.split(" ");
    return words.map((word, index) => {
        const originalWord = originalWords[index]
      const isHighlighted = highlightedWords.has(originalWord);
      return (
        <span
          key={index}
          onClick={() => handleWordClick(word,originalWord)}
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

export default ClickableWordsPreloaded;