import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PepperStackRoutes } from '../../../models/routes';
import {
  fontSizeRegular, indigo_3, space_unit, white,
} from '../../../styles/common';
import { useNavigation } from '@react-navigation/native';
import {
  FormSchema, FormType, PepperFormStepper,
} from '../../pepperForm';

import { usePepperOrganizer } from '../../../hooks/organizer.hooks';
import { updateOrganizer } from '../../../features/organizer/organizerActions';
import { usePepperDispatch } from '../../../hooks/store.hooks';
import { StoreStatus } from '../../../models/types';

const PepperOrganizerUpdateImages = (): JSX.Element => {
  const organizer = usePepperOrganizer();
  const storeDispatch = usePepperDispatch();
  // TODO: Library does not provide a type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigation = useNavigation<any>();
  const schemas: FormSchema[] = [
    {
      imgs: {
        type: FormType.Image,
        initialValue: organizer.organizer.imgs
      },
    }
  ];

  const [updateSatus, setUpdateStatus] = useState(organizer.updateStatus);

  useEffect(() => {
    if ((organizer.updateStatus !== updateSatus) && (organizer.updateStatus = StoreStatus.Fulfilled)) {
      navigation.navigate(PepperStackRoutes.Main);
    }
    setUpdateStatus(organizer.updateStatus);

  }, [organizer.updateStatus]);

  return (
    <View style={styles.container}>
      <PepperFormStepper schemas={schemas} onDone={async(subscriptionFormOutput) => {
        // eslint-disable-next-line no-console
        const {
          imgs
        } = subscriptionFormOutput;
        storeDispatch(updateOrganizer({ imgs: imgs as Array<{ uri: string }> }));
      }}/>

    </View>
  );
};

export default PepperOrganizerUpdateImages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    position: 'absolute',
    bottom: 5 * space_unit,
    left: 3 * space_unit,
    zIndex: 2,
  },
  loginText: {
    fontSize: fontSizeRegular,
    color: indigo_3,
    textDecorationLine: 'underline'
  }
});
