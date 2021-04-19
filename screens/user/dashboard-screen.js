import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {AppContext} from '../../global/app-context'
import Menu from '../../components/menu'
import Logout from '../../components/logout'
import {getStringData} from '../../helpers/local-storage'
import {Util} from '../../util/util'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Colors from "../../shared/colors";

const DashboardScreen = () => {
  const appContext = useContext(AppContext)

  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [expoPushToken, setExpoPushToken] = useState(null)

  useEffect(() => {
    getStringData(Util.ACCESS_TOKEN).then(value => {
      setAccessToken(value)
    })
    getStringData(Util.REFRESH_TOKEN).then(value => {
      setRefreshToken(value)
    })
    getStringData(Util.EXPO_PUSH_TOKEN).then(value => {
      setExpoPushToken(value)
    })
  }, [])

  return (
    <View style={styles.mainViewStyle}>
      <Text style={styles.textStyle}>
        Access Token (AppContext): {appContext.accessToken}
      </Text>
      <Text style={styles.textStyle}>
        Refresh Token (AppContext): {appContext.refreshToken}
      </Text>
      <Text style={styles.textStyle}>
        Expo Push Token (AppContext): {appContext.expoPushToken}
      </Text>
      <Text style={styles.textStyle}>
        Access Token (AsyncStorage): {accessToken}
      </Text>
      <Text style={styles.textStyle}>
        Refresh Token (AsyncStorage): {refreshToken}
      </Text>
      <Text style={styles.textStyle}>
        Expo Push Token (AsyncStorage): {expoPushToken}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  },
  textStyle: {
    margin: 16
  }
})

export default DashboardScreen

DashboardScreen.navigationOptions = ({navigation}) => {
  return {
    headerTitle: 'VIRAL POOL',
    headerTitleAlign: 'center',
    headerLeft: () => <Menu navigation={navigation}/>,
    headerRight: () => <Logout navigation={navigation}/>
  }
}
