import React from 'react'
import {StyleSheet, Text, TouchableOpacity} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {FontAwesome5} from '@expo/vector-icons'
import Colors from '../util/colors'

const FileListItem = props => {
  const file = {
    file: props.itemData,
    navigation: props.navigation
  }

  const getFileItem = () => {
    if (file.file.fileType === 'application/pdf')
      return 'file-pdf'
    else if (file.file.fileType === 'application/msword' ||
      file.file.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingm')
      return 'file-word'
    else
      return 'file-image'
  }

  const download = () => {
    console.log(file)
  }

  return (
    <TouchableOpacity style={styles.itemStyle}
                      onPress={download}>
      <FontAwesome5 name={getFileItem()}
                    size={35}
                    color={Colors.primaryColor}/>
      {
        file.file.fileName.length < 12 ? (
          <Text style={styles.textStyle}>
            {file.file.fileName}
          </Text>
        ) : (
          <Text style={styles.textStyle}>
            {file.file.fileName.substring(0, 8)}...
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
