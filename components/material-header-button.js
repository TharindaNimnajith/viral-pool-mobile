import React from 'react'
import {StyleSheet} from 'react-native'
import {HeaderButton} from 'react-navigation-header-buttons'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../util/colors'

const MaterialHeaderButton = props => {
  return (
    <HeaderButton {...props}
                  IconComponent={MaterialCommunityIcons}
                  iconSize={25}
                  buttonStyle={styles.buttonStyle}/>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
})

export default MaterialHeaderButton
