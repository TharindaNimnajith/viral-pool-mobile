import React from 'react'
import {Text, View} from 'react-native'
import Menu from '../../components/menu'
import Logout from '../../components/logout'

const AddIdeaScreen = () => {
  return (
    <View>
      <Text>
        New Idea
      </Text>
    </View>
  )
}

AddIdeaScreen.navigationOptions = navData => {
  return {
    headerTitle: 'NEW IDEA',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default AddIdeaScreen
