import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ArtifactPosition } from '../types';
import { useGame } from '../contexts/GameContext';
import BackgroundImage from '../components/BackgroundImage';

// 3 вида артефактов PNG
const ARTIFACT_IMAGES = [
  require('../assets/img/1.png'),
  require('../assets/img/2.png'),
  require('../assets/img/3.png'),
];

type GameplayNavigationProp = StackNavigationProp<RootStackParamList, 'Gameplay'>;

const { width, height } = Dimensions.get('window');

interface FallingArtifact extends ArtifactPosition {
  imageIndex: number;
  points: number;
}

export default function GameplayScreen() {
  const navigation = useNavigation<GameplayNavigationProp>();
  const { gameState, dispatch } = useGame();
  const [artifacts, setArtifacts] = useState<FallingArtifact[]>([]);
  const [score, setScore] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const spawnTimerRef = useRef<NodeJS.Timeout>();
  const timeRef = useRef(5);
  const nextArtifactId = useRef(0);

  useEffect(() => {
    startGame();
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      if (spawnTimerRef.current) {
        clearInterval(spawnTimerRef.current);
      }
    };
  }, []);

  const spawnArtifact = () => {
    const imageIndex = Math.floor(Math.random() * ARTIFACT_IMAGES.length);
    const newArtifact: FallingArtifact = {
      id: `artifact_${nextArtifactId.current++}`,
      x: Math.random() * (width - 80) + 20,
      y: -80,
      velocity: 2 + Math.random() * 2, // Случайная начальная скорость
      emoji: '', // Больше не используем
      size: 60,
      imageIndex,
      points: 10,
    };
    
    setArtifacts(prev => [...prev, newArtifact]);
  };

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
    setGameRunning(true);
    setScore(0);
    setArtifacts([]);
    timeRef.current = 5 + (gameState.currentRound * 2);
    nextArtifactId.current = 0;
    
    startGameLoop();
    startSpawning();
  };

  const startSpawning = () => {
    // Спавним артефакты каждые 1-2 секунды
    const spawnInterval = Math.max(1000 - (gameState.currentRound * 50), 500);
    spawnTimerRef.current = setInterval(() => {
      spawnArtifact();
    }, spawnInterval);
  };

  const startGameLoop = () => {
    gameLoopRef.current = setInterval(() => {
      // Обновляем таймер
      timeRef.current -= 0.05;
      
      // Обновляем позиции артефактов (падение вниз)
      setArtifacts(prevArtifacts => {
        const updated = prevArtifacts
          .map(artifact => ({
            ...artifact,
            y: artifact.y + artifact.velocity,
            velocity: artifact.velocity + 0.1, // Ускорение
          }))
          .filter(artifact => artifact.y < height - 120); // Удаляем артефакты, которые дошли до линии
        
        return updated;
      });

      // Проверяем, закончилось ли время
      if (timeRef.current <= 0) {
        completeRound();
      }
    }, 50);
  };

  const handleArtifactTap = (artifactId: string, points: number) => {
    if (!gameRunning) return;
    
    // Удаляем артефакт и добавляем очки
    setArtifacts(prev => prev.filter(a => a.id !== artifactId));
    setScore(prev => prev + points);
  };

  const completeRound = () => {
    setGameRunning(false);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    if (spawnTimerRef.current) {
      clearInterval(spawnTimerRef.current);
    }
    dispatch({ type: 'NEXT_ROUND' });
    navigation.navigate('RoundComplete');
  };

  const handlePause = () => {
    setGameRunning(false);
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }
    if (spawnTimerRef.current) {
      clearInterval(spawnTimerRef.current);
    }
    navigation.navigate('Pause');
  };

  return (
    <BackgroundImage style={styles.container}>
      {/* UI Elements */}
      <View style={styles.uiContainer}>
        <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
          <Text style={styles.pauseButtonText}>⏸️</Text>
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoPanel}>
            <Text style={styles.infoText}>ROUND: {gameState.currentRound}/100</Text>
          </View>
          <View style={styles.infoPanel}>
            <Text style={styles.infoText}>SCORE: {score}</Text>
          </View>
          <View style={styles.infoPanel}>
            <Text style={styles.infoText}>TIME: {Math.ceil(timeRef.current)}s</Text>
          </View>
        </View>
      </View>

      {/* Gameplay Area */}
      <View style={styles.gameplayArea}>
        {/* Falling Artifacts */}
        {artifacts.map(artifact => (
          <TouchableWithoutFeedback
            key={artifact.id}
            onPress={() => handleArtifactTap(artifact.id, artifact.points)}
          >
            <View
              style={[
                styles.artifact,
                {
                  left: artifact.x,
                  top: artifact.y,
                },
              ]}
            >
              <Image
                source={ARTIFACT_IMAGES[artifact.imageIndex]}
                style={styles.artifactImage}
                resizeMode="contain"
              />
            </View>
          </TouchableWithoutFeedback>
        ))}

        {/* Bottom Line */}
        <Image source={require('../assets/img/92dc8f6c49b175e716ea5ad557b0d09c21b1d706.png')} style={styles.bottomLine} />
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  uiContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  pauseButton: {
    backgroundColor: '#380082',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  pauseButtonText: {
    fontSize: 20,
    color: '#FFD700',
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  infoPanel: {
    backgroundColor: '#380082',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  infoText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  gameplayArea: {
    flex: 1,
    position: 'relative',
    marginBottom: 120, // Отступ для нижнего таб-бара
  },
  artifact: {
    position: 'absolute',
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  artifactImage: {
    width: '100%',
    height: '100%',
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    width: '100%',
    // backgroundColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
});
