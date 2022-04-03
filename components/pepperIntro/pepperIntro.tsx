import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PepperCarousel from '../pepperCarousel/pepperCarousel';
import { PepperImages } from '../pepperImage/pepperImage';
import { PepperStackRoutes } from '../../models/routes';
import { white, pepper } from '../../styles/common';

const PepperIntro = (introProps: { route: { params: { phoneNumber: string} } }): JSX.Element => (
  <View style={styles.container}>
    <PepperCarousel pages={[
      { image: PepperImages.Weirdo, text: 'Afraid of going on a date and getting stuck with a weirdo for the entire time' },
      {
        image: PepperImages.Bar, text: (<>
          {(<Text style={{ color: pepper, fontFamily: 'Sora_700Bold' }}> Pepper parties </Text>)}
        are the best place to meet awesome people</>)
      },
      { image: PepperImages.Bracelets, text: 'You will all have the same bracelets so talking to strangers will be much easier' },
      { image: PepperImages.Parity, text: 'The parity will be respected! Half girlz half boyz' },
    ]}
    nextStep={PepperStackRoutes.Subscription}
    paramsToPass={introProps.route.params}
    ></PepperCarousel>
  </View>
);

export default PepperIntro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
