import React, {useCallback, useContext, useEffect, useState} from 'react'
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
import Dialog from 'react-native-dialog'
import {Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import {AppContext} from '../../shared/global/app-context'
import Colors from '../../shared/const/colors'
import {showAlert} from '../../shared/util/helpers'
import Constants from '../../shared/const/constants'
import Menu from '../../components/header/menu-button'
import CombinedButtons from '../../components/header/combined-buttons'
import YoutubeListItem from '../../components/list-items/social-media/youtube-list-item'
import FacebookListItem from '../../components/list-items/social-media/facebook-list-item'
import InstagramListItem from '../../components/list-items/social-media/instagram-list-item'

const SocialMediaScreen = () => {
  const appContext = useContext(AppContext)

  const [youtubeAccounts, setYoutubeAccounts] = useState([])
  const [facebookAccounts, setFacebookAccounts] = useState([])
  const [instagramAccounts, setInstagramAccounts] = useState([])
  const [youtubeChannelId, setYoutubeChannelId] = useState('')
  const [facebookPageId, setFacebookPageId] = useState('')
  const [facebookPageName, setFacebookPageName] = useState('')
  const [facebookPageLink, setFacebookPageLink] = useState('')
  const [facebookPageLikeCount, setFacebookPageLikeCount] = useState('')
  const [instagramUsername, setInstagramUsername] = useState('')
  const [instagramLink, setInstagramLink] = useState('')
  const [instagramFollowingCount, setInstagramFollowingCount] = useState('')
  const [instagramFollowerCount, setInstagramFollowerCount] = useState('')
  const [youtubeChannelIdValid, setYoutubeChannelIdValid] = useState(false)
  const [facebookPageIdValid, setFacebookPageIdValid] = useState(false)
  const [facebookPageNameValid, setFacebookPageNameValid] = useState(false)
  const [facebookPageLinkValid, setFacebookPageLinkValid] = useState(false)
  const [facebookPageLikeCountValid, setFacebookPageLikeCountValid] = useState(false)
  const [instagramUsernameValid, setInstagramUsernameValid] = useState(false)
  const [instagramLinkValid, setInstagramLinkValid] = useState(false)
  const [instagramFollowingCountValid, setInstagramFollowingCountValid] = useState(false)
  const [instagramFollowerCountValid, setInstagramFollowerCountValid] = useState(false)
  const [visibleYoutube, setVisibleYoutube] = useState(false)
  const [visibleFacebook, setVisibleFacebook] = useState(false)
  const [visibleInstagram, setVisibleInstagram] = useState(false)
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

  const refreshFunction = async () => {
    setRefresh(true)
  }

  const loadingFunctionTrue = async () => {
    setLoading(true)
  }

  const loadingFunctionFalse = async () => {
    setLoading(false)
  }

  const renderYoutubeItemsFunction = itemData => {
    return (
      <YoutubeListItem itemData={itemData}
                       refreshFunction={refreshFunction}
                       loadingFunctionTrue={loadingFunctionTrue}
                       loadingFunctionFalse={loadingFunctionFalse}/>
    )
  }

  const renderFacebookItemsFunction = itemData => {
    return (
      <FacebookListItem itemData={itemData}
                        refreshFunction={refreshFunction}
                        loadingFunctionTrue={loadingFunctionTrue}
                        loadingFunctionFalse={loadingFunctionFalse}/>
    )
  }

  const renderInstagramItemsFunction = itemData => {
    return (
      <InstagramListItem itemData={itemData}
                         refreshFunction={refreshFunction}
                         loadingFunctionTrue={loadingFunctionTrue}
                         loadingFunctionFalse={loadingFunctionFalse}/>
    )
  }

  const showDialogYoutube = async () => {
    setVisibleYoutube(true)
  }

  const hideDialogYoutube = async () => {
    setVisibleYoutube(false)
  }

  const showDialogFacebook = async () => {
    setVisibleFacebook(true)
  }

  const hideDialogFacebook = async () => {
    setVisibleFacebook(false)
  }

  const showDialogInstagram = async () => {
    setVisibleInstagram(true)
  }

  const hideDialogInstagram = async () => {
    setVisibleInstagram(false)
  }

  const onChangeYoutubeChannelId = async youtubeChannelId => {
    setYoutubeChannelIdValid(youtubeChannelId.trim().length > 0)
    setYoutubeChannelId(youtubeChannelId)
  }

  const onChangeFacebookPageId = async facebookPageId => {
    setFacebookPageIdValid(facebookPageId.trim().length > 0)
    setFacebookPageId(facebookPageId)
  }

  const onChangeFacebookPageName = async facebookPageName => {
    setFacebookPageNameValid(facebookPageName.trim().length > 0)
    setFacebookPageName(facebookPageName)
  }

  const onChangeFacebookPageLink = async facebookPageLink => {
    setFacebookPageLinkValid(facebookPageLink.trim().length > 0)
    setFacebookPageLink(facebookPageLink)
  }

  const onChangeFacebookPageLikeCount = async facebookPageLikeCount => {
    if (facebookPageLikeCount.trim().length > 0)
      setFacebookPageLikeCountValid(!isNaN(facebookPageLikeCount.trim()))
    else
      setFacebookPageLikeCountValid(false)
    setFacebookPageLikeCount(facebookPageLikeCount)
  }

  const onChangeInstagramUsername = async instagramUsername => {
    setInstagramUsernameValid(instagramUsername.trim().length > 0)
    setInstagramUsername(instagramUsername)
  }

  const onChangeInstagramLink = async instagramLink => {
    setInstagramLinkValid(instagramLink.trim().length > 0)
    setInstagramLink(instagramLink)
  }

  const onChangeInstagramFollowingCount = async instagramFollowingCount => {
    if (instagramFollowingCount.trim().length > 0)
      setInstagramFollowingCountValid(!isNaN(instagramFollowingCount.trim()))
    else
      setInstagramFollowingCountValid(false)
    setInstagramFollowingCount(instagramFollowingCount)
  }

  const onChangeInstagramFollowerCount = async instagramFollowerCount => {
    if (instagramFollowerCount.trim().length > 0)
      setInstagramFollowerCountValid(!isNaN(instagramFollowerCount.trim()))
    else
      setInstagramFollowerCountValid(false)
    setInstagramFollowerCount(instagramFollowerCount)
  }

  function isDisabledYoutube() {
    return !youtubeChannelIdValid
  }

  function isDisabledFacebook() {
    return !facebookPageIdValid || !facebookPageNameValid || !facebookPageLinkValid || !facebookPageLikeCountValid
  }

  function isDisabledInstagram() {
    return !instagramUsernameValid || !instagramLinkValid || !instagramFollowerCountValid ||
      !instagramFollowingCountValid
  }

  const resetYoutube = async () => {
    await onChangeYoutubeChannelId('')
  }

  const resetFacebook = async () => {
    await onChangeFacebookPageId('')
    await onChangeFacebookPageName('')
    await onChangeFacebookPageLink('')
    await onChangeFacebookPageLikeCount('')
  }

  const resetInstagram = async () => {
    await onChangeInstagramUsername('')
    await onChangeInstagramLink('')
    await onChangeInstagramFollowingCount('')
    await onChangeInstagramFollowerCount('')
  }

  const addYoutube = async () => {
    await hideDialogYoutube()
    setLoading(true)
    const data = {
      channelId: youtubeChannelId.trim(),
      contentCreatorDetailId: appContext.userData.id
    }
    axios.post('cc-social-media/youtube/add-profile', data).then(async response => {
      setLoading(false)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
        await resetYoutube()
        setRefresh(true)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const addFacebook = async () => {
    await hideDialogFacebook()
    setLoading(true)
    const data = {
      pageId: facebookPageId.trim(),
      name: facebookPageName.trim(),
      link: facebookPageLink.trim(),
      fanCount: facebookPageLikeCount.trim()
    }
    axios.post('cc-social-media/facebook/add-profile', data).then(async response => {
      setLoading(false)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
        await resetFacebook()
        setRefresh(true)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const addInstagram = async () => {
    await hideDialogInstagram()
    setLoading(true)
    const data = {
      username: instagramUsername.trim(),
      link: instagramLink.trim(),
      followsCount: instagramFollowingCount.trim(),
      followersCount: instagramFollowerCount.trim()
    }
    axios.post('cc-social-media/instagram/add-profile', data).then(async response => {
      setLoading(false)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
        await resetInstagram()
        setRefresh(true)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  return (
    <SafeAreaView>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <Dialog.Container visible={visibleYoutube}
                          onBackdropPress={hideDialogYoutube}
                          headerStyle={styles.headerStyle}
                          footerStyle={styles.footerStyle}>
          <Dialog.Title style={styles.titleStyle}>
            NEW CHANNEL
          </Dialog.Title>
          <Dialog.Input label='Channel ID'
                        style={styles.textInputStyle}
                        wrapperStyle={styles.wrapperStyle}
                        onChangeText={youtubeChannelId => onChangeYoutubeChannelId(youtubeChannelId)}
                        value={youtubeChannelId}
                        placeholder='Enter Channel ID'
                        placeholderTextColor={Colors.tertiaryColor}/>
          <Dialog.Button label='Submit'
                         color={isDisabledYoutube() ? Colors.tertiaryColor : Colors.primaryColor}
                         onPress={addYoutube}
                         disabled={isDisabledYoutube()}/>
          <Dialog.Button label='Cancel'
                         color={Colors.primaryColor}
                         onPress={hideDialogYoutube}/>
        </Dialog.Container>
        <Dialog.Container visible={visibleFacebook}
                          onBackdropPress={hideDialogFacebook}
                          headerStyle={styles.headerStyle}
                          footerStyle={styles.footerStyle}>
          <Dialog.Title style={styles.titleStyle}>
            NEW PAGE
          </Dialog.Title>
          <Dialog.Input label='Page ID'
                        style={styles.textInputStyle}
                        wrapperStyle={styles.wrapperStyle}
                        onChangeText={facebookPageId => onChangeFacebookPageId(facebookPageId)}
                        value={facebookPageId}
                        placeholder='Enter Page ID'
                        placeholderTextColor={Colors.tertiaryColor}/>
          <Dialog.Input label='Page Name'
                        style={styles.textInputStyle}
                        wrapperStyle={styles.wrapperStyle}
                        onChangeText={facebookPageName => onChangeFacebookPageName(facebookPageName)}
                        value={facebookPageName}
                        placeholder='Enter Page Name'
                        placeholderTextColor={Colors.tertiaryColor}/>
          <Dialog.Input label='Page Link'
                        style={styles.textInputStyle}
                        wrapperStyle={styles.wrapperStyle}
                        onChangeText={facebookPageLink => onChangeFacebookPageLink(facebookPageLink)}
                        value={facebookPageLink}
                        placeholder='Enter Page Link'
                        placeholderTextColor={Colors.tertiaryColor}/>
          <Dialog.Input label='Likes Count'
                        style={styles.textInputStyle}
                        wrapperStyle={styles.wrapperStyle}
                        onChangeText={facebookPageLikeCount => onChangeFacebookPageLikeCount(facebookPageLikeCount)}
                        value={facebookPageLikeCount}
                        placeholder='Enter Likes Count'
                        placeholderTextColor={Colors.tertiaryColor}/>
          <Dialog.Button label='Submit'
                         color={isDisabledFacebook() ? Colors.tertiaryColor : Colors.primaryColor}
                         onPress={addFacebook}
                         disabled={isDisabledFacebook()}/>
          <Dialog.Button label='Cancel'
                         color={Colors.primaryColor}
                         onPress={hideDialogFacebook}/>
        </Dialog.Container>
        <Dialog.Container visible={visibleInstagram}
                          onBackdropPress={hideDialogInstagram}
                          headerStyle={styles.headerStyle}
                          footerStyle={styles.footerStyle}>
          <Dialog.Title style={styles.titleStyle}>
            NEW ACCOUNT
          </Dialog.Title>
          <Dialog.Input label='Account Username'
                        style={styles.textInputStyle}
                        wrapperStyle={styles.wrapperStyle}
                        onChangeText={instagramUsername => onChangeInstagramUsername(instagramUsername)}
                        value={instagramUsername}
                        placeholder='Enter Account Username'
                        placeholderTextColor={Colors.tertiaryColor}/>
          <Dialog.Input label='Account Link'
                        style={styles.textInputStyle}
                        wrapperStyle={styles.wrapperStyle}
                        onChangeText={instagramLink => onChangeInstagramLink(instagramLink)}
                        value={instagramLink}
                        placeholder='Enter Account Link'
                        placeholderTextColor={Colors.tertiaryColor}/>
          <Dialog.Input label='Followers Count'
                        style={styles.textInputStyle}
                        wrapperStyle={styles.wrapperStyle}
                        onChangeText={instagramFollowerCount => onChangeInstagramFollowerCount(instagramFollowerCount)}
                        value={instagramFollowerCount}
                        placeholder='Enter Followers Count'
                        placeholderTextColor={Colors.tertiaryColor}/>
          <Dialog.Input label='Following Count'
                        style={styles.textInputStyle}
                        wrapperStyle={styles.wrapperStyle}
                        onChangeText={instagramFollowingCount => onChangeInstagramFollowingCount(instagramFollowingCount)}
                        value={instagramFollowingCount}
                        placeholder='Enter Following Count'
                        placeholderTextColor={Colors.tertiaryColor}/>
          <Dialog.Button label='Submit'
                         color={isDisabledInstagram() ? Colors.tertiaryColor : Colors.primaryColor}
                         onPress={addInstagram}
                         disabled={isDisabledInstagram()}/>
          <Dialog.Button label='Cancel'
                         color={Colors.primaryColor}
                         onPress={hideDialogInstagram}/>
        </Dialog.Container>
        <View style={styles.mainViewStyle}>
          <View>
            <View style={styles.horizontalViewStyle}>
              <Ionicons name='logo-youtube'
                        size={36}
                        color={Colors.primaryColor}/>
              <Text style={styles.youtubeTitleStyle}>
                YouTube
              </Text>
              <TouchableOpacity style={styles.addIconStyle}
                                onPress={showDialogYoutube}>
                <Ionicons name='add'
                          size={36}
                          color={Colors.primaryColor}/>
              </TouchableOpacity>
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
                <View style={styles.socialMediaViewStyle}>
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
                </View>
              )
            }
          </View>
          <View>
            <View style={styles.horizontalViewStyle}>
              <Ionicons name='logo-facebook'
                        size={36}
                        color={Colors.facebookColor}/>
              <Text style={styles.facebookTitleStyle}>
                Facebook
              </Text>
              <TouchableOpacity style={styles.addIconStyle}
                                onPress={showDialogFacebook}>
                <Ionicons name='add'
                          size={36}
                          color={Colors.facebookColor}/>
              </TouchableOpacity>
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
                <View style={styles.socialMediaViewStyle}>
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
                </View>
              )
            }
          </View>
          <View>
            <View style={styles.horizontalViewStyle}>
              <Ionicons name='logo-instagram'
                        size={36}
                        color={Colors.instagramColor}/>
              <Text style={styles.instagramTitleStyle}>
                Instagram
              </Text>
              <TouchableOpacity style={styles.addIconStyle}
                                onPress={showDialogInstagram}>
                <Ionicons name='add'
                          size={36}
                          color={Colors.instagramColor}/>
              </TouchableOpacity>
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
                <View style={styles.socialMediaViewStyle}>
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
                </View>
              )
            }
          </View>
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
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMessageStyle: {
    color: Colors.tertiaryColor,
    fontSize: 18
  },
  facebookTitleStyle: {
    color: Colors.facebookColor,
    fontSize: 30,
    marginLeft: wp('2%')
  },
  footerStyle: {
    marginTop: 10
  },
  headerStyle: {
    marginBottom: 25
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
    color: Colors.instagramColor,
    fontSize: 30,
    marginLeft: wp('2%')
  },
  listStyle: {
    alignSelf: 'center',
    width: wp('95%'),
    marginVertical: hp('1%')
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
    minHeight: hp('93.6%')
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
  textInputStyle: {
    borderColor: Colors.primaryColor,
    width: wp('70%'),
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginTop: 10,
    marginLeft: 0.5,
    paddingVertical: 10,
    paddingLeft: 5,
    color: Colors.tertiaryColor
  },
  titleStyle: {
    color: Colors.primaryColor
  },
  wrapperStyle: {
    marginTop: 2
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
