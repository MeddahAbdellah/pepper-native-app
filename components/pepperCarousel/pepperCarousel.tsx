import React, { useState } from 'react'
import {  Text, View, Dimensions } from 'react-native'
import styles from "./styles";
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { space_unit, indigo, pepper } from '../../styles/common';
import PepperRoundButton from '../pepperRoundButton/pepperRoundButton';
import { useNavigation } from '@react-navigation/native';

export default function PepperCarousel(onBoardingProps: { pages: Array<{ image: PepperImages, text: string | JSX.Element }>, nextStep: string }) {
  const carouselWidth = Dimensions.get("window").width;
  
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation<any>();

  const CarouselItem = (carouselProps: { item: { image: PepperImages, text: string | JSX.Element }, index: number }) => {

     return <View style={styles.container}>
        <PepperImage src={carouselProps.item.image} style={styles.image}></PepperImage>
        <Text style={styles.description}>{carouselProps.item.text}</Text>
      </View>
  }

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
