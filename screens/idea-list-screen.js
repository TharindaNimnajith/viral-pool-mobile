import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import Colors from '../util/colors'
import {showAlert} from '../util/common-helpers'
import Constants from '../util/constants'
import Menu from '../components/menu-button'
import CombinedButtons from '../components/combined-buttons'
import IdeaListItem from '../components/idea-list-item'

const IdeaListScreen = props => {
  const [ideas, setIdeas] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('cc-ideas').then(async response => {
      setIdeas(response.data.data)
      setLoading(false)
      setRefresh(false)
    }).catch(async error => {
      setLoading(false)
      setRefresh(false)
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

  const refreshFunction = () => {
    setRefresh(true)
  }

  const renderItemsFunction = itemData => {
    return (
      <IdeaListItem navigation={props.navigation}
                    itemData={itemData}
                    refreshFunction={refreshFunction}/>
    )
  }

  const redirectToAddIdeaScreen = () => {
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
            <Ionicons name='warning'
                      size={80}
                      color={Colors.tertiaryColor}/>
            <Text style={styles.errorMessageStyle}>
              {Constants.EMPTY_LIST}
            </Text>
            <TouchableOpacity onPress={refreshFunction}>
              <Text style={styles.reloadMessageStyle}>
                Reload?
              </Text>
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

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: hp('10%'),
    right: wp('9%'),
    backgroundColor: Colors.primaryColor,
    borderRadius: 30
  },
  emptyListStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMessageStyle: {
    color: Colors.tertiaryColor,
    fontSize: 18
  },
  listStyle: {
    width: wp('95%'),
    marginTop: hp('1%'),
    marginBottom: hp('7%')
  },
  loadingStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blurEffectColor
  },
  mainViewStyle: {
    backgroundColor: Colors.secondaryColor,
    alignItems: 'center',
    minHeight: hp('100%')
  },
  reloadMessageStyle: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginTop: hp('1%')
  }
})

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
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default IdeaListScreen
