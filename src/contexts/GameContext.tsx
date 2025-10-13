import React, { createContext, useContext, useReducer, useState, ReactNode } from 'react';
import { 
  GameState, Artifact, Achievement, Settings, PowerUp, Quest, PlayerProfile, LeaderboardEntry,
  Season, Friend, GameMode, Event, Tournament, Badge, PlayerStatistics
} from '../types';

interface GameContextType {
  gameState: GameState;
  artifacts: Artifact[];
  achievements: Achievement[];
  settings: Settings;
  powerUps: PowerUp[];
  quests: Quest[];
  playerProfile: PlayerProfile;
  leaderboard: LeaderboardEntry[];
  // New data
  seasons: Season[];
  friends: Friend[];
  gameModes: GameMode[];
  events: Event[];
  tournaments: Tournament[];
  badges: Badge[];
  dispatch: React.Dispatch<GameAction>;
}

type GameAction =
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME'; score: number; coins: number }
  | { type: 'NEXT_ROUND' }
  | { type: 'UPDATE_TIME'; time: number }
  | { type: 'UPDATE_ARTIFACTS'; artifacts: any[] }
  | { type: 'UNLOCK_ARTIFACT'; artifactId: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<Settings> }
  | { type: 'RESET_GAME' }
  | { type: 'ADD_COMBO' }
  | { type: 'RESET_COMBO' }
  | { type: 'ACTIVATE_POWERUP'; powerUpId: string }
  | { type: 'BUY_POWERUP'; powerUpId: string }
  | { type: 'ADD_COINS'; amount: number }
  | { type: 'ADD_EXP'; amount: number }
  | { type: 'UPDATE_QUEST_PROGRESS'; questId: string; progress: number }
  | { type: 'SET_DIFFICULTY'; difficulty: 'easy' | 'normal' | 'hard' | 'extreme' }
  // New actions
  | { type: 'COMPLETE_QUEST'; questId: string }
  | { type: 'CLAIM_SEASON_REWARD'; rewardId: string }
  | { type: 'ADD_FRIEND'; friendId: string }
  | { type: 'REMOVE_FRIEND'; friendId: string }
  | { type: 'JOIN_TOURNAMENT'; tournamentId: string }
  | { type: 'LEAVE_TOURNAMENT'; tournamentId: string }
  | { type: 'UNLOCK_BADGE'; badgeId: string }
  | { type: 'UPDATE_PLAYER_NAME'; name: string }
  | { type: 'UPDATE_PLAYER_AVATAR'; avatar: string }
  | { type: 'UPDATE_PLAYER_TITLE'; title: string }
  | { type: 'UPDATE_STATISTICS'; stats: Partial<PlayerStatistics> }
  | { type: 'SET_GAME_MODE'; modeId: string }
  | { type: 'CLAIM_EVENT_REWARD'; eventId: string; rewardId: string };

const initialState: GameState = {
  currentRound: 1,
  maxRounds: 100,
  timeRemaining: 5,
  artifacts: [],
  score: 0,
  isPlaying: false,
  isPaused: false,
  gameOver: false,
  combo: 0,
  maxCombo: 0,
  activePowerUps: [],
  coinsEarned: 0,
  difficulty: 'normal',
};

