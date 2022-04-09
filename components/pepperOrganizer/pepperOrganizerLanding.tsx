import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PepperCarousel from '../pepperCarousel/pepperCarousel';
import { PepperImages } from '../pepperImage/pepperImage';
import { PepperStackRoutes } from '../../models/routes';
import { indigo, white } from '../../styles/common';

const PepperOrganizerIntro = (): JSX.Element => (
  <View style={styles.container}>
    <PepperCarousel pages={[
      {
        image: PepperImages.Sir,
        text: (<>
            Host a
          {(<Text style={{ color: indigo, fontFamily: 'Sora_700Bold' }}> Pepper Party </Text>)}
            withing your establishment </>)
      },
      {
        image: PepperImages.Bar,
        text: (<>
            create and customize your themed party to wellcome our
          {(<Text style={{ color: indigo, fontFamily: 'Sora_700Bold' }}> Stars </Text>)}
        </>)
      },
    ]}
    nextStep={PepperStackRoutes.Subscription}
    ></PepperCarousel>
  </View>
);

export default PepperOrganizerIntro;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
