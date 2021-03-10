import React from 'react'
import {Text, View} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from './../../components/header-button'

const IdeaListScreen = () => {
  return (
    <View>
      <Text>
        Idea List
      </Text>
    </View>
  )
}

IdeaListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'MY IDEAS',
    headerLeft: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu'
              iconName='ios-menu'
              onPress={() => {
                navData.navigation.toggleDrawer()
              }}/>
      </HeaderButtons>
  }
}

export default IdeaListScreen
