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
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import {FileSystemSessionType, FileSystemUploadType} from 'expo-file-system'
import Dialog from 'react-native-dialog'
import {AppContext} from '../../../global/app-context'
import {ApiUrl} from '../../../util/api-url'
import Colors from '../../../util/colors'
import Constants from '../../../util/constants'
import {showAlert} from '../../../util/common-helpers'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'

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
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted')
          showAlert(Constants.WARNING, Constants.CAMERA_PERMISSION)
      }
    })()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: false
    })
    if (!result.cancelled) {
      setLoading(true)
      let localUri = result.uri
      setImage(localUri)
      let filename = localUri.split('/').pop()
      let match = /\.(\w+)$/.exec(filename)
      let type = match ? `image/${match[1]}` : `image`
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${appContext.accessToken}`,
        'client_id': `${Constants.CLIENT_ID_VALUE}`
      }
      FileSystem.uploadAsync(
        `${ApiUrl.BASE_URL}User`,
        `${localUri}`,
        {
          headers: headers,
          httpMethod: 'PUT',
          sessionType: FileSystemSessionType.BACKGROUND,
          uploadType: FileSystemUploadType.MULTIPART,
          fieldName: 'FormFile',
          mimeType: type,
          parameters: {
            'id': appContext.userData.id,
            'email': appContext.userData.email,
            'userRole': Constants.USER_ROLE,
            'firstName': appContext.userData.firstName,
            'lastName': appContext.userData.lastName,
            'gender': appContext.userData.gender,
            'birthDate': appContext.userData.birthDate,
            'address': appContext.userData.address,
            'phoneNumber': appContext.userData.phoneNumber
          }
        }).then(async response => {
        if (response.status === 200) {
          const data = JSON.parse(response.body).data
          await appContext.SetUserData(data)
          setLoading(false)
          await showAlert(Constants.SUCCESS, Constants.UPDATED)
        } else {
          setLoading(false)
          await showAlert(Constants.ERROR, Constants.UNEXPECTED_ERROR)
        }
      }).catch(async error => {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.UNEXPECTED_ERROR)
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
                       source={require('../../../assets/user.jpg')}/>
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
    borderWidth: 3,
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
    fontSize: 22,
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
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default ProfileScreen
