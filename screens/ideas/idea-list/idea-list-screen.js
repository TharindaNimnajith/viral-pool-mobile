import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, FlatList, RefreshControl, TouchableOpacity, View} from 'react-native'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import axios from 'axios'
import Colors from '../../../shared/const/colors'
import {showAlert} from '../../../shared/util/helpers'
import Constants from '../../../shared/const/constants'
import Menu from '../../../components/header/menu-button/menu-button'
import NotificationButton from '../../../components/header/notification-button/notification-button'
import IdeaListItem from '../../../components/lists/idea-list-item/idea-list-item'
import {styles} from './idea-list-screen-styles'

const IdeaListScreen = props => {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    setRefresh(false)
    axios.get('cc-ideas').then(async response => {
      setIdeas(response.data.data)
      setLoading(false)
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [refresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    axios.get('cc-ideas').then(async response => {
      setIdeas(response.data.data)
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
      <IdeaListItem navigation={props.navigation}
                    itemData={itemData}
                    refreshFunction={refreshFunction}/>
    )
  }

  const redirectToAddIdeaScreen = async () => {
    const idea = {
      refresh: refreshFunction
    }
    props.navigation.navigate('AddIdea', {idea})
  }

  return (
    <View style={styles.mainViewStyle}>
      {
        ideas.length > 0 ? (
          <View style={styles.listStyle}>
            <FlatList keyExtractor={(item, index) => index.toString()}
                      data={ideas}
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
      <TouchableOpacity style={styles.buttonStyle}
                        onPress={redirectToAddIdeaScreen}>
        <Ionicons name='add'
                  size={35}
                  color={Colors.secondaryColor}/>
      </TouchableOpacity>
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

IdeaListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Ideas',
    headerLeft: () => (
      <Menu navigation={navData.navigation}/>
    ),
    headerRight: () => (
      <NotificationButton navigation={navData.navigation}/>
    )
  }
}

export default IdeaListScreen
