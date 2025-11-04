"use client"

import { useState } from "react"
import ImageUploader from "./image-uploader"
import ProcessingPanel from "./processing-panel"
import PromptSuggestions from "./prompt-suggestions"

export default function PromptGenerationModule() {
  const [referenceImage, setReferenceImage] = useState<File | null>(null)
  const [referencePreview, setReferencePreview] = useState<string | null>(null)
  const [prompt, setPrompt] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [processingMessage, setProcessingMessage] = useState("")
  const [selectedSuggestion, setSelectedSuggestion] = useState<string | null>(null)

  const handleReferenceImageChange = (file: File | null) => {
    setReferenceImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setReferencePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    } else {
      setReferencePreview(null)
    }
  }

  const handleApplySuggestion = (suggestion: string) => {
    setPrompt(suggestion)
    setSelectedSuggestion(suggestion)
  }

  const handleProcess = async () => {
    if (!referenceImage || !prompt) return

    setIsProcessing(true)
    setProcessingMessage("Analyzing reference image...")

    try {
      const formData = new FormData()
      formData.append("referenceImage", referenceImage)
      formData.append("prompt", prompt)

      setProcessingMessage("Generating new scene while preserving identity...")
      const response = await fetch("/api/prompt-generation", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setResultImage(url)
        setProcessingMessage("Generation complete!")
      } else {
        setProcessingMessage("Failed to generate image")
      }
    } catch (error) {
      console.error("Prompt generation error:", error)
      setProcessingMessage("Error during generation")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ImageUploader
            label="Reference Image"
            subtitle="Image containing the identity to preserve"
            image={referenceImage}
            onImageChange={handleReferenceImageChange}
          />

          <div className="bg-card border border-border rounded-xl p-6">
            <label className="block text-sm font-semibold text-foreground mb-2">Scene Description</label>
            <p className="text-xs text-muted-foreground mb-4">Describe the new scene you want to generate</p>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., A person standing on a mountain peak at sunset, wearing professional attire, smiling confidently..."
              className="w-full h-32 bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
            {prompt.length > 0 && <p className="text-xs text-muted-foreground mt-2">{prompt.length} characters</p>}
          </div>

          <PromptSuggestions onSuggestionSelect={handleApplySuggestion} selectedSuggestion={selectedSuggestion} />
        </div>

        <ProcessingPanel
          isProcessing={isProcessing}
          resultImage={resultImage}
          onProcess={handleProcess}
          isReady={!!referenceImage && prompt.length > 10}
          featureType="prompt-gen"
          processingMessage={processingMessage}
        />
      </div>
    </div>
  )
}
