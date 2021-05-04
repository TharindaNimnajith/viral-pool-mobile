import React, {useContext, useEffect, useState} from 'react'
// noinspection ES6UnusedImports
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View
} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
// noinspection NpmUsedModulesInstalled
import {Ionicons} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import {FileSystemSessionType, FileSystemUploadType} from 'expo-file-system'
import Dialog from 'react-native-dialog'
// import RNFetchBlob from 'react-native-fetch-blob'
import {AppContext} from '../../../global/app-context'
import {storeObjectData} from '../../../helpers/local-storage-helpers'
import {ApiUrl} from '../../../util/api-url'
import {Const} from '../../../util/const'
import Colors from '../../../shared/colors'
import Constants from '../../../shared/constants'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'

const ProfileScreen = props => {
  // const RNFS = require('react-native-fs')

  // noinspection JSCheckFunctionSignatures
  const appContext = useContext(AppContext)

  // noinspection JSUnresolvedVariable
  const [image, setImage] = useState(appContext.userData.profileImagePath)

  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(false)

  const [visible, setVisible] = useState(false)

  // const [userData, setUserData] = useState(null)
  //
  // useEffect(() => {
  //   getObjectData(Const.USER_DATA).then(userData => {
  //     setUserData(userData)
  //   })
  // }, [])

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status
        } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted')
          alert(Constants.CAMERA_PERMISSION)
      }
    })()
  }, [])

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const showSuccessAlert = () => {
    Alert.alert(
      'SUCCESS',
      'Profile picture updated successfully!',
      [{
        text: 'OK'
      }]
    )
  }

  const onEditButtonPress = async () => {
    props.navigation.navigate('EditProfile')
  }

  // function dataURItoBlob(dataUri) {
  //   let byteString
  //   if (dataUri.split(',')[0].indexOf('base64') >= 0)
  //     byteString = atob(dataUri.split(',')[1])
  //   else
  //     byteString = unescape(dataUri.split(',')[1])
  //   let mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0]
  //   let ia = new Uint8Array(byteString.length)
  //   for (let i = 0; i < byteString.length; i++)
  //     ia[i] = byteString.charCodeAt(i)
  //   return new Blob([ia], {type: mimeString});
  // }
  //
  // function dataURLtoFile(dataUri, fileName) {
  //   let arr = dataUri.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length,
  //     u8arr = new Uint8Array(n)
  //   while (n--)
  //     u8arr[n] = bstr.charCodeAt(n)
  //   return new File([u8arr], fileName, {
  //     type: mime
  //   })
  // }
  //
  // function urlToFile(url, fileName, mimeType) {
  //   return (fetch(url).then(function (res) {
  //       return res.arrayBuffer()
  //     }).then(function (buf) {
  //       return new File([buf], fileName, {
  //         type: mimeType
  //       })
  //     })
  //   )
  // }

  const pickImage = async () => {
    setVisible(false)
    setError(false)
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
      base64: true,
      allowsMultipleSelection: false
    })
    if (!result.cancelled) {
      setLoading(false)
      setLoading(true)
      // noinspection JSUnresolvedVariable
      let localUri = result.uri
      setImage(localUri)
      // noinspection JSUnresolvedVariable
      let filename = localUri.split('/').pop()
      let match = /\.(\w+)$/.exec(filename)
      // noinspection JSUnusedLocalSymbols
      let type = match ? `image/${match[1]}` : `image`
      // noinspection JSUnresolvedVariable
      // let uriParts = localUri.split('.')
      // noinspection JSUnresolvedVariable
      // let fileType = localUri[localUri.length - 1]
      // let formData = new FormData()
      // noinspection JSUnresolvedVariable
      // formData.append('FormFile', {
      //   uri: localUri,
      //   name: `photo.${uriParts[1]}`,
      //   type: `image/${fileType}`,
      // })
      // formData.append('Id', appContext.userData.id)
      // formData.append('Email', appContext.userData.email)
      // formData.append('UserRole', 'Influencer')
      // formData.append('FirstName', appContext.userData.firstName)
      // formData.append('LastName', appContext.userData.lastName)
      // formData.append('Gender', appContext.userData.gender)
      // formData.append('BirthDate', appContext.userData.birthDate)
      // formData.append('Address', appContext.userData.address)
      // formData.append('PhoneNumber', appContext.userData.phoneNumber)
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${appContext.accessToken}`,
        'client_id': 'UFwv4s5sAHYyRS2q'
      }
      // let options = {
      //   method: 'PUT',
      //   body: formData
      //   headers: headers
      // }
      // noinspection JSUnresolvedVariable
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
            'userRole': 'Influencer',
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
          // noinspection JSUnresolvedVariable
          await appContext.SetUserData(data)
          // noinspection JSUnresolvedVariable
          await storeObjectData(Const.USER_DATA, data)
          setLoading(false)
          await showSuccessAlert()
        } else {
          setLoading(false)
          setError(true)
        }
      }).catch(async error => {
        setLoading(false)
        setError(true)
        console.log(error)
      })
      // const formData = new FormData()
      // formData.append('id', appContext.userData.id)
      // formData.append('email', appContext.userData.email)
      // noinspection JSUnresolvedVariable
      // formData.append('userRole', appContext.userData.userRole)
      // noinspection JSUnresolvedVariable
      // formData.append('profileImagePath', appContext.userData.profileImagePath)
      // noinspection JSUnresolvedVariable
      // RNFS.readFile(localUri, 'base64').then(data => {
      //   formData.append('formFile', {
      //     uri: localUri,
      //     name: filename, type
      //   })
      // })
      // RNFS.readFile(localUri, 'base64').then(data => {
      //   formData.append('formFile', {
      //     filename: filename,
      //     type: type,
      //     data: data
      //   })
      // })
      // noinspection JSUnresolvedVariable
      // formData.append('formFile', {
      //   uri: localUri,
      //   name: filename, type
      //   filename: filename,
      //   type: type,
      //   data: result.base64
      // })
      // noinspection JSUnresolvedVariable
      // formData.append('formFile', result.base64)
      // noinspection JSUnresolvedVariable
      // formData.append('firstName', appContext.userData.firstName)
      // noinspection JSUnresolvedVariable
      // formData.append('lastName', appContext.userData.lastName)
      // noinspection JSUnresolvedVariable
      // formData.append('gender', appContext.userData.gender)
      // noinspection JSUnresolvedVariable
      // formData.append('birthDate', appContext.userData.birthDate)
      // formData.append('address', appContext.userData.address)
      // noinspection JSUnresolvedVariable
      // formData.append('phoneNumber', appContext.userData.phoneNumber)
      // let data = {
      //   id: appContext.userData.id,
      //   email: appContext.userData.email,
      //   userRole: appContext.userData.userRole,
      //   profileImagePath: image,
      //   firstName: appContext.userData.firstName,
      //   lastName: appContext.userData.lastName,
      //   gender: appContext.userData.gender,
      //   birthDate: appContext.userData.birthDate,
      //   address: appContext.userData.address,
      //   phoneNumber: appContext.userData.phoneNumber
      // }
      // axios.put('User', formData).then(async response => {
      //   if (response.status === 200) {
      //     await appContext.SetUserData(response.data.data)
      //     await storeObjectData(Const.USER_DATA, response.data.data)
      //     setLoading(false)
      //     await showSuccessAlert()
      //   } else {
      //     setLoading(false)
      //     setError(true)
      //   }
      // }).catch(async error => {
      //   setLoading(false)
      //   setError(true)
      //   console.log(error)
      // })
      // noinspection JSUnresolvedVariable
      // RNFetchBlob.fetch('PUT', `${ApiUrl.BASE_URL}User`, {
      //   Authorization: `Bearer ${appContext.accessToken}`,
      //   client_id: 'UFwv4s5sAHYyRS2q',
      //   'Content-Type': 'multipart/form-data',
      // }, [{
      //   name: 'formFile',
      //   filename: filename,
      //   type: type,
      //   data: binaryDataInBase64
      // }, {
      //   name: 'id',
      //   data: appContext.userData.id
      // }, {
      //   name: 'email',
      //   data: appContext.userData.email
      // }, {
      //   name: 'userRole',
      //   data: appContext.userData.userRole
      // }, {
      //   name: 'firstName',
      //   data: appContext.userData.firstName
      // }, {
      //   name: 'lastName',
      //   data: appContext.userData.lastName
      // }, {
      //   name: 'gender',
      //   data: appContext.userData.gender
      // },{
      //   name: 'birthDate',
      //   data: appContext.userData.birthDate
      // }, {
      //   name: 'address',
      //   data: appContext.userData.address
      // }, {
      //   name: 'phoneNumber',
      //   data: appContext.userData.phoneNumber
      // }]).then(async response => {
      //   if (response.status === 200) {
      //     await appContext.SetUserData(response.data.data)
      //     await storeObjectData(Const.USER_DATA, response.data.data)
      //     setLoading(false)
      //     await showSuccessAlert()
      //   } else {
      //     setLoading(false)
      //     setError(true)
      //   }
      // }).catch(async error => {
      //   setLoading(false)
      //   setError(true)
      //   console.log(error)
      // })
    }
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
              {/*<Ionicons name='pencil-sharp'*/}
              {/*          size={20}*/}
              {/*          color={Colors.secondaryColor}/>*/}
              <Text style={styles.buttonTextStyle}>
                Edit Profile Picture
              </Text>
            </TouchableOpacity>
            {
              error ? (
                <View style={styles.viewStyle}>
                  <Text style={styles.errorTextStyle}>
                    {Constants.ERROR}
                  </Text>
                </View>
              ) : null
            }
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
                  appContext.userData.gender ? (
                    <Text style={styles.textStyle}>
                      {appContext.userData.gender.charAt(0).toUpperCase() + appContext.userData.gender.slice(1)}
                    </Text>
                  ) : null
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
          loading ? (
            <View style={styles.loadingStyle}>
              <ActivityIndicator size='large'
                                 color={Colors.secondaryColor}/>
            </View>
          ) : null
        }
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
    // flexDirection: 'row',
    backgroundColor: Colors.primaryColor,
    padding: 10,
    borderRadius: 5
  },
  errorTextStyle: {
    color: Colors.errorColor
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
    color: Colors.tertiaryColor,
    textAlign: 'center',
    marginLeft: 10
  },
  titleStyle: {
    fontSize: 22,
    color: Colors.primaryColor,
    // fontWeight: 'bold',
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
    headerTitle: 'My Profile',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default ProfileScreen
