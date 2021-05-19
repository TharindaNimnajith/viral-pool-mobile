import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {FontAwesome5} from '@expo/vector-icons'
import Colors from '../util/colors'

const FileListItem = props => {
  const getFileItem = () => {
    if (props.itemData.fileType === 'application/pdf')
      return 'file-pdf'
    else if (props.itemData.fileType === 'application/msword' || props.itemData.fileType ===
      'application/vnd.openxmlformats-officedocument.wordprocessingm')
      return 'file-word'
    else
      return 'file-image'
  }

  const download = () => {
    console.log(props.itemData)
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
