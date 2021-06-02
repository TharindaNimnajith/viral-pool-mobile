import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {launchImageLibraryAsync, MediaTypeOptions, requestMediaLibraryPermissionsAsync} from 'expo-image-picker'
import {FileSystemSessionType, FileSystemUploadType, uploadAsync} from 'expo-file-system'
import Dialog from 'react-native-dialog'
import axios from 'axios'
import {AppContext} from '../../../shared/global/app-context'
import {ApiUrl, isNullAsync, showAlert} from '../../../shared/util/helpers'
import Colors from '../../../shared/const/colors'
import Constants from '../../../shared/const/constants'
import Menu from '../../../components/header/menu-button/menu-button'
import NotificationButton from '../../../components/header/notification-button/notification-button'
import {getStringData, storeStringData} from '../../../shared/util/local-storage'
import {styles} from './profile-screen-styles'

const ProfileScreen = props => {
  const appContext = useContext(AppContext)

  const [image, setImage] = useState(appContext.userData.profileImagePath)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [visibleLogout, setVisibleLogout] = useState(false)
  const [visibleResetPassword, setVisibleResetPassword] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status
        } = await requestMediaLibraryPermissionsAsync()
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
        } = await requestMediaLibraryPermissionsAsync()
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

  const showDialogLogout = async () => {
    setVisibleLogout(true)
  }

  const hideDialogLogout = async () => {
    setVisibleLogout(false)
  }

  const showDialogResetPassword = async () => {
    setVisibleResetPassword(true)
  }

  const hideDialogResetPassword = async () => {
    setVisibleResetPassword(false)
  }

  const onEditButtonPress = async () => {
    props.navigation.navigate('EditProfile')
  }

  const onResetPassword = async () => {
    props.navigation.navigate('ForgotPassword')
  }

  const onLogout = async () => {
    props.navigation.navigate('Login')
  }

  const pickImage = async () => {
    setVisible(false)
    const accessToken = await getStringData(Constants.ACCESS_TOKEN)
    const refreshToken = await getStringData(Constants.REFRESH_TOKEN)
    const data = {
      accessToken: accessToken,
      refreshToken: refreshToken
    }
    axios.post('oauth/refresh-token', data).then(async response => {
      await storeStringData(Constants.ACCESS_TOKEN, response.data.access_token)
      await storeStringData(Constants.REFRESH_TOKEN, response.data.refresh_token)
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
        const accessToken = await getStringData(Constants.ACCESS_TOKEN)
        const headers = {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          'Authorization': `${Constants.BEARER} ${accessToken}`,
          'client_id': `${Constants.CLIENT_ID_VALUE}`
        }
        let firstName = ''
        if (!await isNullAsync(appContext.userData?.firstName))
          firstName = appContext.userData?.firstName
        let lastName = ''
        if (!await isNullAsync(appContext.userData?.lastName))
          lastName = appContext.userData?.lastName
        let address = ''
        if (!await isNullAsync(appContext.userData?.address))
          address = appContext.userData?.address
        let phoneNumber = ''
        if (!await isNullAsync(appContext.userData?.phoneNumber))
          phoneNumber = appContext.userData?.phoneNumber
        let bankAccountName = ''
        if (!await isNullAsync(appContext.userData?.bankAccountName))
          bankAccountName = appContext.userData?.bankAccountName
        let bankAccountNumber = ''
        if (!await isNullAsync(appContext.userData?.bankAccountNumber))
          bankAccountNumber = appContext.userData?.bankAccountNumber
        let bankName = ''
        if (!await isNullAsync(appContext.userData?.bankName))
          bankName = appContext.userData?.bankName
        let branchName = ''
        if (!await isNullAsync(appContext.userData?.branchName))
          branchName = appContext.userData?.branchName
        const parameters = {
          'id': appContext.userData?.id,
          'email': appContext.userData?.email,
          'userRole': Constants.USER_ROLE,
          'firstName': firstName,
          'lastName': lastName,
          'gender': appContext.userData?.gender,
          'birthDate': appContext.userData?.birthDate,
          'address': address,
          'phoneNumber': phoneNumber,
          'bankAccountName': bankAccountName,
          'bankAccountNumber': bankAccountNumber,
          'bankName': bankName,
          'branchName': branchName
        }
        const options = {
          headers: headers,
          httpMethod: 'PUT',
          sessionType: FileSystemSessionType.BACKGROUND,
          uploadType: FileSystemUploadType.MULTIPART,
          fieldName: 'formFile',
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
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  return (
    <SafeAreaView>
      <Dialog.Container visible={visible}
                        onBackdropPress={hideDialog}>
        <Dialog.Title>
          UPDATE PROFILE PICTURE
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={pickImage}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialog}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleResetPassword}
                        onBackdropPress={hideDialogResetPassword}>
        <Dialog.Title>
          RESET PASSWORD
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={onResetPassword}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialogResetPassword}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleLogout}
                        onBackdropPress={hideDialogLogout}>
        <Dialog.Title>
          SIGN OUT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={onLogout}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialogLogout}/>
      </Dialog.Container>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <View style={styles.mainViewStyle}>
          <View style={styles.headerStyle}>
            {
              image ? (
                <View>
                  <Image style={styles.avatarStyle}
                         source={{
                           uri: image
                         }}/>
                  <TouchableOpacity style={styles.editPhotoStyle}
                                    onPress={showDialog}>
                    <Ionicons name='camera'
                              size={30}
                              color={Colors.primaryColor}/>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Image style={styles.avatarStyle}
                         source={require('../../../assets/user/user.jpg')}/>
                  <TouchableOpacity style={styles.editPhotoStyle}
                                    onPress={showDialog}>
                    <Ionicons name='camera'
                              size={30}
                              color={Colors.primaryColor}/>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
          <View style={styles.bodyStyle}>
            <View style={styles.bodyContentStyle}>
              <Text style={styles.titleStyle}>
                {appContext.userData?.firstName} {appContext.userData?.lastName}
              </Text>
              <View style={styles.infoStyle}>
                <View style={styles.viewStyle}>
                  <Ionicons name='mail'
                            size={20}
                            color={Colors.primaryColor}/>
                  <Text style={styles.textStyle}>
                    {appContext.userData?.email}
                  </Text>
                </View>
                <View style={styles.viewStyle}>
                  {
                    appContext.userData?.gender?.toLowerCase() === 'male' ? (
                      <Ionicons name='man'
                                size={20}
                                color={Colors.primaryColor}/>
                    ) : appContext.userData?.gender?.toLowerCase() === 'female' ? (
                      <Ionicons name='woman'
                                size={20}
                                color={Colors.primaryColor}/>
                    ) : (
                      <Ionicons name='person'
                                size={20}
                                color={Colors.primaryColor}/>
                    )
                  }
                  {
                    appContext.userData?.gender &&
                    <Text style={styles.textStyle}>
                      {appContext.userData?.gender.charAt(0).toUpperCase() + appContext.userData?.gender.slice(1)}
                    </Text>
                  }
                </View>
                <View style={styles.viewStyle}>
                  <Ionicons name='calendar'
                            size={20}
                            color={Colors.primaryColor}/>
                  <Text style={styles.textStyle}>
                    {appContext.userData?.birthDate?.slice(0, 10)}
                  </Text>
                </View>
                <View style={styles.viewStyle}>
                  <Ionicons name='location'
                            size={20}
                            color={Colors.primaryColor}/>
                  <Text style={styles.textStyle}>
                    {appContext.userData?.address}
                  </Text>
                </View>
                <View style={styles.viewStyle}>
                  <Ionicons name='call'
                            size={20}
                            color={Colors.primaryColor}/>
                  <Text style={styles.textStyle}>
                    {appContext.userData?.phoneNumber}
                  </Text>
                </View>
              </View>
              <TouchableOpacity style={styles.buttonStyle}
                                onPress={onEditButtonPress}>
                <Text style={styles.buttonTextStyle}>
                  Update Profile
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resetButtonStyle}
                                onPress={showDialogResetPassword}>
                <Text style={styles.buttonTextStyle}>
                  Reset Password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.resetButtonStyle}
                                onPress={showDialogLogout}>
                <Text style={styles.buttonTextStyle}>
                  Sign Out
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
      <NotificationButton navigation={navData.navigation}/>
    )
  }
}

export default ProfileScreen
