import React, {useState} from 'react'
import {ScrollView, Text, TouchableOpacity, View} from 'react-native'
import Dialog from 'react-native-dialog'
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import {formatNumber, showAlert, showErrors} from '../../../../shared/util/helpers'
import {socialMediaPlatformActiveStatusEnum} from '../../../../shared/const/enums'
import Constants from '../../../../shared/const/constants'
import Colors from '../../../../shared/const/colors'
import {styles} from './facebook-list-item-styles'

const FacebookListItem = props => {
  const [facebookPageId, setFacebookPageId] = useState(props.itemData.item.pageId)
  const [facebookPageName, setFacebookPageName] = useState(props.itemData.item.name)
  const [facebookPageLink, setFacebookPageLink] = useState(props.itemData.item.link)
  const [facebookPageLikeCount, setFacebookPageLikeCount] = useState(props.itemData.item.fanCount.toString())
  const [facebookPageEngagement, setFacebookPageEngagement] = useState(props.itemData.item.engagement.toString())
  const [facebookPageFollowersCount, setFacebookPageFollowersCount] =
    useState(props.itemData.item.followersCount.toString())
  const [facebookPageIdValid, setFacebookPageIdValid] = useState(true)
  const [facebookPageNameValid, setFacebookPageNameValid] = useState(true)
  const [facebookPageLinkValid, setFacebookPageLinkValid] = useState(true)
  const [facebookPageEngagementValid, setFacebookPageEngagementValid] = useState(true)
  const [facebookPageFollowersCountValid, setFacebookPageFollowersCountValid] = useState(true)
  const [facebookPageLikeCountValid, setFacebookPageLikeCountValid] = useState(true)
  const [visibleFacebook, setVisibleFacebook] = useState(false)
  const [visible, setVisible] = useState(false)

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const showDialogFacebook = async () => {
    setVisibleFacebook(true)
  }

  const hideDialogFacebook = async () => {
    setVisibleFacebook(false)
    await resetFacebook()
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
    if (facebookPageEngagement.toString().trim().length > 0)
      setFacebookPageEngagementValid(!isNaN(facebookPageEngagement.trim()))
    else
      setFacebookPageEngagementValid(false)
    setFacebookPageEngagement(facebookPageEngagement)
  }

  const onChangeFacebookPageFollowersCount = async facebookPageFollowersCount => {
    if (facebookPageFollowersCount.toString().trim().length > 0)
      setFacebookPageFollowersCountValid(!isNaN(facebookPageFollowersCount.trim()))
    else
      setFacebookPageFollowersCountValid(false)
    setFacebookPageFollowersCount(facebookPageFollowersCount)
  }

  function isDisabledFacebook() {
    return !facebookPageIdValid || !facebookPageNameValid || !facebookPageLinkValid || !facebookPageLikeCountValid ||
      !facebookPageEngagementValid || !facebookPageFollowersCountValid
  }

  const resetFacebook = async () => {
    await onChangeFacebookPageId(props.itemData.item.pageId)
    await onChangeFacebookPageName(props.itemData.item.name)
    await onChangeFacebookPageLink(props.itemData.item.link)
    await onChangeFacebookPageLikeCount(props.itemData.item.fanCount)
    await onChangeFacebookPageEngagement(props.itemData.item.engagement)
    await onChangeFacebookPageFollowersCount(props.itemData.item.followersCount)
  }

  const editFacebook = async () => {
    setVisibleFacebook(false)
    props.loadingFunctionTrue()
    const data = {
      id: props.itemData.item.id,
      pageId: facebookPageId.trim(),
      name: facebookPageName.trim(),
      link: facebookPageLink.trim(),
      fanCount: facebookPageLikeCount.toString().trim(),
      engagement: facebookPageEngagement.toString().trim(),
      followersCount: facebookPageFollowersCount.toString().trim()
    }
    axios.post('cc-social-media/facebook/add-profile', data).then(async response => {
      props.loadingFunctionFalse()
      props.refreshFunction()
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.UPDATED)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
        await resetFacebook()
      }
    }).catch(async error => {
      props.loadingFunctionFalse()
      await showErrors(error.response.data)
      await resetFacebook()
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
    axios.post('cc-social-media/facebook/deactivate', data).then(async response => {
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
          DELETE PAGE
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
      <Dialog.Container visible={visibleFacebook}
                        onBackdropPress={hideDialogFacebook}
                        headerStyle={styles.headerStyle}
                        footerStyle={styles.footerStyle}>
        <Dialog.Title style={styles.titleStyle}>
          UPDATE PAGE
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
        <Dialog.Button label='Update'
                       color={isDisabledFacebook() ? Colors.tertiaryColor : Colors.primaryColor}
                       onPress={editFacebook}
                       disabled={isDisabledFacebook()}/>
        <Dialog.Button label='Cancel'
                       color={Colors.primaryColor}
                       onPress={hideDialogFacebook}/>
      </Dialog.Container>
      {
        props.itemData.item.status === socialMediaPlatformActiveStatusEnum.Activated && (
          <TouchableOpacity style={styles.itemStyle}
                            onPress={showDialogFacebook}>
            <View style={styles.mainViewStyle}>
              <View style={styles.iconViewStyle}>
                <Ionicons name='logo-facebook'
                          size={50}
                          color={Colors.facebookColor}/>
              </View>
              <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>
                  {props.itemData.item.name}
                </Text>
                <View style={styles.horizontalStyle}>
                  <Text style={styles.statTitleStyle}>
                    Likes
                  </Text>
                  <Text style={styles.statStyle}>
                    {formatNumber(props.itemData.item.fanCount)}
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
                    Engagement
                  </Text>
                  <Text style={styles.statStyle}>
                    {formatNumber(props.itemData.item.engagement)}
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

export default FacebookListItem
