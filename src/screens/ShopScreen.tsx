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

export default function ShopScreen() {
  const { powerUps, playerProfile, dispatch } = useGame();

  const handleBuyPowerUp = (powerUpId: string, cost: number) => {
    if (playerProfile.totalCoins >= cost) {
      dispatch({ type: 'BUY_POWERUP', powerUpId });
      Alert.alert('SUCCESS!', 'POWER-UP PURCHASED!');
    } else {
      Alert.alert('INSUFFICIENT COINS', `YOU NEED ${cost - playerProfile.totalCoins} MORE COINS!`);
    }
  };

  const getRarityColor = (cost: number) => {
    if (cost >= 100) return '#FF6B9D'; // Pink for expensive
    if (cost >= 75) return '#FFD700'; // Gold
    if (cost >= 50) return '#9370DB'; // Purple
    return '#87CEEB'; // Sky blue
  };

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with Coin Balance */}
        <View style={styles.header}>
          <View style={styles.coinContainer}>
            <Text style={styles.coinEmoji}>🪙</Text>
            <Text style={styles.coinText}>{playerProfile.totalCoins}</Text>
          </View>
          <Text style={styles.headerTitle}>POWER-UP SHOP</Text>
        </View>

        {/* Power-Ups Grid */}
        <View style={styles.powerUpsGrid}>
          {powerUps.map((powerUp) => (
            <View key={powerUp.id} style={styles.powerUpCard}>
              {/* Border */}
              <View style={[styles.powerUpBorder, { borderColor: getRarityColor(powerUp.cost) }]}>
                <View style={styles.powerUpInner}>
                  {/* Icon */}
                  <Text style={styles.powerUpIcon}>{powerUp.icon}</Text>
                  
                  {/* Name */}
                  <Text style={styles.powerUpName}>{powerUp.name}</Text>
                  
                  {/* Description */}
                  <Text style={styles.powerUpDescription}>{powerUp.description}</Text>
                  
                  {/* Duration */}
                  <View style={styles.durationContainer}>
                    <Text style={styles.durationText}>⏱️ {powerUp.duration / 1000}s</Text>
                  </View>

                  {/* Owned Count */}
                  {powerUp.owned > 0 && (
                    <View style={styles.ownedBadge}>
                      <Text style={styles.ownedText}>OWNED: {powerUp.owned}</Text>
                    </View>
                  )}

                  {/* Buy Button */}
                  <TouchableOpacity
                    style={[
                      styles.buyButton,
                      playerProfile.totalCoins < powerUp.cost && styles.buyButtonDisabled,
                    ]}
                    onPress={() => handleBuyPowerUp(powerUp.id, powerUp.cost)}
                    disabled={playerProfile.totalCoins < powerUp.cost}
                  >
                    <Text style={styles.buyButtonText}>
                      🪙 {powerUp.cost}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 HOW TO EARN COINS</Text>
          <Text style={styles.infoText}>• COLLECT ARTIFACTS IN GAME</Text>
          <Text style={styles.infoText}>• COMPLETE QUESTS</Text>
          <Text style={styles.infoText}>• UNLOCK ACHIEVEMENTS</Text>
          <Text style={styles.infoText}>• REACH HIGH SCORES</Text>
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
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#380082',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginBottom: 15,
  },
  coinEmoji: {
    fontSize: 30,
    marginRight: 10,
  },
  coinText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#380082',
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  powerUpsGrid: {
    gap: 20,
  },
  powerUpCard: {
    marginBottom: 5,
  },
  powerUpBorder: {
    borderRadius: 20,
    borderWidth: 4,
    padding: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  powerUpInner: {
    backgroundColor: '#380082',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  powerUpIcon: {
    fontSize: 60,
    marginBottom: 10,
  },
  powerUpName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 8,
    textAlign: 'center',
  },
  powerUpDescription: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 18,
  },
  durationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  durationText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  ownedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 12,
  },
  ownedText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buyButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#380082',
    minWidth: 120,
  },
  buyButtonDisabled: {
    backgroundColor: '#666666',
    borderColor: '#444444',
  },
  buyButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#380082',
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    marginTop: 30,
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


