import React from 'react'
import {Text, View} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from './../../components/header-button'

const AddIdeaScreen = () => {
  return (
    <View>
      <Text>
        New Idea
      </Text>
    </View>
  )
}

AddIdeaScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'NEW IDEA',
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

export default AddIdeaScreen
