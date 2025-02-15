import React, { useState } from "react";
import axios from "axios";

function Chat() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
  
    const sendMessage = async () => {
        try {
          const res = await axios.post(`http://localhost:5005/chat`,  { message } );;
          setResponse(res.data.reply);
          console.log(response)
        } catch (error) {
          console.error("Error:", error);
        }
      };
      console.log(response)
    return (
      <div>
        <h1>Chat</h1>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessage}>Send</button>
        <p>Response: {response}</p>
      </div>
    );
  }
  
  export default Chat