import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface TabIconProps {
  iconName: 'home' | 'collection' | 'achievements' | 'shop' | 'quests' | 'seasons' | 'friends';
  focused: boolean;
}

// Пути к иконкам - замените на свои пути
const ICONS = {
  home: require('../assets/img/botom/1.png'),
  collection: require('../assets/img/botom/2.png'),
  achievements: require('../assets/img/botom/3.png'),
  shop: require('../assets/img/botom/5.png'),
  // Используем существующие иконки для новых вкладок
  quests: require('../assets/img/botom/2.png'), // Используем collection иконку
  seasons: require('../assets/img/botom/3.png'), // Используем achievements иконку
  friends: require('../assets/img/botom/5.png'), // Используем shop иконку
};

export default function TabIcon({ iconName, focused }: TabIconProps) {
  return (
    <Image
      source={ICONS[iconName]}
      style={[
        styles.icon,
        focused && styles.iconFocused,
      ]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 34,
    height: 34,
    opacity: 0.6,
  },
  iconFocused: {
    opacity: 1,
    transform: [{ scale: 1.1 }],
  },
});
