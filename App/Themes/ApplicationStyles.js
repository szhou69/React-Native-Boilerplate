import Fonts from './Fonts'
import Metrics from './Metrics'
import Colors from './Colors'
import {
  Platform
} from 'react-native';

// This file is for a reusable grouping of Theme items.
// Similar to an XML fragment layout in Android

const ApplicationStyles = {
  screen: {
    mainContainer: {
      flex: 1,
      backgroundColor: Colors.background
    },
    keyboardAvoidingContainer: {
      padding: 20,
      flex: 1
    },
    button: {
      borderColor: Colors.white,
      height: 40,
      borderRadius: Metrics.buttonRadius,
      justifyContent: 'center',
      alignSelf: 'stretch',
      margin: 15,
    },
    buttonText: {
      color: Colors.secondaryText,
      textAlign: 'center',
      fontSize: 16,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 5,
      ...Fonts.style.regular,
    },
    textInput: {
      paddingLeft: 10,
      height: 40,
      flex: 1,
      color: Colors.antiPrimaryText,
      borderRadius: Metrics.buttonRadius,
      alignSelf: 'stretch',
      ...Fonts.style.regular,
    },
    backgroundImage: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0
    },
    container: {
      flex: 1,
      paddingTop: Metrics.baseMargin,
      backgroundColor: Colors.transparent
    },
    section: {
      margin: Metrics.section,
      padding: Metrics.baseMargin,
      justifyContent: 'center',
      alignItems: 'center'
    },
    sectionText: {
      ...Fonts.style.normal,
      paddingVertical: Metrics.doubleBaseMargin,
      color: Colors.antiPrimaryText,
      marginVertical: Metrics.smallMargin,
      textAlign: 'center'
    },
    subtitle: {
      color: Colors.snow,
      padding: Metrics.smallMargin,
      marginBottom: Metrics.smallMargin,
      marginHorizontal: Metrics.smallMargin
    },
    titleText: {
      ...Fonts.style.regular,
      fontSize: 20,
      color: Colors.antiPrimaryText
    },
    textFont: {
      ...Fonts.style.regular,
    },
    headerTitle: {
      ...Fonts.style.regular,
      fontSize: 17,
      color: Colors.antiPrimaryText
    },
  },
  darkLabelContainer: {
    padding: Metrics.smallMargin,
    paddingBottom: Metrics.doubleBaseMargin,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    marginBottom: Metrics.baseMargin
  },
  darkLabel: {
    fontFamily: Fonts.type.bold,
    color: Colors.snow
  },
  groupContainer: {
    margin: Metrics.smallMargin,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  sectionTitle: {
    ...Fonts.style.h4,
    color: Colors.coal,
    backgroundColor: Colors.ricePaper,
    padding: Metrics.smallMargin,
    marginTop: Metrics.smallMargin,
    marginHorizontal: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.ember,
    alignItems: 'center',
    textAlign: 'center'
  }
}

export default ApplicationStyles
