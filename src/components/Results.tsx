import { useEffect } from 'react';
import type { Phrase, Language } from '../data/phrases';
import { saveGameResult } from '../utils/localStorage';
import './Results.css';

interface GameResult {
  phrase: Phrase;
  userAnswer: string;
  isCorrect: boolean;
}

interface ResultsProps {
  results: GameResult[];
  duration: number;
  fromLanguage: Language;
  toLanguage: Language;
  onPlayAgain: () => void;
  onShowRankings: () => void;
}

const Results: React.FC<ResultsProps> = ({ results, duration, fromLanguage, toLanguage, onPlayAgain, onShowRankings }) => {
  const getLanguageName = (lang: Language): string => {
    const names: Record<Language, string> = {
      english: 'English',
      spanish: 'Spanish',
      portuguese: 'Portuguese'
    };
    return names[lang];
  };

  const getPhraseText = (phrase: Phrase, lang: Language): string => {
    return phrase[lang];
  };
  const correctCount = results.filter(r => r.isCorrect).length;
  const incorrectCount = results.length - correctCount;
  const accuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 0;

  // Save result to localStorage
  useEffect(() => {
    if (results.length > 0) {
      saveGameResult(duration, results.length, correctCount, accuracy, correctCount);
    }
  }, [duration, results.length, correctCount, accuracy]);

  const getPerformanceMessage = () => {
    if (accuracy >= 90) return "Outstanding! 🌟";
    if (accuracy >= 75) return "Great job! 🎉";
    if (accuracy >= 60) return "Good work! 👍";
    if (accuracy >= 40) return "Keep practicing! 💪";
    return "Don't give up! 📚";
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <h1>Game Over!</h1>
        <p className="performance-message">{getPerformanceMessage()}</p>
      </div>

      <div className="results-summary">
        <div className="summary-card">
          <div className="summary-value">{results.length}</div>
          <div className="summary-label">Total Phrases</div>
        </div>
        <div className="summary-card correct">
          <div className="summary-value">{correctCount}</div>
          <div className="summary-label">Correct</div>
        </div>
        <div className="summary-card incorrect">
          <div className="summary-value">{incorrectCount}</div>
          <div className="summary-label">Incorrect</div>
        </div>
        <div className="summary-card accuracy">
          <div className="summary-value">{accuracy}%</div>
          <div className="summary-label">Accuracy</div>
        </div>
      </div>

      <div className="results-details">
        <h2>Review Your Answers</h2>
        <div className="results-list">
          {results.map((result, index) => (
            <div 
              key={index} 
              className={`result-item ${result.isCorrect ? 'correct' : 'incorrect'}`}
            >
              <div className="result-number">{index + 1}</div>
              <div className="result-content">
                <div className="result-phrase">
                  <strong>{getLanguageName(fromLanguage)}:</strong> {getPhraseText(result.phrase, fromLanguage)}
                </div>
                <div className="result-correct-answer">
                  <strong>Correct Answer ({getLanguageName(toLanguage)}):</strong> {getPhraseText(result.phrase, toLanguage)}
                </div>
                {!result.isCorrect && (
                  <div className="result-user-answer">
                    <strong>Your Answer:</strong> {result.userAnswer || '(empty)'}
                  </div>
                )}
              </div>
              <div className="result-status">
                {result.isCorrect ? '✓' : '✗'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="results-actions">
        <button className="view-rankings-button" onClick={onShowRankings}>
          🏆 View Rankings
        </button>
        <button className="play-again-button" onClick={onPlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Results;

