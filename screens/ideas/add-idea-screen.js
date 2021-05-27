import React, {useCallback, useContext, useState} from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Dialog from 'react-native-dialog'
import axios from 'axios'
import {AppContext} from '../../shared/global/app-context'
import {showAlert} from '../../shared/util/helpers'
import Colors from '../../shared/const/colors'
import Constants from '../../shared/const/constants'
import CombinedButtons from '../../components/header/combined-buttons'

const AddIdeaScreen = props => {
  const appContext = useContext(AppContext)

  const idea = props.navigation.getParam('idea')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [titleValid, setTitleValid] = useState(false)
  const [descriptionValid, setDescriptionValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    idea.refresh()
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

  const onChangeTitle = async title => {
    setTitleValid(title.trim().length > 0)
    setTitle(title)
  }

  const onChangeDescription = async description => {
    setDescriptionValid(description.trim().length > 0)
    setDescription(description)
  }

  const reset = async () => {
    setTitle('')
    setDescription('')
  }

  function isDisabled() {
    return !titleValid || !descriptionValid
  }

  const addIdea = async () => {
    setVisible(false)
    setLoading(true)
    const data = {
      title: title.trim(),
      description: description.trim(),
      contentCreatorDetailId: appContext.userData.id
    }
    axios.post('cc-ideas', data).then(async response => {
      idea.refresh()
      setLoading(false)
      if (response.status === 200) {
        await reset()
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      idea.refresh()
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
          NEW IDEA
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={addIdea}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialog}/>
      </Dialog.Container>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <View style={styles.mainViewStyle}>
          <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>
              Title
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={title => onChangeTitle(title)}
                       value={title}
                       placeholder='Enter Title'
                       placeholderTextColor={Colors.tertiaryColor}/>
            <Text style={styles.labelStyle}>
              Description
            </Text>
            <TextInput style={styles.multilineTextInputStyle}
                       onChangeText={description => onChangeDescription(description)}
                       value={description}
                       placeholder='Enter Description'
                       placeholderTextColor={Colors.tertiaryColor}
                       multiline={true}
                       numberOfLines={30}/>
            <TouchableOpacity style={isDisabled() ? styles.buttonDisabledStyle : styles.buttonStyle}
                              disabled={isDisabled()}
                              onPress={showDialog}>
              <Text style={styles.buttonTextStyle}>
                Submit
              </Text>
            </TouchableOpacity>
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
  buttonStyle: {
    marginTop: hp('4%'),
    marginBottom: hp('1%'),
    backgroundColor: Colors.successColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonDisabledStyle: {
    marginTop: hp('4%'),
    marginBottom: hp('1%'),
    backgroundColor: Colors.tertiaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase'
  },
  containerStyle: {
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  labelStyle: {
    marginLeft: wp('10%'),
    marginTop: hp('3%'),
    color: Colors.primaryColor,
    alignSelf: 'baseline'
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
    minHeight: hp('93.6%')
  },
  multilineTextInputStyle: {
    textAlignVertical: 'top',
    borderColor: Colors.primaryColor,
    width: wp('80%'),
    height: hp('55%'),
    borderWidth: 1,
    borderRadius: 5,
    marginTop: hp('1.5%'),
    padding: 10,
    color: Colors.tertiaryColor
  },
  textInputStyle: {
    borderColor: Colors.primaryColor,
    width: wp('80%'),
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginTop: hp('1.5%'),
    padding: 10,
    color: Colors.tertiaryColor
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

AddIdeaScreen.navigationOptions = navData => {
  return {
    headerTitle: 'New Idea',
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default AddIdeaScreen
