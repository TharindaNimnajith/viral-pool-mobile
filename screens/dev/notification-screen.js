import React, {useContext, useEffect, useState} from 'react'
import {Button, StyleSheet, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/colors'
import {AppContext} from '../../global/app-context'
import {getStringData} from '../../helpers/local-storage-helpers'
import Menu from '../../components/menu-component'
import Logout from '../../components/logout-component'
import {Util} from '../../util/util'

const NotificationScreen = () => {
  const appContext = useContext(AppContext)

  const [expoPushToken, setExpoPushToken] = useState(null)

  useEffect(() => {
    getStringData(Util.EXPO_PUSH_TOKEN).then(value => {
      setExpoPushToken(value)
    })
  }, [])

  const sendNotificationAppContext = async () => {
    await sendPushNotification(appContext.expoPushToken)
  }

  const sendNotificationAsyncStorage = async () => {
    await sendPushNotification(expoPushToken)
  }

  return (
    <View style={styles.mainViewStyle}>
      <Button title='Send Notification (App Context)'
              onPress={sendNotificationAppContext}/>
      <Button title='Send Notification (Async Storage)'
              onPress={sendNotificationAsyncStorage}/>
    </View>
  )
}

const styles = StyleSheet.create({
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  }
})

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
