import { useState } from 'react';
import type { Language, Difficulty } from '../data/phrases';
import { UKFlag, SpainFlag, BrazilFlag } from './FlagIcons';
import './StartScreen.css';

interface StartScreenProps {
  onStart: (duration: number, fromLang: Language, toLang: Language, difficulties: Difficulty[]) => void;
  onShowRankings: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart, onShowRankings }) => {
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [fromLanguage, setFromLanguage] = useState<Language>('portuguese');
  const [toLanguage, setToLanguage] = useState<Language>('english');
  const [selectedDifficulties, setSelectedDifficulties] = useState<Difficulty[]>(['easy', 'medium', 'hard']);

  const durations = [
    { value: 30, label: '30 seconds', description: 'Quick practice' },
    { value: 60, label: '1 minute', description: 'Standard game' },
    { value: 120, label: '2 minutes', description: 'Extended practice' },
    { value: 180, label: '3 minutes', description: 'Challenge mode' },
  ];

  const languages: { value: Language; label: string; FlagComponent: React.FC<any> }[] = [
    { value: 'english', label: 'English', FlagComponent: UKFlag },
    { value: 'spanish', label: 'Spanish', FlagComponent: SpainFlag },
    { value: 'portuguese', label: 'Portuguese', FlagComponent: BrazilFlag },
  ];

  const difficulties: { value: Difficulty; label: string; color: string }[] = [
    { value: 'easy', label: 'Easy', color: '#28a745' },
    { value: 'medium', label: 'Medium', color: '#ffc107' },
    { value: 'hard', label: 'Hard', color: '#dc3545' },
  ];

  const toggleDifficulty = (difficulty: Difficulty) => {
    if (selectedDifficulties.includes(difficulty)) {
      // Don't allow deselecting if it's the only one selected
      if (selectedDifficulties.length > 1) {
        setSelectedDifficulties(selectedDifficulties.filter(d => d !== difficulty));
      }
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty]);
    }
  };

  const handleLanguageChange = (type: 'from' | 'to', lang: Language) => {
    if (type === 'from') {
      if (lang !== toLanguage) {
        setFromLanguage(lang);
      }
    } else {
      if (lang !== fromLanguage) {
        setToLanguage(lang);
      }
    }
  };

  const canStart = fromLanguage !== toLanguage && selectedDifficulties.length > 0;

  return (
    <div className="start-screen">
      <button className="trophy-button" onClick={onShowRankings} title="View Rankings">
        🏆
      </button>

      <div className="start-content">
        <div className="logo">
          <span className="logo-icon">🌍</span>
          <h1>Phrasly</h1>
        </div>

        <p className="subtitle">
          Learn languages by translating phrases as fast as you can!
        </p>

        {/* Language Selection */}
        <div className="language-selector">
          <h2>Select Languages</h2>
          <div className="language-grid">
            <div className="language-column">
              <h3>I speak</h3>
              <div className="language-options">
                {languages.map((lang) => (
                  <button
                    key={`from-${lang.value}`}
                    className={`language-option ${fromLanguage === lang.value ? 'selected' : ''} ${toLanguage === lang.value ? 'disabled' : ''}`}
                    onClick={() => handleLanguageChange('from', lang.value)}
                    disabled={toLanguage === lang.value}
                  >
                    <span className="lang-flag">
                      <lang.FlagComponent width={32} height={24} />
                    </span>
                    <span className="lang-label">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="arrow-separator">→</div>
            <div className="language-column">
              <h3>I want to learn</h3>
              <div className="language-options">
                {languages.map((lang) => (
                  <button
                    key={`to-${lang.value}`}
                    className={`language-option ${toLanguage === lang.value ? 'selected' : ''} ${fromLanguage === lang.value ? 'disabled' : ''}`}
                    onClick={() => handleLanguageChange('to', lang.value)}
                    disabled={fromLanguage === lang.value}
                  >
                    <span className="lang-flag">
                      <lang.FlagComponent width={32} height={24} />
                    </span>
                    <span className="lang-label">{lang.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div className="difficulty-selector">
          <h2>Select Difficulties</h2>
          <p className="difficulty-hint">Choose one or more difficulty levels</p>
          <div className="difficulty-options">
            {difficulties.map((diff) => (
              <button
                key={diff.value}
                className={`difficulty-option ${selectedDifficulties.includes(diff.value) ? 'selected' : ''}`}
                onClick={() => toggleDifficulty(diff.value)}
                style={{
                  borderColor: selectedDifficulties.includes(diff.value) ? diff.color : '#ddd',
                  backgroundColor: selectedDifficulties.includes(diff.value) ? `${diff.color}20` : 'white',
                }}
              >
                <span className="difficulty-label">{diff.label}</span>
                {selectedDifficulties.includes(diff.value) && <span className="checkmark">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div className="duration-selector">
          <h2>Select Game Duration</h2>
          <div className="duration-options">
            {durations.map((duration) => (
              <button
                key={duration.value}
                className={`duration-option ${
                  selectedDuration === duration.value ? 'selected' : ''
                }`}
                onClick={() => setSelectedDuration(duration.value)}
              >
                <div className="duration-label">{duration.label}</div>
                <div className="duration-description">{duration.description}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          className="start-button"
          onClick={() => onStart(selectedDuration, fromLanguage, toLanguage, selectedDifficulties)}
          disabled={!canStart}
        >
          Start Game
        </button>

        <div className="instructions">
          <h3>How to Play</h3>
          <ul>
            <li>Phrases in your native language will be shown on the screen</li>
            <li>Type the translation in the language you're learning</li>
            <li>Press Enter or click Submit to check your answer</li>
            <li>Use Skip to move to the next phrase or Show Answer to learn</li>
            <li>Try to translate as many phrases as you can before time runs out!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StartScreen;

