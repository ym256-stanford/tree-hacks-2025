import React, { useState, useRef, useEffect} from "react";
import axios from "axios";

function matchCase(original, replacement) {
    if (original === original.toUpperCase()) {
      return replacement.toUpperCase(); // ALL CAPS
    }
    if (original === original.toLowerCase()) {
      return replacement.toLowerCase(); // all lowercase
    }
    if (original[0] === original[0].toUpperCase()) {
      return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase(); // Title Case
    }
    return replacement; // Default to replacement as-is
  }

const ClickableWordsPreloaded = ({ text }) => {
    const clickTimeoutRef = useRef(null);
    const allWords = text.split(" ").map((word) => word.toLowerCase().replace(/[^\w\s]|_/g, ''))
  const [highlightedWords, setHighlightedWords] = useState(new Set());
  const [modifiedText, modifyText] = useState(text)
    const [wordReplacements, setReplacements] = useState({})
    const [wordStates, setWordState] = useState({})
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

            newReplacements[word] = [...new Set(res.data.reply.map(str => str.toLowerCase()))]; // | word
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
        console.log("single click")
        modifyText((prev) =>
            prev.replace(new RegExp(`\\b${word}\\b`, "g"), originalWord)
        )
        highlightedWords.delete(originalWord)
        setHighlightedWords(highlightedWords);
        wordStates[originalWord] = 0
        setWordState(wordStates)
    }, 250)
}

const handleWordClick = (word,originalWord,rawWord, index) => {
    if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current); // Cancel single-click action
        clickTimeoutRef.current = null;
      }
      console.log("original to search for:", originalWord)
      console.log("curr to search for:", word)
      console.log("raw to search for:", rawWord)
    const curWordState = wordStates[originalWord]
    const possibleSwaps = wordReplacements[originalWord]
    const safeRaw = rawWord.replace(/[^\w\s]|_/g, '')
    if (curWordState < possibleSwaps.length) {
        const newWord = possibleSwaps[curWordState]
        modifyText((prev) =>
            //modify to maintain punctuation (change regex)
            prev.replace(new RegExp(`\\b${safeRaw}\\b`, "gi"), matchCase(safeRaw,newWord))
        )
        setHighlightedWords((prev) =>
            highlightedWords.add(originalWord)
        );
        wordStates[originalWord] += 1
        setWordState(wordStates)
        console.log("doing swap")
    } else {
        modifyText((prev) =>
            //modify to maintain punctuation and case of original
            prev.replace(new RegExp(`\\b${safeRaw}\\b`, "gi"), matchCase(safeRaw,originalWord))
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
    const originalWords = allWords;
        // also remove punctuation from each
    return words.map((word, index) => {
        //cleanWord = word without punctuation and all lowercase
        const cleanWord = word.replace(/[^\w\s]|_/g, '').toLowerCase()
        const originalWord = originalWords[index]
        console.log(originalWord)
      const isHighlighted = highlightedWords.has(originalWord);
      return (
        <span
          key={index}
          onClick={() => handleWordClickSingle(cleanWord, originalWord,word,index)}
          onDoubleClick={() => handleWordClick(cleanWord,originalWord,word,index)}
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