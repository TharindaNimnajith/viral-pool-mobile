import React from 'react'
import {Text, View} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from './../../../components/header-button'

const RejectedProjectListScreen = () => {
  return (
    <View>
      <Text>
        Rejected Project List
      </Text>
    </View>
  )
}

RejectedProjectListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'REJECTED PROJECTS',
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

export default RejectedProjectListScreen
