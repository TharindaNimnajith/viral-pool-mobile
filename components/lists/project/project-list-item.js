import React, {useState} from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {FontAwesome5} from '@expo/vector-icons'
import Colors from '../../../shared/const/colors'
import {socialMediaPlatformNameEnum} from '../../../shared/const/enums'
import {formatNumber} from '../../../shared/util/helpers'

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

const styles = StyleSheet.create({
  amountStyle: {
    color: Colors.primaryColor,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 50
  },
  arrowStyle: {
    flex: 0.08,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  contentProvidedStyle: {
    color: Colors.successColor,
    fontSize: 13,
    flex: 1,
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 2
  },
  contentRequiredStyle: {
    color: Colors.primaryColor,
    fontSize: 13,
    flex: 1,
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 2
  },
  contentStyle: {
    flex: 0.92
  },
  horizontalStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5
  },
  iconViewStyle: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  itemStyleDefault: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.tertiaryColor,
    marginVertical: 6,
    marginHorizontal: wp('4%'),
    paddingHorizontal: 10
  },
  itemStyleFacebook: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.facebookColor,
    marginVertical: 6,
    marginHorizontal: wp('4%'),
    paddingHorizontal: 10
  },
  itemStyleInstagram: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.instagramColor,
    marginVertical: 6,
    marginHorizontal: wp('4%'),
    paddingHorizontal: 10
  },
  itemStyleTiktok: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.defaultColor,
    marginVertical: 6,
    marginHorizontal: wp('4%'),
    paddingHorizontal: 10
  },
  itemStyleYoutube: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.primaryColor,
    marginVertical: 6,
    marginHorizontal: wp('4%'),
    paddingHorizontal: 10
  },
  titleStyle: {
    color: Colors.defaultColor,
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    textAlignVertical: 'center',
    marginLeft: 10
  }
})

export default ProjectListItem
