import React from 'react'
import {Text, View} from 'react-native'
import HeaderButton from './../../components/header-button'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'

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
    headerTitle: 'PUSSALLA',
    headerTitleAlign: 'center',
    headerLeft: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu'
              iconName='ios-menu'
              onPress={() => {
                navigation.toggleDrawer()
              }}/>
      </HeaderButtons>,
    headerRight:
      <View style={{flexDirection: "row"}}>
      </View>
  }
}
