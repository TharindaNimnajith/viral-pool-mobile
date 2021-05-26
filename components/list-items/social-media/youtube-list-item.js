import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {MaterialIcons} from '@expo/vector-icons'
import Colors from '../../../shared/const/colors'

const YoutubeListItem = props => {
  return (
    <View style={styles.itemStyle}>
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
        <TouchableOpacity style={styles.deleteStyle}>
          <MaterialIcons name='delete-forever'
                         size={35}
                         color={Colors.primaryColor}/>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarStyle: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
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
    borderLeftColor: Colors.primaryColor,
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

export default YoutubeListItem
