# 🚀 Planets Educational Web App

An interactive, kid-friendly educational website that teaches children about our solar system through engaging animations, quizzes, and visual comparisons.

> **Built with AWS Kiro** - This project was vibe-coded using AWS's innovative AI-powered IDE, Kiro, which excels at creating beautiful static websites and React applications through natural language prompts.

## 🌟 Features

- **Interactive Planet Explorer** - Learn about all 8 planets plus Pluto with detailed, kid-friendly information
- **Space Quiz Challenge** - Test knowledge with randomized questions from a pool of 20 space facts
- **Planet Size Comparison** - Visual tool to compare planet sizes with fun analogies
- **Animated Space Guide** - Meet Captain Nina, your friendly astronaut guide
- **Mobile Responsive** - Works perfectly on all devices
- **Beautiful Animations** - Engaging space-themed animations and effects

## 🛠️ Tech Stack

- **AWS Kiro** - AI-powered vibe-coding IDE for rapid development
- **React 18** + TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **TanStack Query** for state management
- **AWS Amplify** for deployment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kids-space-adventure.git
cd kids-space-adventure
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser

## 🌍 Deployment

This project is configured for **AWS Amplify** deployment:

1. Connect your GitHub repository to AWS Amplify
2. Amplify will automatically use the `amplify.yml` configuration
3. Your app will be deployed with proper security headers and caching

## 📱 Features Overview

### Planet Explorer
- Detailed information about Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
- Special section explaining Pluto as a "dwarf planet"
- Kid-friendly descriptions with fun facts
- Real planet images and animations

### Interactive Quiz
- 10 random questions from 20+ space facts
- Immediate feedback with explanations
- Progress tracking and scoring
- Achievement badges for different score levels

### Size Comparison Tool
- Visual planet size comparisons
- Interactive planet selection
- Fun analogies to help kids understand scale
- Responsive design for all screen sizes

## 🎨 Design Features

- **Space Theme** - Dark gradient backgrounds with animated stars
- **Responsive Design** - Mobile-first approach
- **Accessibility** - Proper contrast and keyboard navigation
- **Smooth Animations** - CSS animations and transitions
- **Interactive Elements** - Hover effects and button feedback

## 🔧 Project Structure

```
src/
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── SpaceGuide.tsx      # Animated astronaut guide
│   ├── PlanetQuiz.tsx      # Quiz functionality
│   └── PlanetSizeComparison.tsx
├── pages/
│   ├── Index.tsx           # Landing page
│   ├── Planets.tsx         # Main planets page
│   └── NotFound.tsx        # 404 page
├── hooks/                  # Custom React hooks
└── lib/                    # Utility functions
```

## 🌟 Educational Value

This app teaches children:
- **Solar System Structure** - Order and characteristics of planets
- **Comparative Thinking** - Size relationships and scale
- **Scientific Facts** - Age-appropriate space knowledge
- **Interactive Learning** - Engaging quiz format
- **Visual Learning** - Animations and comparisons

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **AWS Kiro** - Amazing AI-powered IDE that made vibe-coding this entire application possible
- Planet SVG illustrations from custom designs
- Educational content adapted for children
- Modern React best practices generated through AI assistance
- Deployed on AWS Amplify for reliability

## 📞 Contact

For questions or suggestions, please open an issue on GitHub.

---

**Vibe-coded with AWS Kiro ✨ Made with ❤️ for young space explorers** 🌌