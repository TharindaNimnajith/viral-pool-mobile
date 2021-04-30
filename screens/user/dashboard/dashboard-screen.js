import React, {useContext, useEffect} from 'react'
// noinspection ES6UnusedImports
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
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

  // noinspection JSUnresolvedVariable
  return (
    <SafeAreaView>
      {/*<ScrollView>*/}
      <View style={styles.mainViewStyle}>
        <View style={styles.headerStyle}>
          <View style={styles.viewStyle}>
            <Image style={styles.avatarStyle}
                   source={{
                     uri: appContext.userData.profileImagePath
                   }}/>
            <Text style={styles.titleStyle}>
              {appContext.userData.firstName} {appContext.userData.lastName}
            </Text>
          </View>
        </View>
        <View style={styles.bodyStyle}>
        </View>
      </View>
      {/*</ScrollView>*/}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  avatarStyle: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
    borderWidth: 3,
    borderColor: Colors.secondaryColor,
    position: 'absolute',
    marginTop: wp('5%'),
    marginLeft: wp('10%')
  },
  bodyStyle: {
    marginTop: wp('5%'),
    flex: 1,
    backgroundColor: Colors.tertiaryColor
  },
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  },
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    height: wp('43%'),
    borderBottomRightRadius: wp('20%'),
    borderBottomLeftRadius: wp('10%')
  },
  titleStyle: {
    fontSize: 22,
    color: Colors.secondaryColor,
    // fontWeight: 'bold',
    marginTop: wp('17%'),
    marginLeft: wp('45%'),
    marginRight: wp('5%')
  },
  viewStyle: {
    flexDirection: 'row'
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
