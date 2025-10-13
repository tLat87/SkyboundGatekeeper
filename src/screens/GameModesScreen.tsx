import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useGame } from '../contexts/GameContext';
import BackgroundImage from '../components/BackgroundImage';

type GameModesNavigationProp = StackNavigationProp<RootStackParamList, 'GameModes'>;

export default function GameModesScreen() {
  const navigation = useNavigation<GameModesNavigationProp>();
  const { gameModes, playerProfile, dispatch } = useGame();

  const handleSelectMode = (modeId: string) => {
    const mode = gameModes.find(m => m.id === modeId);
    if (!mode) return;

    if (!mode.unlocked) {
      Alert.alert(
        'MODE LOCKED',
        `YOU NEED TO REACH LEVEL ${mode.requiredLevel} TO UNLOCK THIS MODE!`
      );
      return;
    }

    dispatch({ type: 'SET_GAME_MODE', modeId });
    navigation.navigate('GameRules');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'normal': return '#2196F3';
      case 'hard': return '#FF9800';
      case 'extreme': return '#F44336';
      default: return '#666666';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '😊';
      case 'normal': return '😐';
      case 'hard': return '😤';
      case 'extreme': return '😡';
      default: return '🤔';
    }
  };

  const getRewardMultiplierColor = (multiplier: number) => {
    if (multiplier >= 2) return '#FFD700';
    if (multiplier >= 1.5) return '#FF9800';
    if (multiplier >= 1) return '#4CAF50';
    return '#666666';
  };

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>GAME MODES</Text>
          <View style={styles.modeStats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{gameModes.filter(m => m.unlocked).length}</Text>
              <Text style={styles.statLabel}>UNLOCKED</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{playerProfile.level}</Text>
              <Text style={styles.statLabel}>YOUR LEVEL</Text>
            </View>
          </View>
        </View>

        {/* Game Modes Grid */}
        <View style={styles.modesGrid}>
          {gameModes.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={[
                styles.modeCard,
                !mode.unlocked && styles.lockedModeCard,
              ]}
              onPress={() => handleSelectMode(mode.id)}
              disabled={!mode.unlocked}
            >
              {/* Mode Header */}
              <View style={styles.modeHeader}>
                <View style={styles.modeIconContainer}>
                  <Text style={styles.modeIcon}>{mode.icon}</Text>
                  {!mode.unlocked && (
                    <View style={styles.lockOverlay}>
                      <Text style={styles.lockIcon}>🔒</Text>
                    </View>
                  )}
                </View>
                
                <View style={styles.modeInfo}>
                  <Text style={[
                    styles.modeName,
                    !mode.unlocked && styles.lockedText
                  ]}>
                    {mode.name}
                  </Text>
                  
                  <View style={styles.difficultyContainer}>
                    <View style={[
                      styles.difficultyBadge,
                      { backgroundColor: getDifficultyColor(mode.difficulty) }
                    ]}>
                      <Text style={styles.difficultyIcon}>
                        {getDifficultyIcon(mode.difficulty)}
                      </Text>
                      <Text style={styles.difficultyText}>
                        {mode.difficulty.toUpperCase()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Mode Description */}
              <Text style={[
                styles.modeDescription,
                !mode.unlocked && styles.lockedText
              ]}>
                {mode.description}
              </Text>

              {/* Special Rules */}
              <View style={styles.rulesContainer}>
                <Text style={styles.rulesTitle}>SPECIAL RULES:</Text>
                {mode.specialRules.map((rule, index) => (
                  <Text key={index} style={[
                    styles.ruleText,
                    !mode.unlocked && styles.lockedText
                  ]}>
                    • {rule}
                  </Text>
                ))}
              </View>

              {/* Rewards */}
              <View style={styles.rewardsContainer}>
                <Text style={styles.rewardsTitle}>REWARDS:</Text>
                <View style={styles.rewardMultipliers}>
                  <View style={styles.rewardItem}>
                    <Text style={styles.rewardIcon}>🪙</Text>
                    <Text style={[
                      styles.rewardText,
                      { color: getRewardMultiplierColor(mode.rewards.coinsMultiplier) }
                    ]}>
                      {mode.rewards.coinsMultiplier}x COINS
                    </Text>
                  </View>
                  <View style={styles.rewardItem}>
                    <Text style={styles.rewardIcon}>⭐</Text>
                    <Text style={[
                      styles.rewardText,
                      { color: getRewardMultiplierColor(mode.rewards.expMultiplier) }
                    ]}>
                      {mode.rewards.expMultiplier}x EXP
                    </Text>
                  </View>
                </View>
              </View>

              {/* Time Limit */}
              <View style={styles.timeLimitContainer}>
                <Text style={styles.timeLimitIcon}>⏱️</Text>
                <Text style={[
                  styles.timeLimitText,
                  !mode.unlocked && styles.lockedText
                ]}>
                  {mode.timeLimit === 0 ? 'NO TIME LIMIT' : `${mode.timeLimit} SECONDS`}
                </Text>
              </View>

              {/* Unlock Requirement */}
              {!mode.unlocked && mode.requiredLevel && (
                <View style={styles.unlockRequirement}>
                  <Text style={styles.unlockText}>
                    UNLOCK AT LEVEL {mode.requiredLevel}
                  </Text>
                </View>
              )}

              {/* Play Button */}
              {mode.unlocked && (
                <TouchableOpacity style={styles.playButton}>
                  <Text style={styles.playButtonText}>PLAY NOW</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Mode Comparison */}
        <View style={styles.comparisonSection}>
          <Text style={styles.comparisonTitle}>MODE COMPARISON</Text>
          
          <View style={styles.comparisonTable}>
            <View style={styles.comparisonHeader}>
              <Text style={styles.comparisonHeaderText}>MODE</Text>
              <Text style={styles.comparisonHeaderText}>DIFFICULTY</Text>
              <Text style={styles.comparisonHeaderText}>COINS</Text>
              <Text style={styles.comparisonHeaderText}>EXP</Text>
            </View>
            
            {gameModes.map((mode) => (
              <View key={mode.id} style={styles.comparisonRow}>
                <Text style={[
                  styles.comparisonCell,
                  !mode.unlocked && styles.lockedText
                ]}>
                  {mode.name}
                </Text>
                <Text style={[
                  styles.comparisonCell,
                  { color: getDifficultyColor(mode.difficulty) }
                ]}>
                  {mode.difficulty}
                </Text>
                <Text style={[
                  styles.comparisonCell,
                  { color: getRewardMultiplierColor(mode.rewards.coinsMultiplier) }
                ]}>
                  {mode.rewards.coinsMultiplier}x
                </Text>
                <Text style={[
                  styles.comparisonCell,
                  { color: getRewardMultiplierColor(mode.rewards.expMultiplier) }
                ]}>
                  {mode.rewards.expMultiplier}x
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Tips Section */}
        <View style={styles.tipsSection}>
          <Text style={styles.tipsTitle}>💡 MODE TIPS</Text>
          <Text style={styles.tipsText}>• START WITH CLASSIC MODE TO LEARN THE BASICS</Text>
          <Text style={styles.tipsText}>• SPEED MODE IS GREAT FOR QUICK COINS</Text>
          <Text style={styles.tipsText}>• ENDLESS MODE TESTS YOUR ENDURANCE</Text>
          <Text style={styles.tipsText}>• ZEN MODE IS PERFECT FOR RELAXING GAMEPLAY</Text>
          <Text style={styles.tipsText}>• HIGHER DIFFICULTY = BETTER REWARDS</Text>
        </View>
      </ScrollView>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 140,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#380082',
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginBottom: 20,
  },
  modeStats: {
    flexDirection: 'row',
    gap: 20,
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#380082',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    minWidth: 120,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modesGrid: {
    gap: 20,
    marginBottom: 30,
  },
  modeCard: {
    backgroundColor: '#380082',
    borderRadius: 20,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  lockedModeCard: {
    opacity: 0.6,
    borderColor: '#666666',
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  modeIconContainer: {
    position: 'relative',
    marginRight: 15,
  },
  modeIcon: {
    fontSize: 50,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 24,
  },
  modeInfo: {
    flex: 1,
  },
  modeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  lockedText: {
    color: '#666666',
  },
  difficultyContainer: {
    flexDirection: 'row',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  difficultyIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  modeDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 15,
    lineHeight: 20,
  },
  rulesContainer: {
    marginBottom: 15,
  },
  rulesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  ruleText: {
    fontSize: 12,
    color: '#FFFFFF',
    marginBottom: 4,
    lineHeight: 16,
  },
  rewardsContainer: {
    marginBottom: 15,
  },
  rewardsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  rewardMultipliers: {
    flexDirection: 'row',
    gap: 20,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  timeLimitContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  timeLimitIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  timeLimitText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  unlockRequirement: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F44336',
  },
  unlockText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#F44336',
    textAlign: 'center',
  },
  playButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  playButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#380082',
  },
  comparisonSection: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  comparisonTable: {
    gap: 5,
  },
  comparisonHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 8,
  },
  comparisonHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  comparisonRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  comparisonCell: {
    flex: 1,
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  tipsSection: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  tipsText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 20,
  },
});
