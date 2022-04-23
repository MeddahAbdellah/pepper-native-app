import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, ScrollView, Dimensions, Text, Platform, TouchableOpacity,
} from 'react-native';
import { createOpenLink } from 'react-native-open-maps';
import Toast from 'react-native-root-toast';
import { fetchOrganizer } from '../../features/organizer/organizerActions';
import { limitTextLength } from '../../helpers/uiHelper';
import { usePepperOrganizer } from '../../hooks/organizer.hooks';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { PepperOrganizerUpdatesStackRoutes } from '../../models/routes';
// import LoginService from '../../services/login';
import {
  black,
  fontSizeBody,
  fontSizeRegular, fontSizeSubHeader, indigo_3, pepper, raven, sea, space_unit, white,
} from '../../styles/common';
import PepperDescriptionCarousel from '../pepperDescriptionCarousel/pepperDescriptionCarousel';
import PepperTag from '../pepperTags/pepperTags';
import * as Clipboard from 'expo-clipboard';
import { PepperOrganizerEditFoods } from './pepperOrganizerUpdates/pepperOrganizerEditFoods';
import { PepperOrganizerEditDrinks } from './pepperOrganizerUpdates/pepperOrganizerEditDrinks';
import { PepperOrganizerEditDescription } from './pepperOrganizerUpdates/pepperOrganizerEditDescription';




const PepperOrganizerMain = (): JSX.Element => {

  const { width } = Dimensions.get('window');
  const [carouselWidth, setCarouselWidth] = useState(width);

  const storeDispatch = usePepperDispatch();
  const organizer = usePepperOrganizer();
  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  useEffect(() => { storeDispatch(fetchOrganizer()); }, []);

  const onLayout = (event: {nativeEvent: { layout: { width: number } } }): void => {
    const { width } = event.nativeEvent.layout;
    setCarouselWidth(.97 * width);
  };


  return ( <ScrollView style={{ backgroundColor: white }}>
    <View style={styles.container} onLayout={onLayout}>
      <View style={styles.imageCarouselContainer}>
        <PepperDescriptionCarousel carouselWidth={carouselWidth} hideGoBackBtn={true} editBtnEffect={() => {
          // eslint-disable-next-line no-console
          // PepperOrganizerUpdatesStackRoutes.ImageUpdateRoute
          navigation.navigate(PepperOrganizerUpdatesStackRoutes.ImageUpdateRoute);
        }} carouselImgs={organizer.organizer.imgs}/>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={{ fontSize: fontSizeSubHeader, paddingBottom: 2 * space_unit }}>{organizer.organizer.title}</Text>
        <TouchableOpacity
          onPress={createOpenLink({ query: organizer.organizer.location })}
          onLongPress={() => {
            Clipboard.setString(organizer.organizer.location);
            Toast.show('Copied to clipboard', {
              duration: Toast.durations.LONG,
              hideOnPress: true,
              opacity: .9,
              textStyle: Platform.select({
                ios: {
                  fontFamily: 'Arial'
                },
                android: {
                  fontFamily: 'normal'
                },
              })
            });
          }}>
          <PepperTag
            iconName="pepper-location" text={limitTextLength(organizer.organizer.location ? organizer.organizer.location : 'location', 30)}
            firstGradientColor={sea}
            secondGradientColor={indigo_3}
            style={styles.tags}
            tagStyle={styles.locationTag}/>
        </TouchableOpacity>
        <PepperOrganizerEditDescription />
        <PepperOrganizerEditDrinks/>
        <PepperOrganizerEditFoods/>
      </View>
    </View>
  </ScrollView>
  );

}
;


export default PepperOrganizerMain;


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
    height: 50 * space_unit,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 2 * space_unit,
    marginTop: space_unit,
  },
  details: {
    fontSize: fontSizeBody,
    color: raven,
    marginVertical: 2 * space_unit,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 1 * space_unit,
  },
  locationTag: {
    paddingVertical: 1.5 * space_unit,
    borderRadius: 1 * space_unit,
  },
  tags: {
    marginBottom: .3 * space_unit,
    marginRight: space_unit,
  },
  menuTitle: {
    fontSize: fontSizeSubHeader,
    marginTop: space_unit,
    marginBottom: .5 * space_unit,
    color: raven,
  },
  menuDescription: {
    marginTop: .5 * space_unit,
    paddingHorizontal: space_unit,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: raven,
  },
  cancelButton: {
    flexDirection: 'row',
    backgroundColor: pepper,
    marginTop: 6 * space_unit,
    borderRadius: 1 * space_unit,
  },
  cancelButtonText: {
    width: '80%',
    textAlign: 'center',
    color: white,
    paddingVertical: 2 * space_unit,
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    backgroundColor: white,
    borderRadius: 2 * space_unit,
    padding: 3 * space_unit,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    height: 22 * space_unit,
  },
  modalButtonsContainer: {
    marginTop: 2 * space_unit,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalDescription: {
    textAlign: 'center',
    marginVertical: 2 * space_unit,
    fontSize: fontSizeRegular,
  },
});


