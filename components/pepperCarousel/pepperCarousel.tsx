import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import Carousel from 'react-native-snap-carousel';
import { white, grey_1, space_unit, grey_2 } from '../../styles/common';

export default function PepperCarousel(onBoardingProps: { pages: Array<{ image: PepperImages, text: string }> }) {
  const renderDots = (activeIndex: number) => {
    const numberOfDots = onBoardingProps.pages.length;
    return Array.from(Array(numberOfDots).keys()).map((index) => {
      return index === activeIndex ?
        (<Dot key={index} backgroundColor={grey_2}></Dot>) :
        (<Dot key={index} backgroundColor={grey_1}></Dot>);
    });
  };

  const renderItem = (carouselProps: { item: any, index: any }) => (
    <View style={styles.container}>
      <PepperImage src={carouselProps.item.image} style={styles.image}></PepperImage>
      <Text style={styles.description}>{carouselProps.item.text}</Text>
      <View style={styles.chipsContainer}>
        {renderDots(carouselProps.index)}
      </View>
    </View>
  );
  
  return (
    <Carousel
      layout={"default"}
      data={onBoardingProps.pages}
      sliderWidth={50 * space_unit}
      itemWidth={50 * space_unit}
      renderItem={renderItem}/>
  );
}

function Dot(dotProps: { backgroundColor: string} = { backgroundColor: grey_1 }) {
  return (
    <View style={{ ...styles.dot, ...dotProps }}></View>
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
  dot:{ 
    width: 2 * space_unit,
    height: 2 * space_unit,
    borderRadius: space_unit,
    margin: space_unit,
    marginTop: 3 * space_unit,
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
  }
});