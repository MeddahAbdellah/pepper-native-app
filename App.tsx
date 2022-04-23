import React, { useState, useEffect } from 'react';
import PepperError from './components/pepperError/pepperError';
import * as SecureStore from 'expo-secure-store';
import PepperUserApp from './projects/userApp';
import { SecureStoreKeys, UtilService } from './services/util';
import PepperOrganizerApp from './projects/organizerApp';
import { ActivityIndicator, View } from 'react-native';
import { pepper } from './styles/common';

enum AppType {
  Loading,
  User,
  Organizer
}

const PepperApp = (): JSX.Element => {
  const [isErrorFree, setIsErrorFree] = useState(true);
  const [appType, setAppType] = useState(AppType.Loading);

  useEffect(() => {
    const abortController = new AbortController();
    (async() => {
      try {
        const error = await SecureStore.getItemAsync(SecureStoreKeys.Error);
        if (!!error) {
          setIsErrorFree(false);
        }
        const isOrganizer = await UtilService.isOrganizer();
        if (isOrganizer) {
          setAppType(AppType.Organizer);
          return;
        }
        setAppType(AppType.User);
      } catch (error) {
        setIsErrorFree(false);
      }
    })();
    return () => { abortController.abort(); };
  }, []);


  return (
    <>
      {
        !isErrorFree ?
          (<PepperError/>) :
          <>
            <>
              {appType === AppType.Loading ?
                (<View style={{ flex: 1, justifyContent: 'center' }}>
                  <ActivityIndicator size="large" color={pepper} />
                </View>) :
                null}
            </>
            <>
              {appType === AppType.Organizer ?
                (<PepperOrganizerApp />) :
                null}
            </>
            <>
              {appType === AppType.User ?
                (<PepperUserApp />) :
                null}
            </>
          </>
      }
    </>
  );
};

export default PepperApp;
