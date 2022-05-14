import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import {
  white, space_unit, indigo_3, fontSizeRegular, raven,
} from '../../styles/common';
import {
  addressValidator,
  FormSchema, FormType, KeyBoardType, nameWithSpaceValidator, numberValidator, passwordValidator, phoneNumberValidator,
} from '../pepperForm';
import {
  nameValidator, alwaysValidValidator,
} from '../pepperForm';
import { PepperFormStepper } from '../pepperForm/pepperFormStepper';
import { useNavigation } from '@react-navigation/native';
import { PepperOrganizerStackRoutes } from '../../models/routes';
import LoginService from '../../services/login';
import { UtilService } from '../../services/util';

const PepperOrganizerSubscription = (): JSX.Element => {
  const schemas: FormSchema[] = [
    {
      userName: {
        type: FormType.Text,
        label: 'User name',
        max: 20,
        validator: nameValidator,
      },
      password: {
        type: FormType.Text,
        label: 'Password',
        isPassword: true,
        max: 20,
        validator: passwordValidator,
      },
    },
    {
      title: {
        type: FormType.Text,
        label: 'Title (name of the bar)',
        max: 20,
        validator: nameWithSpaceValidator,
      },
      location: {
        type: FormType.Text,
        label: 'Address of the establishment',
        max: 60,
        validator: addressValidator,
      },
      phoneNumber: {
        type: FormType.Text,
        keyboardType: KeyBoardType.Numeric,
        label: 'Phone number',
        max: 10,
        validator: phoneNumberValidator,
      },
    },
    {
      description: {
        type: FormType.Text,
        label: 'A small description of the place',
        multiline: true,
        max: 200,
        validator: alwaysValidValidator,
      },
    },
    {
      imgs: {
        type: FormType.Image,
      },
    },
    {
      foods: {
        type: FormType.Menu,
        label: 'Foods served',
        nameValidator: nameWithSpaceValidator,
        priceValidator: numberValidator,
      },
    },
    {
      drinks: {
        type: FormType.Menu,
        label: 'Drinks served',
        nameValidator: nameWithSpaceValidator,
        priceValidator: numberValidator,
      },
    },
  ];

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <PepperFormStepper schemas={schemas} onDone={async(subscriptionFormOutput) => {
        // FIX: fix type inferance
        const {
          userName,
          password,
          title,
          location,
          phoneNumber,
          description,
          foods,
          drinks,
          imgs,
        } = subscriptionFormOutput;

        try {
          const subcribeSuccess = await LoginService.organizerSsubscribe(
            userName as string,
            password as string,
            title as string,
            location as string,
            phoneNumber as string,
            description as string,
            foods as Array<{ name: string, price: number }>,
            drinks as Array<{ name: string, price: number }>,
            imgs as Array<{ uri: string }>,
          );
          if (subcribeSuccess) {
            navigation.navigate(PepperOrganizerStackRoutes.Main);
          }
        // we are catching an error that could be anything
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          UtilService.throwError(error);
        }
      }}/>
      <TouchableOpacity style={styles.loginButton} onPress={() => { navigation.navigate(PepperOrganizerStackRoutes.Login); }}>
        <Text style={styles.loginText}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PepperOrganizerSubscription;

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
  },
  image: {
    height: '40%',
    marginBottom: 4 * space_unit,
  },
  description: {
    width: '90%',
    textAlign: 'center',
    fontSize: fontSizeRegular,
    color: raven,
  },
  headerContainer: {
    height: '70%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
