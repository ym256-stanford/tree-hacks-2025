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
          text={"The cellular components of prokaryotes are not enclosed in membranes within the cytoplasm, like eukaryotic organelles. Bacteria have microcompartments, quasi-organelles enclosed in protein shells such as encapsulin protein cages, while both bacteria and some archaea have gas vesicles. Prokaryotes have simple cell skeletons. These are highly diverse, and contain homologues of the eukaryote proteins actin and tubulin. The cytoskeleton provides the capability for movement within the cell. "} 
        />
      </div>
    </div>
  );
};

export default TextPage;
