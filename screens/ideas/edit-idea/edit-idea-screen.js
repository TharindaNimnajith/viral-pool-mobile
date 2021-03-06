import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import Dialog from 'react-native-dialog'
import {Entypo, Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import {AppContext} from '../../../shared/global/app-context'
import {showAlert, showErrors} from '../../../shared/util/helpers'
import Colors from '../../../shared/const/colors'
import Constants from '../../../shared/const/constants'
import NotificationButton from '../../../components/header/notification-button/notification-button'
import {styles} from './edit-idea-screen-styles'

const EditIdeaScreen = props => {
  const appContext = useContext(AppContext)

  const idea = props.navigation.getParam('idea')

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [comment, setComment] = useState(null)
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
        setComment(response.data.data.comment)
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
        setComment(response.data.data.comment)
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
    setTitleValid(title.trim().length > 0)
    setTitle(title)
  }

  const onChangeDescription = async description => {
    setDescriptionValid(description.trim().length > 0)
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
      contentCreatorDetailId: appContext.userData?.id
    }
    axios.put('cc-ideas', data).then(async response => {
      idea.refresh()
      setLoading(false)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.UPDATED)
        props.navigation.navigate('IdeaList')
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      idea.refresh()
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
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
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  return (
    <SafeAreaView>
      <Dialog.Container visible={visibleEdit}
                        onBackdropPress={hideDialogEdit}>
        <Dialog.Title>
          UPDATE IDEA
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={editIdea}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialogEdit}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleDelete}
                        onBackdropPress={hideDialogDelete}>
        <Dialog.Title>
          DELETE IDEA
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={deleteIdea}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
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
                       numberOfLines={25}/>
            {
              comment && (
                <View style={styles.commentViewStyle}>
                  <Text style={styles.commentLabelStyle}>
                    Comments
                  </Text>
                  <Text style={styles.commentStyle}>
                    {comment}
                  </Text>
                </View>
              )
            }
            <View style={styles.horizontalStyle}>
              <TouchableOpacity style={styles.deleteButtonStyle}
                                onPress={showDialogDelete}>
                <View style={styles.horizontalStyle}>
                  <Entypo name='cross'
                          size={19}
                          color={Colors.secondaryColor}/>
                  <Text style={styles.buttonTextStyle}>
                    Delete
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={isDisabled() ? styles.buttonDisabledStyle : styles.buttonStyle}
                                disabled={isDisabled()}
                                onPress={showDialogEdit}>
                <View style={styles.horizontalStyle}>
                  <Ionicons name='checkmark'
                            size={19}
                            color={Colors.secondaryColor}/>
                  <Text style={styles.buttonTextStyle}>
                    Update
                  </Text>
                </View>
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

EditIdeaScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Update Idea',
    headerRight: () => (
      <NotificationButton navigation={navData.navigation}/>
    )
  }
}

export default EditIdeaScreen
