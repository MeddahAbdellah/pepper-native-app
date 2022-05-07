import React, { useState } from 'react';
import {
  StyleSheet, View, ImageBackground, Text, TouchableOpacity,
} from 'react-native';
import { IParty, IUserBase } from '../../models/types';
import {
  space_unit, white, fontSizeRegular, raven, black, color, fontSizeHeader, fontSizeSubHeader, grey_1, indigo, pepper, heaven,
} from '../../styles/common';

import Swiper from 'react-native-deck-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import { addMatch } from '../../features/user/userActions';
import { usePepperDispatch } from '../../hooks/store.hooks';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import PepperRoundButton from '../pepperRoundButton/pepperRoundButton';
import { useNavigation } from '@react-navigation/native';
import { PepperStackRoutes } from '../../models/routes';

const PepperPartyAttendees = (descriptionProps: { route: { params: { party: IParty, canCancel: boolean } }}): JSX.Element => {
  const { party } = descriptionProps.route.params;
  const storeDispatch = usePepperDispatch();
  const [hasSwipedAll, setHasSwipedAll] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  const StaticCard = (attendee: IUserBase): JSX.Element => (
    <ImageBackground source={attendee.imgs[0]} style={styles.image} resizeMode="cover">
      <TouchableOpacity
        style={{ ...styles.imageMask, zIndex: styles.imageMask.zIndex + 1 }}
        onPress={() => navigation.push(PepperStackRoutes.MatchDescription, { user: attendee, withContact: false })}
      >
      </TouchableOpacity>
      <LinearGradient colors={['transparent', color(black, .7), black]} style={styles.imageMask}>
        <View style={styles.descriptionContainer}>
          <Text style={{ ...styles.description, fontSize: fontSizeHeader, fontFamily: 'Sora_700Bold' }}>{attendee.name}</Text>
          <Text style={{ ...styles.description, fontSize: fontSizeSubHeader }}>{attendee.job}</Text>
        </View>
      </LinearGradient>
    </ImageBackground>
  );

  const StaticRefreshParties = (): JSX.Element => (<>
    <PepperImage src={PepperImages.Work} style={styles.refreshPageImage}></PepperImage>
    <Text style={styles.refreshPageDescription}> Wow! you checked all the people that attended!</Text>
    <Text style={styles.refreshPageDescription}> Come to the next party, you'll meet more people!</Text>
  </>);

  const StaticYes = (): JSX.Element => (
    <View style={{ ...styles.swipeLabel, borderColor: heaven }}>
      <Text style={{ color: heaven, fontSize: fontSizeSubHeader }}>Like</Text>
    </View>
  );

  const StaticNope = (): JSX.Element => (
    <View style={{ ...styles.swipeLabel, borderColor: pepper }}>
      <Text style={{ color: pepper, fontSize: fontSizeSubHeader }}>Nope</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {
          !party.attendees || hasSwipedAll ?
            <StaticRefreshParties/> :
            <Swiper
              cards={party.attendees}
              renderCard={StaticCard}
              animateOverlayLabelsOpacity={true}
              verticalSwipe={false}
              overlayLabels={{
                left: {
                  element: <StaticNope/>,
                  style: {
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      justifyContent: 'flex-start',
                      marginTop: 70,
                      marginLeft: -50,
                    }
                  }
                },
                right: {
                  element: <StaticYes/>,
                  style: {
                    wrapper: {
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      marginTop: 70,
                      marginLeft: 50,
                    }
                  }
                },
              }}
              overlayLabelStyle={{
                zIndex: 20,
                backgroundColor: 'red',
                padding: 10,
              }}
              onSwipedRight={(cardIndex) => {
                if (!!party.attendees) {
                  storeDispatch(addMatch({ matchId: party.attendees[cardIndex].id }));
                }
              }}
              onSwipedAll={() => { setHasSwipedAll(true); }}
              backgroundColor={white}
              cardVerticalMargin={0}
              cardHorizontalMargin={0}
              stackSeparation={0}
              stackSize={3}
              cardStyle={styles.swiper}>
            </Swiper>
        }
      </View>
      <PepperRoundButton
        size={6 * space_unit}
        style={styles.backButton}
        colors={[indigo, pepper]}
        iconName="pepper-arrowLeft"
        onPress={() => navigation.navigate(PepperStackRoutes.Main)}
      />
    </View>);
};

export default PepperPartyAttendees;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    height: '98%',
    width: '97%',
    overflow: 'hidden',
    borderRadius: .75 * space_unit,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swiper: {
    height: '100%',
    width: '100%',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  swipeLabel: {
    padding: 1.5 * space_unit,
    borderWidth: 3,
    borderRadius: space_unit,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 4,
    shadowRadius: 2,
    elevation: 1,
  },
  refreshPageImage: {
    height: '30%',
    marginBottom: 4 * space_unit,
  },
  refreshPageDescription: {
    width: '80%',
    textAlign: 'center',
    fontSize: fontSizeRegular,
    color: raven,
    marginBottom: space_unit,
  },
  image: {
    backgroundColor: grey_1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    borderRadius: .75 * space_unit,
    overflow: 'hidden',
  },
  imageMask: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
  descriptionContainer: {
    flex: 1,
    padding: 2 * space_unit,
    justifyContent: 'flex-end',
  },
  description: {
    fontSize: fontSizeRegular,
    color: white,
    zIndex: 3,
    marginVertical: .25 * space_unit,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    flexWrap: 'wrap',
  },
  tags: {
    marginRight: 2 * space_unit,
    marginTop: 2 * space_unit,
  },
  backButton: {
    position: 'absolute',
    top: 2 * space_unit,
    left: 2 * space_unit,
    zIndex: 4,
    shadowColor: white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 2,
  }
});


