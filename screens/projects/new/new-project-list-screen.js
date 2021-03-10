import React from 'react'
import {Text, View} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from './../../../components/header-button'

const NewProjectListScreen = () => {
  return (
    <View>
      <Text>
        New Project List
      </Text>
    </View>
  )
}

NewProjectListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'NEW PROJECTS',
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

export default NewProjectListScreen
