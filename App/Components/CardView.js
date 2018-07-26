import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './Styles/CardViewStyles'
import { Colors } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class CardView extends Component {
    static propTypes = {
        userName: PropTypes.string,
        status: PropTypes.string,
        time: PropTypes.string,
        onPress: PropTypes.func,
    }

    getColorFromStatus(status){
        switch(status) {
            case "Confirm":
                return Colors.confirmColor
            case "Checked In":
                return Colors.checkedInColor
            case "UnChecked In":
                return Colors.unCheckedInColor
            default:
                return "#bffeee"
        }
    }

  render () {
      let cardViewComponent = null
      const { userName, status, time, onPress } = this.props
      return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.7}>
            <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
              <View style={[styles.cardViewLeftBorder, {backgroundColor: this.getColorFromStatus(status)}]}></View>
              <View style={{alignItems: 'flex-start', marginLeft: 15, marginTop: 12}}>
                <Text style={[styles.cardTitle, styles.textFont]}>{userName}</Text>
                <Text style={[styles.cardSubtitle, styles.textFont]}>{time}</Text>
              </View>
            </View>
            <View style={{marginRight: 12, marginTop: 16, justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={[styles.circle, {backgroundColor: this.getColorFromStatus(status)}]}/>
                <Text style={[styles.cardStatus, styles.textFont, {color: this.getColorFromStatus(status)}]}>{status.toUpperCase()}</Text>
              </View>    
              <View style={{flexDirection: 'row',justifyContent: 'flex-start', alignItems: 'center', marginBottom: 10}}>
                <Text style={[styles.signButton, styles.textFont]}> Signature </Text>
                <Icon name="angle-right" size={18} color={Colors.themeColor} style={{marginBottom: 4}}/>
              </View>          
            </View>
          </TouchableOpacity>
      )

    return cardViewComponent
  }
}
