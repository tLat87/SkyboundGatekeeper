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

export default function CollectionScreen() {
  const { artifacts } = useGame();
  const [selectedArtifact, setSelectedArtifact] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleArtifactPress = (artifact: any) => {
    if (artifact.unlocked) {
      setSelectedArtifact(artifact);
      setShowPopup(true);
    }
  };

  const handleShare = () => {
    // Share functionality would go here
    console.log('Share artifact');
    setShowPopup(false);
  };

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* Title Card */}
        <View style={styles.titleCard}>
          <View style={styles.titleCardInner}>
            <Text style={styles.title}>COLLECTION</Text>
          </View>
        </View>

        {/* Single Artifact Display */}
        {artifacts.length > 0 && (
          <TouchableOpacity
            style={[
              styles.mainArtifactCard,
              !artifacts[0].unlocked && styles.lockedCard,
            ]}
            onPress={() => handleArtifactPress(artifacts[0])}
            disabled={!artifacts[0].unlocked}
          >
            <View style={styles.artifactCardInner}>
              {/* Decorative Corners */}
              <View style={styles.cornerTopLeft} />
              <View style={styles.cornerTopRight} />
              <View style={styles.cornerBottomLeft} />
              <View style={styles.cornerBottomRight} />

              {/* Artifact Image */}
              <View style={styles.artifactImageContainer}>
                <Text style={[
                  styles.artifactEmoji,
                  !artifacts[0].unlocked && styles.lockedEmoji,
                ]}>
                  {artifacts[0].unlocked ? artifacts[0].emoji : '🔒'}
                </Text>
              </View>

              {/* Artifact Name */}
              <Text style={styles.artifactTitle}>
                {artifacts[0].unlocked ? artifacts[0].name : 'CHEST'}
              </Text>

              {/* Round Info */}
              <Text style={styles.roundText}>ROUND 30</Text>

              {/* Description */}
              <Text style={styles.artifactDescription}>
                {artifacts[0].unlocked 
                  ? artifacts[0].description 
                  : 'AN ANCIENT CHEST OF THE TEMPLE GUARDS. INSIDE ARE HIDDEN RICHES AND FORGOTTEN SECRETS.'}
              </Text>

              {/* Status or Share Button */}
              {artifacts[0].unlocked ? (
                <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                  <View style={styles.shareButtonInner}>
                    <Text style={styles.shareButtonText}>SHARE</Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <Text style={styles.unavailableText}>UNAVAILABLE</Text>
              )}
            </View>
          </TouchableOpacity>
        )}
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
    alignItems: 'center',
  },
  // Title Card
  titleCard: {
    width: '100%',
    backgroundColor: '#D4A017',
    borderRadius: 20,
    padding: 4,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  titleCardInner: {
    backgroundColor: '#380082',
    borderRadius: 16,
    paddingVertical: 20,
    borderWidth: 3,
    borderColor: '#8B6914',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  // Main Artifact Card
  mainArtifactCard: {
    width: width - 80,
    backgroundColor: '#D4A017',
    borderRadius: 25,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 12,
  },
  artifactCardInner: {
    backgroundColor: '#380082',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 3,
    borderColor: '#8B6914',
  },
  // Decorative Corners
  cornerTopLeft: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#D4A017',
    borderTopLeftRadius: 8,
  },
  cornerTopRight: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: '#D4A017',
    borderTopRightRadius: 8,
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 15,
    left: 15,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: '#D4A017',
    borderBottomLeftRadius: 8,
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: '#D4A017',
    borderBottomRightRadius: 8,
  },
  // Artifact Content
  artifactImageContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  artifactEmoji: {
    fontSize: 120,
  },
  lockedEmoji: {
    fontSize: 100,
  },
  artifactTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 2,
  },
  roundText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    marginBottom: 20,
    letterSpacing: 1,
  },
  artifactDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  // Share Button
  shareButton: {
    backgroundColor: '#D4A017',
    borderRadius: 12,
    padding: 3,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  shareButtonInner: {
    backgroundColor: '#380082',
    borderRadius: 10,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#8B6914',
  },
  shareButtonText: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
  unavailableText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF4444',
    textAlign: 'center',
    letterSpacing: 2,
  },
  lockedCard: {
    opacity: 0.8,
  },
});

