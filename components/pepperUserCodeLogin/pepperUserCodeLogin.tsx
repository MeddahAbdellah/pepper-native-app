import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { white } from '../../styles/common';
import {
  FormSchema, FormType, PepperForm, KeyBoardType,
} from '../pepperForm';
import { codeValidator } from '../pepperForm/validators';
import { useNavigation } from '@react-navigation/native';
import { PepperStackRoutes } from '../../models/routes';
import LoginService from '../../services/login';
import Toast from 'react-native-root-toast';
import { UtilService } from '../../services/util';

const PepperUserCodeLogin = (loginProps: { route: { params: { phoneNumber: string } } }): JSX.Element => {
  const schemas: FormSchema = {
    code: {
      type: FormType.Text,
      keyboardType: KeyBoardType.Numeric,
      label: 'Enter the code received by sms',
      max: 6,
      validator: codeValidator,
    },
  };

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <PepperForm schema={schemas} onSubmit={async(loginFormOutput) => {
        const { phoneNumber } = loginProps.route.params;
        const { code } = loginFormOutput;
        // FIX: Type inference
        try {
          const loginSuccess = await LoginService.login(phoneNumber, code as string);
          if (loginSuccess) {
            navigation.navigate(PepperStackRoutes.Main);
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error.status === 401 ) {
            Toast.show('The code is not valid', {
              duration: Toast.durations.LONG,
              hideOnPress: true,
              opacity: .9,
              textStyle: Platform.select({
                ios: {
                  fontFamily: 'Arial'
                },
                android: {
                  fontFamily: 'normal'
                },
              })
            });
            return;
          }
          UtilService.throwError(error);
        }
      }}/>
    </View>
  );
};

export default PepperUserCodeLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
