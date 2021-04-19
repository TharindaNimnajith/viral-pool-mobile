import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/colors'
import Menu from '../../components/menu'
import Logout from '../../components/logout'

const AddIdeaScreen = () => {
  return (
    <View style={styles.mainViewStyle}>
      <Text>
        New Idea
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

AddIdeaScreen.navigationOptions = navData => {
  return {
    headerTitle: 'NEW IDEA',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default AddIdeaScreen
