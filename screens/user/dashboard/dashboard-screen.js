import React, {useContext, useEffect, useState} from 'react'
import {Button, Image, Platform, StyleSheet, View} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios'
import {AppContext} from '../../../global/app-context'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'
import {getStringData} from '../../../helpers/local-storage-helpers'
import {Util} from '../../../util/util'

const DashboardScreen = () => {
  const appContext = useContext(AppContext)

  const [image, setImage] = useState(null)

  useEffect(() => {
    getStringData(Util.EXPO_PUSH_TOKEN).then(value => {
      // noinspection JSUnusedLocalSymbols
      axios.post('content-creator-notification/expo-token', {
        contentCreatorId: appContext.userData.id,
        token: value
      }).then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    })
  }, [])


  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted')
          alert('Sorry, we need camera roll permissions to make this work!')
      }
    })()
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    console.log(result)

    if (!result.cancelled)
      // noinspection JSUnresolvedVariable
      setImage(result.uri)
  }

  return (
    <View style={styles.viewStyle}>
      <Button title='Pick an image from camera roll'
              onPress={pickImage}/>
      {
        image && (
          <Image style={styles.imageStyle}
                 source={{
                   uri: image
                 }}/>
        )
      }
    </View>
  )

// return (
//   <SafeAreaView>
//     <ScrollView>
//       <View style={styles.mainViewStyle}>
//         <View style={styles.viewStyle}>
//           <Text>
//             Dashboard
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   </SafeAreaView>
// )
}

const styles = StyleSheet.create({
  imageStyle: {
    width: 200,
    height: 200
  },
  // mainViewStyle: {
  //   width: wp('100%'),
  //   height: hp('100%'),
  //   backgroundColor: Colors.secondaryColor
  // },
  viewStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // alignItems: 'center',
    // marginTop: 10
  }
})

DashboardScreen.navigationOptions = navData => {
  return {
    headerTitle: 'VIRAL POOL',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default DashboardScreen
