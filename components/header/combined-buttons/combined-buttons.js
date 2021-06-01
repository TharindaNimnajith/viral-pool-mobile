import React from 'react'
import {View} from 'react-native'
import NotificationButton from '../notification-button/notification-button'
import Logout from '../logout-button/logout-button'
import {styles} from './combined-buttons-styles'

const CombinedButtons = props => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.iconStyle}>
        <NotificationButton navigation={props.navigation}/>
      </View>
    </View>
  )
}

export default CombinedButtons
