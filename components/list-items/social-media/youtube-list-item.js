import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {MaterialIcons} from '@expo/vector-icons'
import Colors from '../../../shared/const/colors'

const YoutubeListItem = props => {
  return (
    <TouchableOpacity style={styles.itemStyle}>
      <View style={styles.mainViewStyle}>
        <View style={styles.iconViewStyle}>
          <Image style={styles.avatarStyle}
                 source={{
                   uri: props.itemData.item.iconPath
                 }}/>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>
            {props.itemData.item.channelName}
          </Text>
          <Text style={styles.statStyle}>
            Videos {props.itemData.item.videoCount}
          </Text>
          <Text style={styles.statStyle}>
            Subscribers {props.itemData.item.subscriptionCount}
          </Text>
          <Text style={styles.statStyle}>
            Views {props.itemData.item.viewCount}
          </Text>
        </View>
        <View style={styles.deleteStyle}>
          <MaterialIcons name='delete-forever'
                         size={35}
                         color={Colors.primaryColor}/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  deleteStyle: {
    justifyContent: 'center',
    marginLeft: 10
  },
  iconViewStyle: {
    width: wp('10.5%'),
    marginLeft: wp('3%'),
    marginBottom: 12,
    justifyContent: 'center'
  },
  itemStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
    height: 75,
    marginHorizontal: wp('4%'),
    marginVertical: 6,
    backgroundColor: Colors.secondaryColor,
    alignItems: 'flex-start',
    alignContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.primaryColor
  },
  mainViewStyle: {
    flexDirection: 'row'
  },
  statStyle: {
    color: Colors.tertiaryColor,
    fontSize: 14
  },
  textStyle: {
    fontSize: 15,
    color: Colors.defaultColor
  },
  viewStyle: {
    width: wp('58%')
  }
})

export default YoutubeListItem
