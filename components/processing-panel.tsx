"use client"

interface ProcessingPanelProps {
  isProcessing: boolean
  resultImage: string | null
  onProcess: () => void
  isReady: boolean
  featureType: "face-swap" | "prompt-gen"
  processingMessage?: string
}

export default function ProcessingPanel({
  isProcessing,
  resultImage,
  onProcess,
  isReady,
  featureType,
  processingMessage = "",
}: ProcessingPanelProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 flex flex-col h-full">
      <h3 className="text-sm font-semibold text-foreground mb-1">Result</h3>
      <p className="text-xs text-muted-foreground mb-6">
        {featureType === "face-swap" ? "Your swapped image will appear here" : "Generated image will appear here"}
      </p>

      {resultImage ? (
        <div className="flex-1 flex flex-col mb-6">
          <img
            src={resultImage || "/placeholder.svg"}
            alt="Result"
            className="flex-1 object-cover rounded-lg mb-4 bg-muted"
          />
          <button
            onClick={() => {
              const a = document.createElement("a")
              a.href = resultImage
              a.download = `imagera-${featureType}-${Date.now()}.png`
              a.click()
            }}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
          >
            Download Result
          </button>
        </div>
      ) : (
        <div className="flex-1 border-2 border-dashed border-border rounded-lg flex items-center justify-center mb-6 bg-muted/20">
          <div className="text-center">
            <div className="text-3xl mb-2">🎨</div>
            <p className="text-sm text-muted-foreground">
              {isProcessing && processingMessage ? processingMessage : "Processing will appear here"}
            </p>
          </div>
        </div>
      )}

      <button
        onClick={onProcess}
        disabled={!isReady || isProcessing}
        className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 ${
          isProcessing
            ? "bg-primary/50 text-primary-foreground cursor-not-allowed"
            : isReady
              ? "bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer"
              : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            {processingMessage || "Processing..."}
          </div>
        ) : (
          `${featureType === "face-swap" ? "Swap Faces" : "Generate Image"}`
        )}
      </button>
    </div>
  )
}
