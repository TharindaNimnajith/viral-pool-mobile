import React, {useState} from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {FontAwesome5} from '@expo/vector-icons'
import Colors from '../../../shared/const/colors'
import {socialMediaPlatformNameEnum} from '../../../shared/const/enums'
import {formatNumber} from '../../../shared/util/helpers'
import {styles} from './project-list-item-styles'

const ProjectListItem = props => {
  const project = {
    project: props.itemData.item.id,
    refresh: props.refreshFunction
  }

  const [type] = useState(props.itemData.item.socialMediaPlatformName)

  const redirectToDetailsScreen = async () => {
    props.navigation.navigate(props.screen, {project})
  }

  return (
    <TouchableOpacity onPress={redirectToDetailsScreen}
                      style={
                        type === socialMediaPlatformNameEnum.Youtube ? styles.itemStyleYoutube :
                          type === socialMediaPlatformNameEnum.Facebook ? styles.itemStyleFacebook :
                            type === socialMediaPlatformNameEnum.Instagram ? styles.itemStyleInstagram :
                              type === socialMediaPlatformNameEnum.Tiktok ? styles.itemStyleTiktok :
                                styles.itemStyleDefault
                      }>
      <View style={styles.horizontalStyle}>
        <View style={styles.contentStyle}>
          <View style={styles.horizontalStyle}>
            <View style={styles.iconViewStyle}>
              <Image style={styles.avatarStyle}
                     source={{
                       uri: props.itemData.item.organizationIconPath
                     }}/>
            </View>
            <Text style={styles.titleStyle}>
              {props.itemData.item.name}
            </Text>
          </View>
          <View style={styles.horizontalStyle}>
            <Text style={styles.amountStyle}>
              {formatNumber(props.itemData.item.amount)} LKR
            </Text>
            {
              props.itemData.item.isContentGivenByStrategyMember ? (
                <Text style={styles.contentProvidedStyle}>
                  Content Provided
                </Text>
              ) : (
                <Text style={styles.contentRequiredStyle}>
                  Content Required
                </Text>
              )
            }
          </View>
        </View>
        <View style={styles.arrowStyle}>
          <FontAwesome5 name='chevron-circle-right'
                        size={16}
                        color={Colors.primaryColor}/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProjectListItem
