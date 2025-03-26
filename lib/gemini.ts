import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || "");

export async function analyzeRecipe(recipeText: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Analyze this recipe and convert all measurements to grams. For each ingredient:
    1. Identify the original measurement
    2. Convert to grams using standard density values
    3. Provide the conversion explanation
    Format as JSON with the following structure:
    {
      "ingredients": [
        {
          "original": "1 cup flour",
          "grams": 120,
          "explanation": "1 cup of all-purpose flour = 120g"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent([prompt, recipeText]);
    const response = await result.response;
    const text = response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error analyzing recipe:", error);
    throw error;
  }
}