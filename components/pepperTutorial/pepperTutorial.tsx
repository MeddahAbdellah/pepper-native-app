import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PepperCarousel from '../pepperCarousel/pepperCarousel';
import { PepperImages } from '../pepperImage/pepperImage';
import { PepperStackRoutes } from '../../models/routes';
import { usePepperUser } from '../../hooks/user.hooks';
import { Gender } from '../../models/types';
import { pepper, white } from '../../styles/common';

const PepperTutorial = (): JSX.Element => {
  const currentUser = usePepperUser();
  const genderDependentSlide = currentUser.user.gender === Gender.MAN ?
    ({
      image: PepperImages.FamousMan, text: (<>
        Being ghosted is no way to find a lover, in
        {(<Text style={{ color: pepper, fontFamily: 'Sora_700Bold' }}> Pepper parties </Text>)}
        everyone will see the star you are </>)
    }) :
    ({
      image: PepperImages.FamousWoman,
      text: (<>
        You are not just a pretty picture to wipe on, in
        {(<Text style={{ color: pepper, fontFamily: 'Sora_700Bold' }}> Pepper parties </Text>)}
        you will be treated like the star you are! </>)
    });

  return (
    <View style={styles.container}>
      <PepperCarousel pages={[
        { image: PepperImages.Romance, text: 'When you’ll get to the event you will probably meet some lovely people' },
        {
          image: PepperImages.QrCode,
          text: `As soon as you get to the event, scan the QR code at the entrance and
you will be able to see the people that are coming!`
        },
        {
          image: PepperImages.Swipe,
          text: `If you see someone you like, swipe right!
you might match with someone that you can actually talk to!`,
        },
        genderDependentSlide,
      ]}
      nextStep={PepperStackRoutes.Main}
      ></PepperCarousel>
    </View>
  );
};

export default PepperTutorial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
