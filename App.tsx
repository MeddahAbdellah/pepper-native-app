import React, { useState, useEffect } from 'react';
import PepperError from './components/pepperError/pepperError';
import * as SecureStore from 'expo-secure-store';
import PepperUserApp from './projects/userApp';

const PepperApp = (): JSX.Element => {
  const [isErrorFree, setIsErrorFree] = useState(true);

  useEffect(() => {
    // FIX: fix memory leak
    let isMounted = true;
    SecureStore.getItemAsync('error').then((error) => {
      if (!!error && isMounted) {
        setIsErrorFree(false);
      }
    });
    return () => { isMounted = false; };
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
