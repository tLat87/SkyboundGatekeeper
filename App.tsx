/**
 * Skybound Gatekeeper - A React Native Game
 * Help the guardian keep magical artifacts in the air!
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar, StyleSheet } from 'react-native';
import { GameProvider } from './src/contexts/GameContext';
import { RootStackParamList, MainTabParamList } from './src/types';

// Import screens
import OnboardingScreen from './src/screens/OnboardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import CollectionScreen from './src/screens/CollectionScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import ShopScreen from './src/screens/ShopScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import GameRulesScreen from './src/screens/GameRulesScreen';
import GameplayScreen from './src/screens/GameplayScreen';
import PauseScreen from './src/screens/PauseScreen';
import GameOverScreen from './src/screens/GameOverScreen';
import RoundCompleteScreen from './src/screens/RoundCompleteScreen';
// New screens
import QuestsScreen from './src/screens/QuestsScreen';
import SeasonsScreen from './src/screens/SeasonsScreen';
import FriendsScreen from './src/screens/FriendsScreen';
import GameModesScreen from './src/screens/GameModesScreen';
import StatisticsScreen from './src/screens/StatisticsScreen';

// Import components
import TabIcon from './src/components/TabIcon';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#FFD700',
        
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon iconName="home" focused={focused} />,
          tabBarLabel: '',
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen 
        name="Collection" 
        component={CollectionScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon iconName="collection" focused={focused} />,
          tabBarLabel: '',
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen 
        name="Achievements" 
        component={AchievementsScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon iconName="achievements" focused={focused} />,
          tabBarLabel: '',
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen 
        name="Shop" 
        component={ShopScreen}
        options={{
          tabBarIcon: ({ focused }) => <TabIcon iconName="shop" focused={focused} />,
          tabBarLabel: '',
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <GameProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor="#380082" />
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: styles.container,
          }}
          initialRouteName="Onboarding"
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="GameRules" component={GameRulesScreen} />
          <Stack.Screen name="Gameplay" component={GameplayScreen} />
          <Stack.Screen name="Pause" component={PauseScreen} />
          <Stack.Screen name="GameOver" component={GameOverScreen} />
          <Stack.Screen name="RoundComplete" component={RoundCompleteScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          {/* New screens */}
          <Stack.Screen name="Quests" component={QuestsScreen} />
          <Stack.Screen name="Seasons" component={SeasonsScreen} />
          <Stack.Screen name="Friends" component={FriendsScreen} />
          <Stack.Screen name="GameModes" component={GameModesScreen} />
          <Stack.Screen name="Statistics" component={StatisticsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFE4B5', // Sky background color
  },
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 80,
    marginLeft: '5%',
    width: '90%',
    backgroundColor: '#2D1B69', // Темно-фиолетовый фон
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#D4A017', // Золотая рамка
    paddingBottom: 10,
    paddingTop: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  tabBarLabel: {
    fontSize: 0, // Скрываем текст лейблов
    display: 'none',
  },
  tabBarItem: {
    paddingVertical: 8,
  },
});

export default App;
