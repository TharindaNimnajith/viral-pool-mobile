import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Constants from '../../util/constants'
import Colors from '../../util/colors'

const ProjectListItem = props => {
  const redirectToDetailsScreen = () => {
    let project = {props}
    project = project.project.navigation.state.params.itemData.item
    switch (props.itemData.item.status) {
      case 'New':
        props.navigation.navigate('NewProjectDetails', project)
        break
      case 'Ongoing':
        props.navigation.navigate('OngoingProjectDetails', project)
        break
      case 'Completed':
        props.navigation.navigate('CompletedProjectDetails', project)
        break
      default:
        alert(Constants.ERROR)
    }
  }

  return (
    <TouchableOpacity style={styles.itemStyle}
                      onPress={redirectToDetailsScreen}>
      <View style={styles.viewStyle}>
        <Text style={styles.titleStyle}>
          {props.itemData.item.title}
        </Text>
        <Text style={styles.textStyle}>
          {props.itemData.item.description}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 15,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    marginHorizontal: wp('4%'),
    height: 90,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 6,
    marginBottom: 6,
    alignContent: 'center'
  },
  textStyle: {
    color: Colors.tertiaryColor,
    fontSize: 15,
    marginTop: 3
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primaryColor
  },
  viewStyle: {
    width: wp('80%')
  }
})

export default ProjectListItem
