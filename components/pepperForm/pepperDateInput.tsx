import React, { useState } from 'react';
import {
  StyleSheet, View, Modal, TextInput, Text, TouchableOpacity, Dimensions 
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment, { Moment } from 'moment';
import {
  fontSizeRegular, space_unit, grey_3, pepper_2, color, grey_1, grey_2, white, black, pepper, fontSizeTypo, raven, indigo_3, indigo_2, fontSizeBody 
} from '../../styles/common';
import { DateInputSchema } from './formTypes';
import _ from 'lodash';
import { BlurView } from 'expo-blur';

interface IDateInput extends Omit<DateInputSchema, 'type'> {
  onSubmit: (value: string) => void,
};


export const PepperDateInput = (dateInputProps: IDateInput): JSX.Element => {
  // date picker width must be calculated dynamically as the library does not adapt to parent width
  const datePickerWidth = (Dimensions.get("window").width * .95) - (2 * space_unit);

  const [isModalVisible, setIsModalVisible ] = useState(false);
  const [date, setDate ] = useState(moment());
  const [error, setError] = useState('');
   
  const onDateChange = (newDate: Moment): void => {
    setIsModalVisible(false);
    setDate(newDate);
    setError(dateInputProps.validator(newDate));
    dateInputProps.onSubmit(newDate.toString());
  };

  const StaticDatePickerModal = (): JSX.Element => (
    <Modal
      animationType="fade"
      visible={isModalVisible}
      transparent={true}
      onRequestClose={() => setIsModalVisible(false) }>
      <BlurView tint="dark" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <CalendarPicker
            selectedStartDate={date.toDate()}
            initialDate={date.toDate()}
            selectedDayColor={pepper}
            selectedDayTextStyle={{ color: white }}
            textStyle={{ fontSize: fontSizeTypo, color: raven }}
            yearTitleStyle={{ fontSize: fontSizeBody, color: indigo_3, marginBottom: space_unit }}
            monthTitleStyle={{ fontSize: fontSizeBody, color: indigo_2, marginBottom: space_unit }}
            width={datePickerWidth}
            onDateChange={onDateChange} />
        </View>
      </BlurView>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <StaticDatePickerModal/>
      <Text style={styles.label}>{dateInputProps.label}</Text>
      <TouchableOpacity onPress={() => {
        setIsModalVisible(true);
      }}>
        <TextInput
          value={date.format('YYYY MMM DD')}
          style={{...styles.dateInput, ...(_.isEmpty(error) ? {} : { shadowColor: pepper_2 })}}
          pointerEvents="none"
        />
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  label: {
    fontSize: fontSizeRegular,
    marginBottom: space_unit,
    marginLeft: space_unit,
    color: grey_3,
  },
  error: {
    marginTop: space_unit,
    marginLeft: space_unit,
    color: pepper_2,
  },
  dateInput: {
    padding: 2 * space_unit,
    fontSize: fontSizeRegular,
    color: grey_3,
    backgroundColor: color(grey_1, .4),
    borderColor: grey_2,
    elevation: 1,
    shadowColor: grey_1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    borderRadius: space_unit,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
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
