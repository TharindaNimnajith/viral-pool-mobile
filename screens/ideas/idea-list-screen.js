import React from 'react'
import {Text, View} from 'react-native'
import Menu from '../../components/menu'
import Logout from '../../components/logout'

const IdeaListScreen = () => {
  return (
    <View>
      <Text>
        Idea List
      </Text>
    </View>
  )
}

IdeaListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'MY IDEAS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default IdeaListScreen
