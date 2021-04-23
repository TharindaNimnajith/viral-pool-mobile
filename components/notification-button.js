import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from './custom-header-button'

const NotificationButton = props => {
  const displayNotifications = async () => {
    props.navigation.navigate('Notifications')
  }

  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title='Notifications'
            iconName='notifications'
            onPress={displayNotifications}/>
    </HeaderButtons>
  )
}

export default NotificationButton
