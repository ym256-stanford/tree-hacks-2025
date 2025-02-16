import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { replaceWordPreservePunctuation, range, cleanWord } from '../utils';
import Clear from "./Clear";
import Back from "./Back"
import ClickableWordsDefinition from "./ClickableWordsDefinition";


const ClickableWordsPreloaded = ({ text }) => {
    const clickTimeoutRef = useRef(null);
    const allWordsOrig = text.split(" ")
    const allWords = text.split(" ").map((word) => word.toLowerCase().replace(/[^\w\s]|_/g, ''))
  const [highlightedWords, setHighlightedWords] = useState(new Set());
  const [modifiedText, modifyText] = useState(text.split(" "));
  const [wordReplacements, setReplacements] = useState({});
  const [wordStates, setWordState] = useState({});
  const [clickedWords, setClickedWords] = useState(new Map());
  const [loading, setLoading] = useState(false);

const reset = () => {
    console.log("resetting")
    setHighlightedWords(new Set())
    const newWordStates = {}
    const backState = range(0,allWords.length).reduce((obj, key) => {
        obj[key] = 0;
        return obj;
      }, {});
      setWordState(backState);
    const newText = text.split(" ")
    modifyText(newText)
}

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
              const replacementList = [...new Set(res.data.reply.map(str => str.toLowerCase()))];
              const finalReplacements = replacementList.filter((item) => item != cleanedWord)
              newReplacements[cleanedWord] = finalReplacements 

            }
          })
        );
      } catch (error) {
        console.error("Error preloading replacements:", error);
      } finally {
        setReplacements(newReplacements);
        const initialState = range(0,allWords.length).reduce((obj, key) => {
          obj[key] = 0;
          return obj;
        }, {});
        setWordState(initialState);
        setLoading(false);
      }
    };

    preloadReplacements();
  }, [text]);

  const handleWordClickSingle = (rawWord, word, originalWord, index) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }
    const safeRaw = rawWord.replace(/[^\w-\s]|_/g, '')
    clickTimeoutRef.current = setTimeout(() => {
        console.log("single click")
        console.log("orig word", originalWord)
        modifiedText[index] = replaceWordPreservePunctuation(rawWord, safeRaw, originalWord)
        modifyText(modifiedText)
        const updatedHighlightedWords = new Set(highlightedWords);
        updatedHighlightedWords.delete(index);
        setHighlightedWords(updatedHighlightedWords);
        wordStates[index] = 0
        setWordState(wordStates)
        console.log(modifiedText)
        console.log("done")
    }, 250)
}

  const handleWordClick = (rawWord, word, originalWord, index) => {
    if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current); // Cancel single-click action
        clickTimeoutRef.current = null;
      }
      console.log("original to search for:", originalWord)
      console.log("curr to search for:", word)
   //   console.log("raw to search for:", rawWord)
    const curWordState = wordStates[index]
    const possibleSwaps = wordReplacements[originalWord]
    const safeRaw = rawWord.replace(/[^\w-\s]|_/g, '')

    if (curWordState < possibleSwaps.length) {
        const newWord = possibleSwaps[curWordState]
        console.log("input word", word)
        modifiedText[index] = replaceWordPreservePunctuation(rawWord, safeRaw, newWord)
        modifyText(modifiedText)
        setHighlightedWords(() =>
            highlightedWords.add(index)
        );
        wordStates[index] += 1
        setWordState(wordStates)
        console.log("doing swap")

    } else {
        modifiedText[index] = replaceWordPreservePunctuation(rawWord, safeRaw, originalWord)
        modifyText(modifiedText )
        highlightedWords.delete(index)
        setHighlightedWords(highlightedWords);
        wordStates[index] = 0
        setWordState(wordStates)
    }
    setClickedWords((prev) => new Map(prev).set(originalWord, possibleSwaps[curWordState] || word));
  // if not in set of clicked words
    //if 
  //fetch definition
    };

  const renderText = () => {
    console.log(wordReplacements)
    const originalWords = allWords;
        // also remove punctuation from each
    return modifiedText.map((word, index) => {
        //cleanWord = word without punctuation and all lowercase
        const currWordCleaned = word.replace(/[^\w-\s]|_/g, '').toLowerCase()
      //  console.log(originalWord)
      const originalWord = originalWords[index];
      const originalWordCleaned = cleanWord(originalWord)
      const isHighlighted = highlightedWords.has(index);
      return (
        <span
          key={index}
          onClick={() => handleWordClickSingle(word,currWordCleaned, originalWordCleaned,index)}
          onDoubleClick={() => handleWordClick(word,currWordCleaned, originalWordCleaned,index,)}
          style={{ color: isHighlighted ? "red" : "black", cursor: "pointer" }}
        >
          {word}{" "}
        </span>
      );
    });
  };

  return (
    <>
      {loading ? (<p>Loading...</p>) :  ( <div>
        <Back/>
        <Clear onClick = {reset} />
      <div>{renderText()}</div>
      {clickedWords.size > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Vocab List</h3>
          <ul>
            {[...clickedWords.entries()].map(([word, replacement], index) => (
              <li key={index}>
                <strong>{cleanWord(word)}:</strong> {replacement}
              </li>
            ))}
          </ul>
        </div>
      )} 
      </div> )}
    </>
  );
};

export default ClickableWordsPreloaded;
