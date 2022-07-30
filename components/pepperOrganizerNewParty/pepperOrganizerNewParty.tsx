import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import {
  white, space_unit, indigo_3, fontSizeRegular, raven, fontSizeBody,
} from '../../styles/common';
import {
  FormSchema, FormType, KeyBoardType, freeNameValidator, numberValidator,
} from '../pepperForm';
import { PepperFormStepper } from '../pepperForm/pepperFormStepper';
import { useNavigation } from '@react-navigation/native';
import { UtilService } from '../../services/util';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { addParty } from '../../features/organizer/organizerActions';
import moment from 'moment';

const PepperOrganizerNewParty = (newPartyProps: { route: { params: { date: string } } }): JSX.Element => {
  const storeDispatch = usePepperDispatch();
  const schemas: FormSchema[] = [
    {
      theme: {
        type: FormType.Text,
        label: 'Theme',
        max: 20,
        validator: freeNameValidator,
      },
      price: {
        type: FormType.Text,
        keyboardType: KeyBoardType.Numeric,
        label: 'Price',
        max: 4,
        validator: numberValidator,
      },
    },
    {
      people: {
        type: FormType.Text,
        keyboardType: KeyBoardType.Numeric,
        label: 'Maximum number of people',
        max: 4,
        validator: numberValidator,
      },
      minAge: {
        type: FormType.Text,
        keyboardType: KeyBoardType.Numeric,
        label: 'Minimum age',
        max: 4,
        validator: numberValidator,
      },
      maxAge: {
        type: FormType.Text,
        keyboardType: KeyBoardType.Numeric,
        label: 'Maximum age',
        max: 4,
        validator: numberValidator,
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
        const { theme, price, people, minAge, maxAge } = subscriptionFormOutput;

        try {
          storeDispatch(addParty({
            theme: theme as string,
            date: moment(newPartyProps.route.params.date),
            price: price as number,
            people: people as number,
            minAge: minAge as number,
            maxAge: maxAge as number,
          })).then(() => {
            navigation.goBack();
          });
        // we are catching an error that could be anything
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          UtilService.throwError(error);
        }
      }}/>
      <TouchableOpacity style={styles.cancelButton} onPress={() => { navigation.goBack(); }}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PepperOrganizerNewParty;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 5 * space_unit,
    left: 3 * space_unit,
    zIndex: 2,
  },
  cancelText: {
    fontSize: fontSizeBody,
    color: indigo_3,
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
