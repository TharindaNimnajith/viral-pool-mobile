import React from 'react'
import {Text, View} from 'react-native'
import Menu from '../../../components/menu'
import Logout from '../../../components/logout'

const CompletedProjectListScreen = () => {
  return (
    <View>
      <Text>
        Completed Project List
      </Text>
    </View>
  )
}

CompletedProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'COMPLETED PROJECTS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default CompletedProjectListScreen
