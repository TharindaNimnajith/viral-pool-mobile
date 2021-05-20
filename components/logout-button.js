import React, {useState} from 'react'
import {View} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Ionicons} from '@expo/vector-icons'
import Dialog from 'react-native-dialog'
import Constants from '../util/constants'
import CustomHeaderButton from './custom-header-button'
import Colors from '../util/colors'

const Logout = props => {
  const [visible, setVisible] = useState(false)

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const handleLogout = async () => {
    props.navigation.navigate('Login')
  }

  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>
          LOGOUT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={handleLogout}/>
        <Dialog.Button label='No'
                       onPress={hideDialog}/>
      </Dialog.Container>
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Logout'
              iconName='log-out-outline'
              IconComponent={Ionicons}
              color={Colors.secondaryColor}
              onPress={showDialog}/>
      </HeaderButtons>
    </View>
  )
}

export default Logout