import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

export enum PepperImages {
  Bar = 'bar',
  Bracelets = 'bracelets',
  PepperTitle = 'pepperTitle',
  Weirdo = 'weirdo',
}
const images: { [keyof in PepperImages]: ImageSourcePropType } = {
  bar: require(`../../assets/bar.png`),
  bracelets: require(`../../assets/bracelets.png`),
  pepperTitle: require(`../../assets/pepperTitle.png`),
  weirdo: require(`../../assets/weirdo.png`),
};

function PepperImage(props: { src: PepperImages, style?: any }) {
  return (
      <Image source={images[props.src]} style={props.style} resizeMode="contain"/>
  );
}

export default PepperImage;
