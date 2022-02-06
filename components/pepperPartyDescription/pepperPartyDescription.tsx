import React, { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Dimensions 
} from 'react-native';
import { IParty } from '../../models/types';
import {
  space_unit, white, fontSizeRegular, fontSizeHeader, fontSizeSubHeader, pepper, pepper_2, sun, sun_2, fire, fire_2, indigo_2, indigo_3, black 
} from '../../styles/common';
import PepperDescriptionCarousel from '../pepperDescriptionCarousel/pepperDescriptionCarousel';
import PepperTag from '../pepperTags/pepperTags';
import moment from 'moment';


const PepperPartyDescription = (descriptionProps: { route: { params: IParty } }): JSX.Element => {
  // TODO: fix location, make it open google maps or something
  const { width } = Dimensions.get("window");
  const [carouselWidth, setCarouselWidth] = useState(width);
  const party = descriptionProps.route.params;

  const attendeesTag = (attendees: { people: number, minAge: number, maxAge: number }): string => `${attendees.people} people (${attendees.minAge}yo - ${attendees.maxAge}yo)`;

  const onLayout = (event: {nativeEvent: { layout: { width: number } } }): void => {
    const { width } = event.nativeEvent.layout;
    setCarouselWidth(.97 * width);
  };

  const miniFoodPrice = (): string =>  `${Math.min(...party.foods.map((food) => food.price))}$`;
  const miniDrinkPrice = (): string =>  `${Math.min(...party.drinks.map((food) => food.price))}$`;
  const partyPrice = (): string =>  (party.price !== 0 ? `${party.price}$` : 'Free');
  const StaticMenuList = (items: Array<{ name: string, price: number }>): JSX.Element[] => items.map((item) => (
    <View key={item.name} style={styles.menuDescription}>
      <Text>{item.name}</Text>
      <Text>{`${item.price}$`}</Text>
    </View>
  ));

  return (
    <ScrollView style={{backgroundColor: white}}>
      <View style={styles.container} onLayout={onLayout}>
        <View style={styles.imageCarouselContainer}>
          <PepperDescriptionCarousel carouselWidth={carouselWidth} carouselImgs={party.imgs}/>
        </View>
        <View style={styles.detailsContainer}> 
          <Text style={{fontSize: fontSizeHeader}}>{party.title}</Text>
          <Text style={{fontSize: fontSizeSubHeader}}>{party.theme}</Text>
          <Text style={styles.details}>{moment(party.date).format("YYYY MM DD")}</Text>
          <Text style={styles.details}>{party.location}</Text>
          <View style={styles.tagsContainer}>
            <PepperTag iconName="pepper-dancing" text={attendeesTag(party)} firstGradientColor={pepper} secondGradientColor={pepper_2} style={styles.tags}/>
          </View>
          <View style={styles.tagsContainer}>
            <PepperTag iconName="pepper-beer" text={miniDrinkPrice()} firstGradientColor={sun} secondGradientColor={sun_2} style={styles.tags}/>
            <PepperTag iconName="pepper-burger" text={miniFoodPrice()} firstGradientColor={fire} secondGradientColor={fire_2} style={styles.tags}/>
            <PepperTag iconName="pepper-partyPopper" text={partyPrice()} firstGradientColor={indigo_2} secondGradientColor={indigo_3} style={styles.tags}/>
          </View>
          <Text style={styles.description}>{party.description}</Text>
          <Text style={{...styles.menuTitle, marginTop: 0}}>Drinks</Text>
          {StaticMenuList(party.drinks)}
          <Text style={styles.menuTitle}>Foods</Text>
          {StaticMenuList(party.foods)}
        </View>
      </View>
    </ScrollView>
  );
};

export default PepperPartyDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: space_unit,
    paddingBottom: 4 * space_unit,
  },
  imageCarouselContainer: {
    borderRadius:  .75 * space_unit,
    overflow: 'hidden',
    backgroundColor: white,
    height: 50 * space_unit,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 2 * space_unit,
    marginTop: space_unit,
  },
  details: {
    fontSize: fontSizeRegular,
    color: black,
    marginTop: 1 * space_unit,
  },
  description: {
    fontSize: fontSizeRegular,
    color: black,
    width: '100%',
    marginVertical: 2 * space_unit,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 1 * space_unit,
  },
  tags: {
    marginBottom: .3 * space_unit,
    marginRight: space_unit,
  },
  menuTitle: {
    fontSize: fontSizeSubHeader,
    marginTop: space_unit,
    marginBottom: .5 * space_unit,
  },
  menuDescription: {
    marginTop: .5 * space_unit,
    paddingHorizontal: space_unit,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});
