import React, { Component } from 'react'
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
    Image,
  } from 'react-native';

import { Images } from '../Themes'
import styles from './Styles/LaunchScreenStyles'

export default class SplashScreen extends Component {
    constructor() {
      super();
      this._bootstrapAsync();
    }
  
    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('userToken');
  
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      this.props.navigation.navigate(userToken ? 'App' : 'Auth');
    };
  
    // Render any loading content that you like here
    render() {
      return (
        <View style={styles.centerContainer}>
          <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
          <ActivityIndicator size="large" color="#fff"/>
          <StatusBar barStyle="default" />
        </View>
      );
    }
  }