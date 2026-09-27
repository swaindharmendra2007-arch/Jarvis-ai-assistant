import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 10000;

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.get("/", (req, res) => {
  res.send("JARVIS AI Backend is running!");
});

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({
        error: "No message received"
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: userMessage,
      config: {
        systemInstruction:
          "You are JARVIS, a helpful futuristic AI voice assistant. " +
          "Answer clearly, naturally and briefly. " +
          "You are assisting a student."
      }
    });

    res.json({
      reply: response.text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI response failed"
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`JARVIS backend running on port ${PORT}`);
});
