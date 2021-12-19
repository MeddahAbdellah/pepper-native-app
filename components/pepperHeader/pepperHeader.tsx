import React from 'react'
import PepperImage, { PepperImages } from '../peperImage/pepperImage';
import { space_unit } from '../../styles/common';

export const PepperTitle = () => {
  return (<PepperImage src={PepperImages.PepperTitle} style={{ width: 20 * space_unit, height: 3.5 * space_unit, marginTop: space_unit }}></PepperImage>);
};

export const PepperMenu = () => {
  return (<PepperImage src={PepperImages.Kebab} style={{ width: 4 * space_unit, height: 3.5 * space_unit }}></PepperImage>);
}

export const PepperQrCode = () => {
  return (<PepperImage src={PepperImages.QrCode} style={{ width: 4 * space_unit, height: 4 * space_unit }}></PepperImage>);
}
