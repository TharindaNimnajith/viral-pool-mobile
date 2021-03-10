import React from 'react'
import {HeaderButton} from 'react-navigation-header-buttons'
import {StyleSheet} from 'react-native'
import {Icon} from 'react-native-elements'
import Colors from './../shared/colors'

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton {...props}
                  IconComponent={Icon}
                  iconSize={25}
                  color={Colors.secondaryColor}
                  buttonStyle={styles.buttonStyle}/>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 10,
    marginLeft: 20
  }
})

export default CustomHeaderButton
