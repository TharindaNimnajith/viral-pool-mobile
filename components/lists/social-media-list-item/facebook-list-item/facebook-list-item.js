import React, {useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Dialog from 'react-native-dialog'
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import {formatNumber, showAlert, showErrors} from '../../../../shared/util/helpers'
import {socialMediaPlatformActiveStatusEnum} from '../../../../shared/const/enums'
import Constants from '../../../../shared/const/constants'
import Colors from '../../../../shared/const/colors'
import {styles} from './facebook-list-item-styles'

const FacebookListItem = props => {
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
      {
        props.itemData.item.status === socialMediaPlatformActiveStatusEnum.Activated && (
          <View style={styles.itemStyle}>
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
    borderLeftColor: Colors.facebookColor,
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
    marginBottom: 8
  },
  viewStyle: {
    width: '64%',
    marginLeft: '4%',
    justifyContent: 'center'
  }
})

export default FacebookListItem