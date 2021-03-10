import React from 'react'
import {Text, View} from 'react-native'
import Menu from '../../../components/menu'
import Logout from '../../../components/logout'

const NewProjectListScreen = () => {
  return (
    <View>
      <Text>
        New Project List
      </Text>
    </View>
  )
}

NewProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'NEW PROJECTS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default NewProjectListScreen
