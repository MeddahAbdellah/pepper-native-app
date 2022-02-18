import React from 'react';
import LoginService from '../../services/login';
import { useNavigation } from '@react-navigation/native';
import { PepperStackRoutes } from '../../models/routes';
import {
  PepperForm, FormType, FormSchema, MenuItem, phoneNumberValidator,
} from '../pepperForm';

const PepperLoginRouter = (): JSX.Element => {
  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const schema: FormSchema = {
    phoneNumber: {
      type: FormType.Text,
      label: 'Enter your phone number',
      max: 13,
      validator: phoneNumberValidator,
    },
  };

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

  return <PepperForm schema={schema} onSubmit={onPhoneSubmit}/>;
};

export default PepperLoginRouter;
