import React from 'react'
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { space_unit, white, black, color, fontSizeHeader, fontSizeSubHeader, sun_2, sun, indigo_2, fire, fire_2, indigo_3, fontSizeRegular, pepper, pepper_2, loremIpsium } from '../../styles/common';
import Swiper from 'react-native-deck-swiper';
import { LinearGradient } from 'expo-linear-gradient';
import PepperTag from '../pepperTags/pepperTags';
import { IParty } from '../../models/types';
import { useNavigation } from '@react-navigation/native';

export default function PepperParties() {
  // The push method is not present in the types while it does exist thats we we cast navigation as any
  const navigation = useNavigation<any>();

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
      description: loremIpsium,
      foods: [
        { name: 'Steak', price: 10 },
        { name: 'Chicken', price: 12 },
        { name: 'Porc', price: 8 },
        { name: 'Beef', price: 14 },
      ],
      drinks: [
        { name: 'Beer', price: 6 },
        { name: 'Champain', price: 8 },
        { name: 'Whiskey', price: 9 },
        { name: 'Wine', price: 14 },
      ],
      price: 0,
      imgs: [
        { uri: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s2f6af3166883d3ee/image/i8c4fa5b2ed1f62b8/version/1454158048/image.jpg' },
        { uri: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s2f6af3166883d3ee/image/i8c4fa5b2ed1f62b8/version/1454158048/image.jpg' },
        { uri: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s2f6af3166883d3ee/image/i8c4fa5b2ed1f62b8/version/1454158048/image.jpg' },
      ],
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
      description: loremIpsium,
      foods: [
        { name: 'Steak', price: 10 },
        { name: 'Chicken', price: 12 },
        { name: 'Porc', price: 8 },
        { name: 'Beef', price: 14 },
      ],
      drinks: [
        { name: 'Beer', price: 6 },
        { name: 'Champain', price: 8 },
        { name: 'Whiskey', price: 9 },
        { name: 'Wine', price: 14 },
      ],
      price: 0,
      imgs: [{ uri: 'https://storage.googleapis.com/eyp-wordpress/1/2021/09/social-bar-saint-ouen-1440x946.jpg' }],
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
      description: loremIpsium,
      foods: [
        { name: 'Steak', price: 10 },
        { name: 'Chicken', price: 12 },
        { name: 'Porc', price: 8 },
        { name: 'Beef', price: 14 },
      ],
      drinks: [
        { name: 'Beer', price: 6 },
        { name: 'Champain', price: 8 },
        { name: 'Whiskey', price: 9 },
        { name: 'Wine', price: 14 },
      ],
      price: 0,
      imgs: [{ uri: 'https://www.oubruncher.com/photos1/1631_1.jpg' }],
    },
  ];

  function Card(party: IParty) {
    const attendeesTag = (attendees: { people: number, minAge: number, maxAge: number }): string => {
      return `${attendees.people} people (${attendees.minAge}yo - ${attendees.maxAge}yo)`;
    }

    const miniFoodPrice = (): string =>  `${Math.min(...party.foods.map((food) => food.price))}$`;
    const miniDrinkPrice = (): string =>  `${Math.min(...party.drinks.map((food) => food.price))}$`;
    const partyPrice = (): string =>  party.price !== 0 ? `${party.price}$` : 'Free';

    return (
      <ImageBackground source={party.imgs[0]} style={styles.image} resizeMode="cover">
            <TouchableOpacity
              style={{...styles.imageMask, zIndex: styles.imageMask.zIndex + 1}}
              onPress={() => navigation.push('PartyDescription', party)}
              >
            </TouchableOpacity>
            <LinearGradient colors={['transparent', color(black, .7), black]} style={styles.imageMask}>
                <View style={styles.descriptionContainer}> 
                  <Text style={{...styles.description, fontSize: fontSizeHeader}}>{party.title}</Text>
                  <Text style={{...styles.description, fontSize: fontSizeSubHeader}}>{party.theme}</Text>
                  <Text style={{...styles.description, marginBottom: 2 * space_unit}}>{party.date}</Text>
                  <View style={styles.tagsContainer}>
                    <PepperTag iconName="pepper-dancing" text={attendeesTag(party)} firstGradientColor={pepper} secondGradientColor={pepper_2} style={styles.tags}/>
                  </View>
                  <View style={styles.tagsContainer}>
                    <PepperTag iconName="pepper-beer" text={miniDrinkPrice()} firstGradientColor={sun} secondGradientColor={sun_2} style={styles.tags}/>
                    <PepperTag iconName="pepper-burger" text={miniFoodPrice()} firstGradientColor={fire} secondGradientColor={fire_2} style={styles.tags}/>
                    <PepperTag iconName="pepper-partyPopper" text={partyPrice()} firstGradientColor={indigo_2} secondGradientColor={indigo_3} style={styles.tags}/>
                  </View>
                </View>
            </LinearGradient>
      </ImageBackground>
    );
  } 

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Swiper
              cards={parties}
              renderCard={Card}
              onSwiped={(cardIndex) => {console.log(cardIndex)}}
              onSwipedAll={() => {console.log('onSwipedAll')}}
              backgroundColor={white}
              cardVerticalMargin={0}
              cardHorizontalMargin={0}
              stackSeparation={0}
              stackSize={3}
              cardStyle={styles.swiper}>
          </Swiper>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    backgroundColor: 'red',
    height: '98%',
    width: '97%',
    overflow: 'hidden',
    borderRadius:  .75 * space_unit,
  },
  swiper: {
    height: '100%',
    width: '100%',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 1,
    borderRadius:  .75 * space_unit,
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
  }
});
