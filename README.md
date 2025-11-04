# Imagera - AI Creative Studio

Advanced AI-powered image manipulation and generation platform with face swapping and prompt-based image generation capabilities.

## Features

### Face Swap
- Seamlessly swap faces between two images
- Advanced face detection and alignment
- Intelligent lighting and color correction
- Natural-looking results with proper blending
- Interactive before/after comparison slider

### Prompt-Based Generation
- Generate new scenes while preserving facial identity
- Pre-built prompt templates for quick generation
- Custom scene descriptions with character counter
- Identity preservation during generation
- High-quality output with realistic composition

## Technologies

- **Frontend**: Next.js 16, React 19.2, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **AI/ML**: Google Gemini API for vision and analysis
- **Image Processing**: Advanced face detection and manipulation
- **Architecture**: Server components, client components, API routes

## Getting Started

### Prerequisites
- Node.js 18+ 
- Google API key for Gemini vision capabilities
- Modern browser with WebGL support (optional, for enhanced processing)

### Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables:
   \`\`\`
   GOOGLE_API_KEY=your_gemini_api_key_here
   \`\`\`
4. Run development server: `npm run dev`
5. Open http://localhost:3000

### Project Structure

\`\`\`
imagera/
├── app/
│   ├── api/
│   │   ├── face-swap/route.ts
│   │   └── prompt-generation/route.ts
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── face-swap-module.tsx
│   ├── prompt-generation-module.tsx
│   ├── image-uploader.tsx
│   ├── processing-panel.tsx
│   ├── swap-preview.tsx
│   ├── prompt-suggestions.tsx
│   ├── error-boundary.tsx
│   ├── loading-spinner.tsx
│   ├── info-card.tsx
│   └── header.tsx
├── lib/
│   ├── image-processing.ts
│   ├── gemini-client.ts
│   └── utils.ts
└── public/
\`\`\`

## API Endpoints

### POST /api/face-swap
Swaps faces between source and target images.

**Request:**
- `sourceImage`: File - The face to extract
- `targetImage`: File - The image to apply the face to

**Response:**
- Image blob with swapped face

### POST /api/prompt-generation
Generates a new image based on a prompt while preserving identity.

**Request:**
- `referenceImage`: File - Image containing the identity to preserve
- `prompt`: String - Scene description

**Response:**
- Generated image blob

## Features & Future Enhancements

- [x] Face swap with advanced blending
- [x] Prompt-based image generation
- [x] Interactive comparison slider
- [x] Error boundary and error handling
- [x] Image validation and quality checks
- [ ] Batch processing
- [ ] Effect filters and adjustments
- [ ] History and favorites
- [ ] Social sharing
- [ ] User authentication
- [ ] Premium features

## Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)

**Max file size:** 10MB per image

## Performance

- Optimized image processing
- Lazy loading of components
- Streaming responses for large files
- Efficient caching strategies

## Security

- Client-side image validation
- Secure API endpoints
- No persistent storage of user images
- Environment variable protection

## Contributing

Contributions are welcome! Please follow the established code style and submit pull requests.

## License

MIT License - See LICENSE file for details

## Support

For issues, questions, or feedback, please open an issue or contact support.