const initialArtifacts: Artifact[] = [
  {
    id: 'chest',
    name: 'CHEST',
    description: 'AN ANCIENT CHEST OF THE TEMPLE GUARDS. INSIDE ARE HIDDEN RICHES AND FORGOTTEN SECRETS.',
    emoji: '📦',
    rarity: 'common',
    unlocked: true,
    pointValue: 10,
    type: 'normal',
    timesCollected: 0,
  },
  {
    id: 'crystal',
    name: 'CRYSTAL',
    description: 'A MAGICAL CRYSTAL THAT GLOWS WITH ANCIENT POWER.',
    emoji: '💎',
    rarity: 'rare',
    unlocked: false,
    pointValue: 25,
    type: 'bonus',
    timesCollected: 0,
  },
  {
    id: 'owl',
    name: 'OWL',
    description: 'THE WISE OWL OF ATHENA, GUARDIAN OF KNOWLEDGE.',
    emoji: '🦉',
    rarity: 'epic',
    unlocked: false,
    pointValue: 50,
    type: 'special',
    timesCollected: 0,
  },
  {
    id: 'coin',
    name: 'COIN',
    description: 'A GOLDEN COIN FROM THE TREASURY OF THE GODS.',
    emoji: '🪙',
    rarity: 'common',
    unlocked: true,
    pointValue: 15,
    type: 'normal',
    timesCollected: 0,
  },
  {
    id: 'trophy',
    name: 'TROPHY',
    description: 'THE LEGENDARY TROPHY OF VICTORY.',
    emoji: '🏆',
    rarity: 'legendary',
    unlocked: false,
    pointValue: 100,
    type: 'special',
    timesCollected: 0,
  },
  {
    id: 'scroll',
    name: 'SCROLL',
    description: 'AN ANCIENT SCROLL WITH MYSTICAL WRITINGS.',
    emoji: '📜',
    rarity: 'rare',
    unlocked: false,
    pointValue: 30,
    type: 'bonus',
    timesCollected: 0,
  },
  {
    id: 'star',
    name: 'STAR',
    description: 'A SHINING STAR FROM THE CELESTIAL REALM.',
    emoji: '⭐',
    rarity: 'epic',
    unlocked: false,
    pointValue: 75,
    type: 'special',
    timesCollected: 0,
  },
  {
    id: 'bomb',
    name: 'BOMB',
    description: 'DANGEROUS! AVOID THIS CURSED ARTIFACT!',
    emoji: '💣',
    rarity: 'common',
    unlocked: true,
    pointValue: -20,
    type: 'cursed',
    timesCollected: 0,
  },
  {
    id: 'diamond',
    name: 'DIAMOND',
    description: 'THE RAREST AND MOST VALUABLE ARTIFACT.',
    emoji: '💠',
    rarity: 'mythic',
    unlocked: false,
    pointValue: 200,
    type: 'special',
    timesCollected: 0,
  },
];

const initialAchievements: Achievement[] = [
  {
    id: 'first_guardian',
    title: 'FIRST GUARDIAN',
    description: 'COMPLETE THE FIRST ROUND.',
    requirement: 'COMPLETE THE FIRST ROUND.',
    emoji: '🛡️',
    unlocked: false,
    rewardCoins: 50,
  },
  {
    id: 'sky_master',
    title: 'SKY MASTER',
    description: 'COMPLETE 10 ROUNDS.',
    requirement: 'COMPLETE 10 ROUNDS.',
    emoji: '☁️',
    unlocked: false,
    rewardCoins: 200,
  },
  {
    id: 'artifact_collector',
    title: 'ARTIFACT COLLECTOR',
    description: 'COLLECT 5 DIFFERENT ARTIFACTS.',
    requirement: 'COLLECT 5 DIFFERENT ARTIFACTS.',
    emoji: '📦',
    unlocked: false,
    rewardCoins: 150,
  },
  {
    id: 'combo_master',
    title: 'COMBO MASTER',
    description: 'ACHIEVE A 10X COMBO.',
    requirement: 'ACHIEVE A 10X COMBO.',
    emoji: '🔥',
    unlocked: false,
    rewardCoins: 100,
  },
  {
    id: 'high_scorer',
    title: 'HIGH SCORER',
    description: 'REACH 1000 POINTS IN A GAME.',
    requirement: 'REACH 1000 POINTS IN A GAME.',
    emoji: '🎯',
    unlocked: false,
    rewardCoins: 300,
  },
  {
    id: 'legendary_hunter',
    title: 'LEGENDARY HUNTER',
    description: 'COLLECT A LEGENDARY ARTIFACT.',
    requirement: 'COLLECT A LEGENDARY ARTIFACT.',
    emoji: '🏆',
    unlocked: false,
    rewardCoins: 250,
  },
];

const initialPowerUps: PowerUp[] = [
  {
    id: 'slowTime',
    name: 'SLOW TIME',
    description: 'SLOWS DOWN ALL ARTIFACTS FOR 5 SECONDS.',
    icon: '⏰',
    cost: 50,
    duration: 5000,
    owned: 0,
    effect: 'slowTime',
  },
  {
    id: 'freeze',
    name: 'FREEZE',
    description: 'FREEZES ALL ARTIFACTS FOR 3 SECONDS.',
    icon: '❄️',
    cost: 75,
    duration: 3000,
    owned: 0,
    effect: 'freeze',
  },
  {
    id: 'doublePoints',
    name: 'DOUBLE POINTS',
    description: 'DOUBLES ALL POINTS FOR 10 SECONDS.',
    icon: '⭐',
    cost: 100,
    duration: 10000,
    owned: 0,
    effect: 'doublePoints',
  },
  {
    id: 'shield',
    name: 'SHIELD',
    description: 'PROTECTS FROM CURSED ARTIFACTS FOR 15 SECONDS.',
    icon: '🛡️',
    cost: 60,
    duration: 15000,
    owned: 0,
    effect: 'shield',
  },
  {
    id: 'magnet',
    name: 'MAGNET',
    description: 'AUTO-COLLECTS NEARBY ARTIFACTS FOR 8 SECONDS.',
    icon: '🧲',
    cost: 120,
    duration: 8000,
    owned: 0,
    effect: 'magnet',
  },
];

