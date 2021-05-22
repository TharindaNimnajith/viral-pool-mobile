import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {Ionicons} from '@expo/vector-icons'
import {launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync} from 'expo-image-picker'
import {FileSystemSessionType, FileSystemUploadType, uploadAsync} from 'expo-file-system'
import Dialog from 'react-native-dialog'
import {AppContext} from '../util/app-context'
import {ApiUrl} from '../util/api-url'
import Colors from '../util/colors'
import Constants from '../util/constants'
import {showAlert} from '../util/common-helpers'
import Menu from '../components/menu-button'
import CombinedButtons from '../components/combined-buttons'

const ProfileScreen = props => {
  const appContext = useContext(AppContext)

  const [image, setImage] = useState(appContext.userData.profileImagePath)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status
        } = await requestMediaLibraryPermissionsAsync().catch(async error => {
          await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
          console.log(error)
        })
        if (status !== 'granted')
          await showAlert(Constants.WARNING, Constants.CAMERA_PERMISSION)
      }
    })()
  }, [])

  const onRefresh = useCallback(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status
        } = await requestMediaLibraryPermissionsAsync().catch(async error => {
          await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
          console.log(error)
        })
        if (status !== 'granted')
          await showAlert(Constants.WARNING, Constants.CAMERA_PERMISSION)
      }
    })()
    setRefreshing(true)
    wait(2000).then(() => {
      setRefreshing(false)
    })
  }, [])

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const onEditButtonPress = async () => {
    props.navigation.navigate('EditProfile')
  }

  const pickImage = async () => {
    setVisible(false)
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: false
    }).catch(async error => {
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
    if (!result.cancelled) {
      setLoading(true)
      setImage(result.uri)
      const filename = result.uri.split('/').pop()
      const match = /\.(\w+)$/.exec(filename)
      const type = match ? `image/${match[1]}` : `image`
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${appContext.accessToken}`,
        'client_id': `${Constants.CLIENT_ID_VALUE}`
      }
      let firstName = ''
      if (appContext.userData.firstName !== null)
        firstName = appContext.userData.firstName
      let lastName = ''
      if (appContext.userData.lastName !== null)
        lastName = appContext.userData.lastName
      let address = ''
      if (appContext.userData.address !== null)
        address = appContext.userData.address
      let phoneNumber = ''
      if (appContext.userData.phoneNumber !== null)
        phoneNumber = appContext.userData.phoneNumber
      const parameters = {
        'id': appContext.userData.id,
        'email': appContext.userData.email,
        'userRole': Constants.USER_ROLE,
        'firstName': firstName,
        'lastName': lastName,
        'gender': appContext.userData.gender,
        'birthDate': appContext.userData.birthDate,
        'address': address,
        'phoneNumber': phoneNumber
      }
      const options = {
        headers: headers,
        httpMethod: 'PUT',
        sessionType: FileSystemSessionType.BACKGROUND,
        uploadType: FileSystemUploadType.MULTIPART,
        fieldName: 'FormFile',
        mimeType: type,
        parameters: parameters
      }
      await uploadAsync(`${ApiUrl.BASE_URL}User`, result.uri, options).then(async response => {
        setLoading(false)
        if (response.status === 200) {
          const data = JSON.parse(response.body).data
          await appContext.SetUserData(data)
          await showAlert(Constants.SUCCESS, Constants.UPDATED)
        } else {
          await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
        }
      }).catch(async error => {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
        console.log(error)
      })
    }
  }

  return (
    <SafeAreaView>
      <Dialog.Container visible={visible}>
        <Dialog.Title>
          EDIT PROFILE PICTURE
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={pickImage}/>
        <Dialog.Button label='No'
                       onPress={hideDialog}/>
      </Dialog.Container>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <View style={styles.mainViewStyle}>
          <View style={styles.headerStyle}>
            {
              image ? (
                <Image style={styles.avatarStyle}
                       source={{
                         uri: image
                       }}/>
              ) : (
                <Image style={styles.avatarStyle}
                       source={require('../assets/user.jpg')}/>
              )
            }
          </View>
          <View style={styles.bodyStyle}>
            <View style={styles.bodyContentStyle}>
              <TouchableOpacity style={styles.editPhotoStyle}
                                onPress={showDialog}>
                <Text style={styles.buttonTextStyle}>
                  Edit Profile Picture
                </Text>
              </TouchableOpacity>
              <Text style={styles.titleStyle}>
                {appContext.userData.firstName} {appContext.userData.lastName}
              </Text>
              <Text style={styles.subtitleStyle}>
                34 VP Points | 10th Ranked
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
                    appContext.userData.gender?.toUpperCase() === 'MALE' ? (
                      <Ionicons name='man'
                                size={20}/>
                    ) : appContext.userData.gender?.toUpperCase() === 'FEMALE' ? (
                      <Ionicons name='woman'
                                size={20}/>
                    ) : (
                      <Ionicons name='person'
                                size={20}/>
                    )
                  }
                  {
                    appContext.userData.gender &&
                    <Text style={styles.textStyle}>
                      {appContext.userData.gender.charAt(0).toUpperCase() + appContext.userData.gender.slice(1)}
                    </Text>
                  }
                </View>
                <View style={styles.viewStyle}>
                  <Ionicons name='calendar'
                            size={20}/>
                  <Text style={styles.textStyle}>
                    {appContext.userData.birthDate?.slice(0, 10)}
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
          {
            loading &&
            <View style={styles.loadingStyle}>
              <ActivityIndicator size='large'
                                 color={Colors.secondaryColor}/>
            </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  avatarStyle: {
    width: wp('50%'),
    height: wp('50%'),
    borderRadius: wp('25%'),
    borderWidth: 2,
    borderColor: Colors.secondaryColor,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: wp('20%')
  },
  bodyContentStyle: {
    alignItems: 'center'
  },
  bodyStyle: {
    marginTop: hp('8%')
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
  editPhotoStyle: {
    marginTop: 10,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 5
  },
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    height: wp('55%'),
    borderBottomRightRadius: wp('10%'),
    borderBottomLeftRadius: wp('10%')
  },
  loadingStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blurEffectColor
  },
  mainViewStyle: {
    width: wp('100%'),
    height: hp('93.6%'),
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
    color: Colors.tertiaryColor,
    textAlign: 'center',
    marginLeft: 10
  },
  titleStyle: {
    fontSize: 26,
    color: Colors.primaryColor,
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

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

ProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Profile',
    headerLeft: () => (
      <Menu navigation={navData.navigation}/>
    ),
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default ProfileScreen
