import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet, View, Text, Modal,
} from 'react-native';
import {
  black,
  fontSizeRegular,
  indigo_2, indigo_3, pepper, raven, space_unit, white,
} from '../../../styles/common';
import CalendarPicker, { CustomDateStyle } from 'react-native-calendar-picker';
import moment, { Moment } from 'moment';
import { usePepperOrganizer } from '../../../hooks/organizer.hooks';
import { BlurView } from 'expo-blur';
import { PepperOrganizerNewpartyModel } from './pepperOrganizerModels/pepperOrganizerNewPartyModel';
import { usePepperDispatch } from '../../../hooks/store.hooks';
import { IParty, IPartyEvent } from '../../../models/types';
import { createParty, deleteParty } from '../../../features/organizer/organizerActions';
import _ from 'lodash';
import { PepperOrganizerdeletePartyModel } from './pepperOrganizerModels/pepperOrganizerDeletePartyModel';



export const PepperOrganizerPartyDatePicker = (): JSX.Element => {

  const organizer = usePepperOrganizer();
  const storeDispatch = usePepperDispatch();
  const focusPoint = useRef<CalendarPicker>(null);

  const [eventsDates, setEventsDates] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [createPartyModelVisible, setcreatePartyModelVisible] = useState(false);
  const [partyModelVisible, setPartyModelVisible] = useState(false);
  const [selectedParty, setSelectedParty] = useState<IParty>({} as IParty);

  useEffect(() => {
    let dates = Array<string>();
    organizer.organizer.parties.forEach((i) => {
      dates.push(i.date);
    });
    setEventsDates(dates);
  }, [organizer.organizer.parties]);


  const datePickerWidth = (Dimensions.get('window').width * .95) - (2 * space_unit);

  const onDateChange = (newDate: Moment): void => {
    const targetParty = findSelectedDayParty(newDate);
    if (targetParty === undefined) {
      setcreatePartyModelVisible(true);
    } else {
      setSelectedParty(targetParty);
      setPartyModelVisible(true);
    }
    setSelectedDate(newDate.toISOString());
    if (focusPoint.current !== null) {
      focusPoint.current.resetSelections();
    }
  };

  const createPartyEvent = (partyInfo: IPartyEvent): void => {
    let infomation = { ...partyInfo, date: selectedDate };
    storeDispatch(createParty(infomation));
    setcreatePartyModelVisible(false);
  };

  const deletePartyEvent = (partyId: number): void => {
    storeDispatch(deleteParty({ id: partyId }));
    setcreatePartyModelVisible(false);
  };

  const findSelectedDayParty = (newDate: Moment): IParty | undefined => _.find(organizer.organizer.parties, { date: newDate.toISOString() });

  const parseDateToStypedDates = (dates: string[]): CustomDateStyle[] => {
    const parseSingleDate = (date: string): CustomDateStyle => ({
      date: moment(date, 'YYYY-MM-DD'),
      style: { backgroundColor: pepper },
      textStyle: { color: white },
    });
    let result: CustomDateStyle[] = [];
    dates.forEach((date) => {
      result.push(parseSingleDate(date));
    });
    return result;
  };

  return ( <View style={styles.container}>

    <Text style={{ fontSize: fontSizeRegular, textAlign: 'center' }}>{'Your Calendar : '}</Text>
    <CalendarPicker
      minDate={ moment().subtract(1, 'day').toDate() }
      maxDate={ moment().add(1, 'years').toDate() }
      // selectedDayColor={(eventsDates.indexOf(selectedDate) != -1) ? grey_1 : pepper}
      selectedDayTextStyle={{ color: white }}
      textStyle={{ fontSize: fontSizeRegular, color: raven }}
      yearTitleStyle={{ fontSize: fontSizeRegular, color: indigo_3, marginBottom: space_unit }}
      monthTitleStyle={{ fontSize: fontSizeRegular, color: indigo_2, marginBottom: space_unit }}
      onDateChange={onDateChange}
      ref={focusPoint}
      customDatesStyles={parseDateToStypedDates(eventsDates)}
      width={datePickerWidth}/>

    <Modal
      animationType="fade"
      visible={createPartyModelVisible}
      transparent={true}
      onRequestClose={() => { setcreatePartyModelVisible(false);}}>
      <BlurView tint="dark" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PepperOrganizerNewpartyModel onGoBack={() => {
            setcreatePartyModelVisible(false);
          } } onCreate={createPartyEvent}/>
        </View>
      </BlurView>
    </Modal>

    <Modal
      animationType="fade"
      visible={partyModelVisible}
      transparent={true}
      onRequestClose={() => { setPartyModelVisible(false);}}>
      <BlurView tint="dark" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PepperOrganizerdeletePartyModel partyInfo={selectedParty} onGoBack={() => {
            setPartyModelVisible(false);
          } } onDelete={deletePartyEvent}/>
        </View>
      </BlurView>
    </Modal>


  </View>);
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: space_unit,
    paddingBottom: 4 * space_unit,
    width: '100%'
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  modalContent: {
    width: '92%',
    backgroundColor: white,
    borderRadius: 2 * space_unit,
    paddingVertical: 4 * space_unit,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
