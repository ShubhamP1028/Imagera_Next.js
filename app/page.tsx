"use client"

import { useState } from "react"
import Header from "@/components/header"
import FeatureSelector from "@/components/feature-selector"
import FaceSwapModule from "@/components/face-swap-module"
import PromptGenerationModule from "@/components/prompt-generation-module"
import InfoCard from "@/components/info-card"

export default function Home() {
  const [activeFeature, setActiveFeature] = useState<"face-swap" | "prompt-gen">("face-swap")

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard
              icon="🎯"
              title="How Imagera Works"
              description="Our AI uses advanced face detection and identity preservation to create seamless swaps and generations"
              variant="info"
            />
            <InfoCard
              icon="🔒"
              title="Privacy First"
              description="All images are processed securely. We don't store your personal data or images after processing"
              variant="info"
            />
          </div>

          <FeatureSelector activeFeature={activeFeature} onFeatureChange={setActiveFeature} />

          <div className="mt-8">
            {activeFeature === "face-swap" && <FaceSwapModule />}
            {activeFeature === "prompt-gen" && <PromptGenerationModule />}
          </div>
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-8 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
            <p>Imagera - AI Creative Studio &copy; {new Date().getFullYear()}</p>
            <p className="mt-2">Powered by Google Gemini and Advanced AI Processing</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
