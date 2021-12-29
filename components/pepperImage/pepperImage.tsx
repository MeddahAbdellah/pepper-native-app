import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

export enum PepperImages {
  Bar = 'bar',
  Bracelets = 'bracelets',
  Briefcase = 'briefcase',
  ChiliPepperBlack = 'chiliPepperBlack',
  Cupid = 'cupid',
  Man = 'man',
  House = 'house',
  OldPhone = 'oldPhone',
  Peace = 'peace',
  PepperTitle = 'pepperTitle',
  Weirdo = 'weirdo',
  Wellness = 'wellness',
  Woman = 'woman',
}
export const pepperImages: { [keyof in PepperImages]: ImageSourcePropType } = {
  bar: require(`../../assets/bar.png`),
  bracelets: require(`../../assets/bracelets.png`),
  briefcase: require(`../../assets/briefcase.png`),
  cupid: require(`../../assets/cupid.png`),
  chiliPepperBlack: require(`../../assets/chili-pepper.png`),
  man: require(`../../assets/man.png`),
  house: require(`../../assets/house.png`),
  oldPhone: require(`../../assets/oldPhone.png`),
  peace: require(`../../assets/peace.png`),
  pepperTitle: require(`../../assets/pepperTitle.png`),
  weirdo: require(`../../assets/weirdo.png`),
  wellness: require(`../../assets/wellness.png`),
  woman: require(`../../assets/woman.png`),
};

function PepperImage(props: { src: PepperImages, style?: any }) {
  return (
      <Image source={pepperImages[props.src]} style={props.style} resizeMode="contain"/>
  );
}

export default PepperImage;
