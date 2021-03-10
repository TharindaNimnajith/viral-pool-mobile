import React from 'react'
import {Text, View} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from './../../components/header-button'

const ProfileScreen = () => {
  return (
    <View>
      <Text>
        Profile
      </Text>
    </View>
  )
}

ProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'MY PROFILE',
    headerLeft: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu'
              iconName='menu'
              onPress={() => {
                navData.navigation.toggleDrawer()
              }}/>
      </HeaderButtons>
  }
}

export default ProfileScreen
