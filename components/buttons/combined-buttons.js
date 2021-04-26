import React from 'react'
import {StyleSheet, View} from 'react-native'
import NotificationButton from './notification-button'
import Logout from './logout-button'

const CombinedButtons = props => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.iconStyle}>
        <NotificationButton navigation={props.navigation}/>
      </View>
      <View>
        <Logout navigation={props.navigation}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  iconStyle: {
    left: 20
  },
  viewStyle: {
    flexDirection: 'row'
  }
})

export default CombinedButtons
