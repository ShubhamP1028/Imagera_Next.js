"use client"

import { useState } from "react"

interface SwapPreviewProps {
  sourcePreview: string
  targetPreview: string
  resultImage: string
}

export default function SwapPreview({ sourcePreview, targetPreview, resultImage }: SwapPreviewProps) {
  const [showComparison, setShowComparison] = useState(true)
  const [sliderPosition, setSliderPosition] = useState(50)

  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Comparison View</h3>
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
        >
          {showComparison ? "Gallery View" : "Comparison"}
        </button>
      </div>

      {showComparison ? (
        <div className="relative w-full max-h-96 rounded-lg overflow-hidden">
          <img src={targetPreview || "/placeholder.svg"} alt="Before" className="w-full h-full object-cover" />

          <div className="absolute top-0 left-0 h-full w-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
            <img
              src={resultImage || "/placeholder.svg"}
              alt="After"
              className="w-screen h-full object-cover"
              style={{ width: `${(100 / sliderPosition) * 100}%` }}
            />
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={sliderPosition}
            onChange={(e) => setSliderPosition(Number(e.target.value))}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 cursor-pointer z-10 opacity-0"
          />

          <div className="absolute top-0 h-full w-0.5 bg-accent" style={{ left: `${sliderPosition}%` }}>
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-accent p-2 rounded-full shadow-lg">
              <div className="w-6 h-6 flex items-center justify-center text-xs font-bold text-accent-foreground">↔</div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2">Source Face</p>
            <img
              src={sourcePreview || "/placeholder.svg"}
              alt="Source"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Original</p>
            <img
              src={targetPreview || "/placeholder.svg"}
              alt="Target"
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2">Result</p>
            <img src={resultImage || "/placeholder.svg"} alt="Result" className="w-full h-48 object-cover rounded-lg" />
          </div>
        </div>
      )}
    </div>
  )
}
