import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BackgroundImage from '../components/BackgroundImage';

type RoundCompleteNavigationProp = StackNavigationProp<RootStackParamList, 'RoundComplete'>;

const { width, height } = Dimensions.get('window');

export default function RoundCompleteScreen() {
  const navigation = useNavigation<RoundCompleteNavigationProp>();

  const handleNextRound = () => {
    navigation.navigate('Gameplay');
  };

  const handleShare = () => {
    // Share functionality would go here
    console.log('Share round complete');
  };

  const handleHome = () => {
    navigation.navigate('Main');
  };

  return (
    <BackgroundImage style={styles.container}>
      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>COMPLETE!</Text>
        </View>

        {/* Round Info */}
        <View style={styles.roundContainer}>
          <Text style={styles.roundText}>ROUND: 1/100</Text>
        </View>

        {/* Stars */}
        <View style={styles.starsContainer}>
          <Text style={styles.starEmoji}>⭐</Text>
          <Text style={styles.starEmoji}>⭐</Text>
          <Text style={styles.starEmoji}>⭐</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.nextRoundButton} onPress={handleNextRound}>
              <Text style={styles.nextRoundButtonText}>NEXT ROUND</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareButtonText}>SHARE</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
            <Text style={styles.homeButtonText}>🏠</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    backgroundColor: '#000080',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  roundContainer: {
    backgroundColor: '#380082',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFD700',
    marginBottom: 30,
  },
  roundText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginBottom: 40,
  },
  starEmoji: {
    fontSize: 50,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  nextRoundButton: {
    backgroundColor: '#380082',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  nextRoundButtonText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
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
  homeButton: {
    backgroundColor: '#380082',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  homeButtonText: {
    fontSize: 24,
    color: '#FFD700',
  },
});


