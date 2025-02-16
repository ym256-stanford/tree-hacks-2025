import React from 'react'
import { NavLink } from "react-router-dom"; // Import NavLink
const Back = () => {
  return (
      <NavLink
            to="/upload" // Navigate to upload page 
            style={{
                backgroundColor: "blue",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                position: "fixed",
                top: "10px",
                left: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                zIndex: 50,
                fontSize: "12px",
              }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "green")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "blue")}
          >
            Back to upload
          </NavLink>
  )
}

export default Back
