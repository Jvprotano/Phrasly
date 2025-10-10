# 🇬🇧 English Phrases Game

A fun and interactive web-based game to help you learn English by translating Portuguese phrases. Similar to LyricsTraining, but focused on phrase translation instead of music lyrics!

## 🎮 Features

- **Timed Challenges**: Choose from 30 seconds to 3 minutes game modes
- **205 Phrases**: A curated collection of common Portuguese phrases with English translations
- **Difficulty Levels**: Easy, Medium, and Hard phrases to match your skill level
- **Real-time Scoring**: Track your progress as you play
- **Smart Validation**: Case-insensitive and punctuation-tolerant answer checking with contraction support
- **Error Feedback**: Get immediate feedback when wrong, with retry option
- **Learning Tools**: Show Answer button to reveal correct translations
- **Rankings System**: Track your best scores per duration with local storage
- **Detailed Results**: Review all your answers at the end with correct translations
- **Beautiful UI**: Modern, responsive design with smooth animations

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone or navigate to this repository:

```bash
cd english-phrases-game
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173/`

## 🎯 How to Play

1. **Select Duration**: Choose how long you want to play (30s, 1min, 2min, or 3min)
2. **Start Game**: Click the "Start Game" button
3. **Translate**: A Portuguese phrase will appear - type the English translation
4. **Submit**: Press Enter or click Submit to check your answer
5. **Keep Going**: Try to translate as many phrases as possible before time runs out
6. **Review**: When time's up, review your answers and see your score!

## 📁 Project Structure

```
english-phrases-game/
├── src/
│   ├── components/
│   │   ├── Game.tsx          # Main game component
│   │   ├── Game.css          # Game styling
│   │   ├── Results.tsx       # Results screen component
│   │   ├── Results.css       # Results styling
│   │   ├── StartScreen.tsx   # Start screen component
│   │   └── StartScreen.css   # Start screen styling
│   ├── data/
│   │   └── phrases.ts        # Phrase database (50 phrases)
│   ├── App.tsx               # Main app component
│   ├── App.css               # App styling
│   ├── index.css             # Global styles
│   └── main.tsx              # Entry point
├── public/
├── index.html
└── package.json
```

## 🎨 Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Styling with gradients and animations

## 📝 Adding More Phrases

To add more phrases, edit `src/data/phrases.ts`:

```typescript
{
  id: 51,
  portuguese: "Sua frase em português",
  english: "Your phrase in English",
  difficulty: "easy" // or "medium" or "hard"
}
```

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📄 License

This is a local study application. Feel free to use and modify as needed for your learning!

## 🤝 Contributing

This is a personal learning project, but suggestions for improvements are welcome!

## 🎓 Learning Tips

- Start with shorter durations (30s-1min) to build confidence
- Focus on accuracy over speed initially
- Review your mistakes in the results screen
- Try to remember common patterns in translations
- Practice regularly for best results!

Enjoy learning English! 🎉
