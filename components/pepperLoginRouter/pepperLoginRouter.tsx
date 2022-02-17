import React, { useEffect, useState } from 'react';
import LoginService from '../../services/login';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PepperStackRoutes } from '../../models/routes';
import { pepper } from '../../styles/common';
import {
  PepperForm, FormType, FormSchema, MenuItem, phoneNumberValidator,
} from '../pepperForm';
import { UtilService } from '../../services/util';
import { useFonts, Sora_400Regular } from '@expo-google-fonts/sora';
import { setCustomText } from 'react-native-global-props';

const PepperLoginRouter = (): JSX.Element => {
  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const [isPhoneFormShowing, setIsPhoneFormShowing] = useState(false);
  // Font name must be equal to this
  // eslint-disable-next-line @typescript-eslint/naming-convention
  let [fontsLoaded] = useFonts({ Sora_400Regular });
  const schema: FormSchema = {
    phoneNumber: {
      type: FormType.Text,
      label: 'Phone number',
      max: 13,
      validator: phoneNumberValidator,
    },
  };

  useEffect(() => {
    if (!fontsLoaded) { return; }
    setCustomText({ style: { fontFamily: 'Sora_400Regular' } });
    (async() => {
      try {
        await LoginService.logout();
        const isLoggedin = await LoginService.isLoggedin();
        if (isLoggedin) {
          navigation.navigate(PepperStackRoutes.Main);
          return;
        }
        setIsPhoneFormShowing(true);
      } catch (error) {
        UtilService.throwError(error);
      }
    });
  }, [fontsLoaded]);

  // FIX: fix typing
  const onPhoneSubmit = async(output: { [key: string]: string | MenuItem[] }): Promise<void> => {
    const { phoneNumber } = output;
    const isSubscribed = await LoginService.isSubscribedAndInitLogin(phoneNumber as string);
    if (isSubscribed) {
      navigation.navigate(PepperStackRoutes.CodeLogin, { phoneNumber });
      return;
    }
    // Intro has subscription after it thats why we are routing to it
    navigation.navigate(PepperStackRoutes.Intro);
  };

  return isPhoneFormShowing ?
    <ActivityIndicator size="large" color={pepper} /> :
    <PepperForm schema={schema} onSubmit={onPhoneSubmit}/>;
};

export default PepperLoginRouter;
