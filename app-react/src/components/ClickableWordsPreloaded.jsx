import React, { useState, useRef} from "react";
import axios from "axios";

const ClickableWordsPreloaded = ({ text }) => {
const clickTimeoutRef = useRef(null);
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
 // const [response, setResponse] = useState("")
  //const [loading, setLoading] = useState(false);

  const handleWordClickSingle = (word,originalWord) => {
   // if (loading) return;
    const curWordState = wordStates[originalWord]
    if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
        clickTimeoutRef.current = null;
      }
    clickTimeoutRef.current = setTimeout(() => {
        modifyText((prev) =>
            prev.replace(new RegExp(`\\b${word}\\b`, "g"), originalWord)
        )
        highlightedWords.delete(originalWord)
        setHighlightedWords(highlightedWords);
        wordStates[originalWord] = 0
        setWordState(wordStates)
    }, 250)
}

const handleWordClick = (word,originalWord) => {
    if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current); // Cancel single-click action
        clickTimeoutRef.current = null;
      }
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
    console.log(wordStates)
    const words = modifiedText.split(" ");
    const originalWords = text.split(" ");
    return words.map((word, index) => {
        const originalWord = originalWords[index]
      const isHighlighted = highlightedWords.has(originalWord);
      return (
        <span
          key={index}
          onClick={() => handleWordClickSingle(word, originalWord)}
          onDoubleClick={() => handleWordClick(word,originalWord)}
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
    <div>{renderText()}</div>
    </>
  )
};
// {loading && <p>Loading replacement...</p>} 
export default ClickableWordsPreloaded;