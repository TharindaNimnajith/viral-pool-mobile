import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {FontAwesome5} from '@expo/vector-icons'
import {createAlbumAsync, createAssetAsync} from 'expo-media-library'
import {askAsync, MEDIA_LIBRARY} from 'expo-permissions'
import axios from 'axios'
import {showAlert} from '../util/common-helpers'
import Constants from '../util/constants'
import Colors from '../util/colors'

const FileListItem = props => {
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

  const saveFile = async fileUri => {
    const {
      status
    } = await askAsync(MEDIA_LIBRARY)
    if (status === 'granted')
      await createAlbumAsync('viralpool', await createAssetAsync(fileUri), false)
    else
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
  }

  const download = async () => {
    axios.get(`project-strategy/file/${props.itemData.id}`).then(async response => {
      await saveFile(response.data)
    }).catch(async error => {
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  return (
    <TouchableOpacity style={styles.itemStyle}
                      onPress={download}>
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
