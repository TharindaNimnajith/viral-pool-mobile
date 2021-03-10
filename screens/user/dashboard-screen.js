import React from 'react'
import {Text, View} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from './../../components/header-button'

const DashboardScreen = () => {
  return (
    <View>
      <Text>
        Dashboard
      </Text>
    </View>
  )
}

export default DashboardScreen

DashboardScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'VIRAL POOL',
    headerTitleAlign: 'center',
    headerLeft: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu'
              iconName='menu'
              onPress={() => {
                navigation.toggleDrawer()
              }}/>
      </HeaderButtons>
  }
}
