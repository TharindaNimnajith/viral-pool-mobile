import React from 'react'
import {Text, View} from 'react-native'
import Menu from '../../components/menu'
import Logout from '../../components/logout'

const ProfileScreen = () => {
  return (
    <View>
      <Text>
        Profile
      </Text>
    </View>
  )
}

ProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: 'MY PROFILE',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default ProfileScreen
