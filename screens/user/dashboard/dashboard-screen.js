import React, {useContext, useEffect} from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import axios from 'axios'
import {AppContext} from '../../../global/app-context'
import Colors from '../../../shared/colors'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'
import {getStringData} from '../../../helpers/local-storage-helpers'
import {Util} from '../../../util/util'

const DashboardScreen = () => {
  // noinspection JSCheckFunctionSignatures
  const appContext = useContext(AppContext)

  useEffect(() => {
    getStringData(Util.EXPO_PUSH_TOKEN).then(expoPushToken => {
      let data = {
        contentCreatorId: appContext.userData.id,
        token: expoPushToken
      }
      axios.post('content-creator-notification/expo-token', data).catch(async error => {
        console.log(error)
      })
    })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <View style={styles.viewStyle}>
            <Text>
              Dashboard
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  },
  viewStyle: {
    alignItems: 'center',
    marginTop: 10
  }
})

DashboardScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Viral Pool',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default DashboardScreen
