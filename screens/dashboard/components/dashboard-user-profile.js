import React from 'react'
import {
    Text,
    Image,
    TouchableOpacity,
    View, StyleSheet
} from 'react-native'
import Colors from "../../../shared/const/colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {formatNumber} from "../../../shared/util/helpers";


export const DashboardUserProfile = props => {

    const onProfilePress = async () => {
        props.navigation.navigate('Profile')
    }

    const onSocialMediaPress = async () => {
        props.navigation.navigate('SocialMedia')
    }

    return (
        <View style={[styles.container]}>

            <TouchableOpacity   onPress={onProfilePress}>
                {
                    props?.profileImagePath ? (
                        <Image style={styles.avatarStyle}
                               source={{
                                   uri: props?.profileImagePath
                               }}/>
                    ) : (
                        <Image style={styles.avatarStyle}
                               source={require('../../../assets/user.jpg')}/>
                    )
                }
            </TouchableOpacity>

            <View style={{marginLeft: 5}}>
                <View style={styles.textWrapper}>

                <Text style={styles.userNameStyle}>
                    {props?.firstName} {props?.lastName}
                </Text>
                </View>

                <View style={styles.socialMediaIcon}>
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
                        <Text style={{
                            fontWeight: 'bold'
                        }} >{formatNumber(props.points)}</Text><Text style={{color: Colors.tertiaryColor}}> VP Points   | </Text>
                    </Text>
                    <Text style={styles.socialMediaIconText}>
                        <Text style={{
                            fontWeight: 'bold'
                        }} >{formatNumber(props.rank)}</Text><Text style={{color: Colors.tertiaryColor}}> Rank </Text>
                    </Text>

                </View>
            </View>
        </View>
    )
}

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingRight: 15,
        paddingLeft: 15,
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        paddingTop:20,
        paddingBottom:20,
        backgroundColor: Colors.primaryColor,
        borderBottomRightRadius: hp('6%'),
        borderBottomLeftRadius: hp('6%')
    },

    textWrapper:{
        flexShrink: 1,maxWidth: 250
    },

    userNameStyle:{
        fontSize:23,
        color:Colors.secondaryColor
    },

    socialMediaIcon:{
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
    },
    socialMediaIconText: {
        color: Colors.secondaryColor,
        marginRight: 10
    },

    avatarStyle: {
        width: wp('25%'),
        height: wp('25%'),
        borderRadius: wp('100%'),
        borderWidth: 1,
        borderColor: Colors.secondaryColor
    },
    // END
})

