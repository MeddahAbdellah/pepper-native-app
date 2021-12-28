import React, { useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import { space_unit, fontSizeSubHeader, white, fontSizeRegular } from '../../styles/common';
import { IParty, StoreStatus } from '../../models/types';
import { useNavigation } from '@react-navigation/native';
import { usePepperUser } from '../../hooks/user.hooks';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { fetchUser } from '../../features/user/userActions';

const PepperUserParties = () => {
  // The push method is not present in the types while it does exist thats we we cast navigation as any
  const navigation = useNavigation<any>();
  const pepperDispatch = usePepperDispatch();
  //Fetch user on load
  useEffect(() => { pepperDispatch(fetchUser()); }, []);
  const pepperUser = usePepperUser();
  
  const partyItem = (party: IParty) => (
    <TouchableOpacity style={styles.partyItemContainer} onPress={() => navigation.push('PartyDescription', party)}>
      <Image source={party.imgs[0]} style={styles.partyImage}/>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: fontSizeSubHeader }}>{party.title}</Text>
        <View style={styles.themeAndDateContainer}>
          <Text style={{ fontSize: fontSizeRegular }}>{party.theme}</Text>
          <Text style={{ fontSize: fontSizeRegular }}>{party.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={pepperUser.user.parties}
        refreshing={pepperUser.fetchStatus !== StoreStatus.Fulfilled}
        onRefresh={() => pepperDispatch(fetchUser())}
        renderItem={(item) => partyItem(item.item) }
        keyExtractor={(item) => item.id.toString() }
      />
    </View>
  )
}

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
  themeAndDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  partyImage: {
    width: 10 * space_unit,
    height: 10 * space_unit,
    borderRadius: space_unit,
    marginRight: space_unit,
  }
})
