import React, {useContext, useState} from 'react'
import {Button, View} from 'react-native'
import {AppContext} from '../../global/app-context'
import {getStringData} from '../../helpers/local-storage'
import Menu from '../../components/menu'
import Logout from '../../components/logout'
import {Util} from '../../util/util'

const NotificationScreen = () => {
  const appContext = useContext(AppContext)

  // noinspection JSUnusedLocalSymbols
  const [expoPushToken, setExpoPushToken] = useState(null)

  getStringData(Util.EXPO_PUSH_TOKEN).then(value => {
    setExpoPushToken(value)
  })

  return (
    <View>
      <Button title='Press to Send Notification'
              onPress={async () => {
                await sendPushNotification(appContext.expoPushToken)
                // await sendPushNotification(expoPushToken)
              }}/>
    </View>
  )
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Test Title',
    body: 'Test viralpool notification body.',
    data: {
      data: 'OngoingProjectDetails'
    }
  }

  await fetch(Util.EXPO_PUSH_NOTIFICATION_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })

  // let data = {
  //   "to": "ExponentPushToken[Wr2Q-yKUDUUi6qm0ZavPPM]",
  //   "sound": "default",
  //   "title": "Test Title",
  //   "body": "Test viralpool notification body.",
  //   "data": {
  //     "someData": "OngoingProjectDetails"
  //   }
  // }
  //
  // let config = {
  //   method: 'post',
  //   url: 'https://exp.host/--/api/v2/push/send',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Accept-encoding': 'gzip, deflate',
  //     'Content-Type': 'application/json'
  //   },
  //   data : data
  // }
}

NotificationScreen.navigationOptions = navData => {
  return {
    headerTitle: 'NOTIFICATIONS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

// noinspection JSUnusedGlobalSymbols
export default NotificationScreen
