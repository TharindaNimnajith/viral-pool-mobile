import React, {useState} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Dialog from 'react-native-dialog'
import {MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import {formatNumber, showAlert, showErrors} from '../../../shared/util/helpers'
import {socialMediaPlatformActiveStatusEnum} from '../../../shared/const/enums'
import Constants from '../../../shared/const/constants'
import Colors from '../../../shared/const/colors'

const TiktokListItem = props => {
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
      {
        props.itemData.item.status === socialMediaPlatformActiveStatusEnum.Activated && (
          <View style={styles.itemStyle}>
            <View style={styles.mainViewStyle}>
              <View style={styles.iconViewStyle}>
                <Image style={styles.avatarStyle}
                       source={require('../../../assets/tiktok-logo.png')}/>
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
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  avatarStyle: {
    width: wp('16%'),
    height: wp('16%'),
    marginLeft: -wp('1.5%')
  },
  deleteStyle: {
    width: '10%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  horizontalStyle: {
    flexDirection: 'row'
  },
  iconViewStyle: {
    width: '20%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  itemStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
    marginHorizontal: wp('4%'),
    marginVertical: 6,
    backgroundColor: Colors.secondaryColor,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.defaultColor,
    justifyContent: 'center',
    paddingVertical: 8
  },
  mainViewStyle: {
    flexDirection: 'row'
  },
  statStyle: {
    color: Colors.tertiaryColor,
    fontSize: 13,
    textAlign: 'right',
    width: '55%'
  },
  statTitleStyle: {
    color: Colors.tertiaryColor,
    fontSize: 13,
    width: '40%'
  },
  textStyle: {
    fontSize: 18,
    color: Colors.defaultColor,
    marginBottom: 7
  },
  viewStyle: {
    width: '64%',
    marginLeft: '4%',
    justifyContent: 'center'
  }
})

export default TiktokListItem
