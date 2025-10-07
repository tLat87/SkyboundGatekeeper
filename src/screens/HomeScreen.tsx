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
          <ImageBackground 
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
          </ImageBackground>

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
});

