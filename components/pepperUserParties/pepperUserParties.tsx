import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, ImageBackground,
} from 'react-native';
import {
  space_unit, fontSizeSubHeader, white, fontSizeRegular, raven, black, color, grey_1, fontSizeBody, heaven, grey_3,
} from '../../styles/common';
import { IParty, StoreStatus, UserPartyStatus } from '../../models/types';
import { useNavigation } from '@react-navigation/native';
import { usePepperUser } from '../../hooks/user.hooks';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { fetchUser } from '../../features/user/userActions';
import { PepperStackRoutes } from '../../models/routes';
import { capitalize, keyExtractor } from '../../helpers/uiHelper';
import moment from 'moment';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import { LinearGradient } from 'expo-linear-gradient';

const PepperUserParties = (): JSX.Element => {
  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const storeDispatch = usePepperDispatch();
  // Fetch user on load
  useEffect(() => { storeDispatch(fetchUser()); }, []);
  const currentUser = usePepperUser();

  const partyItem = (party: IParty): JSX.Element => (
    <ImageBackground source={party.imgs[0]} style={styles.image} resizeMode="cover">
      <TouchableOpacity
        style={{ ...styles.imageMask, zIndex: styles.imageMask.zIndex + 1 }}
        onPress={() => navigation.push(
          party.status === UserPartyStatus.ATTENDED ? PepperStackRoutes.PartyDetails : PepperStackRoutes.PartyDescription,
          { party, canCancel: false })}
      >
      </TouchableOpacity>
      <LinearGradient colors={['transparent', color(black, .7), black]} style={styles.imageMask}>
        <View style={styles.descriptionContainer}>
          <View style={{
            ...styles.statusHeader,
            backgroundColor: color(party.status && [UserPartyStatus.ACCEPTED, UserPartyStatus.ATTENDED].includes(party.status) ? heaven : grey_3, .8),
          }}>
            <Text style={{ ...styles.description, fontSize: fontSizeBody }}>{capitalize(party.status)}</Text>
          </View>
          <View style={{ padding: 2 * space_unit }}>
            <Text style={{
              ...styles.description,
              fontSize: fontSizeSubHeader,
              fontFamily: 'Sora_700Bold',
              marginBottom: space_unit,
            }}>{party.title}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ ...styles.description, fontSize: fontSizeBody }}>{party.theme}</Text>
              <Text style={{ ...styles.description, marginBottom: 2 * space_unit }}>{moment(party.date).format('YYYY MMM DD')}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );

  const StaticGoSwipe = (): JSX.Element => (
    <View style={styles.goSwipeContainer}>
      <PepperImage src={PepperImages.Meet} style={styles.goSwipeImage}></PepperImage>
      <Text style={styles.goSwipeDescription}> Dare to go to a pepper party! </Text>
      <Text style={styles.goSwipeDescription}> Nobody finds love in their pyjamas </Text>
    </View>
  );

  return (
    <View style={styles.listContainer}>
      { !currentUser.user.parties.length ?
        <StaticGoSwipe/> :
        <FlatList
          data={currentUser.user.parties}
          refreshing={currentUser.fetchStatus !== StoreStatus.Fulfilled}
          onRefresh={() => storeDispatch(fetchUser())}
          renderItem={(item) => partyItem(item.item) }
          keyExtractor={(item) => keyExtractor(item.id) }
        />
      }
    </View>
  );
};

export default PepperUserParties;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 1 * space_unit,
    paddingHorizontal: 2 * space_unit,
    backgroundColor: white,
  },
  partyItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: .5 * space_unit,
  },
  partyImage: {
    width: 10 * space_unit,
    height: 10 * space_unit,
    borderRadius: space_unit,
    marginRight: space_unit,
  },
  goSwipeContainer: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goSwipeImage: {
    height: '30%',
    marginBottom: 4 * space_unit,
  },
  goSwipeDescription: {
    width: '80%',
    textAlign: 'center',
    fontSize: fontSizeRegular,
    color: raven,
    marginBottom: space_unit,
  },
  image: {
    backgroundColor: grey_1,
    width: '100%',
    height: 40 * space_unit,
    zIndex: 1,
    borderRadius: .75 * space_unit,
    overflow: 'hidden',
    marginBottom: 2 * space_unit,
  },
  imageMask: {
    position: 'absolute',
    height: 40 * space_unit,
    width: '100%',
    zIndex: 2,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  description: {
    fontSize: fontSizeRegular,
    color: white,
    zIndex: 3,
    marginVertical: .25 * space_unit,
  },
  statusHeader: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 1.5 * space_unit,
  }
});
