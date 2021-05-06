import React, {useContext, useState} from 'react'
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Dialog from 'react-native-dialog'
import axios from 'axios'
import {AppContext} from '../../../global/app-context'
import {isEmpty, showAlert} from '../../../util/common-helpers'
import Colors from '../../../util/colors'
import Constants from '../../../util/constants'
import CombinedButtons from '../../../components/buttons/combined-buttons'

const AddIdeaScreen = () => {
  const appContext = useContext(AppContext)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [titleValid, setTitleValid] = useState(false)
  const [descriptionValid, setDescriptionValid] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const onChangeTitle = async title => {
    setTitleValid(!await isEmpty(title.trim()))
    setError(false)
    setTitle(title)
  }

  const onChangeDescription = async description => {
    setDescriptionValid(!await isEmpty(description.trim()))
    setError(false)
    setDescription(description)
  }

  function isDisabled() {
    return !titleValid || !descriptionValid
  }

  const addIdea = async () => {
    setVisible(false)
    setLoading(false)
    setLoading(true)
    setError(false)
    let data = {
      title: title.trim(),
      description: description.trim(),
      userId: appContext.userData.id
    }
    axios.post('', data).then(async response => {
      if (response.status === 200) {
        setTitle('')
        setDescription('')
        setLoading(false)
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
      } else {
        setLoading(false)
        setError(true)
      }
    }).catch(async error => {
      setLoading(false)
      setError(true)
      console.log(error)
    })
  }

  return (
    <SafeAreaView>
      <Dialog.Container visible={visible}>
        <Dialog.Title>
          NEW IDEA
        </Dialog.Title>
        <Dialog.Description>
          Do you want to submit the new idea?
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={addIdea}/>
        <Dialog.Button label='No'
                       onPress={hideDialog}/>
      </Dialog.Container>
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
                     numberOfLines={17}/>
          <TouchableOpacity style={isDisabled() ? styles.buttonDisabledStyle : styles.buttonStyle}
                            disabled={isDisabled()}
                            onPress={showDialog}>
            <Text style={styles.buttonTextStyle}>
              Submit
            </Text>
          </TouchableOpacity>
          {
            error ? (
              <View style={styles.viewStyle}>
                <Text style={styles.errorTextStyle}>
                  {Constants.UNEXPECTED_ERROR}
                </Text>
              </View>
            ) : null
          }
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 30,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonDisabledStyle: {
    marginTop: 30,
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
    marginTop: hp('3%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  errorTextStyle: {
    color: Colors.errorColor
  },
  labelStyle: {
    marginLeft: 40,
    marginTop: 20,
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
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  },
  multilineTextInputStyle: {
    textAlignVertical: 'top',
    borderColor: Colors.primaryColor,
    width: wp('80%'),
    height: hp('32%'),
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    color: Colors.tertiaryColor
  },
  textInputStyle: {
    borderColor: Colors.primaryColor,
    width: wp('80%'),
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginTop: 10,
    padding: 10,
    color: Colors.tertiaryColor
  },
  viewStyle: {
    marginTop: 40
  }
})

AddIdeaScreen.navigationOptions = navData => {
  return {
    headerTitle: 'New Idea',
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default AddIdeaScreen
