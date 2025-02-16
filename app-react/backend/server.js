import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const custom_prompt = "Replace the following word with a simpler one. Only answer with one word."

app.use(express.json());
app.use(cors());

console.log("API Key Loaded:", process.env.OPENAI_API_KEY ? "Yes" : "No");
app.post("/chat/all", async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { message } = req.body;
    if (!message) {
    }
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{role: "system", content : custom_prompt},
        { role: "user", content: message }],
        n : 5
    })
    console.log("OpenAI response:", response);
    console.log("as list", response.choices.map((x) => x.message.content))
    res.json({ reply: response.choices.map((x) => x.message.content) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/chat/any", async (req, res) => {
    try {
      console.log("Received request body:", req.body);
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{role: "system", content : custom_prompt},
          { role: "user", content: message }],
      });
      console.log("OpenAI response:", response);
      res.json({ reply: response.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

app.listen(5005, () => console.log("Server running on port 5005"));
