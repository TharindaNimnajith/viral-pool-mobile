import React, {useState} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import Dialog from 'react-native-dialog'
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import {formatNumber, showAlert, showErrors} from '../../../../shared/util/helpers'
import {socialMediaPlatformActiveStatusEnum} from '../../../../shared/const/enums'
import Constants from '../../../../shared/const/constants'
import Colors from '../../../../shared/const/colors'
import {styles} from './instagram-list-item-styles'

const InstagramListItem = props => {
  const [instagramUsername, setInstagramUsername] = useState(props.itemData.item.username)
  const [instagramLink, setInstagramLink] = useState(props.itemData.item.link)
  const [instagramFollowingCount, setInstagramFollowingCount] = useState(props.itemData.item.followsCount.toString())
  const [instagramFollowerCount, setInstagramFollowerCount] = useState(props.itemData.item.followersCount.toString())
  const [instagramMediaCount, setInstagramMediaCount] = useState(props.itemData.item.mediaCount.toString())
  const [instagramUsernameValid, setInstagramUsernameValid] = useState(true)
  const [instagramLinkValid, setInstagramLinkValid] = useState(true)
  const [instagramFollowingCountValid, setInstagramFollowingCountValid] = useState(true)
  const [instagramFollowerCountValid, setInstagramFollowerCountValid] = useState(true)
  const [instagramMediaCountValid, setInstagramMediaCountValid] = useState(true)
  const [visibleInstagram, setVisibleInstagram] = useState(false)
  const [visible, setVisible] = useState(false)

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const showDialogInstagram = async () => {
    setVisibleInstagram(true)
  }

  const hideDialogInstagram = async () => {
    setVisibleInstagram(false)
    await resetInstagram()
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

  const onChangeInstagramMediaCount = async instagramMediaCount => {
    if (instagramMediaCount.trim().length > 0)
      setInstagramMediaCountValid(!isNaN(instagramMediaCount.trim()))
    else
      setInstagramMediaCountValid(false)
    setInstagramMediaCount(instagramMediaCount)
  }

  function isDisabledInstagram() {
    return !instagramUsernameValid || !instagramLinkValid || !instagramFollowerCountValid ||
      !instagramFollowingCountValid || !instagramMediaCountValid
  }

  const resetInstagram = async () => {
    await onChangeInstagramUsername(props.itemData.item.username)
    await onChangeInstagramLink(props.itemData.item.link)
    await onChangeInstagramFollowingCount(props.itemData.item.followsCount)
    await onChangeInstagramFollowerCount(props.itemData.item.followersCount)
    await onChangeInstagramMediaCount(props.itemData.item.mediaCount)
  }

  const editInstagram = async () => {
    setVisibleInstagram(false)
    props.loadingFunctionTrue()
    const data = {
      id: props.itemData.item.id,
      username: instagramUsername.trim(),
      link: instagramLink.trim(),
      followsCount: instagramFollowingCount.trim(),
      followersCount: instagramFollowerCount.trim(),
      mediaCount: instagramMediaCount.trim()
    }
    axios.post('cc-social-media/instagram/add-profile', data).then(async response => {
      props.loadingFunctionFalse()
      props.refreshFunction()
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.UPDATED)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
        await resetInstagram()
      }
    }).catch(async error => {
      props.loadingFunctionFalse()
      await showErrors(error.response.data)
      await resetInstagram()
      props.refreshFunction()
      console.log(error.response.data)
    })
  }

  const deleteAccount = async () => {
    setVisible(false)
    props.loadingFunctionTrue()
    const data = {
      id: props.itemData.item.id,
      link: props.itemData.item.link
    }
    axios.post('cc-social-media/instagram/deactivate', data).then(async response => {
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
      <Dialog.Container visible={visibleInstagram}
                        onBackdropPress={hideDialogInstagram}
                        headerStyle={styles.headerStyle}
                        footerStyle={styles.footerStyle}>
        <Dialog.Title style={styles.titleStyle}>
          UPDATE ACCOUNT
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
        <Dialog.Button label='Update'
                       color={isDisabledInstagram() ? Colors.tertiaryColor : Colors.primaryColor}
                       onPress={editInstagram}
                       disabled={isDisabledInstagram()}/>
        <Dialog.Button label='Cancel'
                       color={Colors.primaryColor}
                       onPress={hideDialogInstagram}/>
      </Dialog.Container>
      {
        props.itemData.item.status === socialMediaPlatformActiveStatusEnum.Activated && (
          <TouchableOpacity style={styles.itemStyle}
                            onPress={showDialogInstagram}>
            <View style={styles.mainViewStyle}>
              <View style={styles.iconViewStyle}>
                <Ionicons name='logo-instagram'
                          size={50}
                          color={Colors.instagramColor}/>
              </View>
              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                  {props.itemData.item.username}
                </Text>
                <View style={styles.horizontalStyle}>
                  <Text style={styles.statTitleStyle}>
                    Following
                  </Text>
                  <Text style={styles.statStyle}>
                    {formatNumber(props.itemData.item.followsCount)}
                  </Text>
                </View>
                <View style={styles.horizontalStyle}>
                  <Text style={styles.statTitleStyle}>
                    Followers
                  </Text>
                  <Text style={styles.statStyle}>
                    {formatNumber(props.itemData.item.followersCount)}
                  </Text>
                </View>
                <View style={styles.horizontalStyle}>
                  <Text style={styles.statTitleStyle}>
                    Media
                  </Text>
                  <Text style={styles.statStyle}>
                    {formatNumber(props.itemData.item.mediaCount)}
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

export default InstagramListItem
