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
import FacebookListItem from '../../components/list-items/facebook-list-item'
import InstagramListItem from '../../components/list-items/instagram-list-item'

const SocialMediaScreen = () => {
  const [youtubeAccounts, setYoutubeAccounts] = useState([])
  const [facebookAccounts, setFacebookAccounts] = useState([])
  const [instagramAccounts, setInstagramAccounts] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('cc-social-media').then(async response => {
      setLoading(false)
      setRefresh(false)
      if (response.status === 200) {
        setYoutubeAccounts(response.data.data.ccYouTubeProfiles)
        setFacebookAccounts(response.data.data.ccFaceBookPageProfiles)
        setInstagramAccounts(response.data.data.ccInstagramPageProfiles)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      setRefresh(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [refresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    axios.get('cc-social-media').then(async response => {
      setRefresh(false)
      if (response.status === 200) {
        setYoutubeAccounts(response.data.data.ccYouTubeProfiles)
        setFacebookAccounts(response.data.data.ccFaceBookPageProfiles)
        setInstagramAccounts(response.data.data.ccInstagramPageProfiles)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setRefresh(false)
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

  const renderYoutubeItemsFunction = itemData => {
    return (
      <YoutubeListItem itemData={itemData}/>
    )
  }

  const renderFacebookItemsFunction = itemData => {
    return (
      <FacebookListItem itemData={itemData}/>
    )
  }

  const renderInstagramItemsFunction = itemData => {
    return (
      <InstagramListItem itemData={itemData}/>
    )
  }

  return (
    <SafeAreaView>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <View style={styles.mainViewStyle}>
          <View style={styles.horizontalViewStyle}>
            <Ionicons name='logo-youtube'
                      size={36}
                      color={Colors.primaryColor}/>
            <Text style={styles.youtubeTitleStyle}>
              YouTube
            </Text>
            <View style={styles.addIconStyle}>
              <Ionicons name='add'
                        size={36}
                        color={Colors.primaryColor}/>
            </View>
          </View>
          {
            youtubeAccounts.length > 0 ? (
              <View style={styles.socialMediaViewStyle}>
                <View style={styles.listStyle}>
                  <FlatList keyExtractor={(item, index) => index.toString()}
                            data={youtubeAccounts}
                            numColumns={1}
                            renderItem={renderYoutubeItemsFunction}/>
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
          <View style={styles.horizontalViewStyle}>
            <Ionicons name='logo-facebook'
                      size={36}
                      color={Colors.primaryColor}/>
            <Text style={styles.facebookTitleStyle}>
              Facebook
            </Text>
            <View style={styles.addIconStyle}>
              <Ionicons name='add'
                        size={36}
                        color={Colors.primaryColor}/>
            </View>
          </View>
          {
            facebookAccounts.length > 0 ? (
              <View style={styles.socialMediaViewStyle}>
                <View style={styles.listStyle}>
                  <FlatList keyExtractor={(item, index) => index.toString()}
                            data={facebookAccounts}
                            numColumns={1}
                            renderItem={renderFacebookItemsFunction}/>
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
          <View style={styles.horizontalViewStyle}>
            <Ionicons name='logo-instagram'
                      size={36}
                      color={Colors.primaryColor}/>
            <Text style={styles.instagramTitleStyle}>
              Instagram
            </Text>
            <View style={styles.addIconStyle}>
              <Ionicons name='add'
                        size={36}
                        color={Colors.primaryColor}/>
            </View>
          </View>
          {
            instagramAccounts.length > 0 ? (
              <View style={styles.socialMediaViewStyle}>
                <View style={styles.listStyle}>
                  <FlatList keyExtractor={(item, index) => index.toString()}
                            data={instagramAccounts}
                            numColumns={1}
                            renderItem={renderInstagramItemsFunction}/>
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
  addIconStyle: {
    alignItems: 'flex-end',
    marginRight: wp('7%'),
    flex: 1
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
  facebookTitleStyle: {
    color: Colors.primaryColor,
    fontSize: 30,
    marginLeft: wp('2%')
  },
  horizontalViewStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    marginLeft: wp('7%'),
    alignItems: 'center'
  },
  instagramTitleStyle: {
    color: Colors.primaryColor,
    fontSize: 30,
    marginLeft: wp('2%')
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
