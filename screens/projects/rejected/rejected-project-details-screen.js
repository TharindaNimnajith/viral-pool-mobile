import React from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import CombinedButtons from '../../../components/buttons/combined-buttons'

const RejectedProjectDetailsScreen = props => {
  let project = props.navigation.getParam('project')

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <View style={styles.viewStyle}>
            <Text>
              {project.project.id}
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

RejectedProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Project Details',
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

// noinspection JSUnusedGlobalSymbols
export default RejectedProjectDetailsScreen
