import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Colors from "../../../shared/const/colors";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {formatNumber} from "../../../shared/util/helpers";


export const DashboardStats = props => {

    const onNewProjectsPress = async () => {
        props.navigation.navigate('NewProjectList')
    }

    const onOngoingProjectsPress = async () => {
        props.navigation.navigate('OngoingProjectList')
    }

    const onCompletedProjectsPress = async () => {
        props.navigation.navigate('CompletedProjectList')
    }


    return (
        <View style={styles.rowViewStyle}>


            <View style={styles.circleViewStyle}>
                <TouchableOpacity style={styles.circleStyle}
                                  onPress={onNewProjectsPress}>
                    <Text style={styles.circleTextStyle}>
                        {formatNumber(props.pendingProjectCount)}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onNewProjectsPress}>
                    <Text style={styles.circleTitleStyle}>
                        Job{'\n'}Pool
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.circleViewStyle}>
                <TouchableOpacity style={styles.circleStyle}
                                  onPress={onOngoingProjectsPress}>
                    <Text style={styles.circleTextStyle}>
                        {formatNumber(props.ongoingProjectCount)}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onOngoingProjectsPress}>
                    <Text style={styles.circleTitleStyle}>
                        Ongoing{'\n'}Jobs
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.circleViewStyle}>
                <TouchableOpacity style={styles.circleStyle}
                                  onPress={onCompletedProjectsPress}>
                    <Text style={styles.circleTextStyle}>
                        {formatNumber(props.completedProjectCount)}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onCompletedProjectsPress}>
                    <Text style={styles.circleTitleStyle}>
                        Completed{'\n'}Jobs
                    </Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

export const styles = StyleSheet.create({

    circleStyle: {
        // backgroundColor: Colors.primaryColor,
        borderColor: Colors.primaryColor,
        borderWidth: 3,
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
        color: Colors.defaultColor,
        // marginTop: 3
    },
    rowViewStyle: {
        paddingRight: 50,
        paddingLeft: 50,
        marginTop: hp('2.5%'),
        justifyContent: 'space-between',
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },

    // END
})

