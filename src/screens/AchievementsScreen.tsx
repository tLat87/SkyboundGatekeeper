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

export default function AchievementsScreen() {
  const { achievements } = useGame();
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleAchievementPress = (achievement: any) => {
    if (achievement.unlocked) {
      setSelectedAchievement(achievement);
      setShowPopup(true);
    }
  };

  const handleShare = () => {
    // Share functionality would go here
    console.log('Share achievement');
    setShowPopup(false);
  };

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);

  return (
    <BackgroundImage style={styles.container}>
      {/* Main Content */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* Title */}
        <Image source={require('../assets/img/heder/2.png')} style={{alignSelf: 'center', marginBottom: 20}} />


        {/* Achievements List */}
        {unlockedAchievements.length === 0 ? (
          <View style={styles.noAchievementsContainer}>
            <Text style={styles.noAchievementsText}>NO ACHIEVEMENTS RECEIVED</Text>
          </View>
        ) : (
          <View style={styles.achievementsList}>
            {unlockedAchievements.map((achievement) => (
              <TouchableOpacity
                key={achievement.id}
                style={styles.achievementCard}
                onPress={() => handleAchievementPress(achievement)}
              >
                <Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementRequirement}>REQUIREMENT: {achievement.requirement}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Locked Achievements */}
        {lockedAchievements.length > 0 && (
          <View style={styles.lockedSection}>
            <Text style={styles.lockedSectionTitle}>LOCKED ACHIEVEMENTS</Text>
            {lockedAchievements.map((achievement) => (
              <View key={achievement.id} style={styles.lockedAchievementCard}>
                <Text style={styles.lockedEmoji}>🔒</Text>
                <View style={styles.achievementInfo}>
                  <Text style={styles.lockedTitle}>{achievement.title}</Text>
                  <Text style={styles.lockedRequirement}>REQUIREMENT: {achievement.requirement}</Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Achievement Popup */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupContainer}>
            <Text style={styles.popupEmoji}>{selectedAchievement?.emoji}</Text>
            <Text style={styles.popupTitle}>{selectedAchievement?.title}</Text>
            <Text style={styles.popupRequirement}>REQUIREMENT: {selectedAchievement?.requirement}</Text>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>SHARE</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  titleContainer: {
    backgroundColor: '#380082',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  noAchievementsContainer: {
    backgroundColor: '#380082',
    padding: 40,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
    alignItems: 'center',
  },
  noAchievementsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  achievementsList: {
    marginBottom: 30,
  },
  achievementCard: {
    backgroundColor: '#380082',
    padding: 20,
    borderRadius: 10,
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
    color: '#FFFFFF',
    marginBottom: 5,
  },
  achievementRequirement: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  lockedSection: {
    marginTop: 20,
  },
  lockedSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#380082',
    marginBottom: 15,
    textAlign: 'center',
  },
  lockedAchievementCard: {
    backgroundColor: '#666666',
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#999999',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  lockedEmoji: {
    fontSize: 30,
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
  popupOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    backgroundColor: '#380082',
    padding: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  popupEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  popupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    textAlign: 'center',
  },
  popupRequirement: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  shareButton: {
    backgroundColor: '#380082',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  shareButtonText: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


