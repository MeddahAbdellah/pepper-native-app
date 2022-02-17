import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity,
} from 'react-native';
import {
  white, space_unit, fontSizeRegular, fontSizeHeader, sun, sun_2, fire, fire_2, indigo_2, indigo, grey_3, color, pepper, raven,
} from '../../styles/common';
import PepperDescriptionCarousel from '../pepperDescriptionCarousel/pepperDescriptionCarousel';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import PepperTag from '../pepperTags/pepperTags';
import { limitTextLength } from '../../helpers/uiHelper';
import LoginService from '../../services/login';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { fetchUser, resetUser } from '../../features/user/userActions';
import { usePepperUser } from '../../hooks/user.hooks';
import { useNavigation } from '@react-navigation/native';
import { PepperStackRoutes } from '../../models/routes';

const PepperUserDescription = (): JSX.Element => {
  const { width } = Dimensions.get('window');
  const [carouselWidth, setCarouselWidth] = useState(width);
  const storeDispatch = usePepperDispatch();
  // Fetch user on load
  useEffect(() => { storeDispatch(fetchUser()); }, []);
  const currentUser = usePepperUser();

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  const onLayout = (event: {nativeEvent: { layout: { width: number } } }): void => {
    const { width } = event.nativeEvent.layout;
    setCarouselWidth(.97 * width);
  };

  const StaticInterestTags = (): JSX.Element[] => currentUser.user.interests.map((interest, index) => {
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
          <PepperDescriptionCarousel carouselWidth={carouselWidth} carouselImgs={currentUser.user.imgs}/>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={{ fontSize: fontSizeHeader }}>{currentUser.user.name}</Text>
          <View style={styles.details}>
            <PepperImage src={PepperImages.Briefcase} style={styles.detailImages}></PepperImage>
            <Text style={styles.detailText}>{currentUser.user.job}</Text>
          </View>
          <View style={styles.details}>
            <PepperImage src={PepperImages.OldPhone} style={styles.detailImages}></PepperImage>
            <Text style={styles.detailText}>{currentUser.user.phoneNumber}</Text>
          </View>
          <View style={styles.details}>
            <PepperImage src={PepperImages.House} style={styles.detailImages}></PepperImage>
            <Text style={styles.detailText}>{limitTextLength(currentUser.user.address, 35)}</Text>
          </View>
          <View style={styles.tagsContainer}>{StaticInterestTags()}</View>
          <Text style={styles.description}>{currentUser.user.description}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton}
          onPress={async() => {
            await LoginService.logout();
            storeDispatch(resetUser());
            navigation.navigate(PepperStackRoutes.LoginRouter);
          }}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PepperUserDescription;

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
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: pepper,
    marginTop: 6 * space_unit,
    borderRadius: 1 * space_unit,
  },
  logoutButtonText: {
    width: '80%',
    textAlign: 'center',
    color: white,
    paddingVertical: 2 * space_unit,
  },
});
