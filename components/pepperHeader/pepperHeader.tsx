import React, { useState, useEffect } from 'react';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import { space_unit, black, indigo_3 } from '../../styles/common';
import PepperIcon from '../pepperIcon/pepperIcon';
import PepperQRCodeModal from './pepperQRCodeModal';
import { TouchableOpacity, View, Image } from 'react-native';
import LoginService from '../../services/login';
import { usePepperUser } from '../../hooks/user.hooks';
import { UtilService } from '../../services/util';
import { PepperStackRoutes } from '../../models/routes';

export const PepperTitle = (): JSX.Element => (
  <PepperImage src={PepperImages.PepperTitle} style={
    { width: 20 * space_unit, height: 3.5 * space_unit, marginTop: .5 * space_unit }
  }></PepperImage>
);

export const PepperUserProfile = (userProfileProps: {
  route: { name: string },
  navigation: { push: (route: string) => void, goBack: () => void },
}): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const currentUser = usePepperUser();

  // Show Qr code button only when user is logged in
  useEffect( () => {
    const abortController = new AbortController();
    (async() => {
      try {
        const loggedIn = await LoginService.isLoggedin();
        setIsLoggedIn(loggedIn);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        UtilService.throwError(error);
      }
    })();
    return () => { abortController.abort(); };
  }, [currentUser]);

  const onToggleProfile = (): void => {
    if (userProfileProps.route.name !== PepperStackRoutes.UserDescription) {
      userProfileProps.navigation.push(PepperStackRoutes.UserDescription);
      return;
    }
    userProfileProps.navigation.goBack();
  };

  return (
    <>
      { (isLoggedIn && !!currentUser.user) ?
        (
          <TouchableOpacity onPress={onToggleProfile}>
            <View style={{
              width: 6 * space_unit,
              height: 6 * space_unit,
              borderRadius: 4 * space_unit,
              borderWidth: 1,
              borderColor: indigo_3,
              overflow: 'hidden',
            }}>
              <Image style={{ width: '100%', height: '100%' }} source={{ uri: currentUser?.user?.imgs[0]?.uri }}/>
            </View>
          </TouchableOpacity>
        ) : null
      }
    </>
  );
};
//  :

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
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
