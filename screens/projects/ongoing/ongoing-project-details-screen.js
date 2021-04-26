import React from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import Logout from '../../../components/buttons/logout-button'

const OngoingProjectDetailsScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <View style={styles.viewStyle}>
            <Text>
              Ongoing Project Details
            </Text>
          </View>
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
  },
  viewStyle: {
    alignItems: 'center',
    marginTop: 10
  }
})

OngoingProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'ONGOING PROJECT DETAILS',
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default OngoingProjectDetailsScreen
