export interface GameRecord {
  date: string;
  duration: number;
  totalPhrases: number;
  correctPhrases: number;
  accuracy: number;
  score: number;
}

export interface RankingData {
  [duration: number]: GameRecord[];
}

const STORAGE_KEY = 'english-phrases-game-rankings';

export const saveGameResult = (
  duration: number,
  totalPhrases: number,
  correctPhrases: number,
  accuracy: number,
  score: number
): void => {
  const rankings = getRankings();
  
  const newRecord: GameRecord = {
    date: new Date().toISOString(),
    duration,
    totalPhrases,
    correctPhrases,
    accuracy,
    score,
  };

  if (!rankings[duration]) {
    rankings[duration] = [];
  }

  rankings[duration].push(newRecord);
  
  // Sort by score (descending), then by accuracy (descending)
  rankings[duration].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.accuracy - a.accuracy;
  });

  // Keep only top 10 records per duration
  rankings[duration] = rankings[duration].slice(0, 10);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(rankings));
};

export const getRankings = (): RankingData => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return {};
    }
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading rankings from localStorage:', error);
    return {};
  }
};

export const clearRankings = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getBestScore = (duration: number): GameRecord | null => {
  const rankings = getRankings();
  if (!rankings[duration] || rankings[duration].length === 0) {
    return null;
  }
  return rankings[duration][0];
};

export const getAllBestScores = (): { [duration: number]: GameRecord } => {
  const rankings = getRankings();
  const bestScores: { [duration: number]: GameRecord } = {};
  
  for (const duration in rankings) {
    if (rankings[duration].length > 0) {
      bestScores[parseInt(duration)] = rankings[duration][0];
    }
  }
  
  return bestScores;
};

