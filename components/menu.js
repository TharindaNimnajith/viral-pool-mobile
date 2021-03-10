import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from './header-button'

const Menu = props => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu'
            iconName='menu'
            onPress={() => {
              props.navigation.toggleDrawer()
            }}/>
    </HeaderButtons>
  )
}

export default Menu
