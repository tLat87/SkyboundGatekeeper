import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BackgroundImage from '../components/BackgroundImage';
import { useGame } from '../contexts/GameContext';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { playerProfile } = useGame();

  const handlePlayPress = () => {
    navigation.navigate('GameRules');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Player Stats Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.profileButton} onPress={handleProfilePress}>
            <View style={styles.profileInfo}>
              <Text style={styles.profileEmoji}>👑</Text>
              <View>
                <Text style={styles.levelText}>LVL {playerProfile.level}</Text>
                <View style={styles.expBar}>
                  <View 
                    style={[
                      styles.expBarFill, 
                      { width: `${(playerProfile.experience / playerProfile.expToNextLevel) * 100}%` }
                    ]} 
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.coinsContainer}>
            <Text style={styles.coinIcon}>🪙</Text>
            <Text style={styles.coinText}>{playerProfile.totalCoins}</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.contentContainer}>
          {/* Game Logo */}
          {/* <ImageBackground 
            source={require('../assets/img/heder/a5325ea6e5eee5bc4d418292a740c069f6c2ee69.png')} 
            style={{width: 300, height: 500}} 
          >
            <Image 
              source={require('../assets/img/man/LOGO.png')} 
              style={{width: 120, height: 120, marginTop: 50, alignSelf: 'center'}} 
            />
            <Image 
              source={require('../assets/img/man/HOMEIMAGE.png')} 
              style={{width: 200, height: 220, position: 'absolute', bottom: 35, alignSelf: 'center'}} 
            />
          </ImageBackground> */}

          {/* Play Button */}
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
            <Image source={require('../assets/img/heder/BUTTON1.png')} style={styles.playButtonImage} />
          </TouchableOpacity>

          {/* Quick Stats */}
          <View style={styles.quickStats}>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>🏆</Text>
              <Text style={styles.statValue}>{playerProfile.highScore}</Text>
              <Text style={styles.statLabel}>HIGH SCORE</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>🎮</Text>
              <Text style={styles.statValue}>{playerProfile.gamesPlayed}</Text>
              <Text style={styles.statLabel}>GAMES</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statValue}>{playerProfile.longestStreak}</Text>
              <Text style={styles.statLabel}>STREAK</Text>
            </View>
          </View>

          {/* New Features Section */}
          <View style={styles.newFeaturesSection}>
            <Text style={styles.newFeaturesTitle}>NEW FEATURES</Text>
            
            <View style={styles.featuresGrid}>
              <TouchableOpacity 
                style={styles.featureCard}
                onPress={() => navigation.navigate('Quests')}
              >
                <Text style={styles.featureIcon}>📋</Text>
                <Text style={styles.featureTitle}>QUESTS</Text>
                <Text style={styles.featureDescription}>DAILY & WEEKLY CHALLENGES</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.featureCard}
                onPress={() => navigation.navigate('Seasons')}
              >
                <Text style={styles.featureIcon}>🌸</Text>
                <Text style={styles.featureTitle}>SEASONS</Text>
                <Text style={styles.featureDescription}>LIMITED TIME REWARDS</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.featureCard}
                onPress={() => navigation.navigate('Friends')}
              >
                <Text style={styles.featureIcon}>👥</Text>
                <Text style={styles.featureTitle}>FRIENDS</Text>
                <Text style={styles.featureDescription}>COMPETE WITH FRIENDS</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.featureCard}
                onPress={() => navigation.navigate('GameModes')}
              >
                <Text style={styles.featureIcon}>🎮</Text>
                <Text style={styles.featureTitle}>MODES</Text>
                <Text style={styles.featureDescription}>NEW GAME MODES</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Daily Bonus */}
          <View style={styles.dailyBonusSection}>
            <View style={styles.dailyBonusCard}>
              <Text style={styles.dailyBonusIcon}>🎁</Text>
              <View style={styles.dailyBonusInfo}>
                <Text style={styles.dailyBonusTitle}>DAILY BONUS</Text>
                <Text style={styles.dailyBonusDescription}>CLAIM YOUR DAILY REWARDS!</Text>
                <TouchableOpacity style={styles.claimButton}>
                  <Text style={styles.claimButtonText}>CLAIM NOW</Text>
                </TouchableOpacity>
              </View>
            </View>
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
  scrollContent: {
    paddingBottom: 140,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    marginBottom: 20,
  },
  profileButton: {
    flex: 1,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#380082',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  profileEmoji: {
    fontSize: 30,
    marginRight: 10,
  },
  levelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 3,
  },
  expBar: {
    width: 80,
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  expBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  coinsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#380082',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginLeft: 10,
  },
  coinIcon: {
    fontSize: 24,
    marginRight: 5,
  },
  coinText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  playButton: {
    marginTop: 20,
  },
  playButtonImage: {
    
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    width: '100%',
  },
  statBox: {
    alignItems: 'center',
    backgroundColor: '#380082',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#FFD700',
    minWidth: 90,
  },
  statEmoji: {
    fontSize: 28,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 3,
  },
  statLabel: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  newFeaturesSection: {
    marginTop: 30,
    width: '100%',
  },
  newFeaturesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#380082',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 15,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  featureIcon: {
    fontSize: 30,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 14,
  },
  dailyBonusSection: {
    marginTop: 30,
    width: '100%',
  },
  dailyBonusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  dailyBonusIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  dailyBonusInfo: {
    flex: 1,
  },
  dailyBonusTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 5,
  },
  dailyBonusDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  claimButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  claimButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

