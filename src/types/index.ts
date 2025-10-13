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
  type: 'daily' | 'weekly' | 'special' | 'seasonal' | 'event';
  category: 'collection' | 'score' | 'combo' | 'time' | 'rounds' | 'powerups';
  difficulty: 'easy' | 'medium' | 'hard';
  expiresAt?: Date;
  requirements?: QuestRequirement[];
}

export interface QuestRequirement {
  type: string;
  value: number;
  current: number;
}

export interface Season {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  theme: string;
  rewards: SeasonReward[];
  level: number;
  experience: number;
  maxLevel: number;
}

export interface SeasonReward {
  id: string;
  level: number;
  type: 'coins' | 'powerup' | 'artifact' | 'title';
  value: number;
  claimed: boolean;
  name?: string;
  description?: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  level: number;
  highScore: number;
  isOnline: boolean;
  lastSeen: Date;
  mutualFriends: number;
}

export interface GameMode {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'easy' | 'normal' | 'hard' | 'extreme';
  timeLimit: number;
  specialRules: string[];
  rewards: {
    coinsMultiplier: number;
    expMultiplier: number;
  };
  unlocked: boolean;
  requiredLevel?: number;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  type: 'double_coins' | 'bonus_exp' | 'special_artifacts' | 'tournament';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  rewards: EventReward[];
  participants: number;
}

export interface EventReward {
  id: string;
  name: string;
  description: string;
  type: 'coins' | 'powerup' | 'artifact' | 'title';
  value: number;
  requirement: string;
  claimed: boolean;
}

export interface Tournament {
  id: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  participants: TournamentParticipant[];
  rewards: TournamentReward[];
  maxParticipants: number;
  entryFee: number;
}

export interface TournamentParticipant {
  id: string;
  name: string;
  score: number;
  rank: number;
  joinedAt: Date;
}

export interface TournamentReward {
  rank: number;
  type: 'coins' | 'powerup' | 'artifact' | 'title';
  value: number;
  name?: string;
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
  // New fields
  playerName: string;
  avatar: string;
  title: string;
  joinDate: Date;
  lastLogin: Date;
  totalPlayTime: number; // in minutes
  favoriteGameMode: string;
  achievementsUnlocked: number;
  questsCompleted: number;
  friendsCount: number;
  rank: number;
  prestige: number;
  seasonalLevel: number;
  seasonalExp: number;
  badges: Badge[];
  statistics: PlayerStatistics;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt: Date;
  category: 'achievement' | 'seasonal' | 'event' | 'special';
}

export interface PlayerStatistics {
  totalRoundsCompleted: number;
  totalArtifactsCaught: number;
  totalCursedArtifactsAvoided: number;
  totalPowerUpsUsed: number;
  totalComboReached: number;
  averageScore: number;
  bestCombo: number;
  perfectRounds: number; // rounds without missing any artifacts
  fastestRound: number; // in seconds
  longestPlaySession: number; // in minutes
  favoriteArtifact: string;
  mostUsedPowerUp: string;
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
  // New screens
  Quests: undefined;
  Seasons: undefined;
  Friends: undefined;
  Leaderboard: undefined;
  Events: undefined;
  Tournaments: undefined;
  GameModes: undefined;
  Statistics: undefined;
  Settings: undefined;
  Badges: undefined;
  Social: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Collection: undefined;
  Achievements: undefined;
  Shop: undefined;
  Quests: undefined;
  Seasons: undefined;
  Friends: undefined;
};

