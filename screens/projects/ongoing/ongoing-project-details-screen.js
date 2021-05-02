import React from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import CombinedButtons from '../../../components/buttons/combined-buttons'

const OngoingProjectDetailsScreen = props => {
  let project = props.navigation.getParam('project')

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <View style={styles.viewStyle}>
            <Text>
              {project.project.title}
            </Text>
            <Text>
              {project.project.description}
            </Text>
            <Text>
              {project.project.status}
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
    margin: 20
  }
})

OngoingProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Job Details',
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default OngoingProjectDetailsScreen
