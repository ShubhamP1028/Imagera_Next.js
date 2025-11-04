"use client"

import { useState } from "react"
import ImageUploader from "./image-uploader"
import ProcessingPanel from "./processing-panel"
import SwapPreview from "./swap-preview"

export default function FaceSwapModule() {
  const [sourceImage, setSourceImage] = useState<File | null>(null)
  const [targetImage, setTargetImage] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [sourcePreview, setSourcePreview] = useState<string | null>(null)
  const [targetPreview, setTargetPreview] = useState<string | null>(null)
  const [processingMessage, setProcessingMessage] = useState("")

  const handleSourceImageChange = (file: File | null) => {
    setSourceImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setSourcePreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleTargetImageChange = (file: File | null) => {
    setTargetImage(file)
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setTargetPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleProcess = async () => {
    if (!sourceImage || !targetImage) return

    setIsProcessing(true)
    setProcessingMessage("Analyzing faces...")

    try {
      const formData = new FormData()
      formData.append("sourceImage", sourceImage)
      formData.append("targetImage", targetImage)

      setProcessingMessage("Processing face swap...")
      const response = await fetch("/api/face-swap", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setResultImage(url)
        setProcessingMessage("Face swap complete!")
      } else {
        setProcessingMessage("Failed to process face swap")
      }
    } catch (error) {
      console.error("Face swap error:", error)
      setProcessingMessage("Error during face swap processing")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ImageUploader
          label="Source Face"
          subtitle="The face to extract features from"
          image={sourceImage}
          onImageChange={handleSourceImageChange}
        />

        <ImageUploader
          label="Target Image"
          subtitle="The image to apply the face to"
          image={targetImage}
          onImageChange={handleTargetImageChange}
        />

        <ProcessingPanel
          isProcessing={isProcessing}
          resultImage={resultImage}
          onProcess={handleProcess}
          isReady={!!sourceImage && !!targetImage}
          featureType="face-swap"
          processingMessage={processingMessage}
        />
      </div>

      {resultImage && sourcePreview && targetPreview && (
        <SwapPreview sourcePreview={sourcePreview} targetPreview={targetPreview} resultImage={resultImage} />
      )}
    </div>
  )
}
