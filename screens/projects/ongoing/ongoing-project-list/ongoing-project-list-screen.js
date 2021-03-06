import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import axios from 'axios'
import Colors from '../../../../shared/const/colors'
import {showAlert} from '../../../../shared/util/helpers'
import {projectStatusEnum} from '../../../../shared/const/enums'
import Constants from '../../../../shared/const/constants'
import Menu from '../../../../components/header/menu-button/menu-button'
import NotificationButton from '../../../../components/header/notification-button/notification-button'
import ProjectListItem from '../../../../components/lists/project-list-item/project-list-item'
import {styles} from './ongoing-project-list-screen-styles'

const OngoingProjectListScreen = props => {
  const [ongoingProjects, setOngoingProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    setRefresh(false)
    axios.get(`project-cc-strategy?status=${projectStatusEnum.Ongoing}`).then(async response => {
      setLoading(false)
      if (response.status === 200)
        setOngoingProjects(response.data.data)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [refresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    axios.get(`project-cc-strategy?status=${projectStatusEnum.Ongoing}`).then(async response => {
      if (response.status === 200)
        setOngoingProjects(response.data.data)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
    wait(2000).then(() => {
      setRefreshing(false)
    })
  }, [])

  const refreshFunction = async () => {
    setRefresh(true)
  }

  const renderItemsFunction = itemData => {
    return (
      <ProjectListItem navigation={props.navigation}
                       itemData={itemData}
                       screen='OngoingProjectDetails'
                       refreshFunction={refreshFunction}/>
    )
  }

  return (
    <View style={styles.mainViewStyle}>
      {
        ongoingProjects.length > 0 ? (
          <View style={styles.listStyle}>
            <FlatList keyExtractor={(item, index) => index.toString()}
                      data={ongoingProjects}
                      numColumns={1}
                      renderItem={renderItemsFunction}
                      refreshControl={
                        <RefreshControl refreshing={refreshing}
                                        onRefresh={onRefresh}/>
                      }/>
          </View>
        ) : (
          <View style={styles.emptyListStyle}>
            <TouchableOpacity onPress={refreshFunction}>
              <MaterialCommunityIcons name='reload'
                                      size={50}
                                      color={Colors.primaryColor}/>
            </TouchableOpacity>
          </View>
        )
      }
      {
        loading &&
        <View style={styles.loadingStyle}>
          <ActivityIndicator size='large'
                             color={Colors.secondaryColor}/>
        </View>
      }
    </View>
  )
}

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

OngoingProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Ongoing Jobs',
    headerLeft: () => (
      <Menu navigation={navData.navigation}/>
    ),
    headerRight: () => (
      <NotificationButton navigation={navData.navigation}/>
    )
  }
}

export default OngoingProjectListScreen
