import React, {useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import Dialog from 'react-native-dialog'
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import {formatNumber, showAlert, showErrors} from '../../../../shared/util/helpers'
import {socialMediaPlatformActiveStatusEnum} from '../../../../shared/const/enums'
import Constants from '../../../../shared/const/constants'
import Colors from '../../../../shared/const/colors'
import {styles} from './instagram-list-item-styles'

const InstagramListItem = props => {
  const [visible, setVisible] = useState(false)

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
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
      {
        props.itemData.item.status === socialMediaPlatformActiveStatusEnum.Activated && (
          <View style={styles.itemStyle}>
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
              </View>
              <TouchableOpacity style={styles.deleteStyle}
                                onPress={showDialog}>
                <MaterialIcons name='delete-forever'
                               size={35}
                               color={Colors.primaryColor}/>
              </TouchableOpacity>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default InstagramListItem