export const replaceWordPreservePunctuation = (text, word, replacement) => {
    const escapedWord = word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape regex characters
    const regex = new RegExp(`(\\W*)\\b(${escapedWord})\\b(\\W*)`, "gi"); // Capture surrounding punctuation
  
    return text.replace(regex, (match, before, matchedWord, after) => {
      return before + matchCase(matchedWord, replacement) + after;
    });
  }
  
export const matchCase = (original, replacement) => {
    if (original.length == 1 & original == original.toUpperCase()){
        return replacement.charAt(0).toUpperCase() + replacement.slice(1).toLowerCase();
    }
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

  export const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }

  export const cleanWord = (word) => {
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  };
