/**
 * Validates if a file is a supported image format
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const supportedFormats = ["image/jpeg", "image/png", "image/webp", "image/gif"]
  const maxFileSize = 10 * 1024 * 1024 // 10MB

  if (!supportedFormats.includes(file.type)) {
    return {
      valid: false,
      error: `Unsupported format. Supported: JPG, PNG, WebP, GIF`,
    }
  }

  if (file.size > maxFileSize) {
    return {
      valid: false,
      error: `File too large. Maximum: 10MB`,
    }
  }

  return { valid: true }
}

/**
 * Gets MIME type from file
 */
export function getMimeType(file: File): string {
  if (file.type) return file.type
  if (file.name.endsWith(".png")) return "image/png"
  if (file.name.endsWith(".jpg") || file.name.endsWith(".jpeg")) return "image/jpeg"
  if (file.name.endsWith(".webp")) return "image/webp"
  if (file.name.endsWith(".gif")) return "image/gif"
  return "image/jpeg"
}

/**
 * Converts file to base64 string
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(",")[1]
      resolve(base64)
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Generates a descriptive filename for downloads
 */
export function generateDownloadFilename(featureType: string, extension = "png"): string {
  const timestamp = new Date().toISOString().split("T")[0]
  const random = Math.random().toString(36).substring(7)
  return `imagera-${featureType}-${timestamp}-${random}.${extension}`
}

/**
 * Gets image dimensions without loading the full image
 */
export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        resolve({ width: img.width, height: img.height })
      }
      img.onerror = reject
      img.src = e.target?.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Generates analysis report for image quality
 */
export async function analyzeImageQuality(
  file: File,
): Promise<{ quality: "high" | "medium" | "low"; issues: string[] }> {
  const issues: string[] = []
  const dims = await getImageDimensions(file)

  // Check resolution
  if (dims.width < 480 || dims.height < 480) {
    issues.push("Low resolution (recommended: 480x480 or higher)")
  }

  // Check aspect ratio
  const aspectRatio = dims.width / dims.height
  if (aspectRatio < 0.5 || aspectRatio > 2) {
    issues.push("Unusual aspect ratio (recommended: 1:1 to 2:1)")
  }

  // Check file size
  if (file.size > 5 * 1024 * 1024) {
    issues.push("Large file size (may process slower)")
  }

  const quality = issues.length === 0 ? "high" : issues.length === 1 ? "medium" : "low"

  return { quality, issues }
}
