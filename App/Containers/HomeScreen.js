import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import { WhiteSpace } from 'antd-mobile-rn';

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  static navigationOptions = {
    title: 'Home Screen',
  };

  _switchToOther = async () => {
    this.props.navigation.navigate('Other')
  };

  _signOutAsync = async () => {
    //await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
           <WhiteSpace size="xl" />
           <WhiteSpace size="xl" />
           <WhiteSpace size="xl" />
          <TouchableOpacity style={styles.button} onPress={this._switchToOther}>
            <Text style={styles.buttonText}> Go to other Screen </Text>
          </TouchableOpacity>
           <WhiteSpace size="xl" />
           
          <TouchableOpacity style={styles.button} onPress={this._signOutAsync}>
            <Text style={styles.buttonText}> Sign Out </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    )
  }
}