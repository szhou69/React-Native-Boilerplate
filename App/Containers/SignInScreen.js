import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TextInput, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Images } from '../Themes'
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
  }

  _signInAsync = async () => {
    const { email, password } = this.state;
    this.props.attemptLogin(email, password);
  };

  render () {
    const { email, password } = this.state
    const { fetching } = this.props
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
            <View style={styles.row}>
              <Icon name="user" size={20} color="#fff" />
              <TextInput
                style={styles.textInput}
                onChangeText={(email) => this.setState({email})}
                placeholder="Email"
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
                onChangeText={(password) => this.setState({password})}
                secureTextEntry
                returnKeyType="go"
                placeholder="Password"
                onSubmitEditing={this._signInAsync}
                placeholderTextColor="white"
              />
            </View>
            <WhiteSpace size="xl" />
            <TouchableOpacity style={styles.button} onPress={this._signInAsync}>
              <Text style={styles.buttonText}> Log In </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
      </View>
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
