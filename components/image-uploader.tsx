"use client"

import type React from "react"
import { useRef, useState } from "react"
import { validateImageFile } from "@/lib/image-processing"

interface ImageUploaderProps {
  label: string
  subtitle: string
  image: File | null
  onImageChange: (file: File | null) => void
}

export default function ImageUploader({ label, subtitle, image, onImageChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (file: File | null) => {
    setError(null)

    if (file) {
      const validation = validateImageFile(file)
      if (!validation.valid) {
        setError(validation.error || "Invalid file")
        onImageChange(null)
        return
      }

      onImageChange(file)
      const reader = new FileReader()
      reader.onload = (e) => setPreview(e.target?.result as string)
      reader.readAsDataURL(file)
    } else {
      onImageChange(null)
      setPreview(null)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFileChange(file)
    }
  }

  return (
    <div className="bg-card border border-border rounded-xl p-6 h-full flex flex-col">
      <h3 className="text-sm font-semibold text-foreground mb-1">{label}</h3>
      <p className="text-xs text-muted-foreground mb-6">{subtitle}</p>

      {error && (
        <div className="mb-4 p-2 bg-destructive/10 border border-destructive rounded text-xs text-destructive">
          {error}
        </div>
      )}

      {preview ? (
        <div className="flex-1 flex flex-col">
          <img
            src={preview || "/placeholder.svg"}
            alt={label}
            className="flex-1 object-cover rounded-lg mb-4 bg-muted"
          />
          <button
            onClick={() => {
              handleFileChange(null)
              if (inputRef.current) inputRef.current.value = ""
            }}
            className="px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
          >
            Change Image
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => inputRef.current?.click()}
          className="flex-1 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-accent/50 hover:bg-card/50 transition-all p-6"
        >
          <div className="text-3xl mb-2">📁</div>
          <p className="text-sm font-medium text-foreground mb-1">Drop image here</p>
          <p className="text-xs text-muted-foreground text-center">or click to browse (Max 10MB)</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        className="hidden"
      />
    </div>
  )
}
