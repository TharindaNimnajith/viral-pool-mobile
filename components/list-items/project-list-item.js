import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/colors'

const ProjectListItem = props => {
  let project = {
    project: props.itemData.item,
    navigation: props.navigation,
    refresh: props.refreshFunction
  }

  const redirectToDetailsScreen = () => {
    let status = props.itemData.item.status

    switch (status) {
      case 'New':
        props.navigation.navigate('NewProjectDetails', {project})
        break
      case 'Ongoing':
        props.navigation.navigate('OngoingProjectDetails', {project})
        break
      case 'Rejected':
        props.navigation.navigate('RejectedProjectDetails', {project})
        break
      case 'Completed':
        props.navigation.navigate('CompletedProjectDetails', {project})
        break
      default:
        props.navigation.navigate('Dashboard')
    }
  }

  return (
    <TouchableOpacity style={styles.itemStyle}
                      onPress={redirectToDetailsScreen}>
      <View>
        <Text>
          {props.itemData.item.title}
        </Text>
        <Text>
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
    height: 80,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 6,
    marginBottom: 6
  }
})

export default ProjectListItem
