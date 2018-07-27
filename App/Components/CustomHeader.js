import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './Styles/CustomHeaderStyle'

export default class CustomHeader extends Component {
    static propTypes = {
        title: PropTypes.string,
        navigation: PropTypes.object,
    }

    _show_alert = () => {
        Alert.alert(
            'Alert',
            'Are you sure you want to log out?',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: this._signOutAsync },
            ],
            { cancelable: false }
        )
    }

    _signOutAsync = async () => {
        console.tron.log("Here");
        AsyncStorage.clear();
        this.props.navigation.navigate('Auth')
    };

    render() {
        let CustomHeaderComponent = null
        const { dispatchAction, title } = this.props
        return (
            <View style={{ flexDirection: 'row', alignIems: 'center', flex: 1, justifyContent: 'space-between' }}>
                <Text style={{ alignSelf: 'center', height: 30, width: 30, flex: 1 }}></Text>
                <Text style={[{ alignSelf: 'center', flex: 7, textAlign: 'center' }, styles.textFont, styles.headerTitle]}>{title}</Text>
                <TouchableOpacity
                    onPress={this._show_alert}
                    style={{ alignSelf: 'center', flex: 1 }}>
                    <Icon name="sign-out" size={25} color="#fff" />
                </TouchableOpacity>
            </View>
        );

        return CustomHeaderComponent
    }
}
