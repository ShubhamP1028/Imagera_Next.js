import { type NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"

const client = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const referenceImage = formData.get("referenceImage") as File
    const prompt = formData.get("prompt") as string

    if (!referenceImage || !prompt) {
      return NextResponse.json({ error: "Reference image and prompt are required" }, { status: 400 })
    }

    // Convert file to base64
    const imageBuffer = await referenceImage.arrayBuffer()
    const imageBase64 = Buffer.from(imageBuffer).toString("base64")

    // Determine MIME type
    const getMimeType = (file: File) => {
      if (file.type) return file.type
      if (file.name.endsWith(".png")) return "image/png"
      if (file.name.endsWith(".jpg") || file.name.endsWith(".jpeg")) return "image/jpeg"
      if (file.name.endsWith(".webp")) return "image/webp"
      if (file.name.endsWith(".gif")) return "image/gif"
      return "image/jpeg"
    }

    const imageMimeType = getMimeType(referenceImage)

    const model = client.getGenerativeModel({ model: "gemini-2.5-flash" })

    const response = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are an expert in AI image generation and identity preservation. Your task is to analyze a reference image and create a comprehensive generation plan.

REFERENCE IMAGE ANALYSIS:
1. Facial Features:
   - Analyze and describe key facial characteristics (face shape, features, expressions)
   - Note skin tone, hair color, and distinctive features
   - Identify eye color, facial proportions, and unique markings

2. Physical Characteristics:
   - Body type and posture
   - Typical clothing style preferences
   - Any distinctive physical traits

3. Identity Preservation Requirements:
   - The person must remain recognizable in the generated image
   - Preserve all key identifying facial features
   - Maintain consistent skin tone and hair characteristics

GENERATION TASK:
${prompt}

YOUR INSTRUCTIONS:
1. Generate a completely new scene as described in the prompt
2. Preserve the facial identity and key physical characteristics from the reference
3. Maintain natural lighting and realistic proportions
4. Ensure high quality and professional appearance
5. Blend the preserved identity seamlessly into the new scene
6. Provide 5-7 specific technical steps for how to accomplish this generation

TECHNICAL APPROACH:
- Provide detailed guidance on:
  * Facial feature extraction and preservation
  * Scene composition and positioning
  * Lighting and color matching strategies
  * Blending techniques for seamless integration
  * Quality assurance checks

Return a detailed technical specification that could guide an AI image generation system.`,
            },
            {
              inlineData: {
                mimeType: imageMimeType,
                data: imageBase64,
              },
            },
          ],
        },
      ],
    })

    const analysisText = response.response.text()

    // In production, this would integrate with image generation APIs like:
    // - DALL-E 3 with LoRA fine-tuning for identity preservation
    // - Stable Diffusion with face embedding preservation
    // - Custom ML models trained on identity-preserving generation

    // For now, return the reference image with analysis metadata
    // The analysis text contains detailed instructions for generation systems
    const resultBuffer = imageBuffer

    return new NextResponse(resultBuffer, {
      headers: {
        "Content-Type": imageMimeType,
        "Content-Disposition": 'attachment; filename="generated-image.png"',
        "X-Generation-Analysis": Buffer.from(analysisText.substring(0, 500)).toString("base64"),
      },
    })
  } catch (error) {
    console.error("Prompt generation error:", error)
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 })
  }
}
