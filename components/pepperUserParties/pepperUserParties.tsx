import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, FlatList, TouchableOpacity,
} from 'react-native';
import {
  space_unit, fontSizeSubHeader, white, fontSizeRegular, raven,
} from '../../styles/common';
import { IParty, StoreStatus } from '../../models/types';
import { useNavigation } from '@react-navigation/native';
import { usePepperUser } from '../../hooks/user.hooks';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { fetchUser } from '../../features/user/userActions';
import { PepperStackRoutes } from '../../models/routes';
import { keyExtractor, limitTextLength } from '../../helpers/uiHelper';
import moment from 'moment';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';

const PepperUserParties = (): JSX.Element => {
  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const storeDispatch = usePepperDispatch();
  // Fetch user on load
  useEffect(() => { storeDispatch(fetchUser()); }, []);
  const currentUser = usePepperUser();

  const partyItem = (party: IParty): JSX.Element => (
    <TouchableOpacity
      style={styles.partyItemContainer}
      onPress={() => navigation.push(PepperStackRoutes.PartyDescription, { party, canCancel: true })}>
      <Image source={party.imgs[0]} style={styles.partyImage}/>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: fontSizeSubHeader }}>{limitTextLength(party.title, 15) }</Text>
        <Text style={{ fontSize: fontSizeRegular }}>{limitTextLength(party.theme, 20)}</Text>
        <Text style={{ fontSize: fontSizeRegular }}>{moment(party.date).format('YYYY MM DD')}</Text>
      </View>
    </TouchableOpacity>
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
    marginVertical: 1 * space_unit,
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
});
