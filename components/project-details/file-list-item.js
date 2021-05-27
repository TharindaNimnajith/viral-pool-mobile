import React, {useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {FontAwesome5} from '@expo/vector-icons'
import {createAlbumAsync, createAssetAsync, requestPermissionsAsync} from 'expo-media-library'
import {documentDirectory, downloadAsync, FileSystemSessionType} from 'expo-file-system'
import Dialog from 'react-native-dialog'
import {ApiUrl, showAlert} from '../../shared/util/helpers'
import Constants from '../../shared/const/constants'
import Colors from '../../shared/const/colors'
import {getStringData} from '../../shared/util/local-storage'

const FileListItem = props => {
  const [visible, setVisible] = useState(false)

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const getFileItem = () => {
    switch (props.itemData.fileType) {
      case Constants.PDF:
        return 'file-pdf'
      case Constants.WORD:
      case Constants.WORD_PROCESSING:
        return 'file-word'
      default:
        return 'file-image'
    }
  }

  const download = async () => {
    setVisible(false)
    props.setLoadingTrue()
    const {
      status
    } = await requestPermissionsAsync().catch(async error => {
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
    const uri = `${ApiUrl.BASE_URL}project-strategy/file/${props.itemData.id}`
    const fileUri = documentDirectory + props.itemData.fileName
    if (status === 'granted') {
      const accessToken = await getStringData(Constants.ACCESS_TOKEN)
      const headers = {
        'Authorization': `Bearer ${accessToken}`
      }
      const options = {
        headers: headers,
        md5: false,
        sessionType: FileSystemSessionType.BACKGROUND
      }
      await downloadAsync(uri, fileUri, options).then(async uri => {
        await createAssetAsync(uri.uri).then(async asset => {
          await createAlbumAsync('Download', asset, false).then(async () => {
            props.setLoadingFalse()
            await showAlert(Constants.SUCCESS, Constants.DOWNLOADED)
          }).catch(async error => {
            props.setLoadingFalse()
            await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
            console.log(error)
          })
        }).catch(async error => {
          props.setLoadingFalse()
          await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
          console.log(error)
        })
      }).catch(async error => {
        props.setLoadingFalse()
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
        console.log(error)
      })
    } else {
      props.setLoadingFalse()
      await showAlert(Constants.WARNING, Constants.CAMERA_PERMISSION)
    }
  }

  return (
    <View>
      <Dialog.Container visible={visible}
                        onBackdropPress={hideDialog}>
        <Dialog.Title>
          DOWNLOAD
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={download}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialog}/>
      </Dialog.Container>
      <TouchableOpacity style={styles.itemStyle}
                        onPress={showDialog}>
        <FontAwesome5 name={getFileItem()}
                      size={35}
                      color={Colors.primaryColor}/>
        {
          props.itemData.fileName.length < 12 ? (
            <Text style={styles.textStyle}>
              {props.itemData.fileName}
            </Text>
          ) : (
            <Text style={styles.textStyle}>
              {props.itemData.fileName.substring(0, 8)}...
            </Text>
          )
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 12,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    marginRight: wp('3%'),
    height: wp('24%'),
    width: wp('24%'),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginVertical: 10
  },
  textStyle: {
    marginTop: 8
  }
})

export default FileListItem
