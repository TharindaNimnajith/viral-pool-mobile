import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {FontAwesome5, Ionicons} from '@expo/vector-icons'
import Colors from '../../shared/const/colors'

const YoutubeListItem = props => {
  return (
    <TouchableOpacity style={styles.itemStyle}>
      <View style={styles.mainViewStyle}>
        <View style={styles.iconViewStyle}>
          <Ionicons name='notifications'
                    size={30}
                    color={Colors.primaryColor}/>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>
            {/*{props.itemData.item.notification}*/}
          </Text>
          <Text style={styles.dateStyle}>
            {/*{props.itemData.item.createdDate.slice(0, 10)}*/}
          </Text>
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
  arrowStyle: {
    justifyContent: 'center',
    marginLeft: 10
  },
  dateStyle: {
    color: Colors.tertiaryColor,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginRight: 5
  },
  iconViewStyle: {
    width: wp('10.5%'),
    marginLeft: wp('3%'),
    marginBottom: 12,
    justifyContent: 'center'
  },
  itemStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
    height: 75,
    marginHorizontal: wp('4%'),
    marginVertical: 6,
    backgroundColor: Colors.secondaryColor,
    alignItems: 'flex-start',
    alignContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.primaryColor
  },
  mainViewStyle: {
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: 15,
    color: Colors.defaultColor
  },
  viewStyle: {
    width: wp('62%')
  }
})

export default YoutubeListItem
