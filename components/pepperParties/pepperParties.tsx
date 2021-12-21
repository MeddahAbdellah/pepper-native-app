import React from 'react'
import { StyleSheet, View, SafeAreaView, Text, ImageBackground } from 'react-native'
import { space_unit, white, black, color, fontSizeHeader, fontSizeSubHeader } from '../../styles/common';
import Swiper from 'react-native-deck-swiper';
import { LinearGradient } from 'expo-linear-gradient';

export default function PepperParties() {
  // TODO : fill parties
  const parties = [
    {
      name: 'Richard Hendricks',
      img: { uri: 'https://www.oubruncher.com/photos1/1631_1.jpg' },
    },
    {
      name: 'Erlich Bachman',
      img: { uri: 'https://storage.googleapis.com/eyp-wordpress/1/2021/09/social-bar-saint-ouen-1440x946.jpg' },
    },
    {
      name: 'Monica Hall',
      img: { uri: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s2f6af3166883d3ee/image/i8c4fa5b2ed1f62b8/version/1454158048/image.jpg' },
    },
    {
      name: 'Richard Hendricks',
      img: { uri: 'https://www.oubruncher.com/photos1/1631_1.jpg' },
    },
    {
      name: 'Erlich Bachman',
      img: { uri: 'https://storage.googleapis.com/eyp-wordpress/1/2021/09/social-bar-saint-ouen-1440x946.jpg' },
    },
    {
      name: 'Monica Hall',
      img: { uri: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s2f6af3166883d3ee/image/i8c4fa5b2ed1f62b8/version/1454158048/image.jpg' },
    },
    {
      name: 'Richard Hendricks',
      img: { uri: 'https://www.oubruncher.com/photos1/1631_1.jpg' },
    },
    {
      name: 'Erlich Bachman',
      img: { uri: 'https://storage.googleapis.com/eyp-wordpress/1/2021/09/social-bar-saint-ouen-1440x946.jpg' },
    },
    {
      name: 'Monica Hall',
      img: { uri: 'https://image.jimcdn.com/app/cms/image/transf/none/path/s2f6af3166883d3ee/image/i8c4fa5b2ed1f62b8/version/1454158048/image.jpg' },
    },
  ];

  function Card(cardProps: { party: { name: string, img: { uri: string } } }) {
    return (
      <ImageBackground source={cardProps.party.img} style={styles.image} resizeMode='cover'>
        <LinearGradient colors={['transparent', color(black, .7), black]} style={styles.imageMask}>
          <View style={styles.descriptionContainer}> 
            <Text style={styles.partyName}>{cardProps.party.name}</Text>
            <Text style={styles.partyTheme}>{cardProps.party.name}</Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  } 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
      <Swiper
            cards={parties}
            renderCard={(party: { name: string, img: { uri: string } }) => {
                return (<Card party={party}></Card>);
            }}
            onSwiped={(cardIndex) => {console.log(cardIndex)}}
            onSwipedAll={() => {console.log('onSwipedAll')}}
            backgroundColor={white}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            stackSeparation={0}
            stackSize={3}>
        </Swiper>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '97%',
    borderRadius:  .75 * space_unit,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '90%',
    borderRadius:  space_unit,
    zIndex: 1,
  },
  imageMask: {
    position: 'absolute',
    height: '90%',
    width: '100%',
    zIndex: 2,
  },
  descriptionContainer: {
    flex: 1,
    padding: 2 * space_unit,
    justifyContent: 'flex-end',
  },
  partyName: {
    fontSize: fontSizeHeader,
    color: white,
    zIndex: 3,
  },
  partyTheme: {
    fontSize: fontSizeSubHeader,
    color: white,
    zIndex: 3,
  },

});
