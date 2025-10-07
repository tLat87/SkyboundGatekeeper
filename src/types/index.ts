export interface Artifact {
  id: string;
  name: string;
  description: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
  unlocked: boolean;
  timesCollected?: number;
  pointValue: number;
  type: 'normal' | 'bonus' | 'cursed' | 'special';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  requirement: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: Date;
  rewardCoins?: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  rewardCoins: number;
  rewardExp: number;
  completed: boolean;
  type: 'daily' | 'weekly' | 'special';
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  icon: string;
  cost: number;
  duration: number;
  owned: number;
  effect: 'slowTime' | 'freeze' | 'doublePoints' | 'shield' | 'magnet';
}

export interface PlayerProfile {
  level: number;
  experience: number;
  expToNextLevel: number;
  totalCoins: number;
  totalScore: number;
  gamesPlayed: number;
  artifactsCollected: number;
  highScore: number;
  currentStreak: number;
  longestStreak: number;
}

export interface GameState {
  currentRound: number;
  maxRounds: number;
  timeRemaining: number;
  artifacts: ArtifactPosition[];
  score: number;
  isPlaying: boolean;
  isPaused: boolean;
  gameOver: boolean;
  combo: number;
  maxCombo: number;
  activePowerUps: ActivePowerUp[];
  coinsEarned: number;
  difficulty: 'easy' | 'normal' | 'hard' | 'extreme';
}

export interface ArtifactPosition {
  id: string;
  x: number;
  y: number;
  velocity: number;
  emoji: string;
  size: number;
  artifactType: string;
  points: number;
  special?: boolean;
}

export interface ActivePowerUp {
  id: string;
  effect: string;
  endTime: number;
}

export interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
  round: number;
  date: Date;
}

export interface Settings {
  backgroundMusic: boolean;
  soundEffects: boolean;
  vibration: boolean;
  notifications: boolean;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  GameRules: undefined;
  Gameplay: undefined;
  Pause: undefined;
  GameOver: undefined;
  RoundComplete: undefined;
  Shop: undefined;
  Profile: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Collection: undefined;
  Achievements: undefined;
  Shop: undefined;
};

