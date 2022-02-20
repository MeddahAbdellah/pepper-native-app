import React, { useState } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Image,
} from 'react-native';
import { keyExtractor } from '../../helpers/uiHelper';
import { ImageInputSchema, ImageItem } from './formTypes';
import {
  space_unit, grey_3, color, indigo, indigo_3, fontSizeSubSubHeader,
} from '../../styles/common';
import PepperIcon from '../pepperIcon/pepperIcon';
import * as ImagePicker from 'expo-image-picker';
import _ from 'lodash';

const IMAGE_ROWS = 2;
const IMAGE_COLUMNS = 3;
interface IImageInput extends Omit<ImageInputSchema, 'type'> {
  onSubmit: (result: {value: ImageItem[], valid: boolean}) => void,
};

const PepperImageInput = (imageInputProms: IImageInput): JSX.Element => {
  const [imgsOutput, setImagesOutput] = useState<{[key: number]: { uri: string }}>({});

  const addImage = (id: number): void => {
    (async() => {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 3],
        base64: true,
        quality: 1,
      });
      if (image && !image.cancelled) {
        // use base64 and aws to generate uri
        const newImgOutput = { ...imgsOutput, [id]: { uri: image.uri } };
        setImagesOutput(newImgOutput);
        imageInputProms.onSubmit({ value: _.values(newImgOutput), valid: true });
      };
    })();
  };

  const StaticImageInput = (imageProps: { id: number }): JSX.Element => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => addImage(imageProps.id)}>
      { !!imgsOutput[imageProps.id] ?
        <Image style={{ width: '100%', height: '100%' }} source={{ uri: imgsOutput[imageProps.id].uri }}/> :
        <PepperIcon name='pepper-add' size={4 * space_unit} color={color(indigo, .6)}/>
      }
    </TouchableOpacity>
  );

  const StaticImageInputColumns = (imageInputColumnsProps: { id: number }): JSX.Element => (
    <View style={{ flexDirection: 'row' }}>
      {
        Array.from(
          Array(IMAGE_COLUMNS).keys()
        ).map((value) => <StaticImageInput id={(imageInputColumnsProps.id * IMAGE_COLUMNS) + value + 1} key={keyExtractor(value)}/>)
      }
    </View>);

  const StaticImageInputRows = (): JSX.Element => (
    <View>{
      Array.from(
        Array(IMAGE_ROWS).keys()
      ).map((value) => <StaticImageInputColumns id={value + 1} key={keyExtractor(value)}/>)
    }</View>);

  return (
    <View style={styles.container}>
      <StaticImageInputRows/>
    </View>
  );
};

export default PepperImageInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: '30%',
    aspectRatio: 2 / 3,
    margin: space_unit,
    backgroundColor: color(grey_3, .1),
    borderRadius: space_unit,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: color(grey_3, .1),
  },
  validateButtonText: {
    color: indigo_3,
    marginTop: 20 * space_unit,
    fontSize: fontSizeSubSubHeader,
  },
});
