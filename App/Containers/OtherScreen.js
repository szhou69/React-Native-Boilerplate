import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Images, Colors, Fonts } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';
import { WhiteSpace } from 'antd-mobile-rn';
import SignatureCapture from 'react-native-signature-capture';

// Styles
import styles from './Styles/OtherScreenStyles'

export default class OtherScreen extends Component {

  static navigationOptions = ({ navigation, navigationOptions }) => {
    const { params } = navigation.state;

    return {
      headerTitle: params ? params.appointment.User.first_name + " " + params.appointment.User.last_name : 'Other Screen',
      headerStyle: {
        borderColor: Colors.themeColor,
        backgroundColor: Colors.themeColor,
        borderBottomWidth: 0,
      },
    };
  };

  saveSign() {
    this.refs["sign"].saveImage();
    this.props.navigation.goBack();
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

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.mainContainer}>
        {/* <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' /> */}
        <ScrollView style={styles.container}>
          <Text style={[styles.bodyText, { fontWeight: 'bold' }]}>Appointment Time:</Text>
          <Text style={styles.bodyText}>{"Today " + moment(params.appointment.time_from).format('hh:mm') + " - " + moment(params.appointment.time_to).format('hh:mm')}</Text>
          <WhiteSpace size="xl" />

          <Text style={[styles.bodyText, { fontWeight: 'bold' }]}>Business Location:</Text>
          <Text style={styles.bodyText}>{params.appointment.Business_Location.address}, {params.appointment.Business_Location.city}, {params.appointment.Business_Location.state},
         {params.appointment.Business_Location.country}, {params.appointment.Business_Location.zipcode}
          </Text>
          <WhiteSpace size="xl" />

          <Text style={[styles.bodyText, { fontWeight: 'bold' }]}>Sign Below to Check In:</Text>
          <WhiteSpace size="md" />
          <View style={{ height: 200, alignSelf: 'stretch', borderWidth: 2, marginLeft: 2, marginRight: 2, backgroundColor: '#ffffff' }}>
            <SignatureCapture
              style={[{ flex: 1 }]}
              ref="sign"
              onSaveEvent={this._onSaveEvent}
              onDragEvent={this._onDragEvent}
              saveImageFileInExtStorage={false}
              showNativeButtons={false}
              showTitleLabel={false}
              viewMode={"portrait"} />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Text></Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around" }}>
            <TouchableOpacity style={[styles.button, { flex: 1 }]}
              onPress={() => { this.resetSign() }} >
              <Text style={[styles.buttonText, { color: Colors.themeColor }]}>Clear</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { flex: 1, backgroundColor: Colors.themeColor }]}
              onPress={() => { this.saveSign() }} >
              <Text style={[styles.buttonText, { color: Colors.white }]}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View >
    )
  }
}