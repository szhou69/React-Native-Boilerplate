import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Images, Colors } from '../Themes'
import { WhiteSpace } from 'antd-mobile-rn';
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'
import AppointmentActions from '../Redux/AppointmentRedux'
import PropTypes from 'prop-types'
import _ from 'lodash';
import CardView from '../Components/CardView'
import moment from 'moment';

// Styles
import styles from './Styles/HomeScreenStyles'
import images from '../Themes/Images';

class HomeTitle extends React.Component {
  static propTypes = {
    onPress: PropTypes.func,
    screenProps: PropTypes.object,
  }

  render() {
    const { onPress, screenProps } = this.props
    console.tron.log(screenProps);
    return (
      <View style={{flexDirection: 'row', alignIems: 'center', flex: 1, justifyContent: 'space-between'}}>
        <Text style={{ alignSelf: 'center', height: 30, width: 30, flex: 1 }}></Text>
        <Text style={[{ alignSelf: 'center', flex: 7, textAlign: 'center'}, styles.textFont, styles.headerTitle]}>Shu Chicopriting</Text>
        <TouchableOpacity
          onPress={screenProps.attemptLogout}
          style={{alignSelf: 'center', flex: 1}}>
          <Icon name="user-circle" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

class HomeScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    const { params } = navigation.state;
    console.tron.log(screenProps);
    return {
      headerTitle: <HomeTitle screenProps={screenProps}/>,
      headerStyle: {
        borderColor: Colors.themeColor,
        backgroundColor: Colors.themeColor,
        borderBottomWidth: 0,
      },
    };
  };
  constructor(props) {
    super(props);
    this.state = { 
      curTime: moment().format('HH:mm:ss'),
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
        curTime : moment().format('HH:mm:ss'),
      })
    },1000)
    console.tron.log("componentDidMount: "+JSON.stringify(this.props))
    this._getAllAppointments()
    this.props.navigation.setParams({'myTitle': 'this.props.myTitle'})
  }

  _getAllAppointments = async () => {
    this.props.getAllAppointments(this.props.admin.token);
  };

  render () {
    const { curTime, appointmentList } = this.state
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ScrollView style={styles.container}>
          <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} 
            style={{backgroundColor: Colors.themeColor, alignSelf: 'stretch', flex: 1, height: 100, alignItems:'center'}}>
            {/* <Text style={[styles.textFont, styles.titleText]}>Current Time</Text> */}
            <WhiteSpace size="lg" />
            <Text style={[styles.textFont, styles.largeTitle]}>{curTime}</Text>
          </LinearGradient>
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
