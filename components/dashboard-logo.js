import React from 'react'
import {Image, StyleSheet} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'

const DashboardLogo = () => {
  return (
    <Image source={require('../assets/dashboard-logo.png')}
           style={styles.logoStyle}/>
  )
}

const styles = StyleSheet.create({
  logoStyle: {
    position: 'absolute',
    marginTop: 4,
    justifyContent: 'center',
    marginLeft: wp('28%'),
    width: wp('40%'),
    height: wp('8.5%')
  }
})

export default DashboardLogo
