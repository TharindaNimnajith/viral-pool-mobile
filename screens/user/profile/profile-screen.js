import React, {useContext, useEffect, useState} from 'react'
// noinspection ES6UnusedImports
import {Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
// noinspection NpmUsedModulesInstalled
import {Ionicons} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import Dialog from 'react-native-dialog'
import {AppContext} from '../../../global/app-context'
import Menu from '../../../components/buttons/menu-button'
import Logout from '../../../components/buttons/logout-button'
import Colors from '../../../shared/colors'

const ProfileScreen = props => {
  const appContext = useContext(AppContext)

  const [image, setImage] = useState(appContext.userData.profileImagePath)

  const [visible, setVisible] = useState(false)

  // const [userData, setUserData] = useState(null)
  //
  // useEffect(() => {
  //   getObjectData(Util.USER_DATA).then(value => {
  //     setUserData(value)
  //   })
  // }, [])

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted')
          alert('Sorry, we need camera roll permissions to make this work!')
      }
    })()
  }, [])

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.cancelled)
      // noinspection JSUnresolvedVariable
      setImage(result.uri)
  }

  const onEditButtonPress = async () => {
    props.navigation.navigate('EditProfile')
  }

  // noinspection JSUnresolvedVariable
  return (
    <SafeAreaView>
      {/*<ScrollView>*/}
      <Dialog.Container visible={visible}>
        <Dialog.Title>
          EDIT PROFILE PICTURE
        </Dialog.Title>
        <Dialog.Description>
          Do you want to update the profile picture?
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={pickImage}/>
        <Dialog.Button label='No'
                       onPress={hideDialog}/>
      </Dialog.Container>
      <View style={styles.mainViewStyle}>
        <View style={styles.headerStyle}/>
        {
          image && (
            <Image style={styles.avatarStyle}
                   onPress={showDialog}
                   source={{
                     uri: image
                   }}/>
          )
        }
        <View style={styles.bodyStyle}>
          <View style={styles.bodyContentStyle}>
            <Text style={styles.titleStyle}>
              {appContext.userData.firstName} {appContext.userData.lastName}
            </Text>
            <Text style={styles.subtitleStyle}>
              {appContext.userData.userRole}
            </Text>
            <View>
              <View style={styles.viewStyle}>
                <Ionicons name='mail'
                          size={20}/>
                <Text style={styles.textStyle}>
                  {appContext.userData.email}
                </Text>
              </View>
              <View style={styles.viewStyle}>
                {
                  appContext.userData.gender.toUpperCase() === 'MALE' ? (
                    <Ionicons name='man'
                              size={20}/>
                  ) : appContext.userData.gender.toUpperCase() === 'FEMALE' ? (
                    <Ionicons name='woman'
                              size={20}/>
                  ) : (
                    <Ionicons name='person'
                              size={20}/>
                  )
                }
                <Text style={styles.textStyle}>
                  {appContext.userData.gender.charAt(0).toUpperCase() + appContext.userData.gender.slice(1)}
                </Text>
              </View>
              <View style={styles.viewStyle}>
                <Ionicons name='calendar'
                          size={20}/>
                <Text style={styles.textStyle}>
                  {appContext.userData.birthDate.slice(0, 10)}
                </Text>
              </View>
              <View style={styles.viewStyle}>
                <Ionicons name='location'
                          size={20}/>
                <Text style={styles.textStyle}>
                  {appContext.userData.address}
                </Text>
              </View>
              <View style={styles.viewStyle}>
                <Ionicons name='call'
                          size={20}/>
                <Text style={styles.textStyle}>
                  {appContext.userData.phoneNumber}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.buttonStyle}
                              onPress={onEditButtonPress}>
              <Text style={styles.buttonTextStyle}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*</ScrollView>*/}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  avatarStyle: {
    width: wp('50%'),
    height: wp('50%'),
    borderRadius: wp('25%'),
    borderWidth: 3,
    borderColor: Colors.secondaryColor,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: wp('25%'),
  },
  bodyContentStyle: {
    alignItems: 'center'
  },
  bodyStyle: {
    marginTop: wp('25%'),
    flex: 1
  },
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
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    height: wp('50%')
  },
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  },
  subtitleStyle: {
    fontSize: 16,
    color: Colors.primaryColor,
    marginTop: 10,
    marginBottom: 30
  },
  textStyle: {
    fontSize: 16,
    color: Colors.disabledColor,
    textAlign: 'center',
    marginLeft: 10
  },
  titleStyle: {
    fontSize: 22,
    color: Colors.primaryColor,
    fontWeight: '600',
    marginTop: 30,
    marginBottom: 10
  },
  viewStyle: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
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
