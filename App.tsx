import React, { useState, useEffect } from 'react';
import PepperError from './components/pepperError/pepperError';
import * as SecureStore from 'expo-secure-store';
import PepperUserApp from './projects/userApp';
import { SecureStoreKeys } from './services/util';

const PepperApp = (): JSX.Element => {
  const [isErrorFree, setIsErrorFree] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    (async() => {
      try {
        const error = await SecureStore.getItemAsync(SecureStoreKeys.Error);
        if (!!error) {
          setIsErrorFree(false);
        }
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
          (<PepperUserApp/>)
      }
    </>
  );
};

export default PepperApp;