const initialQuests: Quest[] = [
  {
    id: 'daily_collect_10',
    title: 'DAILY COLLECTOR',
    description: 'COLLECT 10 ARTIFACTS TODAY.',
    progress: 0,
    target: 10,
    rewardCoins: 50,
    rewardExp: 20,
    completed: false,
    type: 'daily',
  },
  {
    id: 'daily_combo_5',
    title: 'COMBO STARTER',
    description: 'ACHIEVE A 5X COMBO TODAY.',
    progress: 0,
    target: 5,
    rewardCoins: 40,
    rewardExp: 15,
    completed: false,
    type: 'daily',
  },
  {
    id: 'weekly_round_20',
    title: 'WEEKLY WARRIOR',
    description: 'COMPLETE 20 ROUNDS THIS WEEK.',
    progress: 0,
    target: 20,
    rewardCoins: 200,
    rewardExp: 100,
    completed: false,
    type: 'weekly',
  },
];

const initialPlayerProfile: PlayerProfile = {
  level: 1,
  experience: 0,
  expToNextLevel: 100,
  totalCoins: 500, // Starting coins
  totalScore: 0,
  gamesPlayed: 0,
  artifactsCollected: 0,
  highScore: 0,
  currentStreak: 0,
  longestStreak: 0,
  // New fields
  playerName: 'GUARDIAN',
  avatar: '👑',
  title: 'NOVICE GUARDIAN',
  joinDate: new Date(),
  lastLogin: new Date(),
  totalPlayTime: 0,
  favoriteGameMode: 'classic',
  achievementsUnlocked: 0,
  questsCompleted: 0,
  friendsCount: 0,
  rank: 1,
  prestige: 0,
  seasonalLevel: 1,
  seasonalExp: 0,
  badges: [],
  statistics: {
    totalRoundsCompleted: 0,
    totalArtifactsCaught: 0,
    totalCursedArtifactsAvoided: 0,
    totalPowerUpsUsed: 0,
    totalComboReached: 0,
    averageScore: 0,
    bestCombo: 0,
    perfectRounds: 0,
    fastestRound: 0,
    longestPlaySession: 0,
    favoriteArtifact: 'chest',
    mostUsedPowerUp: 'slowTime',
  },
};

const initialLeaderboard: LeaderboardEntry[] = [
  {
    id: '1',
    playerName: 'SKYBOUND MASTER',
    score: 5000,
    round: 45,
    date: new Date(),
  },
  {
    id: '2',
    playerName: 'ARTIFACT HUNTER',
    score: 3500,
    round: 32,
    date: new Date(),
  },
  {
    id: '3',
    playerName: 'GUARDIAN ELITE',
    score: 2800,
    round: 28,
    date: new Date(),
  },
];

const initialSettings: Settings = {
  backgroundMusic: true,
  soundEffects: true,
  vibration: true,
  notifications: true,
};

// New initial data
const initialSeasons: Season[] = [
  {
    id: 'season_1',
    name: 'SPRING OF MAGIC',
    description: 'WELCOME TO THE FIRST SEASON OF SKYBOUND GATEKEEPER!',
    startDate: new Date(),
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
    isActive: true,
    theme: 'spring',
    level: 1,
    experience: 0,
    maxLevel: 50,
    rewards: [
      {
        id: 'season_1_level_5',
        level: 5,
        type: 'coins',
        value: 100,
        claimed: false,
        name: 'COIN BONUS',
        description: '100 COINS FOR REACHING LEVEL 5',
      },
      {
        id: 'season_1_level_10',
        level: 10,
        type: 'powerup',
        value: 1,
        claimed: false,
        name: 'FREEZE POWER-UP',
        description: '1 FREEZE POWER-UP',
      },
    ],
  },
];

