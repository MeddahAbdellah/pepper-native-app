import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, RefreshControl,
} from 'react-native';
import {
  white, space_unit, pepper, fontSizeBody, fontSizeTypo, indigo_2, indigo_3, raven,
} from '../../styles/common';
import LoginService from '../../services/login';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { resetOrganizer, updateOrganizer } from '../../features/organizer/organizerActions';
import { useNavigation } from '@react-navigation/native';
import { PepperOrganizerStackRoutes } from '../../models/routes';
import {
  FormSchema, PepperForm, FormType, alwaysValidValidator, MenuItem,
  freeNameValidator, addressValidator, KeyBoardType, phoneNumberValidator, numberValidator,
} from '../pepperForm';
import { usePepperOrganizer } from '../../hooks/organizer.hooks';
import { fetchOrganizer } from '../../features/organizer/organizerActions';
import moment, { Moment } from 'moment';
import CalendarPicker, { CustomDateStyle } from 'react-native-calendar-picker';
import { StoreStatus } from '../../models/types';

const PepperOrganizerMain = (): JSX.Element => {
  const datePickerWidth = (Dimensions.get('window').width * .95) - (2 * space_unit);

  const [schema, setSchema] = useState<FormSchema>({});
  const [partyDates, setPartyDates] = useState<CustomDateStyle[] | undefined>();
  const storeDispatch = usePepperDispatch();
  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

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
        validator: freeNameValidator,
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
        nameValidator: freeNameValidator,
        priceValidator: numberValidator,
      },
      drinks: {
        type: FormType.Menu,
        label: 'Drinks served',
        initialValue: currentOrganizer.organizer.drinks,
        nameValidator: freeNameValidator,
        priceValidator: numberValidator,
      },
    });
    setPartyDates(getCustomDates());
  }, [currentOrganizer]);

  const updatePersonalInfo = (result: { [key: string]: string | MenuItem[] | string[]; }): void => {
    storeDispatch(updateOrganizer(result));
  };

  const onDateChange = (date: Moment): void => {
    navigation.navigate(PepperOrganizerStackRoutes.NewParty, { date: date.toISOString() });
  };

  const getCustomDates = (): CustomDateStyle[] => currentOrganizer.organizer.parties.map((party) => ({
    date: moment(party.date).clone(),
    style: { backgroundColor: pepper },
    textStyle: { color: white },
    allowDisabled: true,
  }));

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={currentOrganizer.fetchStatus !== StoreStatus.Fulfilled}
          onRefresh={() => storeDispatch(fetchOrganizer())}
        />}
      style={{ backgroundColor: white }}
    >
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <CalendarPicker
            customDatesStyles={partyDates}
            minDate={moment().toDate()}
            maxDate={moment().add(2, 'month').toDate()}
            selectedDayColor={pepper}
            selectedDayTextStyle={{ color: white }}
            textStyle={{ fontSize: fontSizeTypo, color: raven }}
            yearTitleStyle={{ fontSize: fontSizeBody, color: indigo_3, marginBottom: space_unit }}
            monthTitleStyle={{ fontSize: fontSizeBody, color: indigo_2, marginBottom: space_unit }}
            width={datePickerWidth}
            onDateChange={onDateChange} />
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
