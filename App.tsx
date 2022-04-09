import React, { useState, useEffect } from 'react';
import PepperError from './components/pepperError/pepperError';
import * as SecureStore from 'expo-secure-store';
import PepperUserApp from './projects/userApp';
import { SecureStoreKeys, UtilService } from './services/util';
import PepperOrganizerApp from './projects/organizerApp';

const PepperApp = (): JSX.Element => {
  const [isErrorFree, setIsErrorFree] = useState(true);
  const [isOrganizer, setIsOrganizer] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    (async() => {
      try {
        const error = await SecureStore.getItemAsync(SecureStoreKeys.Error);
        if (!!error) {
          setIsErrorFree(false);
        }
        const isOrganizer = await UtilService.isOrganizer();
        setIsOrganizer(isOrganizer);
        setIsUser(!isOrganizer);
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
          <><>
            {isOrganizer ?
              (<PepperOrganizerApp />) :
              null}
          </><>
            {isUser ?
              (<PepperUserApp />) :
              null}
          </></>
      }
    </>
  );
};

export default PepperApp;
