import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, TouchableOpacity, View} from 'react-native'
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
  const [ideas, setIdeas] = useState(null)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('cc-ideas').then(async response => {
      setIdeas(response.data.data)
      setLoading(false)
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    axios.get('cc-ideas').then(async response => {
      setIdeas(response.data.data)
    }).catch(async error => {
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const renderItemsFunction = itemData => {
    return (
      <IdeaListItem navigation={props.navigation}
                    itemData={itemData}/>
    )
  }

  const redirectToAddIdeaScreen = () => {
    props.navigation.navigate('AddIdea')
  }

  return (
    <View style={styles.mainViewStyle}>
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
    width: 70,
    position: 'absolute',
    bottom: wp('20%'),
    right: wp('10%'),
    height: 70,
    backgroundColor: Colors.primaryColor,
    borderRadius: 35
  },
  listStyle: {
    width: wp('95%'),
    marginTop: 10,
    marginBottom: 10
  },
  mainViewStyle: {
    backgroundColor: Colors.secondaryColor,
    alignItems: 'center',
    minWidth: wp('100%'),
    minHeight: hp('100%')
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
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default IdeaListScreen
