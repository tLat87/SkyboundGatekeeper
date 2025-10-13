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
import { useGame } from '../contexts/GameContext';
import BackgroundImage from '../components/BackgroundImage';

export default function SeasonsScreen() {
  const { seasons, playerProfile, dispatch } = useGame();

  const handleClaimReward = (rewardId: string) => {
    dispatch({ type: 'CLAIM_SEASON_REWARD', rewardId });
    Alert.alert('REWARD CLAIMED!', 'SEASON REWARD HAS BEEN ADDED TO YOUR INVENTORY!');
  };

  const getSeasonThemeColor = (theme: string) => {
    switch (theme) {
      case 'spring': return '#4CAF50';
      case 'summer': return '#FF9800';
      case 'autumn': return '#FF5722';
      case 'winter': return '#2196F3';
      default: return '#9C27B0';
    }
  };

  const getSeasonIcon = (theme: string) => {
    switch (theme) {
      case 'spring': return '🌸';
      case 'summer': return '☀️';
      case 'autumn': return '🍂';
      case 'winter': return '❄️';
      default: return '🌟';
    }
  };

  const getRewardTypeIcon = (type: string) => {
    switch (type) {
      case 'coins': return '🪙';
      case 'powerup': return '⚡';
      case 'artifact': return '💎';
      case 'title': return '👑';
      default: return '🎁';
    }
  };

  const getRewardTypeColor = (type: string) => {
    switch (type) {
      case 'coins': return '#FFD700';
      case 'powerup': return '#4CAF50';
      case 'artifact': return '#9C27B0';
      case 'title': return '#FF9800';
      default: return '#666666';
    }
  };

  const formatTimeRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    
    if (diff <= 0) return 'EXPIRED';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) {
      return `${days}D ${hours}H LEFT`;
    } else {
      return `${hours}H LEFT`;
    }
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
          <Text style={styles.headerTitle}>SEASONS</Text>
          <View style={styles.seasonStats}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{playerProfile.seasonalLevel}</Text>
              <Text style={styles.statLabel}>SEASON LEVEL</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{playerProfile.seasonalExp}</Text>
              <Text style={styles.statLabel}>SEASON EXP</Text>
            </View>
          </View>
        </View>

        {/* Current Season */}
        {seasons.filter(season => season.isActive).map((season) => (
          <View key={season.id} style={styles.seasonContainer}>
            {/* Season Header */}
            <View style={[styles.seasonHeader, { backgroundColor: getSeasonThemeColor(season.theme) }]}>
              <View style={styles.seasonInfo}>
                <Text style={styles.seasonIcon}>{getSeasonIcon(season.theme)}</Text>
                <View style={styles.seasonDetails}>
                  <Text style={styles.seasonName}>{season.name}</Text>
                  <Text style={styles.seasonDescription}>{season.description}</Text>
                </View>
              </View>
              <View style={styles.seasonTime}>
                <Text style={styles.timeText}>{formatTimeRemaining(season.endDate)}</Text>
              </View>
            </View>

            {/* Season Progress */}
            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>SEASON PROGRESS</Text>
                <Text style={styles.progressLevel}>LEVEL {season.level}/{season.maxLevel}</Text>
              </View>
              
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${(season.experience / (season.level * 100)) * 100}%`,
                      backgroundColor: getSeasonThemeColor(season.theme),
                    }
                  ]} 
                />
              </View>
              
              <Text style={styles.progressText}>
                {season.experience}/{(season.level * 100)} EXP
              </Text>
            </View>

            {/* Season Rewards */}
            <View style={styles.rewardsSection}>
              <Text style={styles.rewardsTitle}>SEASON REWARDS</Text>
              
              <View style={styles.rewardsGrid}>
                {season.rewards.map((reward) => (
                  <View key={reward.id} style={styles.rewardCard}>
                    <View style={styles.rewardHeader}>
                      <Text style={styles.rewardLevel}>LVL {reward.level}</Text>
                      {reward.claimed && (
                        <View style={styles.claimedBadge}>
                          <Text style={styles.claimedText}>✓</Text>
                        </View>
                      )}
                    </View>
                    
                    <View style={[styles.rewardIcon, { backgroundColor: getRewardTypeColor(reward.type) }]}>
                      <Text style={styles.rewardIconText}>{getRewardTypeIcon(reward.type)}</Text>
                    </View>
                    
                    <Text style={styles.rewardName}>{reward.name}</Text>
                    <Text style={styles.rewardDescription}>{reward.description}</Text>
                    
                    {reward.type === 'coins' && (
                      <Text style={styles.rewardValue}>+{reward.value} COINS</Text>
                    )}
                    
                    {reward.type === 'powerup' && (
                      <Text style={styles.rewardValue}>+{reward.value} POWER-UP</Text>
                    )}
                    
                    {season.level >= reward.level && !reward.claimed && (
                      <TouchableOpacity
                        style={[styles.claimButton, { backgroundColor: getSeasonThemeColor(season.theme) }]}
                        onPress={() => handleClaimReward(reward.id)}
                      >
                        <Text style={styles.claimButtonText}>CLAIM</Text>
                      </TouchableOpacity>
                    )}
                    
                    {season.level < reward.level && (
                      <View style={styles.lockedReward}>
                        <Text style={styles.lockedText}>LOCKED</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}

        {/* Upcoming Seasons */}
        <View style={styles.upcomingSection}>
          <Text style={styles.upcomingTitle}>UPCOMING SEASONS</Text>
          
          <View style={styles.upcomingCard}>
            <Text style={styles.upcomingIcon}>🌞</Text>
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingName}>SUMMER OF LEGENDS</Text>
              <Text style={styles.upcomingDescription}>NEW ARTIFACTS AND CHALLENGES AWAIT!</Text>
              <Text style={styles.upcomingDate}>COMING SOON</Text>
            </View>
          </View>
          
          <View style={styles.upcomingCard}>
            <Text style={styles.upcomingIcon}>🍂</Text>
            <View style={styles.upcomingInfo}>
              <Text style={styles.upcomingName}>AUTUMN HARVEST</Text>
              <Text style={styles.upcomingDescription}>COLLECT RARE AUTUMN ARTIFACTS!</Text>
              <Text style={styles.upcomingDate}>COMING SOON</Text>
            </View>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 SEASON INFO</Text>
          <Text style={styles.infoText}>• EARN SEASON EXP BY PLAYING GAMES</Text>
          <Text style={styles.infoText}>• LEVEL UP TO UNLOCK EXCLUSIVE REWARDS</Text>
          <Text style={styles.infoText}>• SEASONS LAST FOR 90 DAYS</Text>
          <Text style={styles.infoText}>• CLAIM REWARDS BEFORE SEASON ENDS</Text>
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
  seasonStats: {
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
  seasonContainer: {
    marginBottom: 30,
  },
  seasonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  seasonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  seasonIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  seasonDetails: {
    flex: 1,
  },
  seasonName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  seasonDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  seasonTime: {
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressSection: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  progressLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  rewardsSection: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  rewardsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  rewardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  rewardCard: {
    width: '48%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  rewardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  rewardLevel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  claimedBadge: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  claimedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rewardIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  rewardIconText: {
    fontSize: 24,
  },
  rewardName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  rewardDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    opacity: 0.8,
  },
  rewardValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 10,
  },
  claimButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
  },
  claimButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lockedReward: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
  },
  lockedText: {
    color: '#666666',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  upcomingSection: {
    marginBottom: 30,
  },
  upcomingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#380082',
    marginBottom: 15,
    textAlign: 'center',
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  upcomingIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  upcomingDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  upcomingDate: {
    fontSize: 12,
    color: '#FFD700',
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 20,
  },
});
