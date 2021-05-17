import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../util/colors'

const ProjectListItem = props => {
  const project = props.itemData.item.id

  const redirectToDetailsScreen = () => {
    props.navigation.navigate(props.screen, {project})
  }

  return (
    <TouchableOpacity style={styles.itemStyle}
                      onPress={redirectToDetailsScreen}>
      <View style={styles.viewStyle}>
        <Text style={styles.titleStyle}>
          {props.itemData.item.name}
        </Text>
        <Text style={styles.textStyle}>
          {props.itemData.item.socialMediaPlatformName}
        </Text>
        <Text style={styles.textStyle}>
          {props.itemData.item.isContentGivenByStrategyMember.toString()}
        </Text>
        <Text style={styles.textStyle}>
          {props.itemData.item.createdDate.slice(0, 10)}
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
    height: 125,
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
