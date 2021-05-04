import React from 'react'
// noinspection ES6UnusedImports
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import CombinedButtons from '../../../components/buttons/combined-buttons'
import ProjectDetails from "../../../components/project-details/project-details";

const CompletedProjectDetailsScreen = props => {
  let project = props.navigation.getParam('project')

  return (
    <ProjectDetails project={project}/>
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

CompletedProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Job Details',
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default CompletedProjectDetailsScreen
