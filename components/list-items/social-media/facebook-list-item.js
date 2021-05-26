import React, {useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Dialog from 'react-native-dialog'
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import axios from 'axios'
import {showAlert} from '../../../shared/util/helpers'
import Constants from '../../../shared/const/constants'
import Colors from '../../../shared/const/colors'

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
      props.itemData.item.refresh()
      props.loadingFunctionFalse()
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      props.refreshFunction()
      console.log(error)
    })
  }

  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>
          DELETE ACCOUNT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={deleteAccount}/>
        <Dialog.Button label='No'
                       onPress={hideDialog}/>
      </Dialog.Container>
      <View style={styles.itemStyle}>
        <View style={styles.mainViewStyle}>
          <View style={styles.iconViewStyle}>
            <Ionicons name='logo-facebook'
                      size={50}
                      color={Colors.facebookColor}/>
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
                {props.itemData.item.videoCount}
              </Text>
            </View>
            <View style={styles.horizontalStyle}>
              <Text style={styles.statTitleStyle}>
                Subscribers
              </Text>
              <Text style={styles.statStyle}>
                {props.itemData.item.subscriptionCount}
              </Text>
            </View>
            <View style={styles.horizontalStyle}>
              <Text style={styles.statTitleStyle}>
                Views
              </Text>
              <Text style={styles.statStyle}>
                {props.itemData.item.viewCount}
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
    </View>
  )
}

const styles = StyleSheet.create({
  deleteStyle: {
    width: '8%',
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
    width: '30%'
  },
  textStyle: {
    fontSize: 18,
    color: Colors.defaultColor,
    marginBottom: 5
  },
  viewStyle: {
    width: '64%',
    marginLeft: '4%'
  }
})

export default FacebookListItem
