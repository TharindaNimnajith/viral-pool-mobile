import React, {useState} from 'react'
import {useWindowDimensions} from 'react-native'
import {SceneMap, TabView} from 'react-native-tab-view'
import {tabs} from '../../shared/util/helpers'
import CombinedButtons from '../../components/header/combined-buttons'
import PersonalDetailsRoute from '../../components/profile/personal-details-route'
import PaymentDetailsRoute from '../../components/profile/payment-details-route'

const renderScene = SceneMap({
  personalDetails: PersonalDetailsRoute,
  paymentDetails: PaymentDetailsRoute
})

const EditProfileScreen = () => {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState(tabs)

  return (
    <TabView navigationState={{index, routes}}
             renderScene={renderScene}
             onIndexChange={setIndex}
             initialLayout={{
               width: layout.width
             }}/>
  )
}

EditProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Edit Profile',
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default EditProfileScreen
