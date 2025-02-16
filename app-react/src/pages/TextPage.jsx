import React from 'react';
import ClickableWordsPreloaded from '../components/ClickableWordsPreloaded';

const TextPage = () => {
  return (
    <div 
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Ensures vertical centering
        padding: "0 10%", // Large margins from left & right
        backgroundColor: "#f9f9f9", // Optional background color
        width: "100%",
      }}
    >
      <div 
        style={{
          fontSize: "30px", // Adjusted text size
          fontFamily: "Palatino, serif", // Use Palatino font
          fontWeight: "normal",
          lineHeight: "1.5",
          color: "#3A3530",
          textAlign: "left", // Now left-aligned
          width: "100%", // Ensures full width for alignment
        }}
      >
        <ClickableWordsPreloaded 
          text={"Flummoxed intricate magnanimous flummoxed inorganic, Flummoxed intricate magnanimous Flummoxed inorganic,"} 
        />
      </div>
    </div>
  );
};

export default TextPage;
