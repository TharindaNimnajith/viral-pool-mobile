import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {formatNumber} from '../../../shared/util/helpers'
import {styles} from './dashboard-stats-styles'

const DashboardStats = props => {
  const onNewProjectsPress = async () => {
    props.navigation.navigate('NewProjectList')
  }

  const onOngoingProjectsPress = async () => {
    props.navigation.navigate('OngoingProjectList')
  }

  const onCompletedProjectsPress = async () => {
    props.navigation.navigate('CompletedProjectList')
  }

  return (
    <View style={styles.rowViewStyle}>
      <View>
        <TouchableOpacity style={styles.circleStyle}
                          onPress={onNewProjectsPress}>
          <Text style={styles.circleTextStyle}>
            {formatNumber(props.pendingProjectCount)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onNewProjectsPress}>
          <Text style={styles.circleTitleStyle}>
            Job{'\n'}Pool
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.circleStyle}
                          onPress={onOngoingProjectsPress}>
          <Text style={styles.circleTextStyle}>
            {formatNumber(props.ongoingProjectCount)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onOngoingProjectsPress}>
          <Text style={styles.circleTitleStyle}>
            Ongoing{'\n'}Jobs
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.circleStyle}
                          onPress={onCompletedProjectsPress}>
          <Text style={styles.circleTextStyle}>
            {formatNumber(props.completedProjectCount)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCompletedProjectsPress}>
          <Text style={styles.circleTitleStyle}>
            Completed{'\n'}Jobs
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DashboardStats
