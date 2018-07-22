import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { Images } from '../Themes'
import { WhiteSpace } from 'antd-mobile-rn';

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class SignInScreen extends Component {
  static navigationOptions = {
    headerMode: 'none',
  };
  constructor(props) {
    super(props);
    this.state = { text: "" };
  }

  _signInAsync = async () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  render () {
    return (
      <View style={styles.mainContainer}>
          <KeyboardAvoidingView style={styles.keyboardAvoidingContainer} behavior="padding" enabled>
            <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
            <View style={styles.section} >
              <Image source={Images.logo} style={styles.logo}/>
              <Text style={styles.titleText}>
                Smart CheckIn
              </Text>
            </View>
            <WhiteSpace size="xl" />
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => this.setState({text})}
                placeholder="Email"
                placeholderTextColor="white"
              />
              <WhiteSpace size="md" />
              <TextInput
                style={styles.textInput}
                onChangeText={(text) => this.setState({text})}
                secureTextEntry
                returnKeyType="go"
                placeholder="Password"
                placeholderTextColor="white"
              />
              <WhiteSpace size="xl" />
              <TouchableOpacity style={styles.button} onPress={this._signInAsync}>
                <Text style={styles.buttonText}> Log In </Text>
              </TouchableOpacity>
          </KeyboardAvoidingView>
      </View>
    )
  }
}
