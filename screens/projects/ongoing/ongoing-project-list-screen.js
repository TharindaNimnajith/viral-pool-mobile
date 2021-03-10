import React from 'react'
import {Text, View} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from './../../../components/header-button'

const OngoingProjectListScreen = () => {
  return (
    <View>
      <Text>
        Ongoing Project List
      </Text>
    </View>
  )
}

OngoingProjectListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'ONGOING PROJECTS',
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

export default OngoingProjectListScreen
