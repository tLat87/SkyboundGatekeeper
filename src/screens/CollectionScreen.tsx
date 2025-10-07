import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import { useGame } from '../contexts/GameContext';
import BackgroundImage from '../components/BackgroundImage';

const { width } = Dimensions.get('window');

export default function CollectionScreen() {
  const { artifacts } = useGame();
  const [selectedArtifact, setSelectedArtifact] = useState<any>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleArtifactPress = (artifact: any) => {
    if (artifact.unlocked) {
      setSelectedArtifact(artifact);
      setShowPopup(true);
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return '#87CEEB';
      case 'rare': return '#9370DB';
      case 'epic': return '#FFD700';
      case 'legendary': return '#FF6B9D';
      case 'mythic': return '#FF4500';
      default: return '#87CEEB';
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'rgba(135, 206, 235, 0.5)';
      case 'rare': return 'rgba(147, 112, 219, 0.5)';
      case 'epic': return 'rgba(255, 215, 0, 0.5)';
      case 'legendary': return 'rgba(255, 107, 157, 0.5)';
      case 'mythic': return 'rgba(255, 69, 0, 0.5)';
      default: return 'rgba(135, 206, 235, 0.5)';
    }
  };

  const unlockedCount = artifacts.filter(a => a.unlocked).length;
  const totalCount = artifacts.length;

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>ARTIFACT COLLECTION</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              {unlockedCount} / {totalCount} COLLECTED
            </Text>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { width: `${(unlockedCount / totalCount) * 100}%` }
                ]} 
              />
            </View>
          </View>
        </View>

        {/* Artifacts Grid */}
        <View style={styles.artifactsGrid}>
          {artifacts.map((artifact) => (
            <TouchableOpacity
              key={artifact.id}
              style={[
                styles.artifactCard,
                !artifact.unlocked && styles.lockedCard,
              ]}
              onPress={() => handleArtifactPress(artifact)}
              disabled={!artifact.unlocked}
            >
              <View 
                style={[
                  styles.artifactCardInner,
                  { 
                    borderColor: artifact.unlocked ? getRarityColor(artifact.rarity) : '#666666',
                    shadowColor: artifact.unlocked ? getRarityGlow(artifact.rarity) : '#000000',
                  }
                ]}
              >
                {/* Artifact Icon */}
                <Text style={[
                  styles.artifactEmoji,
                  !artifact.unlocked && styles.lockedEmoji,
                ]}>
                  {artifact.unlocked ? artifact.emoji : '🔒'}
                </Text>

                {/* Artifact Name */}
                <Text style={[
                  styles.artifactName,
                  { color: artifact.unlocked ? getRarityColor(artifact.rarity) : '#999999' }
                ]}>
                  {artifact.unlocked ? artifact.name : '???'}
                </Text>

                {/* Rarity Badge */}
                {artifact.unlocked && (
                  <View 
                    style={[
                      styles.rarityBadge, 
                      { backgroundColor: getRarityColor(artifact.rarity) }
                    ]}
                  >
                    <Text style={styles.rarityText}>{artifact.rarity.toUpperCase()}</Text>
                  </View>
                )}

                {/* Points Badge */}
                {artifact.unlocked && (
                  <View style={styles.pointsBadge}>
                    <Text style={styles.pointsText}>+{artifact.pointValue}</Text>
                  </View>
                )}

                {/* Collection Count */}
                {artifact.unlocked && artifact.timesCollected! > 0 && (
                  <View style={styles.collectionBadge}>
                    <Text style={styles.collectionText}>×{artifact.timesCollected}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>RARITY GUIDE</Text>
          <View style={styles.legendGrid}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#87CEEB' }]} />
              <Text style={styles.legendText}>COMMON</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#9370DB' }]} />
              <Text style={styles.legendText}>RARE</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FFD700' }]} />
              <Text style={styles.legendText}>EPIC</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF6B9D' }]} />
              <Text style={styles.legendText}>LEGENDARY</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#FF4500' }]} />
              <Text style={styles.legendText}>MYTHIC</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Artifact Detail Modal */}
      <Modal
        visible={showPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowPopup(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View 
              style={[
                styles.modalContent,
                { borderColor: selectedArtifact ? getRarityColor(selectedArtifact.rarity) : '#FFD700' }
              ]}
            >
              {/* Close Button */}
              <TouchableOpacity 
                style={styles.closeButton} 
                onPress={() => setShowPopup(false)}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>

              {/* Artifact Details */}
              <Text style={styles.modalEmoji}>{selectedArtifact?.emoji}</Text>
              <Text style={[
                styles.modalTitle,
                { color: selectedArtifact ? getRarityColor(selectedArtifact.rarity) : '#FFD700' }
              ]}>
                {selectedArtifact?.name}
              </Text>
              
              <View 
                style={[
                  styles.modalRarityBadge, 
                  { backgroundColor: selectedArtifact ? getRarityColor(selectedArtifact.rarity) : '#FFD700' }
                ]}
              >
                <Text style={styles.modalRarityText}>
                  {selectedArtifact?.rarity.toUpperCase()}
                </Text>
              </View>

              <Text style={styles.modalDescription}>{selectedArtifact?.description}</Text>

              <View style={styles.modalStats}>
                <View style={styles.modalStat}>
                  <Text style={styles.modalStatLabel}>POINT VALUE</Text>
                  <Text style={styles.modalStatValue}>+{selectedArtifact?.pointValue}</Text>
                </View>
                <View style={styles.modalStat}>
                  <Text style={styles.modalStatLabel}>COLLECTED</Text>
                  <Text style={styles.modalStatValue}>×{selectedArtifact?.timesCollected || 0}</Text>
                </View>
                <View style={styles.modalStat}>
                  <Text style={styles.modalStatLabel}>TYPE</Text>
                  <Text style={styles.modalStatValue}>{selectedArtifact?.type.toUpperCase()}</Text>
                </View>
              </View>
            </View>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#380082',
    marginBottom: 15,
    textShadowColor: '#FFD700',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#380082',
    marginBottom: 8,
  },
  progressBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#380082',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 8,
  },
  artifactsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  artifactCard: {
    width: '48%',
    marginBottom: 15,
  },
  lockedCard: {
    opacity: 0.6,
  },
  artifactCardInner: {
    backgroundColor: '#380082',
    borderRadius: 15,
    borderWidth: 3,
    padding: 15,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  artifactEmoji: {
    fontSize: 50,
    marginBottom: 10,
  },
  lockedEmoji: {
    fontSize: 40,
  },
  artifactName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  rarityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 5,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#380082',
  },
  pointsBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  pointsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  collectionBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  collectionText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  legend: {
    backgroundColor: '#380082',
    borderRadius: 15,
    padding: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  legendTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 15,
    textAlign: 'center',
  },
  legendGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 5,
  },
  legendDot: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - 60,
    maxHeight: '80%',
  },
  modalContent: {
    backgroundColor: '#380082',
    borderRadius: 20,
    borderWidth: 4,
    padding: 30,
    alignItems: 'center',
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
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalRarityBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 15,
    marginBottom: 20,
  },
  modalRarityText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#380082',
  },
  modalDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  modalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  modalStat: {
    alignItems: 'center',
  },
  modalStatLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 5,
  },
  modalStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFD700',
  },
});
