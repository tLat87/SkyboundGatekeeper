import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BackgroundImage from '../components/BackgroundImage';

type GameOverNavigationProp = StackNavigationProp<RootStackParamList, 'GameOver'>;

const { width, height } = Dimensions.get('window');

export default function GameOverScreen() {
  const navigation = useNavigation<GameOverNavigationProp>();

  const handleRetry = () => {
    navigation.navigate('Gameplay');
  };

  const handleShare = () => {
    // Share functionality would go here
    console.log('Share game over');
  };

  const handleHome = () => {
    navigation.navigate('Main');
  };

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content */}
        <View style={styles.contentContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>YOU LOST!</Text>
        </View>

        {/* Round Info */}
        <View style={styles.roundContainer}>
          <Text style={styles.roundText}>ROUND: 1/100</Text>
        </View>

        {/* Fallen Artifacts */}
        <View style={styles.artifactsContainer}>
          <Text style={styles.artifactEmoji}>💎</Text>
          <Text style={styles.artifactEmoji}>🦉</Text>
          <Text style={styles.artifactEmoji}>🪙</Text>
          <Text style={styles.artifactEmoji}>🏆</Text>
        </View>

        {/* Lightning Effect */}
        <View style={styles.lightningContainer}>
          <Text style={styles.lightningText}>⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
              <Text style={styles.retryButtonText}>RETRY</Text>
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
      </ScrollView>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 40,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titleContainer: {
    backgroundColor: '#8B0000',
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
  artifactsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  artifactEmoji: {
    fontSize: 40,
  },
  lightningContainer: {
    marginBottom: 40,
  },
  lightningText: {
    fontSize: 16,
    color: '#FFD700',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#380082',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  retryButtonText: {
    color: '#FFD700',
    fontSize: 18,
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


