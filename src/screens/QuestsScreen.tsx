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

export default function QuestsScreen() {
  const { quests, playerProfile, dispatch } = useGame();

  const handleClaimQuest = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && quest.progress >= quest.target && !quest.completed) {
      dispatch({ type: 'COMPLETE_QUEST', questId });
      dispatch({ type: 'ADD_COINS', amount: quest.rewardCoins });
      dispatch({ type: 'ADD_EXP', amount: quest.rewardExp });
      Alert.alert('QUEST COMPLETED!', `EARNED ${quest.rewardCoins} COINS AND ${quest.rewardExp} EXP!`);
    }
  };

  const getQuestTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return '#4CAF50';
      case 'weekly': return '#2196F3';
      case 'special': return '#FF9800';
      case 'seasonal': return '#9C27B0';
      case 'event': return '#F44336';
      default: return '#666666';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'hard': return '#F44336';
      default: return '#666666';
    }
  };

  const getQuestTypeIcon = (type: string) => {
    switch (type) {
      case 'daily': return '📅';
      case 'weekly': return '📆';
      case 'special': return '⭐';
      case 'seasonal': return '🌸';
      case 'event': return '🎉';
      default: return '📋';
    }
  };

  const groupedQuests = quests.reduce((acc, quest) => {
    if (!acc[quest.type]) {
      acc[quest.type] = [];
    }
    acc[quest.type].push(quest);
    return acc;
  }, {} as Record<string, typeof quests>);

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>QUESTS</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{playerProfile.questsCompleted}</Text>
              <Text style={styles.statLabel}>COMPLETED</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{quests.filter(q => !q.completed).length}</Text>
              <Text style={styles.statLabel}>ACTIVE</Text>
            </View>
          </View>
        </View>

        {/* Quest Categories */}
        {Object.entries(groupedQuests).map(([type, typeQuests]) => (
          <View key={type} style={styles.questCategory}>
            <View style={styles.categoryHeader}>
              <Text style={styles.categoryIcon}>{getQuestTypeIcon(type)}</Text>
              <Text style={styles.categoryTitle}>{type.toUpperCase()} QUESTS</Text>
              <View style={[styles.categoryBadge, { backgroundColor: getQuestTypeColor(type) }]}>
                <Text style={styles.categoryBadgeText}>{typeQuests.length}</Text>
              </View>
            </View>

            {typeQuests.map((quest) => (
              <View key={quest.id} style={styles.questCard}>
                <View style={styles.questHeader}>
                  <View style={styles.questTitleContainer}>
                    <Text style={styles.questTitle}>{quest.title}</Text>
                    <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor(quest.difficulty) }]}>
                      <Text style={styles.difficultyText}>{quest.difficulty.toUpperCase()}</Text>
                    </View>
                  </View>
                  {quest.completed && (
                    <View style={styles.completedBadge}>
                      <Text style={styles.completedText}>✓ COMPLETED</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.questDescription}>{quest.description}</Text>

                <View style={styles.questProgress}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${Math.min((quest.progress / quest.target) * 100, 100)}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {quest.progress}/{quest.target}
                  </Text>
                </View>

                <View style={styles.questRewards}>
                  <View style={styles.rewardItem}>
                    <Text style={styles.rewardIcon}>🪙</Text>
                    <Text style={styles.rewardText}>{quest.rewardCoins}</Text>
                  </View>
                  <View style={styles.rewardItem}>
                    <Text style={styles.rewardIcon}>⭐</Text>
                    <Text style={styles.rewardText}>{quest.rewardExp} EXP</Text>
                  </View>
                </View>

                {quest.progress >= quest.target && !quest.completed && (
                  <TouchableOpacity
                    style={styles.claimButton}
                    onPress={() => handleClaimQuest(quest.id)}
                  >
                    <Text style={styles.claimButtonText}>CLAIM REWARD</Text>
                  </TouchableOpacity>
                )}

                {quest.expiresAt && (
                  <Text style={styles.expiryText}>
                    EXPIRES: {quest.expiresAt.toLocaleDateString()}
                  </Text>
                )}
              </View>
            ))}
          </View>
        ))}

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 QUEST TIPS</Text>
          <Text style={styles.infoText}>• DAILY QUESTS RESET EVERY 24 HOURS</Text>
          <Text style={styles.infoText}>• WEEKLY QUESTS RESET EVERY MONDAY</Text>
          <Text style={styles.infoText}>• SPECIAL QUESTS ARE LIMITED TIME ONLY</Text>
          <Text style={styles.infoText}>• COMPLETE QUESTS TO EARN COINS AND EXP</Text>
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
  statsContainer: {
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
    minWidth: 100,
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
  questCategory: {
    marginBottom: 25,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#380082',
    flex: 1,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  questCard: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  questTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  completedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  completedText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  questDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 15,
    lineHeight: 20,
  },
  questProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    minWidth: 60,
    textAlign: 'right',
  },
  questRewards: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 15,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  rewardIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  claimButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  claimButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#380082',
  },
  expiryText: {
    fontSize: 12,
    color: '#FF6B6B',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  infoSection: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
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
