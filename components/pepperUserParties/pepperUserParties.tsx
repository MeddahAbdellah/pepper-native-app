import React, { useEffect } from 'react';
import {
  StyleSheet, Text, View, Image, FlatList, TouchableOpacity,
} from 'react-native';
import {
  space_unit, fontSizeSubHeader, white, fontSizeRegular,
} from '../../styles/common';
import { IParty, StoreStatus } from '../../models/types';
import { useNavigation } from '@react-navigation/native';
import { usePepperUser } from '../../hooks/user.hooks';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { fetchUser } from '../../features/user/userActions';
import { PepperStackRoutes } from '../../models/routes';
import { keyExtractor } from '../../helpers/flatListHelper';
import moment from 'moment';

const PepperUserParties = (): JSX.Element => {
  // The push method is not present in the types while it does exist thats we we cast navigation as any
  const navigation = useNavigation<any>();
  const storeDispatch = usePepperDispatch();
  // Fetch user on load
  useEffect(() => { storeDispatch(fetchUser()); }, []);
  const currentUser = usePepperUser();
  
  const partyItem = (party: IParty): JSX.Element => (
    <TouchableOpacity style={styles.partyItemContainer} onPress={() => navigation.push(PepperStackRoutes.PartyDescription, party)}>
      <Image source={party.imgs[0]} style={styles.partyImage}/>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: fontSizeSubHeader }}>{party.title}</Text>
        <Text style={{ fontSize: fontSizeRegular }}>{party.theme}</Text>
        <Text style={{ fontSize: fontSizeRegular }}>{moment(party.date).format("YYYY MM DD")}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={currentUser.user.parties}
        refreshing={currentUser.fetchStatus !== StoreStatus.Fulfilled}
        onRefresh={() => storeDispatch(fetchUser())}
        renderItem={(item) => partyItem(item.item) }
        keyExtractor={(item) => keyExtractor(item.id) }
      />
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
  }
});
