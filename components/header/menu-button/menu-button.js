import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'
import CustomHeaderButton from '../custom-header-button/custom-header-button'
import Colors from '../../../shared/const/colors'
import {styles} from './menu-button-styles'

const Menu = props => {
  const toggleDrawer = async () => {
    props.navigation.toggleDrawer()
  }

  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title='Menu'
            iconName='menu'
            iconSize={30}
            IconComponent={Ionicons}
            color={Colors.secondaryColor}
            buttonStyle={styles.iconStyle}
            onPress={toggleDrawer}/>
    </HeaderButtons>
  )
}

export default Menu
