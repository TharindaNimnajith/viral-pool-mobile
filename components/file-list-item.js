import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../util/colors'

const FileListItem = props => {
  const file = {
    file: props.itemData,
    navigation: props.navigation
  }

  const download = () => {
    console.log(file)
  }

  return (
    <TouchableOpacity style={styles.itemStyle}
                      onPress={download}>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 15,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    marginRight: wp('3%'),
    height: wp('24%'),
    width: wp('24%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    alignContent: 'center',
    marginVertical: 10
  }
})

export default FileListItem
