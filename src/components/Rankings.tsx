import { useState } from 'react';
import { getRankings, clearRankings } from '../utils/localStorage';
import type { GameRecord } from '../utils/localStorage';
import './Rankings.css';

interface RankingsProps {
  onClose: () => void;
}

const Rankings: React.FC<RankingsProps> = ({ onClose }) => {
  const [rankings] = useState(getRankings());
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const durations = [30, 60, 120, 180];
  const durationLabels: { [key: number]: string } = {
    30: '30 seconds',
    60: '1 minute',
    120: '2 minutes',
    180: '3 minutes',
  };

  const handleClearRankings = () => {
    if (window.confirm('Are you sure you want to clear all rankings? This cannot be undone.')) {
      clearRankings();
      window.location.reload();
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMedalEmoji = (index: number): string => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  const hasAnyRankings = Object.keys(rankings).length > 0;

  return (
    <div className="rankings-overlay">
      <div className="rankings-modal">
        <div className="rankings-header">
          <h1>🏆 Best Scores</h1>
          <button className="close-button" onClick={onClose}>✕</button>
        </div>

        {!hasAnyRankings ? (
          <div className="no-rankings">
            <div className="no-rankings-icon">🎮</div>
            <h2>No Rankings Yet</h2>
            <p>Play some games to see your best scores here!</p>
          </div>
        ) : (
          <>
            <div className="duration-tabs">
              {durations.map((duration) => {
                const hasRecords = rankings[duration] && rankings[duration].length > 0;
                return (
                  <button
                    key={duration}
                    className={`duration-tab ${selectedDuration === duration ? 'active' : ''} ${!hasRecords ? 'disabled' : ''}`}
                    onClick={() => hasRecords && setSelectedDuration(duration)}
                    disabled={!hasRecords}
                  >
                    {durationLabels[duration]}
                    {hasRecords && <span className="record-count">({rankings[duration].length})</span>}
                  </button>
                );
              })}
            </div>

            {selectedDuration === null ? (
              <div className="select-duration-message">
                <p>👆 Select a duration to view rankings</p>
              </div>
            ) : (
              <div className="rankings-list">
                <h2>{durationLabels[selectedDuration]} - Top Scores</h2>
                <div className="rankings-table">
                  <div className="rankings-table-header">
                    <div className="rank-col">Rank</div>
                    <div className="score-col">Score</div>
                    <div className="accuracy-col">Accuracy</div>
                    <div className="phrases-col">Phrases</div>
                    <div className="date-col">Date</div>
                  </div>
                  {rankings[selectedDuration]?.map((record: GameRecord, index: number) => (
                    <div key={index} className={`rankings-row ${index < 3 ? 'top-three' : ''}`}>
                      <div className="rank-col">
                        <span className="medal">{getMedalEmoji(index)}</span>
                      </div>
                      <div className="score-col">
                        <strong>{record.score}</strong>
                      </div>
                      <div className="accuracy-col">
                        <span className="accuracy-badge">{record.accuracy}%</span>
                      </div>
                      <div className="phrases-col">
                        {record.correctPhrases}/{record.totalPhrases}
                      </div>
                      <div className="date-col">
                        {formatDate(record.date)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rankings-footer">
              <button className="clear-rankings-button" onClick={handleClearRankings}>
                🗑️ Clear All Rankings
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Rankings;

