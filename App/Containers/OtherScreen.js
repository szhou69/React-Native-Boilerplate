import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Images } from '../Themes'
import moment from 'moment';
import { WhiteSpace } from 'antd-mobile-rn';
import SignatureCapture from 'react-native-signature-capture';

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class OtherScreen extends Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      title: params ? params.appointment.User.first_name +" "+ params.appointment.User.last_name : 'Other Screen',
    };
  };

  saveSign() {
    this.refs["sign"].saveImage();
  }

  resetSign() {
    this.refs["sign"].resetImage();
  }

  _onSaveEvent(result) {
    //result.encoded - for the base64 encoded png
    //result.pathName - for the file path name
    console.tron.log(result);
  }
  _onDragEvent() {
      // This callback will be called when the user enters signature
    console.tron.log("dragged");
  }

  render () {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.mainContainer}>
        {/* <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' /> */}
        <ScrollView style={styles.container}>
         <Text>Appointment Time: {"\n"}
         {moment(params.appointment.time_from).format('MM/DD/YYYY hh:mm')}</Text>
         <WhiteSpace size="xl" />
        
         <Text>Business Location: {"\n"}
         {params.appointment.Business_Location.address}, {params.appointment.Business_Location.city}, {params.appointment.Business_Location.state}, 
         {params.appointment.Business_Location.country}, {params.appointment.Business_Location.zipcode}
         </Text>
         <WhiteSpace size="xl" />
         
         <Text>Sign Below to Check In</Text>
         <WhiteSpace size="xl" />
         <View style={{height: 200, alignSelf: 'stretch', borderWidth: 2, marginLeft:2, marginRight:2, backgroundColor: '#ffffff'}}>
          <SignatureCapture
                      style={[{flex:1}]}
                      ref="sign"
                      onSaveEvent={this._onSaveEvent}
                      onDragEvent={this._onDragEvent}
                      saveImageFileInExtStorage={false}
                      showNativeButtons={false}
                      showTitleLabel={false}
                      viewMode={"portrait"}/>
         </View>
         <View style={{ flex: 1, flexDirection: "row" }}>
            <TouchableOpacity style={styles.button}
                onPress={() => { this.saveSign() } } >
                <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}
                onPress={() => { this.resetSign() } } >
                <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    )
  }
}