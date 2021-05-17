import React, {useContext} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import axios from 'axios'
import Colors from '../util/colors'
import {AppContext} from '../util/app-context'
import {showAlert} from '../util/common-helpers'
import Constants from '../util/constants'

const ProjectListItem = props => {
  const appContext = useContext(AppContext)

  const project = props.itemData.item.id

  const redirectToDetailsScreen = () => {
    axios.get(`project-cc-strategy/${project}`).then(async response => {
      if (response.status === 200) {
        await appContext.SetProjectDetails(response.data.data)
        props.navigation.navigate(props.screen)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
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
          {props.itemData.item.createdDate}
        </Text>
        <Text style={styles.textStyle}>
          {props.itemData.item.id}
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
