import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PepperCarousel from '../pepperCarousel/pepperCarousel';
import { PepperImages } from '../pepperImage/pepperImage';
import { PepperStackRoutes } from '../../models/routes';
import { indigo, white } from '../../styles/common';

const PepperOrganizerLogin = (): JSX.Element => (
  <View style={styles.container}>
    <PepperCarousel pages={[
      {
        image: PepperImages.Cupid,
        text: (<>
            Host a
          {(<Text style={{ color: indigo, fontFamily: 'Sora_700Bold' }}> Your login </Text>)}
            withing your establishment </>)
      }
    ]}
    nextStep={PepperStackRoutes.LoginRouter}
    ></PepperCarousel>
  </View>
);

export default PepperOrganizerLogin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
