import React, {useCallback, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import Colors from '../../shared/const/colors'
import {showAlert} from '../../shared/util/helpers'
import Constants from '../../shared/const/constants'
import Menu from '../../components/header/menu-button'
import CombinedButtons from '../../components/header/combined-buttons'
import YoutubeListItem from '../../components/list-items/youtube-list-item'

const SocialMediaScreen = () => {
  const [youtubeAccounts, setYoutubeAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('cc-social-media/youtube').then(async response => {
      setYoutubeAccounts(response.data.data)
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
    axios.get('cc-social-media/youtube').then(async response => {
      setYoutubeAccounts(response.data.data)
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
      <YoutubeListItem itemData={itemData}/>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <View style={styles.mainViewStyle}>
          {
            youtubeAccounts.length > 0 ? (
              <View style={styles.socialMediaViewStyle}>
                <View style={styles.horizontalViewStyle}>
                  <Ionicons name='logo-youtube'
                            size={36}
                            color={Colors.primaryColor}/>
                  <Text style={styles.youtubeTitleStyle}>
                    YouTube
                  </Text>
                </View>
                <View style={styles.listStyle}>
                  <FlatList keyExtractor={(item, index) => index.toString()}
                            data={youtubeAccounts}
                            numColumns={1}
                            renderItem={renderItemsFunction}/>
                </View>
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
        </View>
        {
          loading &&
          <View style={styles.loadingStyle}>
            <ActivityIndicator size='large'
                               color={Colors.secondaryColor}/>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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
  horizontalViewStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    marginLeft: wp('4%'),
    alignItems: 'center'
  },
  listStyle: {
    width: wp('95%'),
    marginTop: hp('1%'),
    marginBottom: hp('1%')
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
  },
  socialMediaViewStyle: {
    marginTop: hp('1%'),
    marginBottom: hp('2%')
  },
  youtubeTitleStyle: {
    color: Colors.primaryColor,
    fontSize: 30,
    marginLeft: wp('2%')
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

SocialMediaScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Social Media',
    headerLeft: () => (
      <Menu navigation={navData.navigation}/>
    ),
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default SocialMediaScreen
