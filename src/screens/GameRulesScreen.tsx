import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import BackgroundImage from '../components/BackgroundImage';

type GameRulesNavigationProp = StackNavigationProp<RootStackParamList, 'GameRules'>;

const { width, height } = Dimensions.get('window');

export default function GameRulesScreen() {
  const navigation = useNavigation<GameRulesNavigationProp>();

  const handlePlayPress = () => {
    navigation.navigate('Gameplay');
  };

  const handleHomePress = () => {
    navigation.navigate('Main');
  };

  return (
    <BackgroundImage style={styles.container}>
      {/* Main Content */}
      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>GAME RULES</Text>
        </View>

        {/* Rules Content */}
        <View style={styles.rulesContainer}>
          <Text style={styles.ruleText}>THE GAME IS PLAYED IN ROUNDS (MAXIMUM 100).</Text>
          <Text style={styles.ruleText}>AT THE BEGINNING OF EACH ROUND, YOU ARE GIVEN 5 SECONDS OF TIME.</Text>
          <Text style={styles.ruleText}>THE TASK: TO KEEP THE ARTIFACTS IN THE AIR BY TOUCHING THE SCREEN SO THAT THEY DO NOT FALL.</Text>
          <Text style={styles.ruleText}>AFTER EACH SUCCESSFUL ROUND, +2 SECONDS ARE ADDED TO THE TIMER.</Text>
          <Text style={styles.ruleText}>WITH EACH SUBSEQUENT LEVEL, THE NUMBER OF ARTIFACTS INCREASES - KEEPING THEM IN THE AIR BECOMES MORE DIFFICULT.</Text>
          <Text style={styles.ruleText}>IF AT LEAST ONE ARTIFACT FALLS, THE ROUND ENDS.</Text>
          <Text style={styles.ruleText}>GOAL: TO COMPLETE AS MANY ROUNDS AS POSSIBLE (UP TO 100).</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.playButton} onPress={handlePlayPress}>
            <Image source={require('../assets/img/heder/BUTTON1.png')} style={styles.playButtonText} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.homeButton} onPress={handleHomePress}>
            <Image source={require('../assets/img/botom/3.png')} style={{width: 34, height: 34}} />
          </TouchableOpacity>
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
  rulesContainer: {
    backgroundColor: '#380082',
    padding: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
    marginBottom: 30,
  },
  ruleText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 15,
    lineHeight: 22,
    textAlign: 'left',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  playButton: {

  },
  playButtonText: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  homeButton: {
    backgroundColor: '#380082',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  homeButtonText: {
    fontSize: 24,
    color: '#FFD700',
  },
});


