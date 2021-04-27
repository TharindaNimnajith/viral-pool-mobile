import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/colors'

const ProjectItem = props => {
  let project = {
    project: props.itemData.item,
    navigation: props.navigation,
    refresh: props.refreshFunction
  }

  return (
    <TouchableOpacity style={styles.itemStyle}
                      onPress={() => {
                        props.navigation.navigate('CompletedProjectDetails', {project})
                      }}>
      <View>
        <Text>
          {props.itemData.item.id}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 15,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    marginHorizontal: wp('4%'),
    marginVertical: hp('0.5%'),
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  }
})

export default ProjectItem
