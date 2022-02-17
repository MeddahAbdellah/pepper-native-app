import React, { useState, useEffect } from 'react';
import {
  StyleSheet, Text, View, Modal, TouchableOpacity,
} from 'react-native';
import { BlurView } from 'expo-blur';
import {
  fontSizeBody, white, space_unit, black, fontSizeRegular, raven,
} from '../../styles/common';
import QRCode from 'react-native-qrcode-svg';
import PepperImage, { imagesPepperSources, PepperImages } from '../pepperImage/pepperImage';
import PepperIcon from '../pepperIcon/pepperIcon';
import PepperQrCodeScanner from './pepperQRCodeScanner';
import { BarCodeScanningResult } from 'expo-camera';
import { usePepperUser } from '../../hooks/user.hooks';
import { fetchUser, addMatch } from '../../features/user/userActions';
import { usePepperDispatch } from '../../hooks/store.hooks';

enum QRcodeModalMode {
  Scan = 'scan',
  Display = 'display'
}
const PepperQRCodeModal = (modalProps: { show: boolean, onRequestClose: () => void }): JSX.Element => {
  const [mode, setMode] = useState(QRcodeModalMode.Display);
  const [qrCodeScanned, setQrCodeScanned] = useState(false);
  const storeDispatch = usePepperDispatch();
  // Fetch user on load
  useEffect(() => {
    if (modalProps.show) {
      storeDispatch(fetchUser());
    }
  }, [modalProps.show]);
  const currentUser = usePepperUser();

  const handleBarCodeScanned = (result: BarCodeScanningResult): void => {
    // Keeping console log until implmentation
    // eslint-disable-next-line no-console
    console.log(`Bar code with type ${result.type} and data ${result.data} has been scanned!`);

    storeDispatch(addMatch({ matchId: Number(result.data) }));
    modalProps.onRequestClose();
    setQrCodeScanned(true);
  };

  const StaticQrCodeScannedModal = (): JSX.Element => (
    <Modal
      animationType="fade"
      visible={qrCodeScanned}
      transparent={true}
      onRequestClose={() => setQrCodeScanned(false)}>
      <BlurView tint="dark" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PepperImage src={PepperImages.Peace} style={styles.modalImage}></PepperImage>
          <Text style={styles.modalDescription}>
            Somebody new has entered your life, Treat them right this might go somewhere!
          </Text>
          <TouchableOpacity onPress={() => setQrCodeScanned(false) }>
            <Text style={{ fontSize: fontSizeBody }}>Great!</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );

  return (
    <>
      <StaticQrCodeScannedModal/>
      <Modal
        animationType="fade"
        visible={modalProps.show}
        transparent={true}
        onRequestClose={modalProps.onRequestClose}>
        <BlurView tint="dark" style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={modalProps.onRequestClose} style={styles.closeButton}>
              <PepperIcon name="pepper-close" size={3 * space_unit} />
            </TouchableOpacity>
            { mode === QRcodeModalMode.Display ? (
              <>
                <Text style={{ fontSize: fontSizeBody, marginBottom: 3 * space_unit }}>Ask someone to scan me!</Text>
                <View style={styles.qrCodeContainer}>
                  <QRCode
                    // TODO: add totp userID for security
                    value={`${currentUser.user.id}`}
                    size={styles.qrCodeContainer.height}
                    logoSize={.3 * styles.qrCodeContainer.height}
                    logo={imagesPepperSources.chiliPepperBlack}
                    // eslint-disable-next-line no-console
                    onError={() => console.log('TODO: handle QR code error')}/>
                </View>
                <TouchableOpacity onPress={() => setMode(QRcodeModalMode.Scan) }>
                  <Text style={{ fontSize: fontSizeBody, marginTop: 5 * space_unit }}>Scan</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={{ fontSize: fontSizeBody, marginBottom: 3 * space_unit }}>Scan a QR code</Text>
                <PepperQrCodeScanner onBarCodeScanned={handleBarCodeScanned}/>
                <TouchableOpacity onPress={() => setMode(QRcodeModalMode.Display) }>
                  <Text style={{ fontSize: fontSizeBody, marginTop: 5 * space_unit }}>Show your QR code</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </BlurView>
      </Modal>
    </>);
};

export default PepperQRCodeModal;

const styles = StyleSheet.create({
  closeButton: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '95%',
    backgroundColor: white,
    borderRadius: 2 * space_unit,
    padding: 3 * space_unit,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    height: 22 * space_unit,
  },
  modalDescription: {
    textAlign: 'center',
    marginVertical: 2 * space_unit,
    fontSize: fontSizeRegular,
  },
  scannerContainer: {
    borderRadius: 2 * space_unit,
    overflow: 'hidden',
    height: 40 * space_unit,
    width: 40 * space_unit,
    backgroundColor: raven,
  },
  qrCodeContainer: {
    borderRadius: 2 * space_unit,
    overflow: 'hidden',
    height: 40 * space_unit,
    width: 40 * space_unit,
  }
});
