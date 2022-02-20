import React, { useState } from 'react';
import {
  StyleSheet, View, Modal, TextInput, Text, TouchableOpacity, Dimensions,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import moment, { Moment } from 'moment';
import {
  fontSizeRegular, space_unit, grey_3, white, black, pepper,
  fontSizeTypo, raven, indigo_3, indigo_2, fontSizeBody, indigo,
} from '../../styles/common';
import { DateInputSchema } from './formTypes';
import _ from 'lodash';
import { BlurView } from 'expo-blur';
import { inputStyle, inputErrorStyle } from './style';

interface IDateInput extends Omit<DateInputSchema, 'type'> {
  onSubmit: (result: {value: string, valid: boolean}) => void,
};

const MIN_AGE = 18;
const MAX_AGE = 37;

export const PepperDateInput = (dateInputProps: IDateInput): JSX.Element => {
  // date picker width must be calculated dynamically as the library does not adapt to parent width
  const datePickerWidth = (Dimensions.get('window').width * .95) - (2 * space_unit);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [date, setDate] = useState(moment().subtract(MIN_AGE, 'years').startOf('year'));
  const [error, setError] = useState('');

  const onDateChange = (newDate: Moment): void => {
    setIsModalVisible(false);
    setDate(newDate);
    const validation = dateInputProps.validator(newDate);
    setError(validation);
    dateInputProps.onSubmit({ value: newDate.toString(), valid: _.isEmpty(validation) });
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
            selectedStartDate={(dateInputProps.initialValue ? dateInputProps.initialValue : date).toDate()}
            initialDate={(dateInputProps.initialValue ? dateInputProps.initialValue : date).toDate()}
            minDate={moment().subtract(MAX_AGE, 'years').startOf('year').toDate()}
            maxDate={moment().subtract(MIN_AGE, 'years').toDate()}
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
        <View pointerEvents="none">
          <TextInput
            value={date.format('YYYY MMM DD')}
            style={{ ...styles.dateInput, ...(_.isEmpty(error) ? {} : { shadowColor: indigo }) }}
          />
        </View>
      </TouchableOpacity>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginBottom: 2 * space_unit,
  },
  label: {
    fontSize: fontSizeRegular,
    marginBottom: space_unit,
    marginLeft: space_unit,
    color: grey_3,
  },
  error: inputErrorStyle,
  dateInput: inputStyle,
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
