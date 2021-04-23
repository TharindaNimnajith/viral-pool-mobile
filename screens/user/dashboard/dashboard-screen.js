import React from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import Menu from '../../../components/menu-component'
import Logout from '../../../components/logout-component'

const DashboardScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <Text>
            Dashboard
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  }
})

export default DashboardScreen

DashboardScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'VIRAL POOL',
    headerTitleAlign: 'center',
    headerLeft: () => <Menu navigation={navigation}/>,
    headerRight: () => <Logout navigation={navigation}/>
  }
}
