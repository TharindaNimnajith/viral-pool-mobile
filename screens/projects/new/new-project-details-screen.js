import React from 'react'
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native'
import Colors from '../../../util/colors'
import CombinedButtons from '../../../components/buttons/combined-buttons'
import ProjectDetails from '../../../components/project-details/project-details'

const NewProjectDetailsScreen = props => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <ProjectDetails project={props}/>
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

NewProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Job Details',
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default NewProjectDetailsScreen
