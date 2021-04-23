import React from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import Logout from '../../../components/logout-component'

const CompletedProjectDetailsScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <Text>
            Completed Project Details
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

CompletedProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'COMPLETED PROJECT DETAILS',
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default CompletedProjectDetailsScreen
