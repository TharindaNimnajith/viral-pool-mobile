import React from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import {formatNumber} from '../../../shared/util/helpers'
import {styles} from './dashboard-user-profile-styles'

const DashboardUserProfile = props => {
  const onProfilePress = async () => {
    props.navigation.navigate('Profile')
  }

  const onSocialMediaPress = async () => {
    props.navigation.navigate('SocialMedia')
  }

  return (
    <View style={styles.containerStyle}>
      <TouchableOpacity onPress={onProfilePress}>
        {
          props.profileImagePath ? (
            <Image style={styles.avatarStyle}
                   source={{
                     uri: props.profileImagePath
                   }}/>
          ) : (
            <Image style={styles.avatarStyle}
                   source={require('../../../assets/user/user.jpg')}/>
          )
        }
      </TouchableOpacity>
      <View style={styles.viewStyle}>
        <TouchableOpacity style={styles.textWrapperStyle}
                          onPress={onProfilePress}>
          <Text style={styles.usernameStyle}>
            {props.firstName} {props.lastName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialMediaIconStyle}
                          onPress={onSocialMediaPress}>
          <View style={styles.socialMediaIconViewStyle}>
            <Image source={require('../../../assets/icons/facebook.png')}/>
            <Text style={styles.socialMediaIconTextStyle}>
              {props.facebookCount}
            </Text>
          </View>
          <View style={styles.socialMediaIconViewStyle}>
            <Image source={require('../../../assets/icons/youtube.png')}/>
            <Text style={styles.socialMediaIconTextStyle}>
              {props.youtubeCount}
            </Text>
          </View>
          <View style={styles.socialMediaIconViewStyle}>
            <Image source={require('../../../assets/icons/instagram.png')}/>
            <Text style={styles.socialMediaIconTextStyle}>
              {props.instagramCount}
            </Text>
          </View>
          <View style={styles.socialMediaIconViewStyle}>
            <Image source={require('../../../assets/icons/tiktok.png')}/>
            <Text style={styles.socialMediaIconTextStyle}>
              {props.tiktokCount}
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.pointsStyle}>
          <View style={styles.socialMediaIconViewStyle}>
            <Text style={styles.valueStyle}>
              {formatNumber(props.points)}
            </Text>
            <Text style={styles.titleStyle}>
              VP Points
            </Text>
          </View>
          <Text style={styles.lineStyle}>
            |
          </Text>
          <View style={styles.socialMediaIconViewStyle}>
            <Text style={styles.valueStyle}>
              {formatNumber(props.rank)}
            </Text>
            <Text style={styles.titleStyle}>
              Rank
            </Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DashboardUserProfile
