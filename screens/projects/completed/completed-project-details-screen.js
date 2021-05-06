import React from 'react'
// noinspection ES6UnusedImports
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import Colors from '../../../shared/colors'
import CombinedButtons from '../../../components/buttons/combined-buttons'
import ProjectDetails from "../../../components/project-details/project-details";

const CompletedProjectDetailsScreen = props => {
  let project = props.navigation.getParam('project')

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <ProjectDetails project={project}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: Colors.secondaryColor
  }
})

CompletedProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Job Details',
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default CompletedProjectDetailsScreen
