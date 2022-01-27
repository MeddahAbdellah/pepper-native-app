import React from 'react';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { black } from '../../styles/common';

const ReactIcon = createIconSetFromIcoMoon(
  require('../../assets/selection.json'),
  'IcoMoon',
  'icomoon.ttf'
);

const PepperIcon = (iconProps: { name: string, size: number, color?: string, style?: any}): JSX.Element => {
  // Load the icon font before using it
  // disabling lint as it is an external library that forces the use of PascalCase
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [fontsLoaded] = useFonts({ IcoMoon: require('../../assets/fonts/icomoon.ttf') });
  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ReactIcon name={iconProps.name} size={iconProps.size} color={iconProps.color ? iconProps.color : black} style={iconProps.style} />
  );
};

export default PepperIcon;
