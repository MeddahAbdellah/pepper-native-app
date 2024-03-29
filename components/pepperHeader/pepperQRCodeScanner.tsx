
import React, { useState, useEffect } from 'react';
import { Camera, BarCodeScanningResult } from 'expo-camera';
import { fontSizeBody, space_unit, raven } from '../../styles/common';
import { StyleSheet, View, Text } from 'react-native';

const PepperQrCodeScanner = (scannerProp: { onBarCodeScanned: (result: BarCodeScanningResult) => void }): JSX.Element => {
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();

    (async() => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    return () => { abortController.abort(); };
  }, []);

  if (hasPermission === null) {
    return (<Text style={{ fontSize: fontSizeBody, paddingVertical: 8 * space_unit }}>Requesting for camera permission</Text>);
  }

  if (hasPermission === false) {
    return (<Text style={{ fontSize: fontSizeBody, paddingVertical: 8 * space_unit }}>No access to camera</Text>);
  }

  return (
    <View style={styles.scannerContainer}>
      <Camera
        onBarCodeScanned={scannerProp.onBarCodeScanned}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default PepperQrCodeScanner;

const styles = StyleSheet.create({
  scannerContainer: {
    borderRadius: 2 * space_unit,
    overflow: 'hidden',
    height: 40 * space_unit,
    width: 40 * space_unit,
    backgroundColor: raven,
  },
});
