import React from 'react';
import {
  View, Text, Button, StyleSheet,
} from 'react-native';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import {
  space_unit, fontSizeRegular, raven, white,
} from '../../styles/common';
import { UtilService } from '../../services/util';

const PepperError = (): JSX.Element => (
  <View style={styles.container}>
    <PepperImage src={PepperImages.Sos} style={styles.image}></PepperImage>
    <Text style={styles.description}> The app is on fire!!</Text>
    <Text style={{ ...styles.description, marginBottom: 4 * space_unit }}> we're calling the firemen </Text>
    <Button title="Reload" onPress={ async() => {
      await UtilService.clearErrors();
    }}/>
  </View>
);

export default PepperError;

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
