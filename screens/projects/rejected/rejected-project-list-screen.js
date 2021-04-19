import React from 'react'
import {Text, View} from 'react-native'
import Menu from '../../../components/menu'
import Logout from '../../../components/logout'

const RejectedProjectListScreen = () => {
  return (
    <View>
      <Text>
        Rejected Project List
      </Text>
    </View>
  )
}

RejectedProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'REJECTED PROJECTS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

// noinspection JSUnusedGlobalSymbols
export default RejectedProjectListScreen
