import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import Menu from '../../../components/menu'
import Logout from '../../../components/logout'

const OngoingProjectListScreen = () => {
  return (
    <View style={styles.mainViewStyle}>
      <Text>
        Ongoing Project List
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  }
})

OngoingProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'ONGOING PROJECTS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default OngoingProjectListScreen
