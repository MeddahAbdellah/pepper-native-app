import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

export enum PepperImages {
  Bar = 'bar',
  Bracelets = 'bracelets',
  Cupid = 'cupid',
  Man = 'man',
  PepperTitle = 'pepperTitle',
  Weirdo = 'weirdo',
  Wellness = 'wellness',
  Woman = 'woman',
}
const images: { [keyof in PepperImages]: ImageSourcePropType } = {
  bar: require(`../../assets/bar.png`),
  bracelets: require(`../../assets/bracelets.png`),
  cupid: require(`../../assets/cupid.png`),
  man: require(`../../assets/man.png`),
  pepperTitle: require(`../../assets/pepperTitle.png`),
  weirdo: require(`../../assets/weirdo.png`),
  wellness: require(`../../assets/wellness.png`),
  woman: require(`../../assets/woman.png`),
};

function PepperImage(props: { src: PepperImages, style?: any }) {
  return (
      <Image source={images[props.src]} style={props.style} resizeMode="contain"/>
  );
}

export default PepperImage;
