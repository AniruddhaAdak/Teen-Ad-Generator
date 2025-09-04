import { GoogleGenAI, Type } from "@google/genai";
import type { CampaignData } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const adGenerationSchema = {
    type: Type.OBJECT,
    properties: {
        campaignName: {
            type: Type.STRING,
            description: "A creative, catchy, and slightly weird campaign name."
        },
        ads: {
            type: Type.ARRAY,
            description: "An array of 10 unique ad copy variations.",
            items: {
                type: Type.OBJECT,
                properties: {
                    id: {
                        type: Type.INTEGER,
                        description: "A unique integer ID for the ad, from 1 to 10."
                    },
                    copy: {
                        type: Type.STRING,
                        description: "The ad copy text, tailored for teenagers and including 'nano banana' and 'zing imaginfoor'."
                    }
                },
                required: ["id", "copy"],
            }
        }
    },
    required: ["campaignName", "ads"],
};


export const generateAds = async (userPrompt: string): Promise<CampaignData> => {
    const prompt = `
        You are a brilliant, witty, and slightly chaotic marketing genius specializing in Gen Z and teenage audiences. Your goal is to create viral ad campaigns.

        A user wants to create an ad campaign based on this idea: "${userPrompt}".

        Your task is to:
        1.  Invent a super creative, catchy, and slightly weird campaign name.
        2.  Write 10 distinct ad copy variations for this campaign.
        3.  Each ad copy MUST be tailored for a teenage audience. Use their slang, humor, and cultural references, but don't sound like you're trying too hard.
        4.  CRITICAL: Every single ad copy variation MUST creatively include the phrases "nano banana" and "zing imaginfoor". These are quirky, nonsensical product features that should be treated as cool and desirable.

        Please provide your response in the exact JSON format specified by the schema.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: adGenerationSchema,
            temperature: 0.9,
        },
    });

    try {
        const jsonText = response.text.trim();
        const parsedData = JSON.parse(jsonText) as CampaignData;

        // Basic validation
        if (!parsedData.campaignName || !Array.isArray(parsedData.ads) || parsedData.ads.length === 0) {
            throw new Error("Invalid data structure received from API.");
        }
        
        return parsedData;

    } catch (e) {
        console.error("Failed to parse JSON response:", response.text);
        throw new Error("The AI returned a response in an unexpected format. Please try again.");
    }
};

export const getCreativeSuggestions = async (currentPrompt: string): Promise<string[]> => {
    const prompt = `
        You are an AI assistant for a teenage ad generator. The user is currently thinking about this idea: "${currentPrompt}".

        Based on that, provide 3 fresh, alternative, and creative prompts for ad campaigns targeting teenagers.
        The prompts should be short, punchy, and intriguing.
        Each suggestion should be on a new line. Do not use markdown lists or numbers.
        
        Example output format:
        A line of a suggestion.
        Another line of a suggestion.
        A third line of a suggestion.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            temperature: 1.0,
            maxOutputTokens: 150,
        }
    });
    
    return response.text.trim().split('\n').filter(s => s.trim() !== '');
};

export const generateAdImage = async (prompt: string): Promise<string> => {
    const fullPrompt = `A visually stunning, vibrant, and edgy advertisement image that perfectly captures this concept for a teenage audience: "${prompt}". The style should be modern, eye-catching, and social-media-ready.`;
    
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: fullPrompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
        const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
        return `data:image/jpeg;base64,${base64ImageBytes}`;
    } else {
        throw new Error("Image generation failed or returned no images.");
    }
};