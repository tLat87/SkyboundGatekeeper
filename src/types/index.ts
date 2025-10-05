export interface Artifact {
  id: string;
  name: string;
  description: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlocked: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  requirement: string;
  emoji: string;
  unlocked: boolean;
  unlockedAt?: Date;
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
}

export interface ArtifactPosition {
  id: string;
  x: number;
  y: number;
  velocity: number;
  emoji: string;
  size: number;
}

export interface Settings {
  backgroundMusic: boolean;
  soundEffects: boolean;
}

export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  GameRules: undefined;
  Gameplay: undefined;
  Pause: undefined;
  GameOver: undefined;
  RoundComplete: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Collection: undefined;
  Achievements: undefined;
  Settings: undefined;
};

