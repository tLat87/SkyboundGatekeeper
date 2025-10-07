import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useGame } from '../contexts/GameContext';
import BackgroundImage from '../components/BackgroundImage';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const { playerProfile, leaderboard } = useGame();

  const expPercentage = (playerProfile.experience / playerProfile.expToNextLevel) * 100;

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarEmoji}>👑</Text>
          </View>
          <Text style={styles.playerName}>GUARDIAN</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>LEVEL {playerProfile.level}</Text>
          </View>
        </View>

        {/* Experience Bar */}
        <View style={styles.expSection}>
          <Text style={styles.expLabel}>EXPERIENCE</Text>
          <View style={styles.expBarContainer}>
            <View style={[styles.expBarFill, { width: `${expPercentage}%` }]} />
            <Text style={styles.expText}>
              {playerProfile.experience} / {playerProfile.expToNextLevel}
            </Text>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🪙</Text>
            <Text style={styles.statValue}>{playerProfile.totalCoins}</Text>
            <Text style={styles.statLabel}>COINS</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🏆</Text>
            <Text style={styles.statValue}>{playerProfile.highScore}</Text>
            <Text style={styles.statLabel}>HIGH SCORE</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🎮</Text>
            <Text style={styles.statValue}>{playerProfile.gamesPlayed}</Text>
            <Text style={styles.statLabel}>GAMES</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📦</Text>
            <Text style={styles.statValue}>{playerProfile.artifactsCollected}</Text>
            <Text style={styles.statLabel}>ARTIFACTS</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💯</Text>
            <Text style={styles.statValue}>{playerProfile.totalScore}</Text>
            <Text style={styles.statLabel}>TOTAL SCORE</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>{playerProfile.longestStreak}</Text>
            <Text style={styles.statLabel}>BEST STREAK</Text>
          </View>
        </View>

        {/* Leaderboard Section */}
        <View style={styles.leaderboardSection}>
          <Text style={styles.sectionTitle}>🏆 LEADERBOARD</Text>
          {leaderboard.slice(0, 5).map((entry, index) => (
            <View key={entry.id} style={styles.leaderboardEntry}>
              <View style={styles.rankBadge}>
                <Text style={styles.rankText}>#{index + 1}</Text>
              </View>
              <View style={styles.leaderboardInfo}>
                <Text style={styles.leaderboardName}>{entry.playerName}</Text>
                <Text style={styles.leaderboardScore}>
                  {entry.score} pts • Round {entry.round}
                </Text>
              </View>
              {index === 0 && <Text style={styles.crownEmoji}>👑</Text>}
              {index === 1 && <Text style={styles.medalEmoji}>🥈</Text>}
              {index === 2 && <Text style={styles.medalEmoji}>🥉</Text>}
            </View>
          ))}
        </View>

        {/* Achievement Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>📊 PROGRESS</Text>
          <View style={styles.progressCard}>
            <Text style={styles.progressLabel}>LEVEL PROGRESS</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${expPercentage}%` }]} />
            </View>
            <Text style={styles.progressText}>{expPercentage.toFixed(0)}%</Text>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#380082',
    borderWidth: 5,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarEmoji: {
    fontSize: 50,
  },
  playerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#380082',
    marginBottom: 10,
  },
  levelBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#380082',
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#380082',
  },
  expSection: {
    marginBottom: 30,
  },
  expLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#380082',
    marginBottom: 10,
    textAlign: 'center',
  },
  expBarContainer: {
    height: 40,
    backgroundColor: '#380082',
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  expBarFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFD700',
    borderRadius: 17,
  },
  expText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    zIndex: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#380082',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  statIcon: {
    fontSize: 40,
    marginBottom: 10,
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
  leaderboardSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#380082',
    marginBottom: 15,
    textAlign: 'center',
  },
  leaderboardEntry: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#380082',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#FFD700',
    padding: 15,
    marginBottom: 10,
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#380082',
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 3,
  },
  leaderboardScore: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  crownEmoji: {
    fontSize: 30,
  },
  medalEmoji: {
    fontSize: 24,
  },
  progressSection: {
    marginBottom: 20,
  },
  progressCard: {
    backgroundColor: '#380082',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    padding: 20,
  },
  progressLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
    textAlign: 'center',
  },
  progressBar: {
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
});


