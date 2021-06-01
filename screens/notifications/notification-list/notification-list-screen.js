import React, {useCallback, useContext, useEffect, useState} from 'react'
import {ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import axios from 'axios'
import {AppContext} from '../../../shared/global/app-context'
import Colors from '../../../shared/const/colors'
import {showAlert} from '../../../shared/util/helpers'
import Constants from '../../../shared/const/constants'
import Menu from '../../../components/header/menu-button/menu-button'
import CombinedButtons from '../../../components/header/combined-buttons/combined-buttons'
import NotificationListItem from '../../../components/lists/notification-list-item/notification-list-item'
import {styles} from './notification-list-screen-styles'

const NotificationListScreen = props => {
  const appContext = useContext(AppContext)

  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    setRefresh(false)
    appContext.SetNewNotifications(false).then(() => {
      axios.get('content-creator-notification').then(async response => {
        setNotifications(response.data.data)
        setLoading(false)
      }).catch(async error => {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
        console.log(error)
      })
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [refresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    appContext.SetNewNotifications(false).then(() => {
      axios.get('content-creator-notification').then(async response => {
        setNotifications(response.data.data)
      }).catch(async error => {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
        console.log(error)
      })
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
      <NotificationListItem navigation={props.navigation}
                            itemData={itemData}
                            refreshFunction={refreshFunction}/>
    )
  }

  return (
    <View style={styles.mainViewStyle}>
      {
        notifications.length > 0 ? (
          <View style={styles.listStyle}>
            <FlatList keyExtractor={(item, index) => index.toString()}
                      data={notifications}
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

NotificationListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Notifications',
    headerLeft: () => (
      <Menu navigation={navData.navigation}/>
    ),
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default NotificationListScreen
