import React from 'react'
import {Text, View} from 'react-native'
import Menu from '../../components/menu'
import Logout from '../../components/logout'

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
    headerLeft: () => <Menu navigation={navigation}/>,
    headerRight: () => <Logout navigation={navigation}/>
  }
}
