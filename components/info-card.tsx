interface InfoCardProps {
  icon?: string
  title: string
  description: string
  variant?: "info" | "warning" | "success"
}

export default function InfoCard({ icon = "ℹ️", title, description, variant = "info" }: InfoCardProps) {
  const variantStyles = {
    info: "bg-primary/10 border-primary/30",
    warning: "bg-yellow-500/10 border-yellow-500/30",
    success: "bg-green-500/10 border-green-500/30",
  }

  return (
    <div className={`border rounded-lg p-4 ${variantStyles[variant]}`}>
      <div className="flex gap-3">
        <div className="text-xl flex-shrink-0">{icon}</div>
        <div>
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </div>
  )
}
