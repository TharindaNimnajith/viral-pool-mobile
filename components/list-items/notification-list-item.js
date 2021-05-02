import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
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
          {props.itemData.item.date.toString()}
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
    height: 80,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 6,
    marginBottom: 6
  }
})

export default NotificationListItem
