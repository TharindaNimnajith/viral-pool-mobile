import React, {useCallback, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'
import Dialog from 'react-native-dialog'
import HTML from 'react-native-render-html'
import {Entypo, Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import {jobAcceptationStatusEnum, socialMediaPlatformNameEnum} from '../../../shared/const/enums'
import Colors from '../../../shared/const/colors'
import Constants from '../../../shared/const/constants'
import {formatNumber, showAlert, showErrors} from '../../../shared/util/helpers'
import FileListItem from '../shared/file-list-item/file-list-item'
import JobCard from '../shared/job-card/job-card'
import {styles} from './project-details-styles'

const ProjectDetails = props => {
  const contentWidth = useWindowDimensions().width

  const project = props.project.navigation.getParam('project')

  const [name, setName] = useState('')
  const [description, setDescription] = useState(null)
  const [projectFileResponses, setProjectFileResponses] = useState([])
  const [createdDate, setCreatedDate] = useState('')
  const [createdUserFirstName, setCreatedUserFirstName] = useState('')
  const [createdUserLastName, setCreatedUserLastName] = useState('')
  const [socialMediaPlatformName, setSocialMediaPlatformName] = useState('')
  const [complexity, setComplexity] = useState(0)
  const [amount, setAmount] = useState(0)
  const [isContentGivenByStrategyMember, setIsContentGivenByStrategyMember] = useState(false)
  const [jobAcceptationStatus, setJobAcceptationStatus] = useState(jobAcceptationStatusEnum.Pending)
  const [contentCreatorSubmissionResponses, setContentCreatorSubmissionResponses] = useState([])
  const [loading, setLoading] = useState(false)
  const [visibleAccept, setVisibleAccept] = useState(false)
  const [visibleReject, setVisibleReject] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    setRefresh(false)
    project.refresh()
    axios.get(`project-cc-strategy/${project.project}`).then(async response => {
      setLoading(false)
      if (response.status === 200) {
        setName(response.data.data.name)
        setDescription(response.data.data.description)
        setProjectFileResponses(response.data.data.projectFileResponses)
        setCreatedDate(response.data.data.createdDate)
        setCreatedUserFirstName(response.data.data.createdUser.firstName)
        setCreatedUserLastName(response.data.data.createdUser.lastName)
        setSocialMediaPlatformName(response.data.data.socialMediaPlatformName)
        setComplexity(response.data.data.complexity)
        setAmount(response.data.data.amount)
        setIsContentGivenByStrategyMember(response.data.data.isContentGivenByStrategyMember)
        setJobAcceptationStatus(response.data.data.jobAcceptationStatus)
        setContentCreatorSubmissionResponses(response.data.data.contentCreatorSubmissionResponses)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [refresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    axios.get(`project-cc-strategy/${project.project}`).then(async response => {
      if (response.status === 200) {
        setName(response.data.data.name)
        setDescription(response.data.data.description)
        setProjectFileResponses(response.data.data.projectFileResponses)
        setCreatedDate(response.data.data.createdDate)
        setCreatedUserFirstName(response.data.data.createdUser.firstName)
        setCreatedUserLastName(response.data.data.createdUser.lastName)
        setSocialMediaPlatformName(response.data.data.socialMediaPlatformName)
        setComplexity(response.data.data.complexity)
        setAmount(response.data.data.amount)
        setIsContentGivenByStrategyMember(response.data.data.isContentGivenByStrategyMember)
        setJobAcceptationStatus(response.data.data.jobAcceptationStatus)
        setContentCreatorSubmissionResponses(response.data.data.contentCreatorSubmissionResponses)
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

  const showDialogAccept = async () => {
    setVisibleAccept(true)
  }

  const hideDialogAccept = async () => {
    setVisibleAccept(false)
  }

  const showDialogReject = async () => {
    setVisibleReject(true)
  }

  const hideDialogReject = async () => {
    setVisibleReject(false)
  }

  const setLoadingTrue = async () => {
    setLoading(true)
  }

  const setLoadingFalse = async () => {
    setLoading(false)
  }

  const refreshFunction = async () => {
    setRefresh(true)
  }

  const acceptJob = async () => {
    setVisibleAccept(false)
    setLoading(true)
    let data = {
      strategyId: project.project
    }
    axios.put('project-cc-strategy/accept', data).then(async response => {
      project.refresh()
      setLoading(false)
      setRefresh(true)
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.ACCEPTED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const rejectJob = async () => {
    setVisibleReject(false)
    setLoading(true)
    let data = {
      strategyId: project.project
    }
    axios.put('project-cc-strategy/reject', data).then(async response => {
      project.refresh()
      setLoading(false)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.REJECTED)
        props.project.navigation.navigate('NewProjectList')
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  return (
    <SafeAreaView>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <Dialog.Container visible={visibleAccept}
                          onBackdropPress={hideDialogAccept}>
          <Dialog.Title>
            ACCEPT JOB
          </Dialog.Title>
          <Dialog.Description>
            {Constants.CONFIRMATION}
          </Dialog.Description>
          <Dialog.Button label='Yes'
                         color={Colors.primaryColor}
                         onPress={acceptJob}/>
          <Dialog.Button label='No'
                         color={Colors.primaryColor}
                         onPress={hideDialogAccept}/>
        </Dialog.Container>
        <Dialog.Container visible={visibleReject}
                          onBackdropPress={hideDialogReject}>
          <Dialog.Title>
            REJECT JOB
          </Dialog.Title>
          <Dialog.Description>
            {Constants.CONFIRMATION}
          </Dialog.Description>
          <Dialog.Button label='Yes'
                         color={Colors.primaryColor}
                         onPress={rejectJob}/>
          <Dialog.Button label='No'
                         color={Colors.primaryColor}
                         onPress={hideDialogReject}/>
        </Dialog.Container>
        <View style={styles.mainViewStyle}>
          <View style={styles.viewStyle}>
            <Text style={styles.projectNameStyle}>
              {name}
            </Text>
            <Text style={styles.creatorStyle}>
              Created by {createdUserFirstName} {createdUserLastName}
            </Text>
            <View style={styles.rewardsViewStyle}>
              <View style={styles.horizontalStyle}>
                <Text style={styles.amountStyle}>
                  {formatNumber(amount)} LKR
                </Text>
                <View style={styles.pointsStyle}>
                  <View style={styles.horizontalStyle}>
                    <View style={styles.pointsIconStyle}>
                      <Ionicons name='star'
                                size={17}
                                color={Colors.primaryColor}/>
                    </View>
                    <Text style={styles.pointsTextStyle}>
                      {formatNumber(complexity)} Points
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.horizontalStyle}>
              <View style={styles.socialMediaIconStyle}>
                {
                  socialMediaPlatformName === socialMediaPlatformNameEnum.Youtube ? (
                      <Ionicons name='logo-youtube'
                                size={20}
                                color={Colors.primaryColor}/>
                    ) :
                    socialMediaPlatformName === socialMediaPlatformNameEnum.Facebook ? (
                      <Ionicons name='logo-facebook'
                                size={20}
                                color={Colors.facebookColor}/>
                    ) : socialMediaPlatformName === socialMediaPlatformNameEnum.Instagram ? (
                      <Ionicons name='logo-instagram'
                                size={20}
                                color={Colors.instagramColor}/>
                    ) : socialMediaPlatformName === socialMediaPlatformNameEnum.Tiktok ? (
                      <Image style={styles.tiktokStyle}
                             source={require('../../../assets/icons/tiktok-logo.png')}/>
                    ) : null
                }
              </View>
              <View style={styles.contentStatusStyle}>
                {
                  isContentGivenByStrategyMember ? (
                    <Text style={styles.contentProvidedStyle}>
                      Content Provided
                    </Text>
                  ) : (
                    <Text style={styles.contentRequiredStyle}>
                      Content Required
                    </Text>
                  )
                }
              </View>
              <Text style={styles.dateStyle}>
                {createdDate.slice(0, 10)}
              </Text>
            </View>
          </View>
          {
            description &&
            <View style={styles.viewStyle}>
              <Text style={styles.titleStyle}>
                Strategy
              </Text>
              <HTML contentWidth={contentWidth}
                    source={{
                      html: description
                    }}/>
            </View>
          }
          {
            projectFileResponses.length > 0 &&
            <View style={styles.sampleViewStyle}>
              <Text style={styles.titleStyle}>
                Samples
              </Text>
              <View style={styles.fileStyle}>
                {
                  projectFileResponses.map((file, key) =>
                    <FileListItem key={key}
                                  itemData={file}
                                  setLoadingTrue={setLoadingTrue}
                                  setLoadingFalse={setLoadingFalse}/>
                  )
                }
              </View>
            </View>
          }
          {
            jobAcceptationStatus === jobAcceptationStatusEnum.Pending &&
            <View style={styles.centerViewStyle}>
              <View style={styles.horizontalStyle}>
                <TouchableOpacity style={styles.rejectButtonStyle}
                                  onPress={showDialogReject}>
                  <View style={styles.horizontalStyle}>
                    <Entypo name='cross'
                            size={19}
                            color={Colors.secondaryColor}/>
                    <Text style={styles.buttonTextStyle}>
                      Reject
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButtonStyle}
                                  onPress={showDialogAccept}>
                  <View style={styles.horizontalStyle}>
                    <Ionicons name='checkmark'
                              size={19}
                              color={Colors.secondaryColor}/>
                    <Text style={styles.buttonTextStyle}>
                      Accept
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          }
          {
            (jobAcceptationStatus === jobAcceptationStatusEnum.Accepted ||
              jobAcceptationStatus === jobAcceptationStatusEnum.Completed) &&
            contentCreatorSubmissionResponses.map((value, key) =>
              <JobCard key={key}
                       itemData={value}
                       setLoadingTrue={setLoadingTrue}
                       setLoadingFalse={setLoadingFalse}
                       refreshFunction={refreshFunction}
                       refresh={project.refresh}
                       strategyId={project.project}
                       isContentGivenByStrategyMember={isContentGivenByStrategyMember}/>
            )
          }
        </View>
        {
          loading &&
          <View style={styles.loadingStyle}>
            <ActivityIndicator size='large'
                               color={Colors.secondaryColor}/>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default ProjectDetails
