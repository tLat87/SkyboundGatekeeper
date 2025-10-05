import React, { createContext, useContext, useReducer, useState, ReactNode } from 'react';
import { GameState, Artifact, Achievement, Settings } from '../types';

interface GameContextType {
  gameState: GameState;
  artifacts: Artifact[];
  achievements: Achievement[];
  settings: Settings;
  dispatch: React.Dispatch<GameAction>;
}

type GameAction =
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'END_GAME' }
  | { type: 'NEXT_ROUND' }
  | { type: 'UPDATE_TIME'; time: number }
  | { type: 'UPDATE_ARTIFACTS'; artifacts: any[] }
  | { type: 'UNLOCK_ARTIFACT'; artifactId: string }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'UPDATE_SETTINGS'; settings: Partial<Settings> }
  | { type: 'RESET_GAME' };

const initialState: GameState = {
  currentRound: 1,
  maxRounds: 100,
  timeRemaining: 5,
  artifacts: [],
  score: 0,
  isPlaying: false,
  isPaused: false,
  gameOver: false,
};

const initialArtifacts: Artifact[] = [
  {
    id: 'chest',
    name: 'CHEST',
    description: 'AN ANCIENT CHEST OF THE TEMPLE GUARDS. INSIDE ARE HIDDEN RICHES AND FORGOTTEN SECRETS.',
    emoji: '📦',
    rarity: 'common',
    unlocked: false,
  },
  {
    id: 'crystal',
    name: 'CRYSTAL',
    description: 'A MAGICAL CRYSTAL THAT GLOWS WITH ANCIENT POWER.',
    emoji: '💎',
    rarity: 'rare',
    unlocked: false,
  },
  {
    id: 'owl',
    name: 'OWL',
    description: 'THE WISE OWL OF ATHENA, GUARDIAN OF KNOWLEDGE.',
    emoji: '🦉',
    rarity: 'epic',
    unlocked: false,
  },
  {
    id: 'coin',
    name: 'COIN',
    description: 'A GOLDEN COIN FROM THE TREASURY OF THE GODS.',
    emoji: '🪙',
    rarity: 'common',
    unlocked: false,
  },
  {
    id: 'trophy',
    name: 'TROPHY',
    description: 'THE LEGENDARY TROPHY OF VICTORY.',
    emoji: '🏆',
    rarity: 'legendary',
    unlocked: false,
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
  },
  {
    id: 'sky_master',
    title: 'SKY MASTER',
    description: 'COMPLETE 10 ROUNDS.',
    requirement: 'COMPLETE 10 ROUNDS.',
    emoji: '☁️',
    unlocked: false,
  },
  {
    id: 'artifact_collector',
    title: 'ARTIFACT COLLECTOR',
    description: 'COLLECT 5 DIFFERENT ARTIFACTS.',
    requirement: 'COLLECT 5 DIFFERENT ARTIFACTS.',
    emoji: '📦',
    unlocked: false,
  },
];

const initialSettings: Settings = {
  backgroundMusic: true,
  soundEffects: true,
};

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
      };
    case 'UPDATE_TIME':
      return { ...state, timeRemaining: action.time };
    case 'UPDATE_ARTIFACTS':
      return { ...state, artifacts: action.artifacts };
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

  const contextValue: GameContextType = {
    gameState,
    artifacts,
    achievements,
    settings,
    dispatch: (action: GameAction) => {
      dispatch(action);
      
      // Handle artifact and achievement unlocking
      if (action.type === 'UNLOCK_ARTIFACT') {
        setArtifacts(prev => 
          prev.map(artifact => 
            artifact.id === action.artifactId 
              ? { ...artifact, unlocked: true }
              : artifact
          )
        );
      }
      
      if (action.type === 'UNLOCK_ACHIEVEMENT') {
        setAchievements(prev => 
          prev.map(achievement => 
            achievement.id === action.achievementId 
              ? { ...achievement, unlocked: true, unlockedAt: new Date() }
              : achievement
          )
        );
      }
      
      if (action.type === 'UPDATE_SETTINGS') {
        setSettings(prev => ({ ...prev, ...action.settings }));
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
