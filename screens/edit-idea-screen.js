import React, {useCallback, useContext, useEffect, useState} from 'react'
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
import {AppContext} from '../util/app-context'
import {isEmpty, showAlert} from '../util/common-helpers'
import Colors from '../util/colors'
import Constants from '../util/constants'
import CombinedButtons from '../components/combined-buttons'

const EditIdeaScreen = props => {
  const appContext = useContext(AppContext)

  const idea = props.navigation.getParam('idea')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [titleValid, setTitleValid] = useState(true)
  const [descriptionValid, setDescriptionValid] = useState(true)
  const [loading, setLoading] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setLoading(true)
    idea.refresh()
    axios.get(`cc-ideas/${idea.idea}`).then(async response => {
      setLoading(false)
      if (response.status === 200) {
        setTitle(response.data.data.title)
        setDescription(response.data.data.description)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    idea.refresh()
    axios.get(`cc-ideas/${idea.idea}`).then(async response => {
      if (response.status === 200) {
        setTitle(response.data.data.title)
        setDescription(response.data.data.description)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
    wait(2000).then(() => {
      setRefreshing(false)
    })
  }, [])

  const showDialogEdit = async () => {
    setVisibleEdit(true)
  }

  const hideDialogEdit = async () => {
    setVisibleEdit(false)
  }

  const showDialogDelete = async () => {
    setVisibleDelete(true)
  }

  const hideDialogDelete = async () => {
    setVisibleDelete(false)
  }

  const onChangeTitle = async title => {
    setTitleValid(!await isEmpty(title.trim()))
    setTitle(title)
  }

  const onChangeDescription = async description => {
    setDescriptionValid(!await isEmpty(description.trim()))
    setDescription(description)
  }

  function isDisabled() {
    return !titleValid || !descriptionValid
  }

  const editIdea = async () => {
    setVisibleEdit(false)
    setLoading(true)
    const data = {
      id: idea.idea,
      title: title.trim(),
      description: description.trim(),
      contentCreatorDetailId: appContext.userData.id
    }
    axios.put('cc-ideas', data).then(async response => {
      idea.refresh()
      setLoading(false)
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.UPDATED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      idea.refresh()
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const deleteIdea = async () => {
    setVisibleDelete(false)
    setLoading(true)
    axios.delete(`cc-ideas/${idea.idea}`).then(async response => {
      idea.refresh()
      setLoading(false)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.DELETED)
        props.navigation.navigate('IdeaList')
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
      <Dialog.Container visible={visibleEdit}>
        <Dialog.Title>
          EDIT IDEA
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={editIdea}/>
        <Dialog.Button label='No'
                       onPress={hideDialogEdit}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleDelete}>
        <Dialog.Title>
          DELETE IDEA
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={deleteIdea}/>
        <Dialog.Button label='No'
                       onPress={hideDialogDelete}/>
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
                              onPress={showDialogEdit}>
              <Text style={styles.buttonTextStyle}>
                Update
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButtonStyle}
                              onPress={showDialogDelete}>
              <Text style={styles.buttonTextStyle}>
                Delete
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
    marginTop: hp('5%'),
    backgroundColor: Colors.successColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonDisabledStyle: {
    marginTop: hp('5%'),
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
  deleteButtonStyle: {
    marginTop: hp('2%'),
    marginBottom: hp('4.5%'),
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
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
    backgroundColor: Colors.secondaryColor
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

EditIdeaScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Edit Idea',
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default EditIdeaScreen
