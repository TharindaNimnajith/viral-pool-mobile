import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {AppContext} from '../../global/app-context'
import Menu from '../../components/menu'
import Logout from '../../components/logout'
import Colors from '../../shared/colors'
import {getObjectData} from '../../helpers/local-storage'
import {Util} from '../../util/util'

const ProfileScreen = () => {
  const appContext = useContext(AppContext)

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    getObjectData(Util.USER_DATA).then(value => {
      setUserData(value)
    })
  }, [])

  // noinspection JSUnresolvedVariable
  return (
    <View style={styles.mainViewStyle}>
      {
        userData ? (
          <View>
            <Text style={styles.textStyle}>
              User Data (AppContext):
              {'\n'}{'\n'}
              {appContext.userData.id}
              {'\n'}
              {appContext.userData.firstName}
              {'\n'}
              {appContext.userData.lastName}
              {'\n'}
              {appContext.userData.email}
              {'\n'}
              {appContext.userData.userRole}
              {'\n'}
              {appContext.userData.gender}
              {'\n'}
              {appContext.userData.birthDate}
              {'\n'}
              {appContext.userData.address}
              {'\n'}
              {appContext.userData.phoneNumber}
              {'\n'}
              {appContext.userData.profileImagePath}
              {'\n'}
            </Text>
            <Text style={styles.textStyle}>
              User Data (AsyncStorage):
              {'\n'}{'\n'}
              {userData.id}
              {'\n'}
              {userData.firstName}
              {'\n'}
              {userData.lastName}
              {'\n'}
              {userData.email}
              {'\n'}
              {userData.userRole}
              {'\n'}
              {userData.gender}
              {'\n'}
              {userData.birthDate}
              {'\n'}
              {userData.address}
              {'\n'}
              {userData.phoneNumber}
              {'\n'}
              {userData.profileImagePath}
              {'\n'}
            </Text>
          </View>
        ) : null
      }
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
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15
  }
})

ProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: 'MY PROFILE',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default ProfileScreen
