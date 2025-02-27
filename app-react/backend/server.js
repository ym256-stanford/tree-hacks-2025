import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import fetch from "node-fetch"; // Ensure node-fetch is installed if using older Node.js versions

dotenv.config();
const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const custom_prompt = "Replace the following word with a simpler one. Limit your response to a single unhyphenated word. Be creative."

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
        n : 3
    })
    console.log("OpenAI response:", response);
    console.log("as list", response.choices.map((x) => x.message.content))
    res.json({ reply: response.choices.map((x) => x.message.content) });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Dictionary API for definitions
app.post("/define", async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${message}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return res.status(404).json({ error: "Definition not found" });
    }

    const data = await response.json();
    const definition = data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found.";

    console.log("Dictionary API response:", definition);
    res.json({ reply: definition });
  } catch (error) {
    console.error("Error:", error);
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
