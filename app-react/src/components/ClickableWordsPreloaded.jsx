import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ClickableWordsPreloaded = ({ text }) => {
  const clickTimeoutRef = useRef(null);
  const allWords = text.split(" ");
  const [highlightedWords, setHighlightedWords] = useState(new Set());
  const [modifiedText, modifyText] = useState(text);
  const [wordReplacements, setReplacements] = useState({});
  const [wordStates, setWordState] = useState({});
  const [clickedWords, setClickedWords] = useState(new Map());
  const [loading, setLoading] = useState(false);

  const cleanWord = (word) => {
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  };

  useEffect(() => {
    const preloadReplacements = async () => {
      setLoading(true);
      const newReplacements = {};
      try {
        await Promise.all(
          allWords.map(async (word) => {
            const cleanedWord = cleanWord(word);
            if (!newReplacements[cleanedWord]) {
              const message = cleanedWord;
              const res = await axios.post("http://localhost:5005/chat/all", { message });
              newReplacements[cleanedWord] = [...new Set(res.data.reply.map(str => str.toLowerCase()))];
            }
          })
        );
      } catch (error) {
        console.error("Error preloading replacements:", error);
      } finally {
        setReplacements(newReplacements);
        const initialState = allWords.reduce((obj, key) => {
          obj[key] = 0;
          return obj;
        }, {});
        setWordState(initialState);
        setLoading(false);
      }
    };

    preloadReplacements();
  }, [text]);

  const handleWordClickSingle = (word, originalWord) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }
    clickTimeoutRef.current = setTimeout(() => {
      modifyText((prev) => prev.replace(new RegExp(`\\b${word}\\b`, "g"), originalWord));
      highlightedWords.delete(originalWord);
      setHighlightedWords(new Set(highlightedWords));
      wordStates[originalWord] = 0;
      setWordState({ ...wordStates });
    }, 250);
  };

  const handleWordClick = (word, originalWord) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }
    const cleanedWord = cleanWord(originalWord);
    const curWordState = wordStates[cleanedWord];
    const possibleSwaps = wordReplacements[cleanedWord];
    let newWord = cleanedWord;

    if (curWordState < possibleSwaps.length) {
      newWord = possibleSwaps[curWordState];
      wordStates[cleanedWord] += 1;
    } else {
      wordStates[cleanedWord] = 0;
    }

    modifyText((prev) => prev.replace(new RegExp(`\\b${word}\\b`, "g"), newWord));
    setHighlightedWords((prev) => new Set(prev).add(cleanedWord));
    setWordState({ ...wordStates });
    setClickedWords((prev) => new Map(prev).set(cleanedWord, possibleSwaps[curWordState] || cleanedWord));
  };

  const renderText = () => {
    const words = modifiedText.split(" ");
    const originalWords = text.split(" ");
    return words.map((word, index) => {
      const originalWord = originalWords[index];
      const isHighlighted = highlightedWords.has(cleanWord(originalWord));
      return (
        <span
          key={index}
          onClick={() => handleWordClickSingle(word, originalWord)}
          onDoubleClick={() => handleWordClick(word, originalWord)}
          style={{ color: isHighlighted ? "red" : "black", cursor: "pointer" }}
        >
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <>
      {loading && <p>Loading...</p>} 
      <div>{renderText()}</div>
      {clickedWords.size > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Clicked Words Dictionary</h3>
          <ul>
            {[...clickedWords.entries()].map(([word, replacement], index) => (
              <li key={index}>
                <strong>{cleanWord(word)}:</strong> {replacement}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ClickableWordsPreloaded;
