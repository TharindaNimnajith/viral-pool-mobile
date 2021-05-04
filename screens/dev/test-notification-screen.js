import React, {useContext, useEffect, useState} from 'react'
// noinspection ES6UnusedImports
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/colors'
import {AppContext} from '../../global/app-context'
import {getStringData} from '../../helpers/local-storage-helpers'
import {Util} from '../../util/util'
import {Notifications} from '../../data/notification-data/notification-data';
import Menu from '../../components/buttons/menu-button'
import CombinedButtons from '../../components/buttons/combined-buttons'

const TestNotificationScreen = () => {
  // noinspection JSCheckFunctionSignatures
  const appContext = useContext(AppContext)

  const [expoPushToken, setExpoPushToken] = useState(null)

  useEffect(() => {
    getStringData(Util.EXPO_PUSH_TOKEN).then(expoPushToken => {
      setExpoPushToken(expoPushToken)
    })
  }, [])

  const sendNotificationAppContext = async () => {
    await sendPushNotification(appContext.expoPushToken)
  }

  const sendNotificationAsyncStorage = async () => {
    await sendPushNotification(expoPushToken)
  }

  return (
    <SafeAreaView>
      {/*<ScrollView>*/}
      <View style={styles.mainViewStyle}>
        <View style={styles.viewStyle}>
          <TouchableOpacity style={styles.buttonStyle}
                            onPress={sendNotificationAppContext}>
            <Text style={styles.buttonTextStyle}>
              Send Notification (App Context)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}
                            onPress={sendNotificationAsyncStorage}>
            <Text style={styles.buttonTextStyle}>
              Send Notification (Async Storage)
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/*</ScrollView>*/}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 30,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase'
  },
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  },
  viewStyle: {
    alignItems: 'center'
  }
})

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: Notifications[0].title,
    body: Notifications[0].description,
    data: {
      data: 'NewProjectDetails'
    }
  }

  const headers = {
    'Accept': 'application/json',
    'Accept-encoding': 'gzip, deflate',
    'Content-Type': 'application/json'
  }

  await fetch(Util.EXPO_PUSH_NOTIFICATION_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(message)
  })

  // let data = {
  //   "to": "ExponentPushToken[Wr2Q-yKUDUUi6qm0ZavPPM]",
  //   "sound": "default",
  //   "title": "New Job",
  //   "body": "You have been assigned a new job.",
  //   "data": {
  //     "someData": "NewProjectDetails"
  //   }
  // }
  //
  // let config = {
  //   method: 'POST',
  //   url: 'https://exp.host/--/api/v2/push/send',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Accept-encoding': 'gzip, deflate',
  //     'Content-Type': 'application/json'
  //   },
  //   data: data
  // }
}

TestNotificationScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Test Notifications',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

// noinspection JSUnusedGlobalSymbols
export default TestNotificationScreen
