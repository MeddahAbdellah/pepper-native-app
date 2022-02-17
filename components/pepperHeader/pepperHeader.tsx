import React, { useState, useEffect } from 'react';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import { space_unit, black } from '../../styles/common';
import PepperIcon from '../pepperIcon/pepperIcon';
import PepperQRCodeModal from './pepperQRCodeModal';
import { TouchableOpacity } from 'react-native';
import LoginService from '../../services/login';
import { usePepperUser } from '../../hooks/user.hooks';
import { UtilService } from '../../services/util';

export const PepperTitle = (): JSX.Element => (
  <PepperImage src={PepperImages.PepperTitle} style={
    { width: 20 * space_unit, height: 3.5 * space_unit, marginTop: .5 * space_unit }
  }></PepperImage>
);

export const PepperMenu = (): JSX.Element => (<PepperIcon name="pepper-menu" color={black} size={4.5 * space_unit} />);

export const PepperQrCode = (): JSX.Element => {
  const [showQrCodeModal, setShowQrCodeModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentUser = usePepperUser();

  // Show Qr code button only when user is logged in
  useEffect( () => {
    const abortController = new AbortController();
    (async() => {
      try {
        const loggedIn = await LoginService.isLoggedin();
        setIsLoggedIn(loggedIn);
      } catch (error) {
        UtilService.throwError(error);
      }
    })();
    return () => { abortController.abort(); };
  }, [currentUser]);

  return (
    <>
      <PepperQRCodeModal show={showQrCodeModal} onRequestClose={() => setShowQrCodeModal(false)}/>
      { isLoggedIn ?
        (
          <TouchableOpacity onPress={ () => setShowQrCodeModal(true) }>
            <PepperIcon name="pepper-qrCode" color={black} size={4.5 * space_unit} />
          </TouchableOpacity>
        ) : null
      }
    </>
  );
};
