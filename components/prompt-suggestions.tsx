"use client"

interface PromptSuggestionsProps {
  onSuggestionSelect: (suggestion: string) => void
  selectedSuggestion: string | null
}

const PROMPT_TEMPLATES = [
  {
    id: "professional",
    label: "Professional Portrait",
    description: "Corporate setting with formal attire",
    template:
      "A professional portrait in a modern corporate office, wearing business attire, with confident posture and natural lighting",
  },
  {
    id: "outdoor",
    label: "Outdoor Adventure",
    description: "Nature and landscape scenes",
    template:
      "A person standing in a scenic mountain landscape at golden hour, surrounded by nature, with dramatic sky and warm lighting",
  },
  {
    id: "casual",
    label: "Casual Lifestyle",
    description: "Relaxed everyday scenarios",
    template:
      "A person in casual clothing at a cozy coffee shop, smiling naturally, with warm ambient lighting and comfortable atmosphere",
  },
  {
    id: "creative",
    label: "Creative Concept",
    description: "Artistic and imaginative scenes",
    template:
      "A person in an artistic studio surrounded by creative elements, dramatic lighting, with vibrant colors and professional composition",
  },
  {
    id: "travel",
    label: "Travel Destination",
    description: "Global landmark settings",
    template:
      "A person at an iconic travel destination, wearing casual travel attire, with beautiful background scenery and natural sunlight",
  },
  {
    id: "fitness",
    label: "Fitness & Wellness",
    description: "Active lifestyle scenarios",
    template:
      "A person in a modern gym or wellness center, active pose, professional lighting, with fitness equipment in the background",
  },
]

export default function PromptSuggestions({ onSuggestionSelect, selectedSuggestion }: PromptSuggestionsProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <h3 className="text-sm font-semibold text-foreground mb-4">Prompt Templates</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PROMPT_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSuggestionSelect(template.template)}
            className={`p-3 rounded-lg border-2 text-left transition-all ${
              selectedSuggestion === template.template
                ? "border-accent bg-accent/10"
                : "border-border hover:border-accent/50 bg-card/50"
            }`}
          >
            <p className="text-xs font-semibold text-foreground">{template.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
