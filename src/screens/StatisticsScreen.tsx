import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import { useGame } from '../contexts/GameContext';
import BackgroundImage from '../components/BackgroundImage';

export default function StatisticsScreen() {
  const { playerProfile } = useGame();

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getStatIcon = (statName: string) => {
    switch (statName) {
      case 'totalRoundsCompleted': return '🎯';
      case 'totalArtifactsCaught': return '📦';
      case 'totalCursedArtifactsAvoided': return '💣';
      case 'totalPowerUpsUsed': return '⚡';
      case 'totalComboReached': return '🔥';
      case 'averageScore': return '📊';
      case 'bestCombo': return '🏆';
      case 'perfectRounds': return '⭐';
      case 'fastestRound': return '⚡';
      case 'longestPlaySession': return '⏰';
      case 'favoriteArtifact': return '💎';
      case 'mostUsedPowerUp': return '🛡️';
      default: return '📈';
    }
  };

  const getStatLabel = (statName: string) => {
    switch (statName) {
      case 'totalRoundsCompleted': return 'ROUNDS COMPLETED';
      case 'totalArtifactsCaught': return 'ARTIFACTS CAUGHT';
      case 'totalCursedArtifactsAvoided': return 'CURSED AVOIDED';
      case 'totalPowerUpsUsed': return 'POWER-UPS USED';
      case 'totalComboReached': return 'MAX COMBO';
      case 'averageScore': return 'AVERAGE SCORE';
      case 'bestCombo': return 'BEST COMBO';
      case 'perfectRounds': return 'PERFECT ROUNDS';
      case 'fastestRound': return 'FASTEST ROUND';
      case 'longestPlaySession': return 'LONGEST SESSION';
      case 'favoriteArtifact': return 'FAVORITE ARTIFACT';
      case 'mostUsedPowerUp': return 'MOST USED POWER-UP';
      default: return statName.toUpperCase();
    }
  };

  const formatStatValue = (statName: string, value: any) => {
    switch (statName) {
      case 'averageScore':
        return Math.round(value).toLocaleString();
      case 'fastestRound':
        return `${value}s`;
      case 'longestPlaySession':
        return formatTime(value);
      case 'favoriteArtifact':
        return value.toUpperCase();
      case 'mostUsedPowerUp':
        return value.toUpperCase();
      default:
        return typeof value === 'number' ? value.toLocaleString() : value;
    }
  };

  const stats = Object.entries(playerProfile.statistics);

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>STATISTICS</Text>
          <View style={styles.playerInfo}>
            <Text style={styles.playerAvatar}>{playerProfile.avatar}</Text>
            <View style={styles.playerDetails}>
              <Text style={styles.playerName}>{playerProfile.playerName}</Text>
              <Text style={styles.playerTitle}>{playerProfile.title}</Text>
              <Text style={styles.playerLevel}>LEVEL {playerProfile.level}</Text>
            </View>
          </View>
        </View>

        {/* Overall Stats */}
        <View style={styles.overallStats}>
          <Text style={styles.sectionTitle}>OVERALL STATS</Text>
          
          <View style={styles.overallGrid}>
            <View style={styles.overallCard}>
              <Text style={styles.overallIcon}>🎮</Text>
              <Text style={styles.overallValue}>{playerProfile.gamesPlayed}</Text>
              <Text style={styles.overallLabel}>GAMES PLAYED</Text>
            </View>
            
            <View style={styles.overallCard}>
              <Text style={styles.overallIcon}>🏆</Text>
              <Text style={styles.overallValue}>{playerProfile.highScore.toLocaleString()}</Text>
              <Text style={styles.overallLabel}>HIGH SCORE</Text>
            </View>
            
            <View style={styles.overallCard}>
              <Text style={styles.overallIcon}>🪙</Text>
              <Text style={styles.overallValue}>{playerProfile.totalCoins.toLocaleString()}</Text>
              <Text style={styles.overallLabel}>TOTAL COINS</Text>
            </View>
            
            <View style={styles.overallCard}>
              <Text style={styles.overallIcon}>⏰</Text>
              <Text style={styles.overallValue}>{formatTime(playerProfile.totalPlayTime)}</Text>
              <Text style={styles.overallLabel}>PLAY TIME</Text>
            </View>
          </View>
        </View>

        {/* Detailed Statistics */}
        <View style={styles.detailedStats}>
          <Text style={styles.sectionTitle}>DETAILED STATISTICS</Text>
          
          <View style={styles.statsGrid}>
            {stats.map(([statName, value]) => (
              <View key={statName} style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Text style={styles.statIcon}>{getStatIcon(statName)}</Text>
                  <Text style={styles.statLabel}>{getStatLabel(statName)}</Text>
                </View>
                <Text style={styles.statValue}>
                  {formatStatValue(statName, value)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements Summary */}
        <View style={styles.achievementsSummary}>
          <Text style={styles.sectionTitle}>ACHIEVEMENTS</Text>
          
          <View style={styles.achievementGrid}>
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>🏅</Text>
              <Text style={styles.achievementValue}>{playerProfile.achievementsUnlocked}</Text>
              <Text style={styles.achievementLabel}>UNLOCKED</Text>
            </View>
            
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>📋</Text>
              <Text style={styles.achievementValue}>{playerProfile.questsCompleted}</Text>
              <Text style={styles.achievementLabel}>QUESTS DONE</Text>
            </View>
            
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>👥</Text>
              <Text style={styles.achievementValue}>{playerProfile.friendsCount}</Text>
              <Text style={styles.achievementLabel}>FRIENDS</Text>
            </View>
            
            <View style={styles.achievementCard}>
              <Text style={styles.achievementIcon}>🔥</Text>
              <Text style={styles.achievementValue}>{playerProfile.longestStreak}</Text>
              <Text style={styles.achievementLabel}>BEST STREAK</Text>
            </View>
          </View>
        </View>

        {/* Progress Bars */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>PROGRESS</Text>
          
          <View style={styles.progressCard}>
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>LEVEL PROGRESS</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(playerProfile.experience / playerProfile.expToNextLevel) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {playerProfile.experience}/{playerProfile.expToNextLevel} EXP
              </Text>
            </View>
            
            <View style={styles.progressItem}>
              <Text style={styles.progressLabel}>SEASONAL PROGRESS</Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(playerProfile.seasonalExp / 100) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {playerProfile.seasonalExp}/100 SEASON EXP
              </Text>
            </View>
          </View>
        </View>

        {/* Fun Facts */}
        <View style={styles.funFacts}>
          <Text style={styles.sectionTitle}>FUN FACTS</Text>
          
          <View style={styles.factCard}>
            <Text style={styles.factIcon}>🎯</Text>
            <Text style={styles.factText}>
              YOU'VE CAUGHT {playerProfile.statistics.totalArtifactsCaught.toLocaleString()} ARTIFACTS!
            </Text>
          </View>
          
          <View style={styles.factCard}>
            <Text style={styles.factIcon}>⚡</Text>
            <Text style={styles.factText}>
              YOUR FAVORITE POWER-UP IS {playerProfile.statistics.mostUsedPowerUp.toUpperCase()}!
            </Text>
          </View>
          
          <View style={styles.factCard}>
            <Text style={styles.factIcon}>💎</Text>
            <Text style={styles.factText}>
              YOU LOVE COLLECTING {playerProfile.statistics.favoriteArtifact.toUpperCase()}S!
            </Text>
          </View>
          
          <View style={styles.factCard}>
            <Text style={styles.factIcon}>⭐</Text>
            <Text style={styles.factText}>
              YOU'VE HAD {playerProfile.statistics.perfectRounds} PERFECT ROUNDS!
            </Text>
          </View>
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
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#380082',
    padding: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  playerAvatar: {
    fontSize: 50,
    marginRight: 15,
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  playerTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  playerLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  overallStats: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#380082',
    marginBottom: 15,
    textAlign: 'center',
  },
  overallGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  overallCard: {
    width: '48%',
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  overallIcon: {
    fontSize: 30,
    marginBottom: 10,
  },
  overallValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  overallLabel: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  detailedStats: {
    marginBottom: 30,
  },
  statsGrid: {
    gap: 15,
  },
  statCard: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'right',
  },
  achievementsSummary: {
    marginBottom: 30,
  },
  achievementGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  achievementIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  achievementValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  achievementLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  progressSection: {
    marginBottom: 30,
  },
  progressCard: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  progressItem: {
    marginBottom: 20,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  funFacts: {
    marginBottom: 30,
  },
  factCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  factIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  factText: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 20,
  },
});
