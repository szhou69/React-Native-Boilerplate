import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TextInput, KeyboardAvoidingView, AsyncStorage } from 'react-native'
import { Images } from '../Themes'
import { WhiteSpace } from 'antd-mobile-rn';
import LoginActions from '../Redux/LoginRedux'
import { connect } from 'react-redux'

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

  _signInAsync = async () => {
    //await AsyncStorage.setItem('userToken', 'abc');
    //this.props.navigation.navigate('App');
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
            <TextInput
                style={styles.textInput}
                onChangeText={(email) => this.setState({email})}
                placeholder="Email"
                placeholderTextColor="white"
              />
              <WhiteSpace size="md" />
              <TextInput
                style={styles.textInput}
                onChangeText={(password) => this.setState({password})}
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

const mapStateToProps = (state) => {
  return {
    fetching: state.admin.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (email, password) => dispatch(LoginActions.userRequest(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)
