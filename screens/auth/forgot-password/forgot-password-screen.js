import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, RefreshControl, SafeAreaView, ScrollView, View} from 'react-native'
import WebView from 'react-native-webview'
import {ApiUrl} from '../../../shared/util/helpers'
import Colors from '../../../shared/const/colors'
import {styles} from './forgot-password-screen-styles'

const ForgotPasswordScreen = () => {
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setLoading(true)
    wait(5000).then(() => {
      setLoading(false)
    })
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => {
      setRefreshing(false)
    })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView style={styles.refreshStyle}
                  refreshControl={
                    <RefreshControl refreshing={refreshing}
                                    onRefresh={onRefresh}/>
                  }>
        <View style={styles.mainViewStyle}>
          <WebView style={styles.webViewStyle}
                   source={{
                     uri: `${ApiUrl.ROOT_URL}Identity365/PasswordResetEmail`
                   }}/>
        </View>
        {
          loading &&
          <View style={styles.loadingStyle}>
            <ActivityIndicator size='large'
                               color={Colors.secondaryColor}/>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

ForgotPasswordScreen.navigationOptions = () => {
  return {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
}

export default ForgotPasswordScreen
