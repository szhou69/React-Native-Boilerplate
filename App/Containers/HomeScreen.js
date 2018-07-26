import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native'
import { Images, Colors } from '../Themes'
import { WhiteSpace } from 'antd-mobile-rn';
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
import AppointmentActions from '../Redux/AppointmentRedux'
import _ from 'lodash';
import CardView from '../Components/CardView'
import moment from 'moment';

// Styles
import styles from './Styles/LaunchScreenStyles'
import images from '../Themes/Images';

class HomeScreen extends Component {
  static navigationOptions = {
    title: '',
    headerStyle: {
      borderColor: Colors.themeColor,
      backgroundColor: Colors.themeColor,
      borderBottomWidth: 0,
    },
  };
  constructor(props) {
    super(props);
    this.state = { 
      curTime: new Date().toLocaleString(),
      appointmentList: <Text>""</Text>,
    };
  }

  _switchToOther = (appointment) => {
    this.props.navigation.navigate(
      'Other',
      { appointment })
  };

  _signOutAsync = async () => {
    this.props.attemptLogout();
  };

  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props, nextProps) && !nextProps.admin.token) {
      this.props.navigation.navigate('Auth');
    }
    if(nextProps.data){
      console.tron.log("componentWillReceiveProps: "+JSON.stringify(nextProps.data));
      let appointments_data = nextProps.data.map(appointment => {  
        return <CardView 
                userName={appointment.User.first_name +" "+ appointment.User.last_name} 
                status={appointment.Status.status_name} 
                time={"Today " + moment(appointment.time_from).format('hh:mm')+" - "+moment(appointment.time_to).format('hh:mm')}
                onPress={() => this._switchToOther(appointment)}
                />
      })
      this.setState({
        appointmentList: appointments_data
      }); 
    }
    return nextProps;
  }

  componentDidMount(){
    setInterval( () => {
      this.setState({
        curTime : new Date().toLocaleString()
      })
    },1000)
    console.tron.log("componentDidMount: "+JSON.stringify(this.props))
    this._getAllAppointments()
  }

  _getAllAppointments = async () => {
    this.props.getAllAppointments(this.props.admin.token);
  };

  render () {
    const { curTime, appointmentList } = this.state
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <View style={{backgroundColor: Colors.themeColor, alignSelf: 'stretch', flex: 1, height: 100, alignItems:'center'}}>
            <Text style={[styles.textFont, styles.titleText]}>Current Time</Text>
            <Text style={[styles.textFont, styles.titleText]}>{curTime}</Text>
          </View>
          <WhiteSpace size="md" />
          <Text style={[styles.textFont, {color: Colors.primaryText}, {marginLeft: 12}, {fontSize: 16}]}>Appointments:</Text>
          <WhiteSpace size="md" />
          <View>
          {
            appointmentList
          }
          </View>
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
          <WhiteSpace size="xl" />
           
          <TouchableOpacity style={styles.button} onPress={this._signOutAsync}>
            <Text style={[styles.buttonText, styles.textFont]}> Sign Out </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    admin: state.admin,
    data: state.appointment.data,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogout: () => dispatch(LoginActions.logout()),
    getAllAppointments: (token) => dispatch(AppointmentActions.appointmentRequest(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
