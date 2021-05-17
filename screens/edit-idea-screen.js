import React, {useCallback, useState} from 'react'
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
import {isEmpty, showAlert} from '../util/common-helpers'
import Colors from '../util/colors'
import Constants from '../util/constants'
import CombinedButtons from '../components/combined-buttons'

const EditIdeaScreen = props => {
  const idea = props.navigation.getParam('idea')

  const [title, setTitle] = useState(idea.idea.title)
  const [description, setDescription] = useState(idea.idea.description)
  const [titleValid, setTitleValid] = useState(true)
  const [descriptionValid, setDescriptionValid] = useState(true)
  const [loading, setLoading] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
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
      id: idea.idea.id,
      title: title.trim(),
      description: description.trim(),
      contentCreatorDetailId: idea.idea.contentCreatorDetailId
    }
    axios.put('cc-ideas', data).then(async response => {
      if (response.status === 200) {
        setLoading(false)
        await showAlert(Constants.SUCCESS, Constants.UPDATED)
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const deleteIdea = async () => {
    setVisibleDelete(false)
    setLoading(true)
    const id = idea.idea.id
    axios.delete(`cc-ideas/${id}`).then(async response => {
      if (response.status === 200) {
        setLoading(false)
        await showAlert(Constants.SUCCESS, Constants.DELETED)
        props.navigation.navigate('IdeaList')
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
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
                       numberOfLines={17}/>
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
  deleteButtonStyle: {
    marginTop: 15,
    backgroundColor: Colors.errorColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
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
    height: hp('93.6%'),
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
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default EditIdeaScreen
