import React from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
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
        <View style={styles.columnStyle}>
          <View style={styles.iconTextStyle}>
            <Image source={require('../../../assets/icons/earning.png')}/>
            <Text style={styles.iconTitleStyle}>
              Total Earnings
            </Text>
          </View>
          <Text style={[
            styles.amountTextStyle,
            styles.totalEarningsTextStyle
          ]}>
            {formatNumber(props.totalEarnings)}
            <Text style={styles.unitStyle}>
              /=
            </Text>
          </Text>
        </View>
        <View style={[
          styles.columnStyle,
          styles.verticalLineStyle
        ]}>
          <View style={styles.iconTextStyle}>
            <Image source={require('../../../assets/icons/earning.png')}/>
            <Text style={styles.iconTitleStyle}>
              Pending Earnings
            </Text>
          </View>
          <Text style={[
            styles.amountTextStyle,
            styles.pendingEarningsTextStyle
          ]}>
            {formatNumber(props.pendingEarnings)}
            <Text style={styles.unitStyle}>
              /=
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default DashboardEarnings
