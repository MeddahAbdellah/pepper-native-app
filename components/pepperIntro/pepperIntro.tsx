import React from 'react';
import { StyleSheet, View } from 'react-native';
import PepperCarousel from '../pepperCarousel/pepperCarousel';
import { PepperImages } from '../pepperImage/pepperImage';
import { PepperStackRoutes } from '../../models/routes';

const PepperIntro = (): JSX.Element => (
  <View style={styles.container}>
    <PepperCarousel pages={[
      { image: PepperImages.Weirdo, text: 'Afraid of going on a date and getting stuck with a weirdo for the entire time' },
      { image: PepperImages.Bar, text: 'Pepper Parties are the best place to meet awesome guys/girls' },
      { image: PepperImages.Bracelets, text: 'You will all have the same bracelets so talking to strangers will be much easier' },
    ]}
    nextStep={PepperStackRoutes.Tutorial}
    ></PepperCarousel>
  </View>
);

export default PepperIntro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
