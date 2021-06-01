import React from 'react'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import Colors from '../../../shared/const/colors'
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
    <View style={[styles.container]}>
      <TouchableOpacity onPress={onProfilePress}>
        {
          props?.profileImagePath ? (
            <Image style={styles.avatarStyle}
                   source={{
                     uri: props?.profileImagePath
                   }}/>
          ) : (
            <Image style={styles.avatarStyle}
                   source={require('../../../assets/user/user.jpg')}/>
          )
        }
      </TouchableOpacity>
      <View style={{marginLeft: 5}}>
        <View style={styles.textWrapper}>
          <Text style={styles.userNameStyle}>
            {props?.firstName} {props?.lastName}
          </Text>
        </View>
        <View style={styles.socialMediaIcon}
              onPress={onSocialMediaPress}>
          <Text style={styles.socialMediaIconText}>
            <Image source={require('../../../assets/icons/facebook.png')}/>
            <Text style={styles.socialMediaIconText}> {props.facebookCount} </Text>
          </Text>
          <Text style={styles.socialMediaIconText}>
            <Image source={require('../../../assets/icons/youtube.png')}/>
            <Text style={styles.socialMediaIconText}> {props.youtubeCount} </Text>
          </Text>
          <Text style={styles.socialMediaIconText}>
            <Image source={require('../../../assets/icons/instagram.png')}/>
            <Text style={styles.socialMediaIconText}> {props.instagramCount} </Text>
          </Text>
          <Text style={styles.socialMediaIconText}>
            <Image source={require('../../../assets/icons/tiktok.png')}/>
            <Text style={styles.socialMediaIconText}> {props.tiktokCount} </Text>
          </Text>
        </View>
        <View style={styles.socialMediaIcon}>
          <Text style={styles.socialMediaIconText}>
            <Text style={{fontWeight: 'bold'}}>
              {formatNumber(props.points)}
            </Text>
            <Text style={{color: Colors.tertiaryColor}}> VP Points | </Text>
          </Text>
          <Text style={styles.socialMediaIconText}>
            <Text style={{
              fontWeight: 'bold'
            }}>
              {formatNumber(props.rank)}
            </Text>
            <Text style={{color: Colors.tertiaryColor}}> Rank </Text>
          </Text>
        </View>
      </View>
    </View>
  )
}

export default DashboardUserProfile
