import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

interface BackgroundImageProps {
  children: React.ReactNode;
  style?: any;
}

// Путь к фоновому изображению - замените на свой путь
const BACKGROUND_IMAGE = require('../assets/img/446547020a880abf87d766abf9410377d8f13214.png');

export default function BackgroundImage({ children, style }: BackgroundImageProps) {
  return (
    <ImageBackground
      source={BACKGROUND_IMAGE}
      style={[styles.background, style]}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

