import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import {
  white, space_unit, indigo_3, fontSizeRegular,
} from '../../styles/common';
import { FormSchema, FormType } from '../pepperForm';
import {
  legalAgeValidator, nameValidator, cityValidator, alwaysValidValidator, phoneNumberValidator, codeValidator,
} from '../pepperForm';
import { PepperFormStepper } from '../pepperForm/pepperFormStepper';
import { useNavigation } from '@react-navigation/native';
import { PepperStackRoutes } from '../../models/routes';
import LoginService from '../../services/login';
import { Gender } from '../../models/types';
import { UtilService } from '../../services/util';
import Toast from 'react-native-root-toast';

const PepperUserSubscription = (): JSX.Element => {
  const schemas: FormSchema[] = [
    {
      phoneNumber: {
        type: FormType.Text,
        label: 'Confirm your phone number',
        max: 13,
        validator: phoneNumberValidator,
      },
    },
    {
      name: {
        type: FormType.Text,
        label: 'Name',
        max: 20,
        validator: nameValidator,
      },
      gender: {
        type: FormType.Gender,
      },
      dateOfBirth: {
        type: FormType.Date,
        label: 'Date of birth',
        validator: legalAgeValidator,
      },
    },
    {
      job: {
        type: FormType.Text,
        label: 'Job',
        max: 20,
        validator: nameValidator,
      },
      address: {
        type: FormType.Text,
        label: 'Ville',
        max: 30,
        validator: cityValidator,
      },
      description: {
        type: FormType.Text,
        label: 'Description',
        multiline: true,
        max: 200,
        validator: alwaysValidValidator,
      },
    },
    {
      code: {
        type: FormType.Text,
        label: 'Enter the code received by sms',
        max: 6,
        validator: codeValidator,
      },
    }
  ];

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <PepperFormStepper schemas={schemas} onDone={async(subscriptionFormOutput) => {
        // FIX: fix type inferance
        const {
          phoneNumber,
          code,
          name,
          gender,
          address,
          description,
          job,
        } = subscriptionFormOutput;

        try {
          // TODO: remove phoneNumberInput
          const subcribeSuccess = await LoginService.subscribe(
            phoneNumber as string,
            code as string,
            name as string,
            gender as Gender,
            address as string,
            description as string,
            job as string,
          );
          if (subcribeSuccess) {
            navigation.navigate(PepperStackRoutes.Tutorial);
          }
        } catch (error) {
          if (error.status === 401 ) {
            Toast.show('The code is not valid', {
              duration: Toast.durations.LONG,
              hideOnPress: true,
              opacity: .9,
            });
            return;
          }
          UtilService.throwError(error);
        }
      }}/>
      <TouchableOpacity style={styles.loginButton} onPress={() => { navigation.navigate(PepperStackRoutes.LoginRouter); }}>
        <Text style={styles.loginText}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PepperUserSubscription;

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
