import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import {
  space_unit, fontSizeRegular, raven, white,
} from '../../styles/common';
import LoginService from '../../services/login';

const PepperOrganizerParties = (): JSX.Element => (
  <View style={styles.container}>
    <PepperImage src={PepperImages.Sos} style={styles.image}></PepperImage>
    <Text style={styles.description}> You did not create any party </Text>
    <Text style={{ ...styles.description, marginBottom: 4 * space_unit }}> Do something mate </Text>
    <TouchableOpacity onPress={async() => {
      await LoginService.logout();
    }}><Text style={styles.description}> logoutt </Text></TouchableOpacity>
  </View>
);

export default PepperOrganizerParties;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '30%',
    marginBottom: 4 * space_unit,
  },
  description: {
    width: '80%',
    textAlign: 'center',
    fontSize: fontSizeRegular,
    color: raven,
  },
});
