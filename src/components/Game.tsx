import { useState, useEffect, useRef, useMemo } from 'react';
import { phrases } from '../data/phrases.js';
import type { Phrase, Language, Difficulty } from '../data/phrases.js';
import './Game.css';

interface GameResult {
  phrase: Phrase;
  userAnswer: string;
  isCorrect: boolean;
}

interface GameProps {
  duration: number; // in seconds
  fromLanguage: Language;
  toLanguage: Language;
  difficulties: Difficulty[];
  onGameEnd: (results: GameResult[]) => void;
  onExit: () => void;
}

const Game: React.FC<GameProps> = ({ duration, fromLanguage, toLanguage, difficulties, onGameEnd, onExit }) => {
  // Filter phrases based on selected difficulties
  const filteredPhrases = useMemo(() => {
    return phrases.filter((p: Phrase) => difficulties.includes(p.difficulty));
  }, [difficulties]);

  // Helper functions to get phrase text in the correct language
  const getPhraseText = (phrase: Phrase, lang: Language): string => {
    return phrase[lang];
  };

  const getLanguageName = (lang: Language): string => {
    const names: Record<Language, string> = {
      english: 'English',
      spanish: 'Spanish',
      portuguese: 'Portuguese'
    };
    return names[lang];
  };

  const [currentPhrase, setCurrentPhrase] = useState<Phrase | null>(null);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(duration);
  const [results, setResults] = useState<GameResult[]>([]);
  const [usedPhrases, setUsedPhrases] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize first phrase
  useEffect(() => {
    getNextPhrase();
    inputRef.current?.focus();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      onGameEnd(results);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, results, onGameEnd]);

  const getNextPhrase = () => {
    const availablePhrases = filteredPhrases.filter((p: Phrase) => !usedPhrases.has(p.id));

    if (availablePhrases.length === 0) {
      // Reset if all phrases used
      setUsedPhrases(new Set());
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      setCurrentPhrase(randomPhrase);
      setUsedPhrases(new Set([randomPhrase.id]));
    } else {
      const randomPhrase = availablePhrases[Math.floor(Math.random() * availablePhrases.length)];
      setCurrentPhrase(randomPhrase);
      setUsedPhrases(prev => new Set([...prev, randomPhrase.id]));
    }

    // Reset answer visibility when moving to next phrase
    setShowAnswer(false);
  };

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .trim()
      // Expand common contractions
      .replace(/i'm/g, 'i am')
      .replace(/i'd/g, 'i would')
      .replace(/i'll/g, 'i will')
      .replace(/i've/g, 'i have')
      .replace(/you're/g, 'you are')
      .replace(/you'd/g, 'you would')
      .replace(/you'll/g, 'you will')
      .replace(/you've/g, 'you have')
      .replace(/he's/g, 'he is')
      .replace(/she's/g, 'she is')
      .replace(/it's/g, 'it is')
      .replace(/we're/g, 'we are')
      .replace(/we'd/g, 'we would')
      .replace(/we'll/g, 'we will')
      .replace(/we've/g, 'we have')
      .replace(/they're/g, 'they are')
      .replace(/they'd/g, 'they would')
      .replace(/they'll/g, 'they will')
      .replace(/they've/g, 'they have')
      .replace(/can't/g, 'cannot')
      .replace(/won't/g, 'will not')
      .replace(/don't/g, 'do not')
      .replace(/doesn't/g, 'does not')
      .replace(/didn't/g, 'did not')
      .replace(/haven't/g, 'have not')
      .replace(/hasn't/g, 'has not')
      .replace(/hadn't/g, 'had not')
      .replace(/wouldn't/g, 'would not')
      .replace(/shouldn't/g, 'should not')
      .replace(/couldn't/g, 'could not')
      .replace(/isn't/g, 'is not')
      .replace(/aren't/g, 'are not')
      .replace(/wasn't/g, 'was not')
      .replace(/weren't/g, 'were not')
      // Remove punctuation
      .replace(/[.,!?;:]/g, '')
      // Normalize whitespace
      .replace(/\s+/g, ' ');
  };

  const checkAnswer = () => {
    if (!currentPhrase || !userInput.trim()) return;

    const normalizedAnswer = normalizeText(userInput);
    const normalizedCorrect = normalizeText(getPhraseText(currentPhrase, toLanguage));
    const isCorrect = normalizedAnswer === normalizedCorrect;

    if (isCorrect) {
      // Correct answer - move to next phrase
      const result: GameResult = {
        phrase: currentPhrase,
        userAnswer: userInput.trim(),
        isCorrect: true,
      };

      setResults(prev => [...prev, result]);
      setScore(prev => prev + 1);
      setUserInput('');
      setShowError(false);
      setErrorMessage('');
      getNextPhrase();
      inputRef.current?.focus();
    } else {
      // Wrong answer - show error and stay on same phrase
      setShowError(true);
      setErrorMessage('Wrong! Try again or skip this phrase.');
      inputRef.current?.focus();
    }
  };

  const skipPhrase = () => {
    if (!currentPhrase) return;

    // Record as incorrect
    const result: GameResult = {
      phrase: currentPhrase,
      userAnswer: userInput.trim() || '(skipped)',
      isCorrect: false,
    };

    setResults(prev => [...prev, result]);
    setUserInput('');
    setShowError(false);
    setErrorMessage('');
    getNextPhrase();
    inputRef.current?.focus();
  };

  const toggleShowAnswer = () => {
    setShowAnswer(prev => !prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      checkAnswer();
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentPhrase) {
    return <div className="game-loading">Loading...</div>;
  }

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      onExit();
    }
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="timer">
          <span className="timer-label">Time:</span>
          <span className={`timer-value ${timeLeft <= 10 ? 'timer-warning' : ''}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
        <div className="score">
          <span className="score-label">Score:</span>
          <span className="score-value">{score}</span>
        </div>
        <button className="exit-button" onClick={handleExit} title="Exit game">
          ✕
        </button>
      </div>

      <div className="game-content">
        <div className="phrase-card">
          <div className="phrase-label">Translate to {getLanguageName(toLanguage)}:</div>
          <div className="phrase-text">{getPhraseText(currentPhrase, fromLanguage)}</div>
          <div className={`difficulty-badge difficulty-${currentPhrase.difficulty}`}>
            {currentPhrase.difficulty}
          </div>
        </div>

        {showError && (
          <div className="error-message">
            {errorMessage}
          </div>
        )}

        {showAnswer && (
          <div className="answer-reveal">
            <div className="answer-label">Correct Answer:</div>
            <div className="answer-text">{getPhraseText(currentPhrase, toLanguage)}</div>
          </div>
        )}

        <div className="input-section">
          <input
            ref={inputRef}
            type="text"
            className={`translation-input ${showError ? 'input-error' : ''}`}
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              if (showError) {
                setShowError(false);
                setErrorMessage('');
              }
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your translation here..."
            autoComplete="off"
          />
          <button className="submit-button" onClick={checkAnswer}>
            Submit
          </button>
          <button className="skip-button" onClick={skipPhrase}>
            Skip
          </button>
        </div>

        <div className="button-row">
          <button className="show-answer-button" onClick={toggleShowAnswer}>
            {showAnswer ? '🙈 Hide Answer' : '👁️ Show Answer'}
          </button>
        </div>

        <div className="progress-info">
          <p>Phrases completed: {results.length}</p>
          <p className="hint">Press Enter to submit • Click Skip to give up</p>
        </div>
      </div>
    </div>
  );
};

export default Game;