const initialFriends: Friend[] = [
  {
    id: 'friend_1',
    name: 'SKY MASTER',
    avatar: '🌟',
    level: 25,
    highScore: 4500,
    isOnline: true,
    lastSeen: new Date(),
    mutualFriends: 3,
  },
  {
    id: 'friend_2',
    name: 'ARTIFACT HUNTER',
    avatar: '🏹',
    level: 18,
    highScore: 3200,
    isOnline: false,
    lastSeen: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    mutualFriends: 1,
  },
];

const initialGameModes: GameMode[] = [
  {
    id: 'classic',
    name: 'CLASSIC MODE',
    description: 'THE ORIGINAL SKYBOUND EXPERIENCE',
    icon: '🎮',
    difficulty: 'normal',
    timeLimit: 30,
    specialRules: ['STANDARD ARTIFACTS', 'NORMAL SPEED'],
    rewards: { coinsMultiplier: 1, expMultiplier: 1 },
    unlocked: true,
  },
  {
    id: 'speed',
    name: 'SPEED MODE',
    description: 'FASTER ARTIFACTS, HIGHER REWARDS',
    icon: '⚡',
    difficulty: 'hard',
    timeLimit: 20,
    specialRules: ['2X ARTIFACT SPEED', 'BONUS POINTS'],
    rewards: { coinsMultiplier: 1.5, expMultiplier: 1.5 },
    unlocked: false,
    requiredLevel: 5,
  },
  {
    id: 'endless',
    name: 'ENDLESS MODE',
    description: 'NO TIME LIMIT, SURVIVE AS LONG AS POSSIBLE',
    icon: '♾️',
    difficulty: 'extreme',
    timeLimit: 0,
    specialRules: ['NO TIME LIMIT', 'INCREASING DIFFICULTY'],
    rewards: { coinsMultiplier: 2, expMultiplier: 2 },
    unlocked: false,
    requiredLevel: 10,
  },
  {
    id: 'zen',
    name: 'ZEN MODE',
    description: 'RELAXING GAMEPLAY WITH NO CURSED ARTIFACTS',
    icon: '🧘',
    difficulty: 'easy',
    timeLimit: 45,
    specialRules: ['NO CURSED ARTIFACTS', 'SLOWER SPEED'],
    rewards: { coinsMultiplier: 0.8, expMultiplier: 0.8 },
    unlocked: false,
    requiredLevel: 3,
  },
];

const initialEvents: Event[] = [
  {
    id: 'event_1',
    name: 'DOUBLE COINS WEEKEND',
    description: 'EARN DOUBLE COINS FOR ALL GAMES!',
    type: 'double_coins',
    startDate: new Date(),
    endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
    isActive: true,
    participants: 1250,
    rewards: [
      {
        id: 'event_1_reward_1',
        name: 'PARTICIPATION REWARD',
        description: '100 COINS FOR PARTICIPATING',
        type: 'coins',
        value: 100,
        requirement: 'PLAY 1 GAME',
        claimed: false,
      },
    ],
  },
];

const initialTournaments: Tournament[] = [
  {
    id: 'tournament_1',
    name: 'WEEKLY CHAMPIONSHIP',
    description: 'COMPETE FOR THE WEEKLY TITLE!',
    startDate: new Date(),
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    isActive: true,
    maxParticipants: 100,
    entryFee: 50,
    participants: [
      {
        id: 'player_1',
        name: 'CHAMPION',
        score: 5000,
        rank: 1,
        joinedAt: new Date(),
      },
    ],
    rewards: [
      {
        rank: 1,
        type: 'coins',
        value: 1000,
        name: 'CHAMPION REWARD',
      },
      {
        rank: 2,
        type: 'coins',
        value: 500,
        name: 'RUNNER-UP REWARD',
      },
      {
        rank: 3,
        type: 'coins',
        value: 250,
        name: 'THIRD PLACE REWARD',
      },
    ],
  },
];

