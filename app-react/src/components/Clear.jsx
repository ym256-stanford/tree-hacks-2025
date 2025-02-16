import React from "react";

const Clear = ({ onClick }) => {
  return (
    <button
      onClick={onClick} 
      style={{
        backgroundColor: "red",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        position: "fixed",
        top: "10px",
        right: "10px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 50,
      }}
    >
      Clear
    </button>
  );
};

export default Clear;
