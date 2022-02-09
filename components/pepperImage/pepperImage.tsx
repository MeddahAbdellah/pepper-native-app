import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

export enum PepperImages {
  Bar = 'bar',
  Bracelets = 'bracelets',
  Briefcase = 'briefcase',
  ChiliPepperBlack = 'chiliPepperBlack',
  Cupid = 'cupid',
  FamousMan = 'famousMan',
  FamousWoman = 'famousWoman',
  Man = 'man',
  House = 'house',
  OldPhone = 'oldPhone',
  Peace = 'peace',
  PepperTitle = 'pepperTitle',
  QrCode = 'qrCode',
  Romance = 'romance',
  Safe = 'safe',
  ScanQr = 'scanQr',
  Sos = 'sos',
  Weirdo = 'weirdo',
  Wellness = 'wellness',
  Woman = 'woman',
  Work = 'work',
}
export const imagesPepperSources: { [keyof in PepperImages]: ImageSourcePropType } = {
  bar: require(`../../assets/bar.png`),
  bracelets: require(`../../assets/bracelets.png`),
  briefcase: require(`../../assets/briefcase.png`),
  chiliPepperBlack: require(`../../assets/chili-pepper.png`),
  cupid: require(`../../assets/cupid.png`),
  famousMan: require(`../../assets/famous_man.png`),
  famousWoman: require(`../../assets/famous_woman.png`),
  man: require(`../../assets/man.png`),
  house: require(`../../assets/house.png`),
  oldPhone: require(`../../assets/oldPhone.png`),
  peace: require(`../../assets/peace.png`),
  pepperTitle: require(`../../assets/pepperTitle.png`),
  qrCode: require(`../../assets/qr-code.png`),
  romance: require(`../../assets/romance.png`),
  safe: require(`../../assets/safe.png`),
  scanQr: require(`../../assets/scan-qr.png`),
  sos: require(`../../assets/sos.png`),
  weirdo: require(`../../assets/weirdo.png`),
  wellness: require(`../../assets/wellness.png`),
  woman: require(`../../assets/woman.png`),
  work: require(`../../assets/work.png`),
};

const PepperImage = (props: { src: PepperImages, style?: any }): JSX.Element => (
  <Image source={imagesPepperSources[props.src]} style={props.style} resizeMode="contain"/>
);

export default PepperImage;
