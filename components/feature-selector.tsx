"use client"

interface FeatureSelectorProps {
  activeFeature: "face-swap" | "prompt-gen"
  onFeatureChange: (feature: "face-swap" | "prompt-gen") => void
}

export default function FeatureSelector({ activeFeature, onFeatureChange }: FeatureSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <button
        onClick={() => onFeatureChange("face-swap")}
        className={`p-6 rounded-xl border-2 transition-all duration-300 ${
          activeFeature === "face-swap"
            ? "border-accent bg-card shadow-lg shadow-accent/20"
            : "border-border hover:border-accent/50 bg-card/50"
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Face Swap</h3>
            <p className="text-sm text-muted-foreground mt-1">Blend facial features between images</p>
          </div>
          <div className="text-2xl">🎭</div>
        </div>
        <p className="text-xs text-muted-foreground">Seamlessly swap faces while maintaining natural appearance</p>
      </button>

      <button
        onClick={() => onFeatureChange("prompt-gen")}
        className={`p-6 rounded-xl border-2 transition-all duration-300 ${
          activeFeature === "prompt-gen"
            ? "border-primary bg-card shadow-lg shadow-primary/20"
            : "border-border hover:border-primary/50 bg-card/50"
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Prompt Generation</h3>
            <p className="text-sm text-muted-foreground mt-1">Create new scenes with preserved identity</p>
          </div>
          <div className="text-2xl">✨</div>
        </div>
        <p className="text-xs text-muted-foreground">Generate AI imagery while keeping facial identity intact</p>
      </button>
    </div>
  )
}
