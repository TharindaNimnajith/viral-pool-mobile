import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Dialog from 'react-native-dialog'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import axios from 'axios'
import {AppContext} from '../../shared/global/app-context'
import Colors from '../../shared/const/colors'
import {showAlert, showErrors} from '../../shared/util/helpers'
import Constants from '../../shared/const/constants'
import Menu from '../../components/header/menu-button/menu-button'
import NotificationButton from '../../components/header/notification-button/notification-button'
import YoutubeListItem from '../../components/lists/social-media-list-item/youtube-list-item/youtube-list-item'
import FacebookListItem from '../../components/lists/social-media-list-item/facebook-list-item/facebook-list-item'
import InstagramListItem from '../../components/lists/social-media-list-item/instagram-list-item/instagram-list-item'
import TiktokListItem from '../../components/lists/social-media-list-item/tiktok-list-item/tiktok-list-item'
import {styles} from './social-media-screen-styles'

const SocialMediaScreen = () => {
  const appContext = useContext(AppContext)

  const [youtubeAccounts, setYoutubeAccounts] = useState([])
  const [facebookAccounts, setFacebookAccounts] = useState([])
  const [instagramAccounts, setInstagramAccounts] = useState([])
  const [tiktokAccounts, setTiktokAccounts] = useState([])
  const [youtubeChannelId, setYoutubeChannelId] = useState('')
  const [facebookPageId, setFacebookPageId] = useState('')
  const [facebookPageName, setFacebookPageName] = useState('')
  const [facebookPageLink, setFacebookPageLink] = useState('')
  const [facebookPageLikeCount, setFacebookPageLikeCount] = useState('')
  const [facebookPageEngagement, setFacebookPageEngagement] = useState('')
  const [facebookPageFollowersCount, setFacebookPageFollowersCount] = useState('')
  const [instagramUsername, setInstagramUsername] = useState('')
  const [instagramLink, setInstagramLink] = useState('')
  const [instagramFollowingCount, setInstagramFollowingCount] = useState('')
  const [instagramFollowerCount, setInstagramFollowerCount] = useState('')
  const [instagramMediaCount, setInstagramMediaCount] = useState('')
  const [tiktokUsername, setTiktokUsername] = useState('')
  const [tiktokTotalLikes, setTiktokTotalLikes] = useState('')
  const [tiktokVideos, setTiktokVideos] = useState('')
  const [tiktokFollowers, setTiktokFollowers] = useState('')
  const [youtubeChannelIdValid, setYoutubeChannelIdValid] = useState(false)
  const [facebookPageIdValid, setFacebookPageIdValid] = useState(false)
  const [facebookPageNameValid, setFacebookPageNameValid] = useState(false)
  const [facebookPageLinkValid, setFacebookPageLinkValid] = useState(false)
  const [facebookPageEngagementValid, setFacebookPageEngagementValid] = useState(false)
  const [facebookPageFollowersCountValid, setFacebookPageFollowersCountValid] = useState(false)
  const [facebookPageLikeCountValid, setFacebookPageLikeCountValid] = useState(false)
  const [instagramUsernameValid, setInstagramUsernameValid] = useState(false)
  const [instagramLinkValid, setInstagramLinkValid] = useState(false)
  const [instagramFollowingCountValid, setInstagramFollowingCountValid] = useState(false)
  const [instagramFollowerCountValid, setInstagramFollowerCountValid] = useState(false)
  const [instagramMediaCountValid, setInstagramMediaCountValid] = useState(false)
  const [tiktokUsernameValid, setTiktokUsernameValid] = useState(false)
  const [tiktokTotalLikesValid, setTiktokTotalLikesValid] = useState(false)
  const [tiktokVideosValid, setTiktokVideosValid] = useState(false)
  const [tiktokFollowersValid, setTiktokFollowersValid] = useState(false)
  const [visibleYoutube, setVisibleYoutube] = useState(false)
  const [visibleFacebook, setVisibleFacebook] = useState(false)
  const [visibleInstagram, setVisibleInstagram] = useState(false)
  const [visibleTiktok, setVisibleTiktok] = useState(false)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    setRefresh(false)
    axios.get('cc-social-media').then(async response => {
      setLoading(false)
      if (response.status === 200) {
        setYoutubeAccounts(response.data.data.ccYouTubeProfiles)
        setFacebookAccounts(response.data.data.ccFaceBookPageProfiles)
        setInstagramAccounts(response.data.data.ccInstagramPageProfiles)
        setTiktokAccounts(response.data.data.ccTickToks)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [refresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    axios.get('cc-social-media').then(async response => {
      if (response.status === 200) {
        setYoutubeAccounts(response.data.data.ccYouTubeProfiles)
        setFacebookAccounts(response.data.data.ccFaceBookPageProfiles)
        setInstagramAccounts(response.data.data.ccInstagramPageProfiles)
        setTiktokAccounts(response.data.data.ccTickToks)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
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

  const renderTiktokItemsFunction = itemData => {
    return (
      <TiktokListItem itemData={itemData}
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

  const showDialogTiktok = async () => {
    setVisibleTiktok(true)
  }

  const hideDialogTiktok = async () => {
    setVisibleTiktok(false)
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
    if (facebookPageLikeCount.toString().trim().length > 0)
      setFacebookPageLikeCountValid(!isNaN(facebookPageLikeCount.trim()))
    else
      setFacebookPageLikeCountValid(false)
    setFacebookPageLikeCount(facebookPageLikeCount)
  }

  const onChangeFacebookPageEngagement = async facebookPageEngagement => {
    if (facebookPageEngagement.trim().toString().length > 0)
      setFacebookPageEngagementValid(!isNaN(facebookPageEngagement.trim()))
    else
      setFacebookPageEngagementValid(false)
    setFacebookPageEngagement(facebookPageEngagement)
  }

  const onChangeFacebookPageFollowersCount = async facebookPageFollowersCount => {
    if (facebookPageFollowersCount.trim().toString().length > 0)
      setFacebookPageFollowersCountValid(!isNaN(facebookPageFollowersCount.trim()))
    else
      setFacebookPageFollowersCountValid(false)
    setFacebookPageFollowersCount(facebookPageFollowersCount)
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
    if (instagramFollowingCount.toString().trim().length > 0)
      setInstagramFollowingCountValid(!isNaN(instagramFollowingCount.trim()))
    else
      setInstagramFollowingCountValid(false)
    setInstagramFollowingCount(instagramFollowingCount)
  }

  const onChangeInstagramFollowerCount = async instagramFollowerCount => {
    if (instagramFollowerCount.toString().trim().length > 0)
      setInstagramFollowerCountValid(!isNaN(instagramFollowerCount.trim()))
    else
      setInstagramFollowerCountValid(false)
    setInstagramFollowerCount(instagramFollowerCount)
  }

  const onChangeInstagramMediaCount = async instagramMediaCount => {
    if (instagramMediaCount.toString().trim().length > 0)
      setInstagramMediaCountValid(!isNaN(instagramMediaCount.trim()))
    else
      setInstagramMediaCountValid(false)
    setInstagramMediaCount(instagramMediaCount)
  }

  const onChangeTiktokUsername = async tiktokUsername => {
    setTiktokUsernameValid(tiktokUsername.trim().length > 0)
    setTiktokUsername(tiktokUsername)
  }

  const onChangeTiktokVideos = async tiktokVideos => {
    if (tiktokVideos.toString().trim().length > 0)
      setTiktokVideosValid(!isNaN(tiktokVideos.trim()))
    else
      setTiktokVideosValid(false)
    setTiktokVideos(tiktokVideos)
  }

  const onChangeTiktokFollowers = async tiktokFollowers => {
    if (tiktokFollowers.toString().trim().length > 0)
      setTiktokFollowersValid(!isNaN(tiktokFollowers.trim()))
    else
      setTiktokFollowersValid(false)
    setTiktokFollowers(tiktokFollowers)
  }

  const onChangeTiktokTotalLikes = async tiktokTotalLikes => {
    if (tiktokTotalLikes.toString().trim().length > 0)
      setTiktokTotalLikesValid(!isNaN(tiktokTotalLikes.trim()))
    else
      setTiktokTotalLikesValid(false)
    setTiktokTotalLikes(tiktokTotalLikes)
  }

  function isDisabledYoutube() {
    return !youtubeChannelIdValid
  }

  function isDisabledFacebook() {
    return !facebookPageIdValid || !facebookPageNameValid || !facebookPageLinkValid || !facebookPageLikeCountValid ||
      !facebookPageEngagementValid || !facebookPageFollowersCountValid
  }

  function isDisabledInstagram() {
    return !instagramUsernameValid || !instagramLinkValid || !instagramFollowerCountValid ||
      !instagramFollowingCountValid || !instagramMediaCountValid
  }

  function isDisabledTiktok() {
    return !tiktokUsernameValid || !tiktokFollowersValid || !tiktokVideosValid || !tiktokTotalLikesValid
  }

  const resetYoutube = async () => {
    await onChangeYoutubeChannelId('')
  }

  const resetFacebook = async () => {
    await onChangeFacebookPageId('')
    await onChangeFacebookPageName('')
    await onChangeFacebookPageLink('')
    await onChangeFacebookPageLikeCount('')
    await onChangeFacebookPageEngagement('')
    await onChangeFacebookPageFollowersCount('')
  }

  const resetInstagram = async () => {
    await onChangeInstagramUsername('')
    await onChangeInstagramLink('')
    await onChangeInstagramFollowingCount('')
    await onChangeInstagramFollowerCount('')
    await onChangeInstagramMediaCount('')
  }

  const resetTiktok = async () => {
    await onChangeTiktokUsername('')
    await onChangeTiktokFollowers('')
    await onChangeTiktokVideos('')
    await onChangeTiktokTotalLikes('')
  }

  const addYoutube = async () => {
    await hideDialogYoutube()
    setLoading(true)
    const data = {
      channelId: youtubeChannelId.trim(),
      contentCreatorDetailId: appContext.userData?.id
    }
    axios.post('cc-social-media/youtube/add-profile', data).then(async response => {
      setLoading(false)
      setRefresh(true)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
        await resetYoutube()
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const addFacebook = async () => {
    await hideDialogFacebook()
    setLoading(true)
    const data = {
      pageId: facebookPageId.trim(),
      name: facebookPageName.trim(),
      link: facebookPageLink.trim(),
      fanCount: facebookPageLikeCount.toString().trim(),
      engagement: facebookPageEngagement.toString().trim(),
      followersCount: facebookPageFollowersCount.toString().trim()
    }
    axios.post('cc-social-media/facebook/add-profile', data).then(async response => {
      setLoading(false)
      setRefresh(true)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
        await resetFacebook()
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const addInstagram = async () => {
    await hideDialogInstagram()
    setLoading(true)
    const data = {
      username: instagramUsername.trim(),
      link: instagramLink.trim(),
      followsCount: instagramFollowingCount.toString().trim(),
      followersCount: instagramFollowerCount.toString().trim(),
      mediaCount: instagramMediaCount.toString().trim()
    }
    axios.post('cc-social-media/instagram/add-profile', data).then(async response => {
      setLoading(false)
      setRefresh(true)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
        await resetInstagram()
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const addTiktok = async () => {
    await hideDialogTiktok()
    setLoading(true)
    const data = {
      username: tiktokUsername.trim(),
      totalLikes: tiktokTotalLikes.toString().trim(),
      videos: tiktokVideos.toString().trim(),
      followers: tiktokFollowers.toString().trim()
    }
    axios.post('cc-social-media/ticktok/add-profile', data).then(async response => {
      setLoading(false)
      setRefresh(true)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
        await resetTiktok()
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
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
          <ScrollView style={styles.scrollStyle}>
            <Dialog.Input label='Channel ID'
                          style={styles.textInputStyle}
                          wrapperStyle={styles.wrapperStyle}
                          onChangeText={youtubeChannelId => onChangeYoutubeChannelId(youtubeChannelId)}
                          value={youtubeChannelId}
                          placeholder='Enter Channel ID'
                          placeholderTextColor={Colors.tertiaryColor}/>
          </ScrollView>
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
          <ScrollView style={styles.scrollStyle}>
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
            <Dialog.Input label='Engagement'
                          style={styles.textInputStyle}
                          wrapperStyle={styles.wrapperStyle}
                          onChangeText={facebookPageEngagement =>
                            onChangeFacebookPageEngagement(facebookPageEngagement)}
                          value={facebookPageEngagement}
                          placeholder='Enter Engagement'
                          placeholderTextColor={Colors.tertiaryColor}/>
            <Dialog.Input label='Followers Count'
                          style={styles.textInputStyle}
                          wrapperStyle={styles.wrapperStyle}
                          onChangeText={facebookPageFollowersCount =>
                            onChangeFacebookPageFollowersCount(facebookPageFollowersCount)}
                          value={facebookPageFollowersCount}
                          placeholder='Enter Followers Count'
                          placeholderTextColor={Colors.tertiaryColor}/>
          </ScrollView>
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
          <ScrollView style={styles.scrollStyle}>
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
                          onChangeText={instagramFollowerCount =>
                            onChangeInstagramFollowerCount(instagramFollowerCount)}
                          value={instagramFollowerCount}
                          placeholder='Enter Followers Count'
                          placeholderTextColor={Colors.tertiaryColor}/>
            <Dialog.Input label='Following Count'
                          style={styles.textInputStyle}
                          wrapperStyle={styles.wrapperStyle}
                          onChangeText={instagramFollowingCount =>
                            onChangeInstagramFollowingCount(instagramFollowingCount)}
                          value={instagramFollowingCount}
                          placeholder='Enter Following Count'
                          placeholderTextColor={Colors.tertiaryColor}/>
            <Dialog.Input label='Media Count'
                          style={styles.textInputStyle}
                          wrapperStyle={styles.wrapperStyle}
                          onChangeText={instagramMediaCount => onChangeInstagramMediaCount(instagramMediaCount)}
                          value={instagramMediaCount}
                          placeholder='Enter Media Count'
                          placeholderTextColor={Colors.tertiaryColor}/>
          </ScrollView>
          <Dialog.Button label='Submit'
                         color={isDisabledInstagram() ? Colors.tertiaryColor : Colors.primaryColor}
                         onPress={addInstagram}
                         disabled={isDisabledInstagram()}/>
          <Dialog.Button label='Cancel'
                         color={Colors.primaryColor}
                         onPress={hideDialogInstagram}/>
        </Dialog.Container>
        <Dialog.Container visible={visibleTiktok}
                          onBackdropPress={hideDialogTiktok}
                          headerStyle={styles.headerStyle}
                          footerStyle={styles.footerStyle}>
          <Dialog.Title style={styles.titleStyle}>
            NEW ACCOUNT
          </Dialog.Title>
          <ScrollView style={styles.scrollStyle}>
            <Dialog.Input label='Account Username'
                          style={styles.textInputStyle}
                          wrapperStyle={styles.wrapperStyle}
                          onChangeText={tiktokUsername => onChangeTiktokUsername(tiktokUsername)}
                          value={tiktokUsername}
                          placeholder='Enter Account Username'
                          placeholderTextColor={Colors.tertiaryColor}/>
            <Dialog.Input label='Followers Count'
                          style={styles.textInputStyle}
                          wrapperStyle={styles.wrapperStyle}
                          onChangeText={tiktokFollowers => onChangeTiktokFollowers(tiktokFollowers)}
                          value={tiktokFollowers}
                          placeholder='Enter Followers Count'
                          placeholderTextColor={Colors.tertiaryColor}/>
            <Dialog.Input label='Videos Count'
                          style={styles.textInputStyle}
                          wrapperStyle={styles.wrapperStyle}
                          onChangeText={tiktokVideos => onChangeTiktokVideos(tiktokVideos)}
                          value={tiktokVideos}
                          placeholder='Enter Videos Count'
                          placeholderTextColor={Colors.tertiaryColor}/>
            <Dialog.Input label='Likes Count'
                          style={styles.textInputStyle}
                          wrapperStyle={styles.wrapperStyle}
                          onChangeText={tiktokTotalLikes => onChangeTiktokTotalLikes(tiktokTotalLikes)}
                          value={tiktokTotalLikes}
                          placeholder='Enter Likes Count'
                          placeholderTextColor={Colors.tertiaryColor}/>
          </ScrollView>
          <Dialog.Button label='Submit'
                         color={isDisabledTiktok() ? Colors.tertiaryColor : Colors.primaryColor}
                         onPress={addTiktok}
                         disabled={isDisabledTiktok()}/>
          <Dialog.Button label='Cancel'
                         color={Colors.primaryColor}
                         onPress={hideDialogTiktok}/>
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

                    <TouchableOpacity onPress={refreshFunction}>
                      <MaterialCommunityIcons name='reload'
                                              size={50}
                                              color={Colors.primaryColor}/>
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

                    <TouchableOpacity onPress={refreshFunction}>
                      <MaterialCommunityIcons name='reload'
                                              size={50}
                                              color={Colors.primaryColor}/>
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

                    <TouchableOpacity onPress={refreshFunction}>
                      <MaterialCommunityIcons name='reload'
                                              size={50}
                                              color={Colors.primaryColor}/>
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
          </View>
          <View>
            <View style={styles.horizontalViewStyle}>
              <Image style={styles.avatarStyle}
                     source={require('../../assets/icons/tiktok-logo.png')}/>
              <Text style={styles.tiktokTitleStyle}>
                Tiktok
              </Text>
              <TouchableOpacity style={styles.addIconStyle}
                                onPress={showDialogTiktok}>
                <Ionicons name='add'
                          size={36}
                          color={Colors.defaultColor}/>
              </TouchableOpacity>
            </View>
            {
              tiktokAccounts.length > 0 ? (
                <View style={styles.socialMediaViewStyle}>
                  <View style={styles.listStyle}>
                    <FlatList keyExtractor={(item, index) => index.toString()}
                              data={tiktokAccounts}
                              numColumns={1}
                              renderItem={renderTiktokItemsFunction}/>
                  </View>
                </View>
              ) : (
                <View style={styles.socialMediaViewStyle}>
                  <View style={styles.emptyListStyle}>

                    <TouchableOpacity onPress={refreshFunction}>
                      <MaterialCommunityIcons name='reload'
                                              size={50}
                                              color={Colors.primaryColor}/>
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
      <NotificationButton navigation={navData.navigation}/>
    )
  }
}

export default SocialMediaScreen
