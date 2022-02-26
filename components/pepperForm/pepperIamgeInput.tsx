import React, { useState, useEffect } from 'react';
import {
  StyleSheet, View, TouchableOpacity, Image, Modal, ActivityIndicator,
} from 'react-native';
import { keyExtractor } from '../../helpers/uiHelper';
import { ImageInputSchema, ImageItem } from './formTypes';
import {
  space_unit, grey_3, color, indigo, indigo_3, fontSizeSubSubHeader, pepper,
} from '../../styles/common';
import PepperIcon from '../pepperIcon/pepperIcon';
import * as ImagePicker from 'expo-image-picker';
import _ from 'lodash';
import FileUploadService from '../../services/fileUpload';
import { BlurView } from 'expo-blur';

const IMAGE_ROWS = 2;
const IMAGE_COLUMNS = 3;
interface IImageInput extends Omit<ImageInputSchema, 'type'> {
  onSubmit: (result: {value: ImageItem[], valid: boolean}) => void,
};

const PepperImageInput = (imageInputProms: IImageInput): JSX.Element => {
  const [imgsOutput, setImagesOutput] = useState<{[key: number]: { uri: string }}>({});
  const [isImgLoading, setIsImgLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!imageInputProms.initialValue) { return; }
    const initialImages = _.mapValues(imageInputProms.initialValue);
    setImagesOutput(initialImages);
  }, [imageInputProms.initialValue]);

  const addImage = (id: number): void => {
    (async() => {
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [2, 3],
        base64: true,
        quality: 1,
      });
      setIsImgLoading(true);
      if (image && !image.cancelled && image.base64) {
        const img = await FileUploadService.uploadImage(image.base64);
        const newImgOutput = { ...imgsOutput, [id]: img };
        setImagesOutput(newImgOutput);
        imageInputProms.onSubmit({ value: _.values(newImgOutput), valid: true });
        setIsImgLoading(false);
      };
    })();
  };

  const StaticImageInput = (imageProps: { id: number }): JSX.Element => (
    <TouchableOpacity style={styles.imageContainer} onPress={() => addImage((imageProps.id - 1))}>
      { !!imgsOutput[imageProps.id - 1] ?
        <Image style={{ width: '100%', height: '100%' }} source={{ uri: imgsOutput[imageProps.id - 1].uri }}/> :
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
      ).map((value) => <StaticImageInputColumns id={value} key={keyExtractor(value)}/>)
    }</View>);

  const StaticLoadignImage = (): JSX.Element => (
    <Modal
      animationType="fade"
      visible={isImgLoading}
      transparent={true}
      onRequestClose={() => setIsImgLoading(false)}>
      <BlurView tint="dark" style={styles.modalContainer}>
        <ActivityIndicator size="large" color={pepper} />
      </BlurView>
    </Modal>
  );

  return (
    <>
      <StaticLoadignImage/>
      <View style={styles.container}>
        <StaticImageInputRows/>
      </View>
    </>
  );
};
//
export default PepperImageInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2 * space_unit,
  },
  modalContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
