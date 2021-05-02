import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/colors'

const NotificationListItem = props => {
  // let notification = {
  //   notification: props.itemData.item,
  //   navigation: props.navigation,
  //   refresh: props.refreshFunction
  // }

  const pressNotification = () => {
    // console.log(notification)
  }

  return (
    <TouchableOpacity style={styles.itemStyle}
                      onPress={pressNotification}>
      <View>
        <Text>
          {props.itemData.item.title}
        </Text>
        <Text>
          {props.itemData.item.description}
        </Text>
        <Text>
          {props.itemData.item.date}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 15,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    marginHorizontal: wp('4%'),
    marginVertical: hp('0.5%'),
    height: 140,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 10
  }
})

export default NotificationListItem
