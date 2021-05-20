import React, {useContext} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppContext} from '../util/app-context'
import Colors from '../util/colors'
import IoniconsHeaderButton from './custom-header-button'
import MaterialHeaderButton from './material-header-button'

const NotificationButton = props => {
  const appContext = useContext(AppContext)

  const displayNotifications = async () => {
    props.navigation.navigate('Notifications')
  }

  return (
    appContext.newNotifications ? (
      <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
        <Item title='Notifications'
              iconName='notifications'
              onPress={displayNotifications}/>
      </HeaderButtons>
    ) : (
      <HeaderButtons HeaderButtonComponent={MaterialHeaderButton}>
        <Item title='Notifications'
              iconName='bell-alert'
              color={Colors.errorColor}
              onPress={displayNotifications}/>
      </HeaderButtons>
    )
  )
}

export default NotificationButton
