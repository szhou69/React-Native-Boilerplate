import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity, TouchableWithoutFeedback, TextInput, Keyboard, AsyncStorage, Alert, } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'
import { Colors, Images } from '../Themes'
import { WhiteSpace } from 'antd-mobile-rn';
import LoginActions from '../Redux/LoginRedux'
import { connect } from 'react-redux'
import _ from 'lodash';

// Styles
import styles from './Styles/LaunchScreenStyles'

class SignInScreen extends Component {
  static navigationOptions = {
    headerMode: 'none',
  };
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.isAttempting = false
  }

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps) && nextProps.admin.token) {
      this.props.navigation.navigate('App');
      AsyncStorage.setItem('userToken', nextProps.admin.token);
    }
    if (!_.isEqual(this.props, nextProps) && nextProps.admin.error) {
      Alert.alert(
        'Alert',
        nextProps.admin.error,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    }
  }

  _signInAsync = async () => {
    const { email, password } = this.state;
    this.props.attemptLogin(email, password);
  };

  render() {
    const { email, password } = this.state
    const { fetching } = this.props
    return (
      <TouchableWithoutFeedback style={styles.mainContainer} onPress={() => Keyboard.dismiss()}>
        {/* <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' /> */}
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} colors={['#4c669f', '#3b5998', '#192f6a']}
          style={styles.keyboardAvoidingContainer}>
          <View style={styles.section} >
            <Image source={Images.logo} style={styles.logo} />
            <Text style={styles.titleText}>
              Smart CheckIn
              </Text>
          </View>
          <WhiteSpace size="xl" />
          <View style={styles.row}>
            <Icon name="user" size={20} color="#fff" />
            <TextInput
              style={styles.textInput}
              onChangeText={(email) => this.setState({ email })}
              placeholder="Email"
              keyboardType='email-address'
              placeholderTextColor="white"
              onSubmitEditing={() => this.refs.password.focus()}
            />
          </View>
          <WhiteSpace size="md" />
          <View style={styles.row}>
            <Icon name="lock" size={20} color="#fff" />
            <TextInput
              ref='password'
              style={styles.textInput}
              onChangeText={(password) => this.setState({ password })}
              secureTextEntry
              returnKeyType="go"
              placeholder="Password"
              onSubmitEditing={this._signInAsync}
              placeholderTextColor="white"
            />
          </View>
          <WhiteSpace size="xl" />
          <TouchableOpacity style={[styles.button, { backgroundColor: Colors.white, margin: 0 }]} onPress={this._signInAsync}>
            <Text style={styles.buttonText}> Log In </Text>
          </TouchableOpacity>
        </LinearGradient>
      </TouchableWithoutFeedback >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.admin.fetching,
    admin: state.admin
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (email, password) => dispatch(LoginActions.userRequest(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
