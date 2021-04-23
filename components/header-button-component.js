import React from 'react'
import {HeaderButton} from 'react-navigation-header-buttons'
import {StyleSheet} from 'react-native'
// noinspection NpmUsedModulesInstalled
import {Ionicons} from '@expo/vector-icons'
import Colors from '../shared/colors'

const CustomHeaderButton = props => {
  return (
    <HeaderButton {...props}
                  IconComponent={Ionicons}
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
