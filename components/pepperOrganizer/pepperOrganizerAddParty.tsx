import React, { } from 'react';
import { StyleSheet, View, Platform } from 'react-native';
// import { PepperStackRoutes } from '../../models/routes';
import {
  fontSizeRegular, indigo_3, space_unit, white,
} from '../../styles/common';
// import { useNavigation } from '@react-navigation/native';
import {
  FormSchema, FormType, KeyBoardType, nameValidator, numberValidator, PepperFormStepper, upcomingDateValidator,
} from '../pepperForm';
import Toast from 'react-native-root-toast';
import moment from 'moment';

const PepperOrganizerAddParty = (): JSX.Element => {
  const schemas: FormSchema[] = [
    {
      theme: {
        type: FormType.Text,
        label: 'The Theme of your Party ',
        max: 20,
        validator: nameValidator,
      },
      date: {
        type: FormType.Date,
        label: 'The Date ',
        isEventDate: true,
        initialValue: moment(),
        validator: upcomingDateValidator,

      },
      price: {
        type: FormType.Text,
        keyboardType: KeyBoardType.Numeric,
        label: 'Entrance Fee',
        max: 20,
        validator: numberValidator,
      },
      people: {
        type: FormType.Text,
        keyboardType: KeyBoardType.Numeric,
        label: 'Maximum Allowed Attandance',
        max: 20,
        validator: numberValidator,
      },
      minAge: {
        type: FormType.Text,
        keyboardType: KeyBoardType.Numeric,
        label: 'Attandance Minimum Age ',
        max: 20,
        validator: numberValidator,
      },
      maxAge: {
        type: FormType.Text,
        keyboardType: KeyBoardType.Numeric,
        label: 'Attandance Maximum Age ',
        max: 20,
        validator: numberValidator,
      },

    }
  ];

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <PepperFormStepper schemas={schemas} onDone={async(loginFormOutput) => {

        const {
          // theme,
          // date,
          // price,
          // people,
          maxAge,
          minAge
        } = loginFormOutput;

        if ((maxAge as unknown as Number) < (minAge as unknown as Number)) {
          Toast.show('Allowed Age interval is wrong', {
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


      }
      }
      />
    </View>
  );
};

export default PepperOrganizerAddParty;

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
