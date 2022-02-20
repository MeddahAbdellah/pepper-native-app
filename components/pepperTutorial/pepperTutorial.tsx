import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import PepperCarousel from '../pepperCarousel/pepperCarousel';
import { PepperImages } from '../pepperImage/pepperImage';
import { PepperStackRoutes } from '../../models/routes';
import { usePepperUser } from '../../hooks/user.hooks';
import { Gender } from '../../models/types';
import { pepper, indigo, white } from '../../styles/common';

const PepperTutorial = (): JSX.Element => {
  const currentUser = usePepperUser();
  const genderDependentSlide = currentUser.user.gender === Gender.MAN ?
    ({
      image: PepperImages.FamousMan, text: (<>
        Swiping and being ghosted is no way to find a lover, in
        {(<Text style={{ color: pepper, fontFamily: 'Sora_700Bold' }}> Pepper parties </Text>)}
        everyone will see the star you are </>)
    }) :
    ({
      image: PepperImages.FamousWoman,
      text: (<>
        No one should be able to get you by a single swipe, in
        {(<Text style={{ color: pepper, fontFamily: 'Sora_700Bold' }}> Pepper parties </Text>)}
        you will be treated like the star you are! </>)
    });

  return (
    <View style={styles.container}>
      <PepperCarousel pages={[
        { image: PepperImages.QrCode, text: 'Everyone has a QR code! The people you meet will want to scan it to see your profile' },
        { image: PepperImages.Romance, text: 'When you’ll get to the event you will probably meet some lovely people' },
        { image: PepperImages.ScanQr, text: 'If you hit it off with someone scan their QR code or show them yours' },
        {
          image: PepperImages.Safe,
          text: (<>
            For safety reasons profiles will be available to view only
            {(<Text style={{ color: indigo, fontFamily: 'Sora_700Bold' }}> 24 hours after </Text>)}
            QR codes are exchanged and consent of both parties </>)
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
