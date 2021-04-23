import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Menu from '../../../components/menu-component'
import Logout from '../../../components/logout-component'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'

const IdeaListScreen = () => {
  return (
    <View style={styles.mainViewStyle}>
      <Text>
        Idea List
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

IdeaListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'MY IDEAS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default IdeaListScreen
