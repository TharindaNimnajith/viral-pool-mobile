import React, {useCallback, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
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
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
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

const styles = StyleSheet.create({
  acceptButtonStyle: {
    marginTop: hp('3%'),
    marginHorizontal: 7,
    backgroundColor: Colors.successColor,
    alignItems: 'center',
    padding: 8,
    width: wp('40%'),
    borderRadius: 5
  },
  amountStyle: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontWeight: 'bold'
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase',
    marginLeft: 5,
    fontSize: 16
  },
  centerViewStyle: {
    alignItems: 'center',
    marginBottom: 30
  },
  contentProvidedStyle: {
    color: Colors.successColor,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2
  },
  contentRequiredStyle: {
    color: Colors.primaryColor,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2
  },
  contentStatusStyle: {
    width: '40%'
  },
  creatorStyle: {
    color: Colors.tertiaryColor,
    marginBottom: 12,
    fontSize: 16
  },
  dateStyle: {
    color: Colors.tertiaryColor,
    fontSize: 14,
    width: '30%',
    textAlign: 'right',
    marginTop: 2
  },
  fileStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  horizontalStyle: {
    flexDirection: 'row'
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
  pointsIconStyle: {
    justifyContent: 'center'
  },
  pointsStyle: {
    flex: 1,
    alignItems: 'flex-end'
  },
  pointsTextStyle: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginLeft: 3
  },
  projectNameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  rejectButtonStyle: {
    marginTop: hp('3%'),
    marginHorizontal: 7,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 8,
    width: wp('40%'),
    borderRadius: 5
  },
  rewardsViewStyle: {
    marginBottom: 16
  },
  sampleViewStyle: {
    marginHorizontal: wp('6%'),
    marginTop: hp('2.5%'),
    marginBottom: hp('1.5%'),
    backgroundColor: Colors.fadedEffectColor,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  socialMediaIconStyle: {
    width: '30%'
  },
  tiktokStyle: {
    width: wp('7%'),
    height: wp('7%'),
    marginLeft: -wp('0.5%'),
    marginBottom: -5
  },
  titleStyle: {
    color: Colors.primaryColor,
    fontSize: 18
  },
  viewStyle: {
    marginHorizontal: wp('6%'),
    marginTop: hp('2.5%'),
    marginBottom: hp('0.5%'),
    backgroundColor: Colors.fadedEffectColor,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default ProjectDetails
