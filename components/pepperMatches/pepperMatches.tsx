import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, Modal} from 'react-native'
import { space_unit, fontSizeSubHeader, white, fontSizeRegular, heaven, pepper_2, sea, grey_3, black, fontSizeBody, pepper, loremIpsium } from '../../styles/common';
import { IUser, MatchStatus, Gender } from '../../models/types';
import PepperImage, { PepperImages } from '../pepperImage/pepperImage';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

const PepperMatches = () => {
  const navigation = useNavigation<any>();
  const [patienceModalVisible, setPatienceModalVisible] = useState<boolean>(false);
  const [cupidModalVisible, setCupidModalVisible] = useState<boolean>(false);
  const [evaluationModalVisible, setEvaluationModalVisible] = useState<boolean>(false);
  const [selectedMatch, setSelectedMatch] = useState<IUser>();

  // TODO : fill matches
  const matches: IUser[] = [
    {
      id: 1,
      name: 'Clémentine',
      gender: Gender.WOMAN,
      phoneNumber: '07692039459',
      status: MatchStatus.ACCEPTED,
      address: 'Paris',
      description: loremIpsium,
      job: 'Engineer',
      imgs: [
        { uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80' },
        { uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYXV0aWZ1bCUyMCUyMHdvbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80' },
        { uri: 'https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' },
        { uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFuJTIwYW5kJTIwd29tYW58ZW58MHx8MHx8&w=1000&q=80' },
      ],
      interests: ['Science', 'Art', 'Socialism'],
    },
    {
      id: 2,
      name: 'Noemie',
      gender: Gender.WOMAN,
      phoneNumber: '07442039459',
      status: MatchStatus.UNCHECKED,
      address: 'Paris',
      description: loremIpsium,
      job: 'Danseuse',
      imgs: [{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYXV0aWZ1bCUyMCUyMHdvbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80' }],
      interests: ['Science', 'Art', 'Socialism'],
    },
    {
      id: 3,
      name: 'Fiona',
      gender: Gender.WOMAN,
      phoneNumber: '07492039459',
      status: MatchStatus.WAITING,
      address: 'Paris',
      description: loremIpsium,
      job: 'Designer',
      imgs: [{ uri: 'https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }],
      interests: ['Science', 'Art', 'Socialism'],
    },
    {
      id: 4,
      name: 'Alice',
      gender: Gender.WOMAN,
      phoneNumber: '07122039459',
      status: MatchStatus.UNAVAILABLE,
      address: 'Paris',
      description: loremIpsium,
      job: 'Barwomen',
      imgs: [{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFuJTIwYW5kJTIwd29tYW58ZW58MHx8MHx8&w=1000&q=80' }],
      interests: ['Science', 'Art', 'Socialism'],
    },
  ];

  const StatusTag = (statusProps: { status: MatchStatus, matchName: string }) => {
    switch(statusProps.status) {
      case MatchStatus.ACCEPTED:
        return <Text style={{ fontSize: fontSizeRegular, color: heaven }}>Check her profile</Text>
      case MatchStatus.WAITING:
        return <Text style={{ fontSize: fontSizeRegular, color: grey_3 }}>Didn't check you yet</Text>
      case MatchStatus.UNCHECKED:
        return <Text style={{ fontSize: fontSizeRegular, color: sea }}>How was {statusProps.matchName}?</Text>
      default: 
        return <Text style={{ fontSize: fontSizeRegular, color: pepper_2 }}>Too Early to text her!</Text> 
    }
  }

  const checkMatch = (match: IUser): void => {
    switch(match.status) {
      case MatchStatus.ACCEPTED:
        navigation.push('UserDescription', match);
        break;
      case MatchStatus.WAITING:
        setSelectedMatch(match);
        setPatienceModalVisible(true);
        break;
      case MatchStatus.UNCHECKED:
        setSelectedMatch(match);
        setEvaluationModalVisible(true);
        break;
      default: 
        break;
    }
  }

  const closeModalAndResetSelection = () => {
    setPatienceModalVisible(false);
    setEvaluationModalVisible(false);
    setSelectedMatch(undefined);
  }

  const validateMatch = () => {
    // TODO: add validate logic
    closeModalAndResetSelection();
    setCupidModalVisible(true);
  };

  const discardMatch = () => {
    // TODO: add discard logic
    closeModalAndResetSelection();
  };

  const reportMatch = () => {
    // TODO: add report logic
    closeModalAndResetSelection();
  };

  const matchItem = (match: IUser) => (
    <TouchableOpacity style={styles.matchItemContainer} onPress={() => checkMatch(match)}>
      <Image source={match.imgs[0]} style={styles.matchImage}/>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: fontSizeSubHeader }}>{match.name}</Text>
        <View style={styles.themeAndDateContainer}>
          <Text style={{ fontSize: fontSizeRegular }}>{match.job}</Text>
          <StatusTag status={match.status} matchName={match.name}></StatusTag>
        </View>
      </View>
    </TouchableOpacity>
  );

  const PatienceModal = () => (
    <Modal
      animationType="fade"
      visible={patienceModalVisible}
      transparent={true}
      onRequestClose={() => closeModalAndResetSelection() }>
      <BlurView tint="dark" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PepperImage src={PepperImages.Wellness} style={styles.modalImage}></PepperImage>
          <Text style={styles.modalDescription}>
            In life there is time for work and time for love. {selectedMatch?.gender === Gender.MAN ? 'He' : 'She' }’s probably busy working!
          </Text>
          <TouchableOpacity onPress={() => closeModalAndResetSelection() }>
            <Text style={{fontSize: fontSizeBody}}>Okey</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );

  const CupidModal = () => (
    <Modal
      animationType="fade"
      visible={cupidModalVisible}
      transparent={true}
      onRequestClose={() => setCupidModalVisible(false)}>
      <BlurView tint="dark" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PepperImage src={PepperImages.Cupid} style={styles.modalImage}></PepperImage>
          <Text style={{...styles.modalDescription, color: pepper}}>
            Cupid has heard your wish!
          </Text>
          <TouchableOpacity onPress={() => setCupidModalVisible(false) }>
            <Text style={{fontSize: fontSizeBody}}>Okey</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );

  const CheckMatchModal = () => (
    <Modal
      animationType="fade"
      visible={evaluationModalVisible}
      transparent={true}
      onRequestClose={() => closeModalAndResetSelection() }>
      <BlurView tint="dark" style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <PepperImage src={selectedMatch?.gender === Gender.MAN ? PepperImages.Man : PepperImages.Woman} style={styles.modalImage}></PepperImage>
          <Text style={styles.modalDescription}>
            How was {selectedMatch?.name} ?
          </Text>
          <TouchableOpacity onPress={() => validateMatch() }>
            <Text style={{ marginVertical: 1.5 * space_unit, color: heaven, fontSize: fontSizeBody}}>Awesome I wanna see {selectedMatch?.gender === Gender.MAN ? 'him' : 'her' } again!</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => discardMatch() }>
            <Text style={{ marginVertical: 1.5 * space_unit, color: sea, fontSize: fontSizeBody}}>Cool but not my type</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => reportMatch() }>
            <Text style={{ marginVertical: 1.5 * space_unit, color: pepper_2, fontSize: fontSizeBody}}>Don’t wanna meet again</Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );

  return (
    <View style={styles.listContainer}>
      <PatienceModal/>
      <CheckMatchModal/>
      <CupidModal/>
      <FlatList
        data={matches}
        renderItem={(item) => matchItem(item.item) }
        keyExtractor={(item) => item.id.toString() }
      />
    </View>
  )
}

export default PepperMatches;

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    padding: 1 * space_unit,
    paddingHorizontal: 2 * space_unit,
    backgroundColor: white,
  },
  matchItemContainer: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 1 * space_unit,
  },
  themeAndDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  matchImage: {
    width: 10 * space_unit,
    height: 10 * space_unit,
    borderRadius: space_unit,
    marginRight: space_unit,
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
  }
})
