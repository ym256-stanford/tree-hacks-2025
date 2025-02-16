import React, { useState, useRef, useEffect} from "react";
import axios from "axios";

const ClickableWordsPreloaded = ({ text }) => {
    const clickTimeoutRef = useRef(null);
    const allWords = text.split(" ")
  const [highlightedWords, setHighlightedWords] = useState(new Set());
  const [modifiedText, modifyText] = useState(text)
    const [wordReplacements, setReplacements] = useState({})
    const [wordStates, setWordState] = useState({})
 // const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    const preloadReplacements = async () => {
        setLoading(true)
      const newReplacements = {};
      try {
        await Promise.all(
          allWords.map(async (word) => {
            if (word in newReplacements){
                
            } else {
            const message = word
            const res = await axios.post("http://localhost:5005/chat/all", { message });
            newReplacements[word] = res.data.reply; // | word
            }
          })
        );
      } catch (error) {
        console.error("Error preloading replacements:", error);
      } finally {
        setReplacements(newReplacements);
        const initialState = allWords.reduce((obj, key) => {
            obj[key] = 0; // or any default value
            return obj;
          }, {});
        setWordState(initialState)
        setLoading(false);
      }
    };

    preloadReplacements();
  }, [text]);


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
    console.log(wordReplacements)
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
    {loading && <p>Loading...</p>} 
    <div>{renderText()}</div>
    </>
  )
};
export default ClickableWordsPreloaded;