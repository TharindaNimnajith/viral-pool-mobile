import {StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import Colors from "../../shared/const/colors";

export const styles = StyleSheet.create({
    dashboardStyle: {
        paddingHorizontal: 10
        // mawath add karapn kammaliy
    },

    container: {
        width: '100%',
        paddingRight: 15,
        paddingLeft: 15,
        marginRight: 'auto',
        marginLeft: 'auto',
        flexDirection: 'row',
        marginTop:20,
        marginBottom:20,
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
    betweenStyle: {
        marginLeft: 6
    },
    bodyStyle: {
        marginBottom: hp('0.5%'),
        marginHorizontal: wp('2%')
    },
    cardStyle: {
        backgroundColor: Colors.fadedEffectColor,
        borderRadius: hp('5%'),
        // paddingTop: hp('0.7%'),
        // paddingBottom: hp('1%'),
        // paddingHorizontal: wp('20%'),
        // marginVertical: hp('2%'),
        alignItems: 'center',
        alignSelf: 'center'
    },
    cardTextStyle: {
        // marginRight: 8,
        fontSize: 16,
        // bottom: 2
    },
    cardTitleStyle: {
        fontSize: 18,
        // marginLeft: 8
    },
    circleStyle: {
        backgroundColor: Colors.secondaryColor,
        width: wp('18%'),
        height: wp('18%'),
        borderRadius: wp('9%')
    },
    circleTextStyle: {
        flex: 1,
        textAlignVertical: 'center',
        alignSelf: 'center',
        color: Colors.primaryColor,
        fontSize: 30
    },
    circleTitleStyle: {
        textAlign: 'center',
        color: Colors.secondaryColor,
        // marginTop: 3
    },
    circleViewStyle: {
        // marginRight: wp('6%')
    },
    countStyle: {
        marginHorizontal: 6,
        color: Colors.secondaryColor,
        textAlignVertical: 'center'
    },
    earnedAmountStyle: {
        fontSize: 30,
        color: Colors.primaryColor
    },
    emptyListStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorMessageStyle: {
        color: Colors.tertiaryColor,
        fontSize: 18
    },
    headerStyle: {
        backgroundColor: Colors.primaryColor,
        borderBottomRightRadius: hp('6%'),
        borderBottomLeftRadius: hp('6%')
    },
    horizontalContentStyle: {
        flexDirection: 'row'
    },
    horizontalContentStyle1: {
        flexDirection: 'row',
        marginVertical: hp('0.5%')
    },
    horizontalContentStyle2: {
        flexDirection: 'row',
        marginBottom: hp('1%')
    },
    listStyle: {
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 5
    },
    loadingStyle: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.blurEffectColor
    },
    mainViewStyle: {
        backgroundColor: Colors.secondaryColor,
        minHeight: hp('93.6%')
    },
    pointsTitleStyle: {
        textTransform: 'uppercase',
        color: Colors.secondaryColor,
        fontSize: 20,
        marginLeft: 5,
        marginBottom: 2
    },
    pointsValueStyle: {
        color: Colors.secondaryColor,
        fontSize: 45
    },
    pointsViewStyle: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileStyle: {
        justifyContent: 'center'
    },
    rankCardStyle: {
        alignItems: 'center',
        backgroundColor: Colors.secondaryColor,
        borderRadius: 20,
        paddingHorizontal: 25,
        paddingVertical: 7,
        marginRight: wp('10%'),
        justifyContent: 'center'
    },
    rankTitleStyle: {
        textTransform: 'uppercase',
        color: Colors.primaryColor,
        fontSize: 18
    },
    rankValueStyle: {
        color: Colors.primaryColor,
        fontSize: 45
    },
    reloadMessageStyle: {
        color: Colors.primaryColor,
        fontSize: 16,
        marginTop: 10
    },
    rowViewStyle: {
        marginTop: hp('2.5%'),
        alignSelf: 'center'
    },
    sectionTitleStyle: {
        fontSize: 22,
        marginLeft: wp('4%'),
        marginTop: hp('1%'),
        marginBottom: hp('2%')
    },
    socialMediaStyle: {
        marginTop: 8,
        alignSelf: 'baseline'
    },
    tiktokCountStyle: {
        marginHorizontal: 3,
        color: Colors.secondaryColor,
        textAlignVertical: 'center'
    },
    titleStyle: {
        fontSize: 18,
        color: Colors.secondaryColor
    },
    viewStyle: {
        marginLeft: wp('6%'),
        marginTop: wp('4%')
    },
    unitStyle: {
        color: Colors.primaryColor,
        fontSize: 18,
        textAlignVertical: 'bottom',
        marginLeft: 10,
        marginBottom: 5
    }
})
