import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import {
  color, black, space_unit, white, pepper, indigo,
} from '../../styles/common';
import PepperRoundButton from '../pepperRoundButton/pepperRoundButton';
import { useNavigation } from '@react-navigation/native';


const PepperDescriptionCarousel = (carouselProps: { carouselWidth: number, carouselImgs: Array<{ uri: string }>,
   hideGoBackBtn?: boolean, editBtnEffect?: () => void }):
 JSX.Element => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const StaticDescriptionImgs = (partyImg: {item: { uri: string } } ): JSX.Element => (
    <ImageBackground source={partyImg.item} style={styles.image} resizeMode="cover">
      <LinearGradient colors={['transparent', color(black, .7)]} style={styles.imageMask}>
      </LinearGradient>
    </ImageBackground>
  );

  return (
    <>
      <Carousel
        layout={'default'}
        data={carouselProps.carouselImgs}
        sliderWidth={carouselProps.carouselWidth}
        itemWidth={carouselProps.carouselWidth}
        activeSlideOffset={.1 * carouselProps.carouselWidth}
        swipeThreshold={.1 * carouselProps.carouselWidth}
        enableMomentum={true}
        contentContainerCustomStyle={{ height: styles.image.height }}
        inactiveSlideScale={1}
        renderItem={StaticDescriptionImgs}
        onBeforeSnapToItem={(index) => { setActiveIndex(index); } } />
      { (carouselProps.hideGoBackBtn !== true) ?
        <PepperRoundButton
          size={6 * space_unit}
          style={styles.backButton}
          colors={[indigo, pepper]}
          iconName="pepper-arrowLeft"
          onPress={navigation.goBack}
        /> :
        null}
      { (carouselProps.editBtnEffect !== undefined) ?
        <PepperRoundButton
          size={6 * space_unit}
          style={styles.editButton}
          colors={[indigo, pepper]}
          iconName="pepper-pencil"
          onPress={carouselProps.editBtnEffect}
        /> :
        null}
      <View style={styles.paginationContainer} pointerEvents="none">
        <Pagination
          dotsLength={carouselProps.carouselImgs.length}
          activeDotIndex={activeIndex}
          dotStyle={styles.dot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
          containerStyle={{ paddingVertical: 2 * space_unit }}
        />
      </View>
    </>
  );
};

export default PepperDescriptionCarousel;

const styles = StyleSheet.create({
  paginationContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  dot: {
    width: space_unit,
    height: space_unit,
    borderRadius: space_unit,
    backgroundColor: white,
  },
  imageMask: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 2 * space_unit,
    left: 2 * space_unit,
    zIndex: 4,
    shadowColor: white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 2,
  },
  editButton: {
    position: 'absolute',
    bottom: 2 * space_unit,
    right: 2 * space_unit,
    zIndex: 4,
    shadowColor: white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 2,
  }
});
