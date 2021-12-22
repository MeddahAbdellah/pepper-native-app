import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity} from 'react-native'
import { space_unit, fontSizeSubHeader, white, fontSizeRegular } from '../../styles/common';
import { IParty } from '../../models/types';

const PepperUserParties = () => {
  // TODO : fill parties
  const parties: IParty[] = [
    {
      id: 1,
      title: 'Fleurus',
      theme: 'Soirée Internationl',
      date: '24 octobre',
      location: 'Paris 14',
      people: 34,
      minAge: 19,
      maxAge: 28,
      img: { uri: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s2f6af3166883d3ee/image/i8c4fa5b2ed1f62b8/version/1454158048/image.jpg' },
    },
    {
      id: 2,
      title: 'Social Bar',
      theme: 'Soirée Internation',
      date: '24 octobre',
      location: 'Paris 12',
      people: 22,
      minAge: 19,
      maxAge: 28,
      img: { uri: 'https://storage.googleapis.com/eyp-wordpress/1/2021/09/social-bar-saint-ouen-1440x946.jpg' },
    },
    {
      id: 3,
      title: 'Café OZ',
      theme: 'Soirée Internationl',
      date: '12 octobre',
      location: 'Paris 01',
      people: 14,
      minAge: 19,
      maxAge: 28,
      img: { uri: 'https://www.oubruncher.com/photos1/1631_1.jpg' },
    },
  ];

  const partyItem = (party: IParty) => (
    <TouchableOpacity style={styles.partyItemContainer} onPress={() => console.log('show party')}>
      <Image source={party.img} style={styles.partyImage}/>
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
        data={parties}
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
