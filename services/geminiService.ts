
import { GoogleGenAI } from "@google/genai";
import type { AspectRatio } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const enhancePrompt = async (userInput: string): Promise<string> => {
  try {
    const prompt = `You are a creative assistant that expands a user's simple idea into a rich, detailed, and artistic prompt for an AI image generator.
    Focus on visual details: lighting, color palette, style (e.g., photorealistic, digital art, oil painting), mood, and composition.
    Do not add any preamble or explanation, just the prompt itself.
    
    User idea: "${userInput}"
    
    Enhanced prompt:`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 1,
        topP: 0.95,
      }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error enhancing prompt:", error);
    throw new Error("Failed to enhance prompt. Please try again.");
  }
};


export const generateWallpaper = async (prompt: string, aspectRatio: AspectRatio): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: aspectRatio,
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating wallpaper:", error);
        throw new Error("Failed to generate wallpaper. The model may have safety restrictions on the prompt.");
    }
};
