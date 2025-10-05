import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BackgroundImage from '../components/BackgroundImage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handlePlayPress = () => {
    navigation.navigate('GameRules');
  };

  return (
    <BackgroundImage style={styles.container}>
      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Game Logo */}
        <ImageBackground source={require('../assets/img/heder/a5325ea6e5eee5bc4d418292a740c069f6c2ee69.png')} style={{width: 300, height: 500}} >
            <Image source={require('../assets/img/man/LOGO.png')} style={{width: 120, height: 120, marginTop: 50, alignSelf: 'center'}} />
            <Image source={require('../assets/img/man/HOMEIMAGE.png')} style={{width: 200, height: 220, position: 'absolute', bottom: 35, alignSelf: 'center'}} />
        </ImageBackground>


        {/* Play Button */}
        <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
            <Image source={require('../assets/img/heder/BUTTON1.png')} style={styles.playButtonText} />
        </TouchableOpacity>
      </View>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  gameIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#380082',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  guardianEmoji: {
    fontSize: 40,
  },
  gameTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#380082',
    textAlign: 'center',
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  heroEmoji: {
    fontSize: 120,
    marginBottom: 10,
  },
  heroText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#380082',
  },
  playButton: {
 
  },
  playButtonText: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

