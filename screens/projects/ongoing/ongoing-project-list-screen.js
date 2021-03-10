import React from 'react'
import {Text, View} from 'react-native'
import Menu from '../../../components/menu'
import Logout from '../../../components/logout'

const OngoingProjectListScreen = () => {
  return (
    <View>
      <Text>
        Ongoing Project List
      </Text>
    </View>
  )
}

OngoingProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'ONGOING PROJECTS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default OngoingProjectListScreen
