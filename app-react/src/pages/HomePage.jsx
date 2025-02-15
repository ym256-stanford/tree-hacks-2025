import React from "react";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom"; // Import NavLink
import homeBook from "../assets/images/home_book.png"; // Import local image

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
      <Outlet />

      {/* Main Container - Holds Text & Image */}
      <div className="flex flex-wrap items-center justify-between w-full max-w-[1280px] h-auto bg-white mx-auto relative px-6">
        
        {/* Left Section - Text & Button */}
        <div
          data-layer="Text and button"
          className="flex flex-col items-start text-left bg-white p-10 rounded-lg shadow-lg"
          style={{ width: "566px", height: "751px", maxWidth: "100%" }}
        >
          {/* Text */}
          <div 
            style={{ 
              width: "536px", 
              maxWidth: "100%",
              position: "relative", 
              background: "white", 
              textAlign: "left",
              lineHeight: "90px", // Reduces space between lines
            }}
          >
            <div style={{ fontSize: "100px", fontFamily: "Roboto", fontWeight: "800", color: "#3A3530" }}>
              Reading
            </div>
            <div style={{ fontSize: "100px", fontFamily: "Roboto", fontWeight: "300", color: "#3A3530" }}>
              has never been so
            </div>
            <div style={{ fontSize: "100px", fontFamily: "Roboto", fontWeight: "800", color: "#3A3530" }}>
              <span style={{ textDecoration: "line-through", textDecorationColor: "black" }}>facile</span> 
              <span style={{ color: "red" }}> easy</span>
            </div>
          </div>

          {/* Call-to-Action Button - Now Uses NavLink */}
          <NavLink
            to="/upload" // Navigate to UploadPage
            style={{
              width: "451px",
              height: "108px",
              backgroundColor: "#DD424D",
              borderRadius: "46px",
              fontSize: "58px",
              fontWeight: "300",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              transition: "background-color 0.3s ease",
              marginTop: "80px", // Adds space below text
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#E43334")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#DD424D")}
          >
            Start
          </NavLink>
        </div>

        {/* Right Section - Image (Responsive & Moved Up) */}
        <div className="flex items-center justify-center h-full w-full md:w-auto mt-6 md:mt-0">
          <img
            data-layer="Illustration"
            className="object-cover"
            src={homeBook} // Use local image
            alt="Illustration"
            style={{
              width: "400px", // 50% of original 571px (Twice smaller)
              height: "350px", // 50% of original 502px
              transform: "translateY(-100px)", // Moves the image UPWARDS
              maxWidth: "100%",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