const initialBadges: Badge[] = [
  {
    id: 'badge_first_game',
    name: 'FIRST STEPS',
    description: 'COMPLETED YOUR FIRST GAME',
    icon: '👶',
    rarity: 'common',
    unlockedAt: new Date(),
    category: 'achievement',
  },
  {
    id: 'badge_high_score',
    name: 'SCORE MASTER',
    description: 'ACHIEVED A HIGH SCORE OF 1000+',
    icon: '🎯',
    rarity: 'rare',
    unlockedAt: new Date(),
    category: 'achievement',
  },
];

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...state,
        isPlaying: true,
        isPaused: false,
        gameOver: false,
        currentRound: 1,
        timeRemaining: 5,
        artifacts: [],
        score: 0,
        combo: 0,
        maxCombo: 0,
        activePowerUps: [],
        coinsEarned: 0,
      };
    case 'PAUSE_GAME':
      return { ...state, isPaused: true };
    case 'RESUME_GAME':
      return { ...state, isPaused: false };
    case 'END_GAME':
      return { ...state, isPlaying: false, gameOver: true };
    case 'NEXT_ROUND':
      return {
        ...state,
        currentRound: state.currentRound + 1,
        timeRemaining: 5 + (state.currentRound * 2),
        artifacts: [],
        combo: 0,
      };
    case 'UPDATE_TIME':
      return { ...state, timeRemaining: action.time };
    case 'UPDATE_ARTIFACTS':
      return { ...state, artifacts: action.artifacts };
    case 'ADD_COMBO':
      return { 
        ...state, 
        combo: state.combo + 1,
        maxCombo: Math.max(state.maxCombo, state.combo + 1),
      };
    case 'RESET_COMBO':
      return { ...state, combo: 0 };
    case 'SET_DIFFICULTY':
      return { ...state, difficulty: action.difficulty };
    case 'RESET_GAME':
      return initialState;
    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const [artifacts, setArtifacts] = useState<Artifact[]>(initialArtifacts);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievements);
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [powerUps, setPowerUps] = useState<PowerUp[]>(initialPowerUps);
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [playerProfile, setPlayerProfile] = useState<PlayerProfile>(initialPlayerProfile);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(initialLeaderboard);
  // New state
  const [seasons, setSeasons] = useState<Season[]>(initialSeasons);
  const [friends, setFriends] = useState<Friend[]>(initialFriends);
  const [gameModes, setGameModes] = useState<GameMode[]>(initialGameModes);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [tournaments, setTournaments] = useState<Tournament[]>(initialTournaments);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);

  const contextValue: GameContextType = {
    gameState,
    artifacts,
    achievements,
    settings,
    powerUps,
    quests,
    playerProfile,
    leaderboard,
    seasons,
    friends,
    gameModes,
    events,
    tournaments,
    badges,
    dispatch: (action: GameAction) => {
      dispatch(action);
      
      // Handle artifact unlocking
      if (action.type === 'UNLOCK_ARTIFACT') {
        setArtifacts(prev => 
          prev.map(artifact => 
            artifact.id === action.artifactId 
              ? { ...artifact, unlocked: true, timesCollected: (artifact.timesCollected || 0) + 1 }
              : artifact
          )
        );
      }
      
      // Handle achievement unlocking
      if (action.type === 'UNLOCK_ACHIEVEMENT') {
        setAchievements(prev => 
          prev.map(achievement => 
            achievement.id === action.achievementId 
              ? { ...achievement, unlocked: true, unlockedAt: new Date() }
              : achievement
          )
        );
        // Award coins for achievement
        const achievement = achievements.find(a => a.id === action.achievementId);
        if (achievement?.rewardCoins) {
          setPlayerProfile(prev => ({
            ...prev,
            totalCoins: prev.totalCoins + (achievement.rewardCoins || 0),
          }));
        }
      }
      
      // Handle settings update
      if (action.type === 'UPDATE_SETTINGS') {
        setSettings(prev => ({ ...prev, ...action.settings }));
      }

      // Handle power-up purchase
      if (action.type === 'BUY_POWERUP') {
        const powerUp = powerUps.find(p => p.id === action.powerUpId);
        if (powerUp && playerProfile.totalCoins >= powerUp.cost) {
          setPowerUps(prev =>
            prev.map(p =>
              p.id === action.powerUpId ? { ...p, owned: p.owned + 1 } : p
            )
          );
          setPlayerProfile(prev => ({
            ...prev,
            totalCoins: prev.totalCoins - powerUp.cost,
          }));
        }
      }

      // Handle adding coins
      if (action.type === 'ADD_COINS') {
        setPlayerProfile(prev => ({
          ...prev,
          totalCoins: prev.totalCoins + action.amount,
        }));
      }

      // Handle adding experience
      if (action.type === 'ADD_EXP') {
        setPlayerProfile(prev => {
          const newExp = prev.experience + action.amount;
          const newLevel = Math.floor(newExp / prev.expToNextLevel) + prev.level;
          const remainingExp = newExp % prev.expToNextLevel;
          
          return {
            ...prev,
            experience: remainingExp,
            level: newLevel,
            expToNextLevel: 100 + (newLevel * 20),
          };
        });
      }

      // Handle quest progress update
      if (action.type === 'UPDATE_QUEST_PROGRESS') {
        setQuests(prev =>
          prev.map(quest => {
            if (quest.id === action.questId) {
              const newProgress = action.progress;
              const isCompleted = newProgress >= quest.target;
              
              if (isCompleted && !quest.completed) {
                // Award quest rewards
                setPlayerProfile(p => ({
                  ...p,
                  totalCoins: p.totalCoins + quest.rewardCoins,
                  experience: p.experience + quest.rewardExp,
                }));
              }
              
              return {
                ...quest,
                progress: newProgress,
                completed: isCompleted,
              };
            }
            return quest;
          })
        );
      }

      // Handle game end
      if (action.type === 'END_GAME') {
        setPlayerProfile(prev => {
          const newHighScore = Math.max(prev.highScore, action.score);
          const newLeaderboardEntry: LeaderboardEntry = {
            id: Date.now().toString(),
            playerName: 'YOU',
            score: action.score,
            round: gameState.currentRound,
            date: new Date(),
          };
          
          // Update leaderboard
          setLeaderboard(prevBoard => {
            const updated = [...prevBoard, newLeaderboardEntry]
              .sort((a, b) => b.score - a.score)
              .slice(0, 10);
            return updated;
          });

          return {
            ...prev,
            totalScore: prev.totalScore + action.score,
            totalCoins: prev.totalCoins + action.coins,
            gamesPlayed: prev.gamesPlayed + 1,
            highScore: newHighScore,
            statistics: {
              ...prev.statistics,
              totalRoundsCompleted: prev.statistics.totalRoundsCompleted + 1,
              totalArtifactsCaught: prev.statistics.totalArtifactsCaught + action.score / 10, // Estimate
              averageScore: (prev.statistics.averageScore * prev.gamesPlayed + action.score) / (prev.gamesPlayed + 1),
            },
          };
        });
      }

      // Handle new actions
      if (action.type === 'COMPLETE_QUEST') {
        setQuests(prev =>
          prev.map(quest => {
            if (quest.id === action.questId) {
              return { ...quest, completed: true };
            }
            return quest;
          })
        );
        setPlayerProfile(prev => ({
          ...prev,
          questsCompleted: prev.questsCompleted + 1,
        }));
      }

      if (action.type === 'CLAIM_SEASON_REWARD') {
        setSeasons(prev =>
          prev.map(season => ({
            ...season,
            rewards: season.rewards.map(reward =>
              reward.id === action.rewardId ? { ...reward, claimed: true } : reward
            ),
          }))
        );
      }

      if (action.type === 'ADD_FRIEND') {
        setFriends(prev => [...prev, {
          id: action.friendId,
          name: 'NEW FRIEND',
          avatar: '👤',
          level: 1,
          highScore: 0,
          isOnline: false,
          lastSeen: new Date(),
          mutualFriends: 0,
        }]);
        setPlayerProfile(prev => ({
          ...prev,
          friendsCount: prev.friendsCount + 1,
        }));
      }

      if (action.type === 'REMOVE_FRIEND') {
        setFriends(prev => prev.filter(friend => friend.id !== action.friendId));
        setPlayerProfile(prev => ({
          ...prev,
          friendsCount: Math.max(0, prev.friendsCount - 1),
        }));
      }

      if (action.type === 'UNLOCK_BADGE') {
        setBadges(prev => [...prev, {
          id: action.badgeId,
          name: 'NEW BADGE',
          description: 'A NEW BADGE HAS BEEN UNLOCKED!',
          icon: '🏆',
          rarity: 'common',
          unlockedAt: new Date(),
          category: 'achievement',
        }]);
      }

      if (action.type === 'UPDATE_PLAYER_NAME') {
        setPlayerProfile(prev => ({ ...prev, playerName: action.name }));
      }

      if (action.type === 'UPDATE_PLAYER_AVATAR') {
        setPlayerProfile(prev => ({ ...prev, avatar: action.avatar }));
      }

      if (action.type === 'UPDATE_PLAYER_TITLE') {
        setPlayerProfile(prev => ({ ...prev, title: action.title }));
      }

      if (action.type === 'UPDATE_STATISTICS') {
        setPlayerProfile(prev => ({
          ...prev,
          statistics: { ...prev.statistics, ...action.stats },
        }));
      }

      if (action.type === 'SET_GAME_MODE') {
        setGameModes(prev =>
          prev.map(mode => ({
            ...mode,
            unlocked: mode.id === action.modeId || mode.unlocked,
          }))
        );
      }
    },
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
