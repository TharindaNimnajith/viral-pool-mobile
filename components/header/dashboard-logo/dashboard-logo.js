import React from 'react'
import {Image} from 'react-native'
import {styles} from './dashboard-logo-styles'

const DashboardLogo = () => {
  return (
    <Image source={require('../../../assets/logo/dashboard-logo.png')}
           style={styles.logoStyle}/>
  )
}

export default DashboardLogo
