import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { black } from '../../styles/common';

const Icon = createIconSetFromIcoMoon(
  require('../../assets/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

export default function PepperIcon(iconProps: { name: string, size: number, color?: string, style?: any}) {
  // Load the icon font before using it
  const [fontsLoaded] = useFonts({ IcoMoon: require('../../assets/fonts/icomoon.ttf') });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Icon name={iconProps.name} size={iconProps.size} color={iconProps.color ? iconProps.color : black} style={iconProps.style} />
  );
}