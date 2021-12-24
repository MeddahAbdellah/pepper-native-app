import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { white, space_unit, grey_2 } from '../../styles/common';

export default function PepperCarousel(onBoardingProps: { pages: Array<{ image: PepperImages, text: string }> }) {
  const [activeIndex, setActiveIndex] = useState(0);

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
      sliderWidth={50 * space_unit}
      itemWidth={50 * space_unit}
      renderItem={CarouselItem}
      onSnapToItem={(index) => { setActiveIndex(index); } } />

      <Pagination
        dotsLength={onBoardingProps.pages.length}
        activeDotIndex={activeIndex}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
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
    width: 2 * space_unit,
    height: 2 * space_unit,
    borderRadius: space_unit,
    marginHorizontal: space_unit,
    backgroundColor: grey_2,
  }
});