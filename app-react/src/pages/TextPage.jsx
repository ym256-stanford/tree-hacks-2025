import React from 'react';
import ClickableWordsPreloaded from '../components/ClickableWordsPreloaded';
import Clear from '../components/Clear';
import Back from '../components/Back';
import { NavLink } from "react-router-dom"; // Import NavLink
import { useLocation } from "react-router-dom";

const TextPage = () => {
    const location = useLocation();
  const textContent = location.state?.content || "No text provided"; // Get the passed text
    const textTitle = location.state?.name.replace(/\.txt$/, "") || "No text provided";
  return (
    <>
    <div 
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh", // Ensures vertical centering
        padding: "0 10%", // Large margins from left & right
        backgroundColor: "#f9f9f9", // Optional background color
        width: "100%",
      }}
      className = "relative"
    >
        <h1 
         style={{
            fontSize: "36px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px", // Adds spacing below the title
          }}
        >{textTitle}</h1>
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
          text={textContent} 
        />
        
      </div>
    </div>
    </>
  );
};

export default TextPage;
