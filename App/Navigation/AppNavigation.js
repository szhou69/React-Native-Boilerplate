import { StackNavigator, SwitchNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import SignInScreen from '../Containers/SignInScreen'
import HomeScreen from '../Containers/HomeScreen'
import SplashScreen from '../Containers/SplashScreen'
import OtherScreen from '../Containers/OtherScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const AppStack = StackNavigator(
  { 
  HomeScreen: { screen: HomeScreen }, 
  Other: {screen: OtherScreen}
  },{
    // headerMode: 'none',
    navigationOptions: {
      headerStyle: styles.header,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
  }
);
const AuthStack = StackNavigator({ 
    SignInScreen: { screen: SignInScreen }
    },{
      headerMode: 'none',
      navigationOptions: {
        headerStyle: styles.header
      }
});

export default SwitchNavigator(
  {
    AuthLoading: SplashScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);
