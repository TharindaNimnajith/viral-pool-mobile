import React from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import Colors from '../../../shared/const/colors'
import {formatNumber} from '../../../shared/util/helpers'
import {styles} from './dashboard-earnings-styles'

const DashboardEarnings = props => {
  const onCompletedProjectsPress = async () => {
    props.navigation.navigate('CompletedProjectList')
  }

  return (
    <View style={styles.rowViewStyle}>
      <TouchableOpacity style={styles.cardStyle}
                        onPress={onCompletedProjectsPress}>
        <View style={styles.col}>
          <Text style={styles.iconText}>
            <Image source={require('../../../assets/icons/earning.png')}/>
            <Text style={styles.iconText}> Total Earnings </Text>
          </Text>
          <Text style={[
            styles.amountTextStyle,
            {color: Colors.primaryColor}
          ]}>
            {formatNumber(props.totalEarnings)}
            <Text style={{fontSize: 20}}>
              /=
            </Text>
          </Text>
        </View>
        <View style={[styles.col, styles.verticalLine]}>
          <Text style={styles.iconText}>
            <Image source={require('../../../assets/icons/earning.png')}/>
            <Text style={styles.iconText}> Pending Earnings </Text>
          </Text>
          <Text style={[
            styles.amountTextStyle,
            {color: Colors.tertiaryColor}
          ]}>
            {formatNumber(props.pendingEarnings)}
            <Text style={{fontSize: 20}}>
              /=
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default DashboardEarnings
