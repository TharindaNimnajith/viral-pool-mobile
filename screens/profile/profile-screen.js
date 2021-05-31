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
import axios from 'axios'
import {AppContext} from '../../shared/global/app-context'
import {ApiUrl, isNullAsync, showAlert} from '../../shared/util/helpers'
import Colors from '../../shared/const/colors'
import Constants from '../../shared/const/constants'
import Menu from '../../components/header/menu-button/menu-button'
import CombinedButtons from '../../components/header/combined-buttons/combined-buttons'
import {getStringData, storeStringData} from '../../shared/util/local-storage'

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

  const onResetPassword = async () => {
    props.navigation.navigate('ForgotPassword')
  }

  const pickImage = async () => {
    setVisible(false)
    const accessToken = await getStringData(Constants.ACCESS_TOKEN)
    const refreshToken = await getStringData(Constants.REFRESH_TOKEN)
    const data = {
      accessToken,
      refreshToken
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
                         source={require('../../assets/user/user.jpg')}/>
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
                                onPress={onResetPassword}>
                <Text style={styles.buttonTextStyle}>
                  Reset Password
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
    width: hp('22%'),
    height: hp('22%'),
    borderRadius: hp('11%'),
    borderWidth: 2,
    borderColor: Colors.secondaryColor,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: hp('16%')
  },
  bodyContentStyle: {
    alignItems: 'center'
  },
  bodyStyle: {
    marginTop: hp('11%'),
    marginBottom: hp('1%')
  },
  buttonStyle: {
    marginTop: hp('4.5%'),
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
    backgroundColor: Colors.secondaryColor,
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    top: hp('21%'),
    left: hp('32%')
  },
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    height: hp('28%'),
    borderBottomRightRadius: wp('10%'),
    borderBottomLeftRadius: wp('10%')
  },
  infoStyle: {
    marginTop: hp('4%')
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
    backgroundColor: Colors.secondaryColor,
    minHeight: hp('93.6%'),
    paddingBottom: 15
  },
  resetButtonStyle: {
    marginTop: hp('2%'),
    backgroundColor: Colors.defaultColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  textStyle: {
    fontSize: 18,
    color: Colors.defaultColor,
    textAlign: 'center',
    marginLeft: 15
  },
  titleStyle: {
    fontSize: 28,
    color: Colors.primaryColor,
    marginTop: hp('2%')
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
