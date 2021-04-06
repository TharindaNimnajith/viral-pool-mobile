import React, {useState} from 'react'
import {Button, View} from 'react-native'
// import {AppContext} from '../../global/app-context'
import {getStringData} from '../../helpers/local-storage'
import Constants from '../../shared/constants'
import Menu from '../../components/menu'
import Logout from '../../components/logout'

const NotificationScreen = () => {
  // const appContext = useContext(AppContext)

  const [expoToken, setExpoToken] = useState(null)

  getStringData('@expoPushToken').then(value => {
    setExpoToken(JSON.parse(value))
  })

  return (
    <View>
      <Button title='Press to Send Notification'
              onPress={async () => {
                // console.log(expoToken)
                // await sendPushNotification(appContext.expoToken)
                await sendPushNotification(expoToken)
              }}/>
    </View>
  )
}

async function sendPushNotification(expoPushToken) {
  // console.log(expoPushToken)

  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Test Title',
    body: 'Test viralpool notification body.',
    data: {
      data: 'OngoingProjectDetails'
    }
  }

  await fetch(Constants.EXPO_PUSH_NOTIFICATION_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
}

NotificationScreen.navigationOptions = navData => {
  return {
    headerTitle: 'NOTIFICATIONS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default NotificationScreen
