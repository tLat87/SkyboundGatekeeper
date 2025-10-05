import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Switch,
  Image,
} from 'react-native';
import BackgroundImage from '../components/BackgroundImage';
import { useGame } from '../contexts/GameContext';

const { width, height } = Dimensions.get('window');

export default function SettingsScreen() {
  const { settings, dispatch } = useGame();

  const handleMusicToggle = (value: boolean) => {
    dispatch({ 
      type: 'UPDATE_SETTINGS', 
      settings: { backgroundMusic: value } 
    });
  };

  const handleSoundEffectsToggle = (value: boolean) => {
    dispatch({ 
      type: 'UPDATE_SETTINGS', 
      settings: { soundEffects: value } 
    });
  };

  return (
    <BackgroundImage style={styles.container}>
      {/* Main Content */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* Title */}
        <Image source={require('../assets/img/heder/1.png')} style={{alignSelf: 'center', marginBottom: 20}} />


        {/* Background Melody Section */}
        {/* <View style={styles.settingsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>BACKGROUND MELODY</Text>
            <Image source={require('../assets/img/man/HOMEIMAGE.png')} style={{width: 100, height: 100}} />
          </View>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>{settings.backgroundMusic ? 'ON' : 'OFF'}</Text>
            <Switch
              value={settings.backgroundMusic}
              onValueChange={handleMusicToggle}
              trackColor={{ false: '#767577', true: '#FFD700' }}
              thumbColor={settings.backgroundMusic ? '#380082' : '#f4f3f4'}
            />
          </View>
        </View> */}

        {/* Game Description Section */}
        <View style={styles.descriptionSection}>
          <View style={styles.descriptionTextContainer}>
            <Text style={styles.descriptionText}>
              SKYBOUND GATEKEEPER IS A LIGHT ARCADE GAME WHERE YOU HELP A SKY GUARDIAN KEEP MAGICAL ARTIFACTS IN THE AIR. COMPLETE UP TO 100 ROUNDS, COLLECT UNIQUE ARTIFACTS, UNLOCK ACHIEVEMENTS AND BECOME A TRUE LEGENDARY GATEKEEPER!
            </Text>
          </View>
          <View style={styles.gameIconContainer}>
            <Image source={require('../assets/img/man/LOGO.png')} style={{width: 100, height: 100}} />
          </View>
        </View>
      </ScrollView>
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
  settingsSection: {
    backgroundColor: '#380082',
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
  },
  guardianContainer: {
    alignItems: 'center',
  },
  guardianEmoji: {
    fontSize: 60,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  descriptionSection: {
    backgroundColor: '#380082',
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionTextContainer: {
    flex: 1,
    marginRight: 20,
  },
  descriptionText: {
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 20,
    textAlign: 'left',
  },
  gameIconContainer: {
    alignItems: 'center',
  },
  gameIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  gameIconEmoji: {
    fontSize: 40,
  },
  gameIconTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

