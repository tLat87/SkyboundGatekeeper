import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { useGame } from '../contexts/GameContext';
import BackgroundImage from '../components/BackgroundImage';

const { width, height } = Dimensions.get('window');

type TabType = 'achievements' | 'quests';

export default function AchievementsScreen() {
  const { achievements, quests, dispatch } = useGame();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('quests');

  const handleItemPress = (item: any) => {
    if (item.unlocked || item.completed) {
      setSelectedItem(item);
      setShowPopup(true);
    }
  };

  const claimQuestReward = (questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (quest && quest.completed) {
      dispatch({ type: 'ADD_COINS', amount: quest.rewardCoins });
      dispatch({ type: 'ADD_EXP', amount: quest.rewardExp });
      setShowPopup(false);
    }
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const activeQuests = quests.filter(q => !q.completed);
  const completedQuests = quests.filter(q => q.completed);

  return (
    <BackgroundImage style={styles.container}>
      {/* Tab Switcher */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'quests' && styles.activeTab]}
          onPress={() => setActiveTab('quests')}
        >
          <Text style={[styles.tabText, activeTab === 'quests' && styles.activeTabText]}>
            📋 QUESTS
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'achievements' && styles.activeTab]}
          onPress={() => setActiveTab('achievements')}
        >
          <Text style={[styles.tabText, activeTab === 'achievements' && styles.activeTabText]}>
            🏆 ACHIEVEMENTS
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'quests' ? (
          <>
            {/* Active Quests */}
            {activeQuests.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>ACTIVE QUESTS</Text>
                {activeQuests.map((quest) => (
                  <View key={quest.id} style={styles.questCard}>
                    <View style={styles.questHeader}>
                      <View style={styles.questTypeBadge}>
                        <Text style={styles.questTypeText}>
                          {quest.type === 'daily' ? '📅 DAILY' : '📆 WEEKLY'}
                        </Text>
                      </View>
                    </View>
                    
                    <Text style={styles.questTitle}>{quest.title}</Text>
                    <Text style={styles.questDescription}>{quest.description}</Text>
                    
                    {/* Progress Bar */}
                    <View style={styles.progressContainer}>
                      <View style={styles.progressBar}>
                        <View 
                          style={[
                            styles.progressFill, 
                            { width: `${(quest.progress / quest.target) * 100}%` }
                          ]} 
                        />
                      </View>
                      <Text style={styles.progressText}>
                        {quest.progress} / {quest.target}
                      </Text>
                    </View>

                    {/* Rewards */}
                    <View style={styles.rewardsContainer}>
                      <View style={styles.rewardBadge}>
                        <Text style={styles.rewardText}>🪙 {quest.rewardCoins}</Text>
                      </View>
                      <View style={styles.rewardBadge}>
                        <Text style={styles.rewardText}>⭐ {quest.rewardExp} EXP</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Completed Quests */}
            {completedQuests.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>COMPLETED QUESTS</Text>
                {completedQuests.map((quest) => (
                  <TouchableOpacity
                    key={quest.id}
                    style={styles.completedQuestCard}
                    onPress={() => handleItemPress(quest)}
                  >
                    <Text style={styles.completedIcon}>✅</Text>
                    <View style={styles.completedInfo}>
                      <Text style={styles.completedTitle}>{quest.title}</Text>
                      <Text style={styles.completedReward}>
                        Claimed: 🪙 {quest.rewardCoins} + ⭐ {quest.rewardExp} EXP
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {activeQuests.length === 0 && completedQuests.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>NO QUESTS AVAILABLE</Text>
              </View>
            )}
          </>
        ) : (
          <>
            {/* Unlocked Achievements */}
            {unlockedAchievements.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>UNLOCKED</Text>
                {unlockedAchievements.map((achievement) => (
                  <TouchableOpacity
                    key={achievement.id}
                    style={styles.achievementCard}
                    onPress={() => handleItemPress(achievement)}
                  >
                    <Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
                    <View style={styles.achievementInfo}>
                      <Text style={styles.achievementTitle}>{achievement.title}</Text>
                      <Text style={styles.achievementRequirement}>
                        {achievement.requirement}
                      </Text>
                      {achievement.rewardCoins && (
                        <Text style={styles.achievementReward}>
                          🪙 {achievement.rewardCoins} COINS
                        </Text>
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Locked Achievements */}
            {lockedAchievements.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>LOCKED</Text>
                {lockedAchievements.map((achievement) => (
                  <View key={achievement.id} style={styles.lockedAchievementCard}>
                    <Text style={styles.lockedEmoji}>🔒</Text>
                    <View style={styles.achievementInfo}>
                      <Text style={styles.lockedTitle}>{achievement.title}</Text>
                      <Text style={styles.lockedRequirement}>
                        {achievement.requirement}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {unlockedAchievements.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>NO ACHIEVEMENTS UNLOCKED</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Detail Modal */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setShowPopup(false)}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.modalEmoji}>
              {selectedItem?.emoji || '✅'}
            </Text>
            <Text style={styles.modalTitle}>{selectedItem?.title}</Text>
            <Text style={styles.modalDescription}>
              {selectedItem?.description || selectedItem?.requirement}
            </Text>

            {selectedItem?.rewardCoins && (
              <View style={styles.modalRewards}>
                <Text style={styles.modalRewardText}>
                  🪙 {selectedItem.rewardCoins} COINS
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingTop: 60,
    marginBottom: 20,
    gap: 10,
  },
  tab: {
    flex: 1,
    backgroundColor: 'rgba(56, 0, 130, 0.6)',
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#FFD700',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#380082',
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  activeTabText: {
    color: '#FFD700',
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 140,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#380082',
    marginBottom: 15,
    textAlign: 'center',
  },
  questCard: {
    backgroundColor: '#380082',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    padding: 20,
    marginBottom: 15,
  },
  questHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  questTypeBADGE: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  questTypeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  questTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
  },
  questDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  progressText: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  rewardsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
  },
  rewardBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 12,
  },
  rewardText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  completedQuestCard: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#8BC34A',
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  completedInfo: {
    flex: 1,
  },
  completedTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  completedReward: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  achievementCard: {
    backgroundColor: '#380082',
    padding: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  achievementEmoji: {
    fontSize: 50,
    marginRight: 20,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  achievementRequirement: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 5,
  },
  achievementReward: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  lockedAchievementCard: {
    backgroundColor: '#666666',
    padding: 20,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#999999',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  lockedEmoji: {
    fontSize: 40,
    marginRight: 20,
  },
  lockedTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CCCCCC',
    marginBottom: 5,
  },
  lockedRequirement: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  emptyContainer: {
    backgroundColor: '#380082',
    padding: 40,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#380082',
    padding: 30,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#FFD700',
    alignItems: 'center',
    marginHorizontal: 20,
    maxWidth: width - 40,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  modalRewards: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  modalRewardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  questTypeBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
});
