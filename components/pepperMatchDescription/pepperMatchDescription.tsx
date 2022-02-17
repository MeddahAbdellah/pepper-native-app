import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Dimensions,
} from 'react-native';
import {
  white, space_unit, fontSizeRegular, fontSizeHeader, sun, sun_2, fire, fire_2, indigo_2, indigo, grey_3, color, raven,
} from '../../styles/common';
import PepperDescriptionCarousel from '../pepperDescriptionCarousel/pepperDescriptionCarousel';
import { IUser } from '../../models/types';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import PepperTag from '../pepperTags/pepperTags';
import { limitTextLength } from '../../helpers/uiHelper';

const PepperMatchDescription = (descriptionProps: { route: { params: IUser } }): JSX.Element => {
  const { width } = Dimensions.get('window');
  const [carouselWidth, setCarouselWidth] = useState(width);
  const user = descriptionProps.route.params;

  const onLayout = (event: {nativeEvent: { layout: { width: number } } }): void => {
    const { width } = event.nativeEvent.layout;
    setCarouselWidth(.97 * width);
  };

  const StaticInterestTags = (): JSX.Element[] => user.interests.map((interest, index) => {
    const tagColors = [[sun, sun_2], [fire, fire_2], [indigo, indigo_2]];
    return (<PepperTag
      key={interest}
      text={interest}
      firstGradientColor={tagColors[index][0]}
      secondGradientColor={tagColors[index][1]}
      style={styles.tags}/>);
  });

  return (
    <ScrollView style={{ backgroundColor: white }}>
      <View style={styles.container} onLayout={onLayout}>
        <View style={styles.imageCarouselContainer}>
          <PepperDescriptionCarousel carouselWidth={carouselWidth} carouselImgs={user.imgs}/>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={{ fontSize: fontSizeHeader }}>{user.name}</Text>
          <View style={styles.details}>
            <PepperImage src={PepperImages.Briefcase} style={styles.detailImages}></PepperImage>
            <Text style={styles.detailText}>{user.job}</Text>
          </View>
          <View style={styles.details}>
            <PepperImage src={PepperImages.OldPhone} style={styles.detailImages}></PepperImage>
            <Text style={styles.detailText}>{user.phoneNumber}</Text>
          </View>
          <View style={styles.details}>
            <PepperImage src={PepperImages.House} style={styles.detailImages}></PepperImage>
            <Text style={styles.detailText}>{limitTextLength(user.address, 35)}</Text>
          </View>
          <View style={styles.tagsContainer}>{StaticInterestTags()}</View>
          <Text style={styles.description}>{user.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PepperMatchDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: space_unit,
    paddingBottom: 4 * space_unit,
  },
  imageCarouselContainer: {
    borderRadius: .75 * space_unit,
    overflow: 'hidden',
    backgroundColor: white,
    height: 57 * space_unit,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 2 * space_unit,
    marginTop: space_unit,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: space_unit,
  },
  detailText: {
    fontSize: fontSizeRegular,
    color: raven,
    marginLeft: space_unit,
  },
  detailImages: {
    height: 4 * space_unit,
    width: 4 * space_unit,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 2 * space_unit,
  },
  tags: {
    marginBottom: .3 * space_unit,
    marginRight: space_unit,
    shadowColor: color(grey_3, .3),
  },
  description: {
    fontSize: fontSizeRegular,
    color: raven,
    width: '100%',
    marginVertical: 2 * space_unit,
  }
});
