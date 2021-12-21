import React from 'react'
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import { space_unit, black } from '../../styles/common';
import PepperIcon from '../pepperIcon/pepperIcon';

export const PepperTitle = () => {
  return (<PepperImage src={PepperImages.PepperTitle} style={{ width: 20 * space_unit, height: 3.5 * space_unit, marginTop: .5 * space_unit }}></PepperImage>);
};

export const PepperMenu = () => {
  return (<PepperIcon name="pepper-menu" color={black} size={4 * space_unit} />);
}

export const PepperQrCode = () => {
  return (<PepperIcon name="pepper-qrCode" color={black} size={4 * space_unit} />);
}
