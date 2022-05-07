import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity,
} from 'react-native';
import {
  white, space_unit, fontSizeRegular, fontSizeHeader, sun, sun_2, fire, fire_2, indigo_2, indigo, grey_3, color, raven, sea, indigo_3, pepper,
} from '../../styles/common';
import PepperDescriptionCarousel from '../pepperDescriptionCarousel/pepperDescriptionCarousel';
import { IUser } from '../../models/types';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import PepperTag from '../pepperTags/pepperTags';
import { keyExtractor, limitTextLength } from '../../helpers/uiHelper';
import * as Linking from 'expo-linking';

const PepperMatchDescription = (descriptionProps: { route: { params: { user: IUser, withContact: boolean } } }): JSX.Element => {
  const { width } = Dimensions.get('window');
  const [carouselWidth, setCarouselWidth] = useState(width);
  const { user } = descriptionProps.route.params;
  const { withContact } = descriptionProps.route.params;

  const onLayout = (event: {nativeEvent: { layout: { width: number } } }): void => {
    const { width } = event.nativeEvent.layout;
    setCarouselWidth(.97 * width);
  };

  const StaticInterestTags = (): JSX.Element[] => user.interests.map((interest, index) => {
    const tagColors = [[sun, sun_2], [fire, fire_2], [indigo, indigo_2]];
    return (<PepperTag
      key={keyExtractor(interest)}
      text={interest}
      firstGradientColor={tagColors[index % tagColors.length][0]}
      secondGradientColor={tagColors[index % tagColors.length][1]}
      style={styles.tags}/>);
  });

  const StaticSocialMediaOfMatch = (): JSX.Element[] => {
    const socialMedia = [user.facebook, user.instagram, user.snapchat];
    const socialMediaActions = ['https://www.facebook.com/', 'instagram://user?username=', 'https://snapchat.com/add/'];
    const socialMediaIcons = ['pepper-facebook', 'pepper-instagram', 'pepper-snapchat'];
    const socialMediaColors = [sea, pepper, sun_2];
    const socialMediaSecondColors = [sea, indigo_3, sun];
    const socialMediaItems = socialMedia.map((socialMediaItem, index): JSX.Element => {
      if (socialMediaItem) {
        return (
          <TouchableOpacity
            onPress={() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              Linking.openURL(socialMediaActions[index] + socialMediaItem).catch(() => {
                // TODO: manage error
              });
            }}
          >
            <PepperTag
              iconName={socialMediaIcons[index]} text={socialMediaItem}
              firstGradientColor={socialMediaColors[index]}
              secondGradientColor={socialMediaSecondColors[index]}
              style={styles.tags}
              iconFirst={true}
              tagStyle={styles.socialMediaTag}/>
          </TouchableOpacity>);

      }
      return <></>;
    });
    return socialMediaItems;
  };

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
            <PepperImage src={PepperImages.House} style={styles.detailImages}></PepperImage>
            <Text style={styles.detailText}>{limitTextLength(user.address, 35)}</Text>
          </View>
          <View style={styles.tagsContainer}>{StaticInterestTags()}</View>
          { withContact ? (
            <View style={{ flex: 1 }}>{StaticSocialMediaOfMatch()}</View>
          ) : null }
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
  },
  socialMediaTag: {
    marginTop: 2 * space_unit,
    width: '100%',
    paddingVertical: 1.5 * space_unit,
    borderRadius: 1 * space_unit,
  },
});
