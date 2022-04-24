import React from 'react';
import { Image, ImageSourcePropType } from 'react-native';

export enum PepperImages {
  Bar = 'bar',
  Bracelets = 'bracelets',
  Briefcase = 'briefcase',
  ChiliPepperBlack = 'chiliPepperBlack',
  Cupid = 'cupid',
  Dino = 'dino',
  FamousMan = 'famousMan',
  FamousWoman = 'famousWoman',
  Madam = 'madam',
  Man = 'man',
  Meet = 'meet',
  House = 'house',
  OldPhone = 'oldPhone',
  Parity = 'parity',
  Peace = 'peace',
  PepperTitle = 'pepperTitle',
  QrCode = 'qrCode',
  Romance = 'romance',
  Safe = 'safe',
  ScanQr = 'scanQr',
  Sir = 'sir',
  Sleep = 'sleep',
  Sos = 'sos',
  Weirdo = 'weirdo',
  Welcome = 'welcome',
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
  dino: require(`../../assets/dino.png`),
  famousMan: require(`../../assets/famous_man.png`),
  famousWoman: require(`../../assets/famous_woman.png`),
  madam: require(`../../assets/madam.png`),
  man: require(`../../assets/man.png`),
  meet: require(`../../assets/meet.png`),
  house: require(`../../assets/house.png`),
  oldPhone: require(`../../assets/oldPhone.png`),
  parity: require(`../../assets/parity.png`),
  peace: require(`../../assets/peace.png`),
  pepperTitle: require(`../../assets/pepperTitle.png`),
  qrCode: require(`../../assets/qr-code.png`),
  romance: require(`../../assets/romance.png`),
  safe: require(`../../assets/safe.png`),
  scanQr: require(`../../assets/scan-qr.png`),
  sir: require(`../../assets/sir.png`),
  sleep: require(`../../assets/sleep.png`),
  sos: require(`../../assets/sos.png`),
  weirdo: require(`../../assets/weirdo.png`),
  welcome: require(`../../assets/welcome.png`),
  wellness: require(`../../assets/wellness.png`),
  woman: require(`../../assets/woman.png`),
  work: require(`../../assets/work.png`),
};

// This is a generic component and style can actually be anything
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PepperImage = (props: { src: PepperImages, style?: any }): JSX.Element => (
  <Image source={imagesPepperSources[props.src]} style={props.style} resizeMode="contain"/>
);

export default PepperImage;
