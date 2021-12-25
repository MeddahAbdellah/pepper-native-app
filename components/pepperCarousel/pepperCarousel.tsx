import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { white, space_unit, grey_2, indigo, pepper } from '../../styles/common';
import PepperRoundButton from '../pepperRoundButton/pepperRoundButton';
import { useNavigation } from '@react-navigation/native';

export default function PepperCarousel(onBoardingProps: { pages: Array<{ image: PepperImages, text: string }>, nextStep: string }) {
  const carouselWidth = Dimensions.get("window").width;
  
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<any>();

  const CarouselItem = (carouselProps: { item: { image: PepperImages, text: string }, index: number }) => (
    <View style={styles.container}>
      <PepperImage src={carouselProps.item.image} style={styles.image}></PepperImage>
      <Text style={styles.description}>{carouselProps.item.text}</Text>
    </View>
  );

  return (
    <View>
      <Carousel
      layout={"default"}
      data={onBoardingProps.pages}
      sliderWidth={carouselWidth}
      itemWidth={carouselWidth}
      renderItem={CarouselItem}
      activeSlideOffset={.1 * carouselWidth}
      swipeThreshold={.1 * carouselWidth}
      enableMomentum={true}
      onBeforeSnapToItem={(index) => { setActiveIndex(index); } } />

      <Pagination
        dotsLength={onBoardingProps.pages.length}
        activeDotIndex={activeIndex}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
        containerStyle={{ marginBottom: 5 * space_unit }}
      />
      { (activeIndex === onBoardingProps.pages.length - 1) ? 
          (<PepperRoundButton
            size={7 * space_unit}
            style={styles.nextButton}
            colors={[indigo, pepper]}
            iconName="pepper-arrowRight"
            onPress={() => {navigation.navigate(onBoardingProps.nextStep)}}
          />) : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '50%',
    marginBottom: 4 * space_unit,
  },
  chipsContainer: {
    flexDirection: 'row',
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    width: '80%',
    textAlign: 'center',
  },
  dot: {
    width: 1.5 * space_unit,
    height: 1.5 * space_unit,
    borderRadius: space_unit,
    marginHorizontal: space_unit,
    backgroundColor: grey_2,
  },
  nextButton: {
    position: 'absolute',
    bottom: 3 * space_unit,
    right: 2 * space_unit,
    zIndex: 2,
    shadowColor: white,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .3,
    shadowRadius: 3,
    elevation: 2,
  }
});