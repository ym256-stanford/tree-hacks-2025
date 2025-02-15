import React from 'react'
import { useState } from 'react'
import axios from "axios";

function Chat() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
  
    const sendMessage = async () => {
      try {
        // change to {message}
        const res = await axios.post(`http://localhost:5005/chat`,  { message } );;
        setResponse(res.data.reply);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return (
      <div>
        <h1>Chat</h1>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
        <p>Response: {response}</p>
      </div>
    );
  }
  
const TextPage = () => {
  return (
    <div>
      <Chat/>
    </div>
  )
}

export default TextPage;
