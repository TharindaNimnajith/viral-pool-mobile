import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Menu from '../../components/menu'
import Logout from '../../components/logout'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Colors from "../../shared/colors";

const ProfileScreen = () => {
  return (
    <View style={styles.mainViewStyle}>
      <Text>
        Profile
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

ProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: 'MY PROFILE',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default ProfileScreen
