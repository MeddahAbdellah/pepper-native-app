import React, { useState } from 'react';
import {
  StyleSheet, View, Text, ScrollView, Dimensions, TouchableOpacity, Modal, Platform,
} from 'react-native';
import { IParty } from '../../models/types';
import {
  space_unit, white, fontSizeRegular, fontSizeHeader, fontSizeSubHeader, pepper, pepper_2,
  sun, sun_2, fire, fire_2, indigo_2, indigo_3, black, fontSizeBody, sea, raven, grey_3,
} from '../../styles/common';
import PepperDescriptionCarousel from '../pepperDescriptionCarousel/pepperDescriptionCarousel';
import PepperTag from '../pepperTags/pepperTags';
import moment from 'moment';
import { BlurView } from 'expo-blur';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { deleteParty } from '../../features/user/userActions';
import { useNavigation } from '@react-navigation/native';
import { createOpenLink } from 'react-native-open-maps';
import { limitTextLength, keyExtractor } from '../../helpers/uiHelper';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-root-toast';

const PepperPartyDescription = (descriptionProps: {
  route: { params: { party: IParty, canCancel: boolean, withAddress?: boolean }
}}): JSX.Element => {
  // TODO: fix location, make it open google maps or something
  const { width } = Dimensions.get('window');
  const [carouselWidth, setCarouselWidth] = useState(width);
  const [cancelPartyModalVisible, setCancelPartyModalVisible] = useState(false);
  const { party } = descriptionProps.route.params;
  const { canCancel } = descriptionProps.route.params;
  const storeDispatch = usePepperDispatch();
  const navigation = useNavigation();

  const attendeesTag = (attendees: {
    people: number,
    minAge: number,
    maxAge: number,
  }): string => `${attendees.people} people (${attendees.minAge}yo - ${attendees.maxAge}yo)`;

  const onLayout = (event: {nativeEvent: { layout: { width: number } } }): void => {
    const { width } = event.nativeEvent.layout;
    setCarouselWidth(.97 * width);
  };

  const miniFoodPrice = (): string => `${Math.min(...party.foods.map((food) => food.price))}$`;
  const miniDrinkPrice = (): string => `${Math.min(...party.drinks.map((food) => food.price))}$`;
  const partyPrice = (): string => (party.price !== 0 ? `${party.price}$` : 'Free');
  const StaticMenuList = (items: Array<{ name: string, price: number }>): JSX.Element[] => items.map((item) => (
    <View key={keyExtractor(item.name)} style={styles.menuDescription}>
      <Text>{item.name}</Text>
      <Text>{`${item.price}$`}</Text>
    </View>
  ));

  const StaticCancelPartyModal = (): JSX.Element => (
    <Modal
      animationType="fade"
      visible={cancelPartyModalVisible}
      transparent={true}
      onRequestClose={() => setCancelPartyModalVisible(false)}>
      <BlurView tint="dark" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PepperImage src={PepperImages.Sleep} style={styles.modalImage}></PepperImage>
          <Text style={styles.modalDescription}>
            You don't want to go to this party anymore ?
          </Text>
          <View style={styles.modalButtonsContainer}>
            <TouchableOpacity onPress={() => setCancelPartyModalVisible(false) }>
              <Text style={{ fontSize: fontSizeBody, color: sea }}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              storeDispatch(deleteParty({ partyId: party.id })).then(() => {
                setCancelPartyModalVisible(false);
                navigation.goBack();
              });
            } }>
              <Text style={{ fontSize: fontSizeBody, color: grey_3 }}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BlurView>
    </Modal>
  );

  const StaticAddress = (): JSX.Element => (<TouchableOpacity
    onPress={createOpenLink({ query: party.location })}
    onLongPress={() => {
      Clipboard.setString(party.location);
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
      iconName="pepper-location" text={limitTextLength(party.location, 30)}
      firstGradientColor={sea}
      secondGradientColor={indigo_3}
      style={styles.tags}
      tagStyle={styles.locationTag}/>
  </TouchableOpacity>);

  return (
    <ScrollView style={{ backgroundColor: white }}>
      <StaticCancelPartyModal/>
      <View style={styles.container} onLayout={onLayout}>
        <View style={styles.imageCarouselContainer}>
          <PepperDescriptionCarousel carouselWidth={carouselWidth} carouselImgs={party.imgs}/>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={{ fontSize: fontSizeHeader }}>{party.title}</Text>
          <Text style={{ fontSize: fontSizeSubHeader }}>{party.theme}</Text>
          <Text style={styles.details}>{moment(party.date).format('YYYY MMM DD')}</Text>
          {
            !!descriptionProps.route.params.withAddress ? <StaticAddress/> : null
          }

          <View style={styles.tagsContainer}>
            <PepperTag
              iconName="pepper-dancing"
              text={attendeesTag(party)}
              firstGradientColor={pepper}
              secondGradientColor={pepper_2}
              style={styles.tags}/>
          </View>
          <View style={styles.tagsContainer}>
            <PepperTag
              iconName="pepper-beer"
              text={miniDrinkPrice()}
              firstGradientColor={sun}
              secondGradientColor={sun_2}
              style={styles.tags}/>
            <PepperTag
              iconName="pepper-burger"
              text={miniFoodPrice()}
              firstGradientColor={fire}
              secondGradientColor={fire_2}
              style={styles.tags}/>
            <PepperTag
              iconName="pepper-partyPopper"
              text={partyPrice()}
              firstGradientColor={indigo_2}
              secondGradientColor={indigo_3}
              style={styles.tags}/>
          </View>
          <Text style={styles.description}>{party.description}</Text>
          <Text style={{ ...styles.menuTitle, marginTop: 0 }}>Drinks</Text>
          {StaticMenuList(party.drinks)}
          <Text style={styles.menuTitle}>Foods</Text>
          {StaticMenuList(party.foods)}
        </View>
        {
          canCancel ? (
            <TouchableOpacity style={styles.cancelButton}
              onPress={() => setCancelPartyModalVisible(true)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          ) :
            null
        }
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
  description: {
    fontSize: fontSizeRegular,
    color: raven,
    width: '100%',
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
  }
});
