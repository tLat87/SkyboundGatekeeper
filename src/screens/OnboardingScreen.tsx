import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BackgroundImage from '../components/BackgroundImage';

type OnboardingNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  img: string;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Welcome to\nSkybound Gatekeeper!',
    description: 'Here you will find yourself in a world of clouds, temples and artifacts. Easy games and adventures with our guardian await you!',
    buttonText: 'START PLAY',
    img: require('../assets/img/man/LOGO.png'),
  },
  {
    id: 2,
    title: 'Gameplay',
    description: 'Touch the screen to keep the artifacts in the air. Collect crystals, hearts and fireflies to open new gates!',
    buttonText: 'CONTINUE',
    img: require('../assets/img/man/2.png'),
  },
  {
    id: 3,
    title: 'Collection and Progress',
    description: 'Collect artifacts and replenish your collection. Open new gates and become a real Gatekeeper!',
    buttonText: 'START NOW',
    img: require('../assets/img/man/1.png'),
  },
];

export default function OnboardingScreen() {
  const navigation = useNavigation<OnboardingNavigationProp>();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(slideIndex);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: width * (currentSlide + 1),
        animated: true,
      });
    } else {
      // Navigate to main app
      navigation.replace('Main');
    }
  };

  return (
    <BackgroundImage style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => (
          <View key={slide.id} style={styles.slide}>
            {/* Background with gradient effect */}
                        {/* Hero Character and Artifacts */}
            <View style={styles.heroSection}>
              {index === 0 && (
                <View style={styles.logoContainer}>
                  {/* <View style={styles.logoShield}> */}
                    <Image source={slide.img} style={styles.logoArtifact1} />
                  {/* </View>/ */}
                  {/* <Text style={styles.logoTitle}>SKYBOUND{'\n'}GATEKEEPER</Text> */}
                </View>
              )}
              
              {index === 1 && (
                <View style={styles.chestSection}>
                <View style={styles.chestArtifacts}>
                  <Image  source={slide.img} style={[styles.chestArtifact, {width: 300, height: 400, marginTop: 100}]} />
                </View>
              </View>
              )}
              
              {index === 2 && (
                <View style={styles.chestSection}>
                  <View style={styles.chestArtifacts}>
                    <Image source={slide.img} style={styles.chestArtifact} />
                  </View>
                </View>
              )}
              
              <View style={styles.heroContainer}>
                <Text style={styles.heroEmoji}>{slide.heroEmoji}</Text>
              </View>
            </View>

            {/* Info Card */}
            <View style={styles.infoCard}>
              <View style={styles.cardBorder}>
                <Text style={styles.slideTitle}>{slide.title}</Text>
                <Text style={styles.slideDescription}>{slide.description}</Text>
              </View>
            </View>

            {/* Button */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleNext}>
                <Image source={require('../assets/img/heder/BUTTON1.png')} style={styles.buttonBorder} />
              </TouchableOpacity>
            </View>

            {/* Pagination Dots */}
            <View style={styles.pagination}>
              {slides.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    i === currentSlide && styles.activeDot,
                  ]}
                />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </BackgroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: width,
    height: height,
      shadowOpacity: 0.8,
    shadowRadius: 50,
    elevation: 10,
  },
  leftColumn: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 80,
    height: height * 0.5,
    backgroundColor: '#FDB813',
    transform: [{ skewY: '5deg' }],
  },
  rightColumn: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 80,
    height: height * 0.5,
    backgroundColor: '#FDB813',
    transform: [{ skewY: '-5deg' }],
  },
  heroSection: {
    marginTop: height * 0.1,
    alignItems: 'center',
    height: height * 0.45,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoShield: {
    // width: 150,
    // height: 150,
    backgroundColor: '#380082',
    borderRadius: 75,
    borderWidth: 5,
    borderColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  logoArtifact1: {
    // fontSize: 40,
    // position: 'absolute',
    marginTop: 50,
    // top: 40,
  },
  logoArtifact2: {
    fontSize: 35,
    position: 'absolute',
    bottom: 45,
    left: 30,
  },
  logoArtifact3: {
    fontSize: 35,
    position: 'absolute',
    bottom: 45,
    right: 30,
  },
  logoTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  gameplayArtifacts: {
    // width: width,
    // height: 200,
    // position: 'relative',
    marginBottom: 20,
  },
  floatingArtifact1: {
    fontSize: 50,
    position: 'absolute',
    top: 20,
    right: 100,
  },
  floatingArtifact2: {
    fontSize: 50,
    position: 'absolute',
    top: 80,
    left: 80,
  },
  floatingArtifact3: {
    fontSize: 50,
    position: 'absolute',
    top: 140,
    right: 120,
  },
  floatingArtifact4: {
    fontSize: 50,
    position: 'absolute',
    top: 100,
    left: 150,
  },
  chestSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chest: {
    fontSize: 100,
    marginBottom: -20,
  },
  chestArtifacts: {
    flexDirection: 'row',
    gap: 20,
  },
  chestArtifact: {
    marginTop: 100,
    fontSize: 40,
  },
  heroContainer: {
    alignItems: 'center',
    position: 'relative',
  },
  heroEmoji: {
    fontSize: 180,
  },
  thumbsUp: {
    fontSize: 50,
    position: 'absolute',
    right: -20,
    bottom: 20,
  },
  infoCard: {
    marginHorizontal: 30,
    backgroundColor: '#380082',
    borderRadius: 20,
    padding: 5,
    borderWidth: 4,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  cardBorder: {
    backgroundColor: '#380082',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#8B6914',
    padding: 25,
  },
  slideTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 30,
  },
  slideDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 22,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 70,

    alignItems: 'center',
  },
  button: {
    

  },
  buttonBorder: {
    marginBottom: 70,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 5,
  },
  activeDot: {
    width: 30,
    backgroundColor: '#FFFFFF',
  },
});

