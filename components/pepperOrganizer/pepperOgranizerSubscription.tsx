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
  FormSchema, FormType, KeyBoardType, phoneNumberValidator, nameValidator, cityValidator,
  alwaysValidValidator, PepperFormStepper, priceValidator, passwordValidator, MenuItem,
} from '../pepperForm';
import LoginService from '../../services/login';
import Toast from 'react-native-root-toast';
import { UtilService } from '../../services/util';

const PepperOrganizerSubscribe = (): JSX.Element => {
  const [hasGoToLoginButton, setHasGoToLoginButton] = useState(true);
  const schemas: FormSchema[] = [
    {
      title: {
        type: FormType.Text,
        label: 'The Commercial Name of your Establishment ',
        max: 20,
        validator: nameValidator,
      },
      description: {
        type: FormType.Text,
        label: 'Small description of the Establishments',
        max: 20,
        validator: alwaysValidValidator,
      },
    },
    {
      phoneNumber: {
        type: FormType.Text,
        keyboardType: KeyBoardType.Numeric,
        label: 'The official Establishment\'s phone Number ',
        max: 10,
        validator: phoneNumberValidator,
      },
      location: {
        type: FormType.Text,
        label: 'The establishment\'s adresse',
        max: 30,
        validator: cityValidator,
      },
    },
    {
      imgs: {
        type: FormType.Image,
      },
    },
    {
      drinks: {
        type: FormType.Menu,
        label: 'Drinks',
        nameValidator,
        priceValidator
      },
    },
    {
      foods: {
        type: FormType.Menu,
        label: 'Foods',
        nameValidator,
        priceValidator
      },
    },
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
        validator: passwordValidator,
      },
      password2: {
        type: FormType.Text,
        password: true,
        label: ' confirm your password',
        max: 20,
        validator: alwaysValidValidator,
      }
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
      <PepperFormStepper schemas={schemas} onDone={async(subscriptionFormOutput) => {
        // eslint-disable-next-line no-console
        const {
          title,
          location,
          password,
          password2,
          drinks,
          foods,
          userName,
          imgs,
          phoneNumber,
          description
        } = subscriptionFormOutput;
        if (password !== password2) {
          Toast.show('Passwords not matching', {
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
        try {
          let foodsTyped = Array<{ name: string, price: number}>();
          (foods as MenuItem[]).forEach(element => {
            foodsTyped.push({ name: element.name, price: Number(element.price) });
          });

          let drinksTyped = Array<{ name: string, price: number}>();
          (drinks as MenuItem[]).forEach(element => {
            drinksTyped.push({ name: element.name, price: Number(element.price) });
          });
          // TODO: remove phoneNumberInput
          const subcribeSuccess = await LoginService.subscribeOrganizer(
            userName as string,
            phoneNumber as string,
            password as string,
            title as string,
            location as string,
            description as string,
            imgs as Array<{ uri: string}>,
            foodsTyped,
            drinksTyped
          );
          if (subcribeSuccess) {
            navigation.navigate(PepperStackRoutes.Main);
          }
        // we are catching an error that could be anything
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
      {
        hasGoToLoginButton ?
          <TouchableOpacity style={styles.loginButton} onPress={() => { navigation.navigate(PepperStackRoutes.LoginRouter); }}>
            <Text style={styles.loginText}>Connect to Your Establishment ?</Text>
          </TouchableOpacity> :
          null
      }
    </View>
  );
};

export default PepperOrganizerSubscribe;

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
