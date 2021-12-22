import React from 'react'
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity} from 'react-native'
import { space_unit, fontSizeSubHeader, white, fontSizeRegular, heaven, pepper_2, sea, grey_3 } from '../../styles/common';
import { IMatch, MatchStatus } from '../../models/types';

const PepperMatches = () => {
  // TODO : fill matches
  const matches: IMatch[] = [
    {
      id: 1,
      name: 'Clémentine',
      phoneNumber: '07692039459',
      status: MatchStatus.ACCEPTED,
      job: 'Engineer',
      imgs: [{ uri: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cG9ydHJhaXR8ZW58MHx8MHx8&w=1000&q=80' }],
    },
    {
      id: 2,
      name: 'Noemie',
      phoneNumber: '07442039459',
      status: MatchStatus.UNCHECKED,
      job: 'Danseuse',
      imgs: [{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGJlYXV0aWZ1bCUyMCUyMHdvbWFufGVufDB8fDB8fA%3D%3D&w=1000&q=80' }],
    },
    {
      id: 3,
      name: 'Fiona',
      phoneNumber: '07492039459',
      status: MatchStatus.WAITING,
      job: 'Designer',
      imgs: [{ uri: 'https://images.pexels.com/photos/38554/girl-people-landscape-sun-38554.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' }],
    },
    {
      id: 4,
      name: 'Alice',
      phoneNumber: '07122039459',
      status: MatchStatus.UNAVAILABLE,
      job: 'Barwomen',
      imgs: [{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bWFuJTIwYW5kJTIwd29tYW58ZW58MHx8MHx8&w=1000&q=80' }],
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

  const matchItem = (match: IMatch) => (
    <TouchableOpacity style={styles.matchItemContainer} onPress={() => console.log('show match')}>
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

  return (
    <View style={styles.listContainer}>
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
  }
})
