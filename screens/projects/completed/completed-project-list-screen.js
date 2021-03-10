import React from 'react'
import {Text, View} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from './../../../components/header-button'

const CompletedProjectListScreen = () => {
  return (
    <View>
      <Text>
        Completed Project List
      </Text>
    </View>
  )
}

CompletedProjectListScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'COMPLETED PROJECTS',
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

export default CompletedProjectListScreen
