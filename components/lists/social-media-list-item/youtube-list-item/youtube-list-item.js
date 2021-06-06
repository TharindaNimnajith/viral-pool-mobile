import React, {useContext, useState} from 'react'
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import Dialog from 'react-native-dialog'
import {MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import {AppContext} from '../../../../shared/global/app-context'
import {formatNumber, showAlert, showErrors} from '../../../../shared/util/helpers'
import {socialMediaPlatformActiveStatusEnum} from '../../../../shared/const/enums'
import Constants from '../../../../shared/const/constants'
import Colors from '../../../../shared/const/colors'
import {styles} from './youtube-list-item-styles'

const YoutubeListItem = props => {
  const appContext = useContext(AppContext)

  const [youtubeChannelId, setYoutubeChannelId] = useState(props.itemData.item.channelId)
  const [youtubeChannelIdValid, setYoutubeChannelIdValid] = useState(true)
  const [visibleYoutube, setVisibleYoutube] = useState(false)
  const [visible, setVisible] = useState(false)

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const showDialogYoutube = async () => {
    setVisibleYoutube(true)
  }

  const hideDialogYoutube = async () => {
    setVisibleYoutube(false)
    await resetYoutube()
  }

  const onChangeYoutubeChannelId = async youtubeChannelId => {
    setYoutubeChannelIdValid(youtubeChannelId.trim().length > 0)
    setYoutubeChannelId(youtubeChannelId)
  }

  function isDisabledYoutube() {
    return !youtubeChannelIdValid
  }

  const resetYoutube = async () => {
    await onChangeYoutubeChannelId(props.itemData.item.channelId)
  }

  const editYoutube = async () => {
    setVisibleYoutube(false)
    props.loadingFunctionTrue()
    const data = {
      channelId: youtubeChannelId.trim(),
      contentCreatorDetailId: appContext.userData?.id
    }
    axios.put('cc-social-media/youtube/edit-profile', data).then(async response => {
      props.loadingFunctionFalse()
      props.refreshFunction()
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.UPDATED)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
        await resetYoutube()
      }
    }).catch(async error => {
      props.loadingFunctionFalse()
      await showErrors(error.response.data)
      await resetYoutube()
      props.refreshFunction()
      console.log(error.response.data)
    })
  }

  const deleteAccount = async () => {
    setVisible(false)
    props.loadingFunctionTrue()
    const data = {
      id: props.itemData.item.id,
      channelId: props.itemData.item.channelId
    }
    axios.post('cc-social-media/youtube/deactivate', data).then(async response => {
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
          DELETE CHANNEL
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
      <Dialog.Container visible={visibleYoutube}
                        onBackdropPress={hideDialogYoutube}
                        headerStyle={styles.headerStyle}
                        footerStyle={styles.footerStyle}>
        <Dialog.Title style={styles.titleStyle}>
          UPDATE CHANNEL
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
        <Dialog.Button label='Update'
                       color={isDisabledYoutube() ? Colors.tertiaryColor : Colors.primaryColor}
                       onPress={editYoutube}
                       disabled={isDisabledYoutube()}/>
        <Dialog.Button label='Cancel'
                       color={Colors.primaryColor}
                       onPress={hideDialogYoutube}/>
      </Dialog.Container>
      {
        props.itemData.item.status === socialMediaPlatformActiveStatusEnum.Activated && (
          <TouchableOpacity style={styles.itemStyle}
                            onPress={showDialogYoutube}>
            <View style={styles.mainViewStyle}>
              <View style={styles.iconViewStyle}>
                <Image style={styles.avatarStyle}
                       source={{
                         uri: props.itemData.item.iconPath
                       }}/>
              </View>
              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                  {props.itemData.item.channelName}
                </Text>
                <View style={styles.horizontalStyle}>
                  <Text style={styles.statTitleStyle}>
                    Videos
                  </Text>
                  <Text style={styles.statStyle}>
                    {formatNumber(props.itemData.item.videoCount)}
                  </Text>
                </View>
                <View style={styles.horizontalStyle}>
                  <Text style={styles.statTitleStyle}>
                    Subscribers
                  </Text>
                  <Text style={styles.statStyle}>
                    {formatNumber(props.itemData.item.subscriptionCount)}
                  </Text>
                </View>
                <View style={styles.horizontalStyle}>
                  <Text style={styles.statTitleStyle}>
                    Views
                  </Text>
                  <Text style={styles.statStyle}>
                    {formatNumber(props.itemData.item.viewCount)}
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

export default YoutubeListItem
