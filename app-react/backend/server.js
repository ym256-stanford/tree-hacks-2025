import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const custom_prompt = "Can you replace the following word with a simpler one? "

app.use(express.json());
app.use(cors());

console.log("API Key Loaded:", process.env.OPENAI_API_KEY ? "Yes" : "No");
app.post("/chat", async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{role: "system", content : custom_prompt},{ role: "user", content: message }],
    });
    console.log("OpenAI response:", response.data);
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5005, () => console.log("Server running on port 5005"));
