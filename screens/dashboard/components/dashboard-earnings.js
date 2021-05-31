import React from 'react'
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import Colors from "../../../shared/const/colors";
import {heightPercentageToDP as hp} from "react-native-responsive-screen";
import {formatNumber} from "../../../shared/util/helpers";

export const DashboardEarnings = props => {


  const onCompletedProjectsPress = async () => {
    props.navigation.navigate('CompletedProjectList')
  }


  return (
    <View style={styles.rowViewStyle}>


      <TouchableOpacity style={styles.cardStyle}
                        onPress={onCompletedProjectsPress}>
        {/*<View>*/}

        {/*  <FontAwesome name='dollar'*/}
        {/*               size={20}*/}
        {/*               color={Colors.primaryColor}/>*/}

        {/*  <Text style={styles.cardTitleStyle}>*/}
        {/*    Total Earnings*/}
        {/*  </Text>*/}

        {/*</View>*/}

        {/*<View style={styles.horizontalContentStyle2}>*/}
        {/*  <Text style={styles.earnedAmountStyle}>*/}
        {/*    {formatNumber(props.totalEarnings)}*/}
        {/*  </Text>*/}
        {/*  <Text style={styles.unitStyle}>*/}
        {/*    LKR*/}
        {/*  </Text>*/}
        {/*</View>*/}

        {/*<View style={styles.horizontalContentStyle}>*/}
        {/*  <Text style={styles.cardTextStyle}>*/}
        {/*    View All*/}
        {/*  </Text>*/}
        {/*  <FontAwesome5 name='chevron-circle-right'*/}
        {/*                size={16}*/}
        {/*                color={Colors.primaryColor}/>*/}
        {/*</View>*/}

        <View style={styles.col}>
          <Text style={styles.iconText}>
            <Image source={require('../../../assets/icons/earning.png')}/>
            <Text style={styles.iconText}> Total Earnings </Text>
          </Text>
          <Text style={[styles.amountTextStyle, {color: Colors.primaryColor}]}>
            {formatNumber(props.totalEarnings)}<Text style={{fontSize: 20}}>/=</Text>
          </Text>

        </View>

        <View style={[styles.col, styles.verticalLine]}>
          <Text style={styles.iconText}>
            <Image source={require('../../../assets/icons/earning.png')}/>
            <Text style={styles.iconText}> Pending Earnings </Text>
          </Text>
          <Text style={[styles.amountTextStyle, {color: Colors.tertiaryColor}]}>
            {formatNumber(props.pendingEarnings)}<Text style={{fontSize: 20}}>/=</Text>
          </Text>
        </View>

      </TouchableOpacity>
    </View>
  )
}

export const styles = StyleSheet.create({


  cardTitleStyle: {
    fontSize: 18,
    // marginLeft: 8
  },

  verticalLine: {
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: Colors.primaryColor
  },

  col: {
    width: '50%',
  },

  iconText: {
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },

  rowViewStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingRight: 30,
    paddingLeft: 30,
    marginTop: hp('2.5%'),
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row'
  },
  earnedAmountStyle: {
    fontSize: 30,
    color: Colors.primaryColor
  },

  horizontalContentStyle2: {
    flexDirection: 'row',
    marginBottom: hp('1%')
  },

  cardStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    width: '100%',
    borderColor: Colors.primaryColor,
    borderWidth: 3,
    height: 130,
    borderRadius: hp('3%'),

  },
  amountTextStyle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  amountCurrencyTextStyle: {
    textAlign: 'right',
    fontSize: 20
  },

  // END
})

