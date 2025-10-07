import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, ArtifactPosition } from '../types';
import { useGame } from '../contexts/GameContext';
import BackgroundImage from '../components/BackgroundImage';

// Artifact images
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
  isCursed?: boolean;
  isSpecial?: boolean;
  isBonus?: boolean;
}

export default function GameplayScreen() {
  const navigation = useNavigation<GameplayNavigationProp>();
  const { gameState, dispatch, artifacts: collectionArtifacts, powerUps, playerProfile } = useGame();
  const [artifacts, setArtifacts] = useState<FallingArtifact[]>([]);
  const [score, setScore] = useState(0);
  const [coins, setCoins] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);
  const [combo, setCombo] = useState(0);
  const [showCombo, setShowCombo] = useState(false);
  const [activePowerUps, setActivePowerUps] = useState<string[]>([]);
  const gameLoopRef = useRef<NodeJS.Timeout>();
  const spawnTimerRef = useRef<NodeJS.Timeout>();
  const comboTimerRef = useRef<NodeJS.Timeout>();
  const timeRef = useRef(30);
  const nextArtifactId = useRef(0);
  const comboAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startGame();
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
    };
  }, []);

  const spawnArtifact = () => {
    const rand = Math.random();
    let artifactType: 'normal' | 'bonus' | 'cursed' | 'special' = 'normal';
    let points = 10;
    let imageIndex = Math.floor(Math.random() * ARTIFACT_IMAGES.length);

    // Determine artifact type based on probability
    if (rand < 0.1) {
      artifactType = 'cursed';
      points = -20;
    } else if (rand < 0.25) {
      artifactType = 'bonus';
      points = 25;
    } else if (rand < 0.35) {
      artifactType = 'special';
      points = 50;
    }

    const newArtifact: FallingArtifact = {
      id: `artifact_${nextArtifactId.current++}`,
      x: Math.random() * (width - 80) + 20,
      y: -80,
      velocity: 3 + Math.random() * 2,
      emoji: '',
      size: 60,
      imageIndex,
      points,
      artifactType,
      isCursed: artifactType === 'cursed',
      isSpecial: artifactType === 'special',
      isBonus: artifactType === 'bonus',
    };
    
    setArtifacts(prev => [...prev, newArtifact]);
  };

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
    setGameRunning(true);
    setScore(0);
    setCoins(0);
    setCombo(0);
    setArtifacts([]);
    timeRef.current = 30 + (gameState.currentRound * 5);
    nextArtifactId.current = 0;
    
    startGameLoop();
    startSpawning();
  };

  const startSpawning = () => {
    const spawnInterval = Math.max(800 - (gameState.currentRound * 20), 400);
    spawnTimerRef.current = setInterval(() => {
      spawnArtifact();
    }, spawnInterval);
  };

  const startGameLoop = () => {
    gameLoopRef.current = setInterval(() => {
      timeRef.current -= 0.05;
      
      const slowTimeActive = activePowerUps.includes('slowTime');
      const freezeActive = activePowerUps.includes('freeze');
      
      setArtifacts(prevArtifacts => {
        if (freezeActive) return prevArtifacts;
        
        const velocityMultiplier = slowTimeActive ? 0.5 : 1;
        
        const updated = prevArtifacts
          .map(artifact => ({
            ...artifact,
            y: artifact.y + (artifact.velocity * velocityMultiplier),
            velocity: artifact.velocity + 0.1,
          }))
          .filter(artifact => {
            if (artifact.y >= height - 120) {
              // Artifact reached bottom - lose combo
              resetCombo();
              return false;
            }
            return true;
          });
        
        return updated;
      });

      if (timeRef.current <= 0) {
        completeRound();
      }
    }, 50);
  };

  const handleArtifactTap = (artifactId: string, points: number, isCursed?: boolean, isBonus?: boolean) => {
    if (!gameRunning) return;
    
    const shieldActive = activePowerUps.includes('shield');
    
    if (isCursed && shieldActive) {
      // Shield protects from cursed artifacts
      setArtifacts(prev => prev.filter(a => a.id !== artifactId));
      return;
    }

    const doublePointsActive = activePowerUps.includes('doublePoints');
    const finalPoints = doublePointsActive ? points * 2 : points;
    
    setArtifacts(prev => prev.filter(a => a.id !== artifactId));
    
    if (!isCursed) {
      // Increase combo
      const newCombo = combo + 1;
      setCombo(newCombo);
      setShowCombo(true);
      
      // Animate combo
      Animated.sequence([
        Animated.timing(comboAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(comboAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Reset combo timer
      if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
      comboTimerRef.current = setTimeout(() => {
        resetCombo();
      }, 2000);

      const comboMultiplier = 1 + (newCombo * 0.1);
      const totalPoints = Math.floor(finalPoints * comboMultiplier);
      setScore(prev => prev + totalPoints);
      
      // Award coins
      const coinsEarned = isBonus ? 5 : 2;
      setCoins(prev => prev + coinsEarned);
    } else {
      resetCombo();
      setScore(prev => Math.max(0, prev + finalPoints));
    }
  };

  const resetCombo = () => {
    setCombo(0);
    setShowCombo(false);
    if (comboTimerRef.current) clearTimeout(comboTimerRef.current);
  };

  const usePowerUp = (powerUpId: string) => {
    const powerUp = powerUps.find(p => p.id === powerUpId);
    if (!powerUp || powerUp.owned <= 0) return;

    // Activate power-up
    setActivePowerUps(prev => [...prev, powerUpId]);
    
    // Deduct from owned count
    dispatch({ type: 'BUY_POWERUP', powerUpId }); // This will decrease owned count

    // Deactivate after duration
    setTimeout(() => {
      setActivePowerUps(prev => prev.filter(id => id !== powerUpId));
    }, powerUp.duration);
  };

  const completeRound = () => {
    setGameRunning(false);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    
    dispatch({ type: 'END_GAME', score, coins });
    dispatch({ type: 'ADD_COINS', amount: coins });
    dispatch({ type: 'ADD_EXP', amount: score });
    dispatch({ type: 'NEXT_ROUND' });
    
    navigation.navigate('RoundComplete');
  };

  const handlePause = () => {
    setGameRunning(false);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    if (spawnTimerRef.current) clearInterval(spawnTimerRef.current);
    navigation.navigate('Pause');
  };

  const comboScale = comboAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.3],
  });

  return (
    <BackgroundImage style={styles.container}>
      {/* UI Elements */}
      <View style={styles.uiContainer}>
        <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
          <Text style={styles.pauseButtonText}>⏸️</Text>
        </TouchableOpacity>
        
        <View style={styles.infoContainer}>
          <View style={styles.infoPanel}>
            <Text style={styles.infoText}>ROUND: {gameState.currentRound}</Text>
          </View>
          <View style={styles.infoPanel}>
            <Text style={styles.infoText}>SCORE: {score}</Text>
          </View>
          <View style={styles.infoPanel}>
            <Text style={styles.infoText}>⏱️ {Math.ceil(timeRef.current)}s</Text>
          </View>
          <View style={styles.infoPanel}>
            <Text style={styles.infoText}>🪙 {coins}</Text>
          </View>
        </View>
      </View>

      {/* Combo Display */}
      {showCombo && combo > 1 && (
        <Animated.View 
          style={[
            styles.comboContainer,
            { transform: [{ scale: comboScale }] }
          ]}
        >
          <Text style={styles.comboText}>🔥 {combo}x COMBO!</Text>
        </Animated.View>
      )}

      {/* Power-ups Bar */}
      <View style={styles.powerUpsBar}>
        {powerUps.filter(p => p.owned > 0).slice(0, 3).map((powerUp) => (
          <TouchableOpacity
            key={powerUp.id}
            style={[
              styles.powerUpButton,
              activePowerUps.includes(powerUp.id) && styles.powerUpButtonActive,
            ]}
            onPress={() => usePowerUp(powerUp.id)}
            disabled={activePowerUps.includes(powerUp.id)}
          >
            <Text style={styles.powerUpIcon}>{powerUp.icon}</Text>
            <Text style={styles.powerUpCount}>{powerUp.owned}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Active Power-ups Display */}
      {activePowerUps.length > 0 && (
        <View style={styles.activePowerUpsContainer}>
          {activePowerUps.map((powerUpId) => {
            const powerUp = powerUps.find(p => p.id === powerUpId);
            return (
              <View key={powerUpId} style={styles.activePowerUpBadge}>
                <Text style={styles.activePowerUpText}>{powerUp?.icon} ACTIVE</Text>
              </View>
            );
          })}
        </View>
      )}

      {/* Gameplay Area */}
      <View style={styles.gameplayArea}>
        {/* Falling Artifacts */}
        {artifacts.map(artifact => (
          <TouchableWithoutFeedback
            key={artifact.id}
            onPress={() => handleArtifactTap(
              artifact.id, 
              artifact.points, 
              artifact.isCursed,
              artifact.isBonus
            )}
          >
            <View
              style={[
                styles.artifact,
                {
                  left: artifact.x,
                  top: artifact.y,
                },
                artifact.isCursed && styles.cursedArtifact,
                artifact.isBonus && styles.bonusArtifact,
                artifact.isSpecial && styles.specialArtifact,
              ]}
            >
              <Image
                source={ARTIFACT_IMAGES[artifact.imageIndex]}
                style={styles.artifactImage}
                resizeMode="contain"
              />
              {artifact.isCursed && <Text style={styles.artifactBadge}>💣</Text>}
              {artifact.isBonus && <Text style={styles.artifactBadge}>💎</Text>}
              {artifact.isSpecial && <Text style={styles.artifactBadge}>⭐</Text>}
            </View>
          </TouchableWithoutFeedback>
        ))}

        {/* Bottom Line */}
        <Image 
          source={require('../assets/img/92dc8f6c49b175e716ea5ad557b0d09c21b1d706.png')} 
          style={styles.bottomLine} 
        />
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
    gap: 5,
  },
  infoPanel: {
    backgroundColor: '#380082',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  infoText: {
    color: '#FFD700',
    fontSize: 10,
    fontWeight: 'bold',
  },
  comboContainer: {
    position: 'absolute',
    top: 120,
    alignSelf: 'center',
    zIndex: 20,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  comboText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  powerUpsBar: {
    position: 'absolute',
    top: 130,
    left: 20,
    flexDirection: 'column',
    gap: 10,
    zIndex: 15,
  },
  powerUpButton: {
    backgroundColor: '#380082',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerUpButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#8BC34A',
  },
  powerUpIcon: {
    fontSize: 28,
  },
  powerUpCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  activePowerUpsContainer: {
    position: 'absolute',
    top: 130,
    right: 20,
    zIndex: 15,
    gap: 8,
  },
  activePowerUpBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#8BC34A',
  },
  activePowerUpText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  gameplayArea: {
    flex: 1,
    position: 'relative',
    marginBottom: 120,
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
  cursedArtifact: {
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FF0000',
  },
  bonusArtifact: {
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#00FF00',
  },
  specialArtifact: {
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  artifactBadge: {
    position: 'absolute',
    top: -10,
    right: -10,
    fontSize: 20,
  },
  bottomLine: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    width: '100%',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
});
