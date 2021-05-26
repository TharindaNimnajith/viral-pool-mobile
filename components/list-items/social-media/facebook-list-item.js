import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import Colors from '../../../shared/const/colors'

const FacebookListItem = props => {
  return (
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
