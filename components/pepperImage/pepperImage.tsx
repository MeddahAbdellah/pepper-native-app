import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

export enum PepperImages {
  Bar = 'bar',
  Bracelets = 'bracelets',
  Kebab = 'kebab',
  PepperTitle = 'pepperTitle',
  QrCode = 'qrCode',
  Weirdo = 'weirdo',
}
const images: { [keyof in PepperImages]: ImageSourcePropType } = {
  bar: require(`../../assets/bar.png`),
  bracelets: require(`../../assets/bracelets.png`),
  kebab: require(`../../assets/kebab.png`),
  pepperTitle: require(`../../assets/pepperTitle.png`),
  qrCode: require(`../../assets/qrCode.png`),
  weirdo: require(`../../assets/weirdo.png`),
};

function PepperImage(props: { src: PepperImages, style?: any }) {
  return (
      <Image source={images[props.src]} style={props.style} resizeMode="contain"/>
  );
}

export default PepperImage;
