import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity,
} from 'react-native';
import {
  white, space_unit, pepper,
} from '../../styles/common';
import LoginService from '../../services/login';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { resetOrganizer, updateOrganizer } from '../../features/organizer/organizerActions';
import { useNavigation } from '@react-navigation/native';
import { PepperOrganizerStackRoutes } from '../../models/routes';
import {
  FormSchema, PepperForm, FormType, alwaysValidValidator, MenuItem,
  nameWithSpaceValidator, addressValidator, KeyBoardType, phoneNumberValidator, numberValidator,
} from '../pepperForm';
import { usePepperOrganizer } from '../../hooks/organizer.hooks';
import { fetchOrganizer } from '../../features/organizer/organizerActions';

const PepperOrganizerMain = (): JSX.Element => {
  const [schema, setSchema] = useState<FormSchema>({});
  const storeDispatch = usePepperDispatch();
  // Fetch organizer on load
  useEffect(() => { storeDispatch(fetchOrganizer()); }, []);
  const currentOrganizer = usePepperOrganizer();
  useEffect(() => {
    if (!currentOrganizer.organizer) { return; }
    setSchema({
      imgs: {
        type: FormType.Image,
        initialValue: currentOrganizer.organizer.imgs,
      },
      title: {
        type: FormType.Text,
        label: 'Title (name of the bar)',
        initialValue: currentOrganizer.organizer.title,
        max: 20,
        validator: nameWithSpaceValidator,
      },
      location: {
        type: FormType.Text,
        label: 'Address of the establishment',
        max: 60,
        initialValue: currentOrganizer.organizer.location,
        validator: addressValidator,
      },
      phoneNumber: {
        type: FormType.Text,
        keyboardType: KeyBoardType.Numeric,
        label: 'Phone number',
        initialValue: currentOrganizer.organizer.phoneNumber,
        max: 10,
        validator: phoneNumberValidator,
      },
      description: {
        type: FormType.Text,
        label: 'Description',
        initialValue: currentOrganizer.organizer.description,
        multiline: true,
        max: 200,
        validator: alwaysValidValidator,
      },
      foods: {
        type: FormType.Menu,
        label: 'Foods served',
        initialValue: currentOrganizer.organizer.foods,
        nameValidator: nameWithSpaceValidator,
        priceValidator: numberValidator,
      },
      drinks: {
        type: FormType.Menu,
        label: 'Drinks served',
        initialValue: currentOrganizer.organizer.drinks,
        nameValidator: nameWithSpaceValidator,
        priceValidator: numberValidator,
      },
    });
  }, [currentOrganizer]);

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  const updatePersonalInfo = (result: { [key: string]: string | MenuItem[] | string[]; }): void => {
    storeDispatch(updateOrganizer(result));
  };

  return (
    <ScrollView style={{ backgroundColor: white }}>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <PepperForm
            schema={schema}
            onSubmit={updatePersonalInfo}
            style={{ padding: 0, marginTop: 2 * space_unit }}
            hasUpdateButton={true}
            submitOnImageChange={true}></PepperForm>
        </View>
        <TouchableOpacity style={styles.logoutButton}
          onPress={async() => {
            await LoginService.logout();
            storeDispatch(resetOrganizer());
            navigation.navigate(PepperOrganizerStackRoutes.LandingPage);
          }}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PepperOrganizerMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: space_unit,
    paddingBottom: 4 * space_unit,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 2 * space_unit,
    marginTop: space_unit,
  },
  logoutButton: {
    flexDirection: 'row',
    marginTop: 4 * space_unit,
    borderRadius: 1 * space_unit,
  },
  logoutButtonText: {
    width: '80%',
    textAlign: 'center',
    color: pepper,
  },
});
