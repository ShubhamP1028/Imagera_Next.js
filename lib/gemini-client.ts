import { GoogleGenerativeAI } from "@google/generative-ai"

/**
 * Initialize Gemini client with API key from environment
 */
function getGeminiClient() {
  const apiKey = process.env.GOOGLE_API_KEY
  if (!apiKey) {
    throw new Error("GOOGLE_API_KEY environment variable is not set")
  }
  return new GoogleGenerativeAI(apiKey)
}

/**
 * Get configured Gemini model
 */
export function getGeminiModel(modelName = "gemini-2.5-flash") {
  const client = getGeminiClient()
  return client.getGenerativeModel({ model: modelName })
}

/**
 * System prompts for different image processing tasks
 */
export const SYSTEM_PROMPTS = {
  faceSwap: `You are an expert in face swapping and image manipulation. Analyze the provided images to:
1. Identify facial features, proportions, and characteristics in the source image
2. Determine optimal face placement on the target image
3. Provide technical guidance for seamless face blending
4. Ensure lighting and color consistency
Focus on creating natural-looking results with proper alignment and blending.`,

  promptGeneration: `You are an expert in AI image generation with identity preservation. Your task is to:
1. Analyze the reference image for key identity characteristics
2. Create a detailed generation plan for the requested scene
3. Provide specific technical steps for identity preservation
4. Ensure seamless integration of the person into the new scene
Focus on maintaining facial recognition while generating completely new scenes.`,

  imageAnalysis: `You are an expert in image analysis and quality assessment. Analyze the image for:
1. Image quality and resolution
2. Facial detection and quality
3. Lighting conditions and exposure
4. Composition and framing
Provide detailed technical feedback.`,
}

/**
 * Error handling for API calls
 */
export class GeminiAPIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message)
    this.name = "GeminiAPIError"
  }
}

/**
 * Safely call Gemini API with error handling
 */
export async function callGeminiAPI(prompt: string, images?: Array<{ mimeType: string; data: string }>) {
  try {
    const model = getGeminiModel()

    const parts: any[] = [{ text: prompt }]

    if (images) {
      images.forEach((img) => {
        parts.push({
          inlineData: {
            mimeType: img.mimeType,
            data: img.data,
          },
        })
      })
    }

    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts,
        },
      ],
    })

    return response.response.text()
  } catch (error) {
    console.error("Gemini API error:", error)
    throw new GeminiAPIError(500, "Failed to call Gemini API")
  }
}
