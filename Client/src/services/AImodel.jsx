import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function runGemini(prompt) {
  try {

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log("Full Gemini Response:", response);

    const text =
      response?.text ||
      response?.candidates?.[0]?.content?.parts?.[0]?.text;

    console.log("Gemini Text Output:", text);

    return text;

  } catch (error) {

    console.error("Gemini error:", error);
    return null;

  }
}