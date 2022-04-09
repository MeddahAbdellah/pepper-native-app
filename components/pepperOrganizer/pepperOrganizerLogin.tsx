import React, { useEffect, useState } from 'react';
import {
  Keyboard, StyleSheet, TouchableOpacity, View, Text, Platform,
} from 'react-native';
import { PepperStackRoutes } from '../../models/routes';
import {
  fontSizeRegular, indigo_3, space_unit, white,
} from '../../styles/common';
import { useNavigation } from '@react-navigation/native';
import {
  FormSchema, FormType, nameValidator, PepperFormStepper, alwaysValidValidator,
} from '../pepperForm';
import LoginService from '../../services/login';
import Toast from 'react-native-root-toast';

const PepperOrganizerLogin = (): JSX.Element => {
  const [hasGoToLoginButton, setHasGoToLoginButton] = useState(true);
  const schemas: FormSchema[] = [
    {
      userName: {
        type: FormType.Text,
        label: 'The Establishment\'s Account Name ',
        max: 20,
        validator: nameValidator,
      },
      password: {
        type: FormType.Text,
        password: true,
        label: 'password',
        max: 20,
        validator: alwaysValidValidator,
      },
    }
  ];

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  useEffect(() => {
    const eventShow = Keyboard.addListener('keyboardDidShow', () => setHasGoToLoginButton(false));
    const eventHide = Keyboard.addListener('keyboardDidHide', () => setHasGoToLoginButton(true));
    return () => {
      eventHide.remove();
      eventShow.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <PepperFormStepper schemas={schemas} onDone={async(loginFormOutput) => {

        const {
          userName,
          password,
        } = loginFormOutput;
        try {
          const loginSuccess = await LoginService.loginOrganizer(userName as string, password as string);
          if (loginSuccess) {
            navigation.navigate(PepperStackRoutes.Main);
          }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          Toast.show('Wrong Account and password', {
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
        }
      }
      }
      />
      {
        hasGoToLoginButton ?
          <TouchableOpacity style={styles.loginButton} onPress={() => { navigation.navigate(PepperStackRoutes.Subscription); }}>
            <Text style={styles.loginText}>Create Your Establishment ?</Text>
          </TouchableOpacity> :
          null
      }
    </View>
  );
};

export default PepperOrganizerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    position: 'absolute',
    bottom: 5 * space_unit,
    left: 3 * space_unit,
    zIndex: 2,
  },
  loginText: {
    fontSize: fontSizeRegular,
    color: indigo_3,
    textDecorationLine: 'underline'
  }
});
