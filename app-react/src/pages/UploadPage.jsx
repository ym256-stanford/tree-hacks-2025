import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import closeCircleIcon from "../assets/buttons/close-circle.svg"; // Import close button icon

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); // For navigation
  // Only allow .txt files
  const allowedTypes = ["text/plain"]; // .txt only

  // Handle file selection
  const handleFileChange = ({ target }) => {
    const file = target.files[0];
    if (validateFile(file)) {
      readFileContent(file);
    }
  };

  // Validate file type and size
  const validateFile = (file) => {
    if (!file) {
      alert("No file selected.");
      return false;
    }
    if (!allowedTypes.includes(file.type)) {
      alert("Only .txt files are allowed.");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert("File size should be under 50MB.");
      return false;
    }
    return true;
  };

  // Read file content and navigate to TextPage
  const readFileContent = (file) => {
    const reader = new FileReader();
    reader.onload = ({ target }) => {
      const content = target.result;
      setSelectedFile({ name: file.name, content });

      // Navigate to TextPage and pass file data
      navigate("/text", { state: { name: file.name, content } });
    };
    reader.readAsText(file, "UTF-8");
  };

  return (
    <>
      <Outlet />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="relative bg-white w-[942px] h-[832px] rounded-[46px] shadow-lg flex flex-col items-center justify-center p-10">
          
          {/* Return to Home Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 right-0 w-[50px] h-[50px] p-2"
            aria-label="Close"
          >
            <img src={closeCircleIcon} alt="Close" className="w-[50px] h-[50px]" />
          </button>

          {/* Upload Files Section */}
          <div className="w-[942px] h-[94px] flex flex-col justify-start items-start px-[44px] gap-[10px]">
            <div className="flex flex-col justify-center items-center gap-4">
              <h2 className="text-gray-800 text-[34px] font-medium">Upload a TXT File</h2>
              <p className="text-gray-500 text-[29px]">Only .txt files are supported</p>
            </div>
            <hr className="w-full border-t-2 border-gray-300 mt-2" />
          </div>

          {/* Upload Box */}
          <div className="w-[854px] h-[428px] border-4 border-dashed rounded-[26px] flex flex-col items-center justify-center gap-4 bg-white">
            <p className="text-[30px] font-medium text-gray-800">Choose a .txt file or drag & drop it here</p>
            <p className="text-[26px] text-gray-500">Supports: TXT (Max 50MB)</p>

            {/* Hidden File Input */}
            <input 
              type="file" 
              accept=".txt"  // Only allow .txt files
              onChange={handleFileChange} 
              className="hidden" 
              id="file-upload" 
            />

            {/* Browse File Button */}
            <label htmlFor="file-upload" className="cursor-pointer bg-gray-300 text-black text-[30px] font-medium py-3 px-6 rounded-lg shadow-md hover:bg-gray-400 mt-6">
              Browse TXT File
            </label>

            {/* Display Selected File Name */}
            {selectedFile && (
              <p className="text-[24px] text-green-600 mt-4">{selectedFile.name} uploaded successfully!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadPage;
