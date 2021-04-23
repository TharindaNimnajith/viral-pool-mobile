import React, {useContext} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {AppContext} from '../../global/app-context'
import Menu from '../../components/menu'
import Logout from '../../components/logout'
import Colors from '../../shared/colors'

const ProfileScreen = () => {
  const appContext = useContext(AppContext)

  // const [userData, setUserData] = useState(null)
  //
  // useEffect(() => {
  //   getObjectData(Util.USER_DATA).then(value => {
  //     setUserData(value)
  //   })
  // }, [])

  // noinspection JSUnresolvedVariable
  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.containerStyle}>
        <View style={styles.headerStyle}/>
        <Image style={styles.avatarStyle}
               source={{
                 uri: appContext.userData.profileImagePath
               }}/>
        <View style={styles.bodyStyle}>
          <View style={styles.bodyContentStyle}>
            <Text style={styles.titleStyle}>
              {appContext.userData.firstName} {appContext.userData.lastName}
            </Text>
            <Text style={styles.subtitleStyle}>
              {appContext.userData.userRole}
            </Text>
            <Text style={styles.textStyle}>
              {appContext.userData.email}
              {'\n'}
              {appContext.userData.gender}
              {'\n'}
              {appContext.userData.birthDate}
              {'\n'}
              {appContext.userData.address}
              {'\n'}
              {appContext.userData.phoneNumber}
            </Text>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarStyle: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: Colors.secondaryColor,
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130
  },
  bodyContentStyle: {
    flex: 1,
    alignItems: 'center',
    padding: 30
  },
  bodyStyle: {
    marginTop: 40
  },
  buttonStyle: {
    marginTop: 30,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5,
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase'
  },
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    height: 200
  },
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  },
  subtitleStyle: {
    fontSize: 16,
    color: Colors.primaryColor,
    marginTop: 10
  },
  textStyle: {
    fontSize: 16,
    color: Colors.disabledColor,
    marginTop: 10,
    textAlign: 'center'
  },
  titleStyle: {
    fontSize: 22,
    color: Colors.primaryColor,
    fontWeight: '600'
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
