import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'
import CustomHeaderButton from './custom-header-button'
import Colors from '../util/colors'

const Menu = props => {
  const toggleDrawer = async () => {
    props.navigation.toggleDrawer()
  }

  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title='Menu'
            iconName='menu'
            IconComponent={Ionicons}
            color={Colors.secondaryColor}
            onPress={toggleDrawer}/>
    </HeaderButtons>
  )
}

export default Menu
