import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, ScrollView, Dimensions, TouchableOpacity,
} from 'react-native';
import {
  white, space_unit, fontSizeRegular, fontSizeHeader, sun, sun_2, fire, fire_2, indigo_2, indigo, grey_3, color, pepper, raven, pepper_2,
} from '../../styles/common';
import PepperDescriptionCarousel from '../pepperDescriptionCarousel/pepperDescriptionCarousel';
import PepperTag from '../pepperTags/pepperTags';
import LoginService from '../../services/login';
import { usePepperDispatch } from '../../hooks/store.hooks';
import { fetchUser, resetUser, updateUser } from '../../features/user/userActions';
import { usePepperUser } from '../../hooks/user.hooks';
import { useNavigation } from '@react-navigation/native';
import { PepperStackRoutes } from '../../models/routes';
import {
  FormSchema, PepperForm, FormType, nameValidator, cityValidator, alwaysValidValidator, MenuItem, tagValidator,
} from '../pepperForm';
import { keyExtractor } from '../../helpers/uiHelper';

const PepperUserDescription = (): JSX.Element => {
  const { width } = Dimensions.get('window');
  const [carouselWidth, setCarouselWidth] = useState(width);
  const [schema, setSchema] = useState<FormSchema>({});
  const storeDispatch = usePepperDispatch();
  // Fetch user on load
  useEffect(() => { storeDispatch(fetchUser()); }, []);
  const currentUser = usePepperUser();
  useEffect(() => {
    if (!currentUser.user) { return; }
    setSchema({
      job: {
        type: FormType.Text,
        label: 'Job',
        initialValue: currentUser.user.job,
        max: 20,
        validator: nameValidator,
      },
      address: {
        type: FormType.Text,
        label: 'Ville',
        initialValue: currentUser.user.address,
        max: 30,
        validator: cityValidator,
      },
      description: {
        type: FormType.Text,
        label: 'Description',
        initialValue: currentUser.user.description,
        multiline: true,
        max: 200,
        validator: alwaysValidValidator,
      },
      interests: {
        type: FormType.Tags,
        label: 'You & your hobbies',
        initialValue: Array<string>(),
        validator: tagValidator,
      },
    });
  }, [currentUser]);

  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();

  const onLayout = (event: {nativeEvent: { layout: { width: number } } }): void => {
    const { width } = event.nativeEvent.layout;
    setCarouselWidth(.97 * width);
  };

  const StaticInterestTags = (): JSX.Element[] => currentUser.user.interests.map((interest, index) => {
    const tagColors = [[sun, sun_2], [fire, fire_2], [indigo, indigo_2], [pepper, pepper_2]];
    return (<PepperTag
      key={keyExtractor(interest)}
      text={interest}
      firstGradientColor={tagColors[index][0]}
      secondGradientColor={tagColors[index][1]}
      style={styles.tags}/>);
  });

  const updatePersonalInfo = (result: { [key: string]: string | MenuItem[] | string[]; }): void => {
    storeDispatch(updateUser(result));
  };

  return (
    <ScrollView style={{ backgroundColor: white }}>
      <View style={styles.container} onLayout={onLayout}>
        <View style={styles.imageCarouselContainer}>
          <PepperDescriptionCarousel carouselWidth={carouselWidth} carouselImgs={currentUser.user.imgs}/>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={{ fontSize: fontSizeHeader }}>{currentUser.user.name}</Text>
          <View style={styles.tagsContainer}>{StaticInterestTags()}</View>
          <PepperForm
            schema={schema}
            onSubmit={updatePersonalInfo}
            style={{ padding: 0, marginTop: 2 * space_unit }}
            hasUpdateButton={true}></PepperForm>
        </View>
        <TouchableOpacity style={styles.logoutButton}
          onPress={async() => {
            await LoginService.logout();
            storeDispatch(resetUser());
            navigation.navigate(PepperStackRoutes.LadingPage);
          }}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default PepperUserDescription;

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
    height: 57 * space_unit,
  },
  detailsContainer: {
    width: '100%',
    paddingHorizontal: 2 * space_unit,
    marginTop: space_unit,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: space_unit,
  },
  detailText: {
    fontSize: fontSizeRegular,
    color: raven,
    marginLeft: space_unit,
  },
  detailImages: {
    height: 4 * space_unit,
    width: 4 * space_unit,
  },
  tagsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 2 * space_unit,
  },
  tags: {
    marginBottom: .3 * space_unit,
    marginRight: space_unit,
    shadowColor: color(grey_3, .3),
  },
  description: {
    fontSize: fontSizeRegular,
    color: raven,
    width: '100%',
    marginVertical: 2 * space_unit,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: pepper,
    marginTop: 6 * space_unit,
    borderRadius: 1 * space_unit,
  },
  logoutButtonText: {
    width: '80%',
    textAlign: 'center',
    color: white,
    paddingVertical: 2 * space_unit,
  },
});
