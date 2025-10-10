import { useState } from 'react'
import './App.css'
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import Results from './components/Results'
import Rankings from './components/Rankings'
import type { Phrase, Language, Difficulty } from './data/phrases'

type GameState = 'start' | 'playing' | 'results';

interface GameResult {
  phrase: Phrase;
  userAnswer: string;
  isCorrect: boolean;
}

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [gameDuration, setGameDuration] = useState(60);
  const [fromLanguage, setFromLanguage] = useState<Language>('portuguese');
  const [toLanguage, setToLanguage] = useState<Language>('english');
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>(['easy', 'medium', 'hard']);
  const [gameResults, setGameResults] = useState<GameResult[]>([]);
  const [showRankings, setShowRankings] = useState(false);

  const handleStart = (duration: number, fromLang: Language, toLang: Language, difficulties: Difficulty[]) => {
    setGameDuration(duration);
    setFromLanguage(fromLang);
    setToLanguage(toLang);
    setSelectedDifficulties(difficulties);
    setGameState('playing');
  };

  const handleGameEnd = (results: GameResult[]) => {
    setGameResults(results);
    setGameState('results');
  };

  const handlePlayAgain = () => {
    setGameResults([]);
    setGameState('start');
  };

  const handleShowRankings = () => {
    setShowRankings(true);
  };

  const handleCloseRankings = () => {
    setShowRankings(false);
  };

  const handleExit = () => {
    setGameState('start');
  };

  return (
    <div className="app">
      {gameState === 'start' && (
        <StartScreen onStart={handleStart} onShowRankings={handleShowRankings} />
      )}
      {gameState === 'playing' && (
        <Game
          duration={gameDuration}
          fromLanguage={fromLanguage}
          toLanguage={toLanguage}
          difficulties={selectedDifficulties}
          onGameEnd={handleGameEnd}
          onExit={handleExit}
        />
      )}
      {gameState === 'results' && (
        <Results
          results={gameResults}
          duration={gameDuration}
          fromLanguage={fromLanguage}
          toLanguage={toLanguage}
          onPlayAgain={handlePlayAgain}
          onShowRankings={handleShowRankings}
        />
      )}
      {showRankings && <Rankings onClose={handleCloseRankings} />}
    </div>
  )
}

export default App
