import React from 'react'
import {HeaderButton} from 'react-navigation-header-buttons'
import {styles} from './custom-header-button-styles'

const CustomHeaderButton = props => {
  return (
    <HeaderButton {...props}
                  iconSize={25}
                  buttonStyle={styles.buttonStyle}/>
  )
}

export default CustomHeaderButton
