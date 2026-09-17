import { GoogleGenAI } from "@google/genai";

// Use the strictly required initialization format
const genAI = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const askBiologyTutor = async (question: string, context: string) => {
  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are Mr. Cross, a friendly and passionate high school biology teacher. The student is currently in the ${context} stage of cellular respiration. Answer their question like a real human teacher would—be encouraging, clear, and scientific without being dry. Use real-world analogies. Keep the answer under 4 sentences. Question: ${question}`,
    });
    return response.text || "I'm having a bit of a brain fog moment. Can you try asking that again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oops! I lost my train of thought. Let me check the notes and try again.";
  }
};