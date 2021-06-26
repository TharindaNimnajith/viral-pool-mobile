import React, {useState} from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import Dialog from 'react-native-dialog'
import {MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import {formatNumber, showAlert, showErrors} from '../../../../shared/util/helpers'
import {socialMediaPlatformActiveStatusEnum} from '../../../../shared/const/enums'
import Constants from '../../../../shared/const/constants'
import Colors from '../../../../shared/const/colors'
import {styles} from './tiktok-list-item-styles'

const TiktokListItem = props => {
  const [tiktokUsername, setTiktokUsername] = useState(props.itemData.item.username)
  const [tiktokTotalLikes, setTiktokTotalLikes] = useState(props.itemData.item.totalLikes)
  const [tiktokVideos, setTiktokVideos] = useState(props.itemData.item.videos)
  const [tiktokFollowers, setTiktokFollowers] = useState(props.itemData.item.followers)
  const [tiktokUsernameValid, setTiktokUsernameValid] = useState(true)
  const [tiktokTotalLikesValid, setTiktokTotalLikesValid] = useState(true)
  const [tiktokVideosValid, setTiktokVideosValid] = useState(true)
  const [tiktokFollowersValid, setTiktokFollowersValid] = useState(true)
  const [visibleTiktok, setVisibleTiktok] = useState(false)
  const [visible, setVisible] = useState(false)

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const showDialogTiktok = async () => {
    setVisibleTiktok(true)
  }

  const hideDialogTiktok = async () => {
    setVisibleTiktok(false)
    await resetTiktok()
  }

  const onChangeTiktokUsername = async tiktokUsername => {
    setTiktokUsernameValid(tiktokUsername.trim().length > 0)
    setTiktokUsername(tiktokUsername)
  }

  const onChangeTiktokVideos = async tiktokVideos => {
    if (tiktokVideos.trim().length > 0)
      setTiktokVideosValid(!isNaN(tiktokVideos.trim()))
    else
      setTiktokVideosValid(false)
    setTiktokVideos(tiktokVideos)
  }

  const onChangeTiktokFollowers = async tiktokFollowers => {
    if (tiktokFollowers.trim().length > 0)
      setTiktokFollowersValid(!isNaN(tiktokFollowers.trim()))
    else
      setTiktokFollowersValid(false)
    setTiktokFollowers(tiktokFollowers)
  }

  const onChangeTiktokTotalLikes = async tiktokTotalLikes => {
    if (tiktokTotalLikes.trim().length > 0)
      setTiktokTotalLikesValid(!isNaN(tiktokTotalLikes.trim()))
    else
      setTiktokTotalLikesValid(false)
    setTiktokTotalLikes(tiktokTotalLikes)
  }

  function isDisabledTiktok() {
    return !tiktokUsernameValid || !tiktokFollowersValid || !tiktokVideosValid || !tiktokTotalLikesValid
  }

  const resetTiktok = async () => {
    await onChangeTiktokUsername(props.itemData.item.username)
    await onChangeTiktokFollowers(props.itemData.item.videos)
    await onChangeTiktokVideos(props.itemData.item.followers)
    await onChangeTiktokTotalLikes(props.itemData.item.totalLikes)
  }

  const editTiktok = async () => {
    setVisibleTiktok(false)
    props.loadingFunctionTrue()
    const data = {
      id: props.itemData.item.id,
      status: props.itemData.item.status,
      username: tiktokUsername.trim(),
      totalLikes: tiktokTotalLikes.trim(),
      videos: tiktokVideos.trim(),
      followers: tiktokFollowers.trim()
    }
    axios.post('cc-social-media/tiktok/add-profile', data).then(async response => {
      props.loadingFunctionFalse()
      props.refreshFunction()
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.UPDATED)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
        await resetTiktok()
      }
    }).catch(async error => {
      props.loadingFunctionFalse()
      await showErrors(error.response.data)
      await resetTiktok()
      props.refreshFunction()
      console.log(error.response.data)
    })
  }

  const deleteAccount = async () => {
    setVisible(false)
    props.loadingFunctionTrue()
    axios.post('cc-social-media/ticktok/deactivate', props.itemData.item).then(async response => {
      props.loadingFunctionFalse()
      props.refreshFunction()
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.DELETED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      props.loadingFunctionFalse()
      await showErrors(error.response.data)
      props.refreshFunction()
      console.log(error.response.data)
    })
  }

  return (
    <View>
      <Dialog.Container visible={visible}
                        onBackdropPress={hideDialog}>
        <Dialog.Title>
          DELETE ACCOUNT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={deleteAccount}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialog}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleTiktok}
                        onBackdropPress={hideDialogTiktok}
                        headerStyle={styles.headerStyle}
                        footerStyle={styles.footerStyle}>
        <Dialog.Title style={styles.titleStyle}>
          UPDATE ACCOUNT
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
        <Dialog.Button label='Update'
                       color={isDisabledTiktok() ? Colors.tertiaryColor : Colors.primaryColor}
                       onPress={editTiktok}
                       disabled={isDisabledTiktok()}/>
        <Dialog.Button label='Cancel'
                       color={Colors.primaryColor}
                       onPress={hideDialogTiktok}/>
      </Dialog.Container>
      {
        props.itemData.item.status === socialMediaPlatformActiveStatusEnum.Activated && (
          <TouchableOpacity style={styles.itemStyle}
                            onPress={showDialogTiktok}>
            <View style={styles.mainViewStyle}>
              <View style={styles.iconViewStyle}>
                <Image style={styles.avatarStyle}
                       source={require('../../../../assets/icons/tiktok-logo.png')}/>
              </View>
              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                  {props.itemData.item.username}
                </Text>
                <View style={styles.horizontalStyle}>
                  <Text style={styles.statTitleStyle}>
                    Followers
                  </Text>
                  <Text style={styles.statStyle}>
                    {formatNumber(props.itemData.item.followers)}
                  </Text>
                </View>
                <View style={styles.horizontalStyle}>
                  <Text style={styles.statTitleStyle}>
                    Videos
                  </Text>
                  <Text style={styles.statStyle}>
                    {formatNumber(props.itemData.item.videos)}
                  </Text>
                </View>
                <View style={styles.horizontalStyle}>
                  <Text style={styles.statTitleStyle}>
                    Likes
                  </Text>
                  <Text style={styles.statStyle}>
                    {formatNumber(props.itemData.item.totalLikes)}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.deleteStyle}
                                onPress={showDialog}>
                <MaterialIcons name='delete-forever'
                               size={35}
                               color={Colors.primaryColor}/>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default TiktokListItem
