import { StyleSheet } from 'react-native'
import { Colors, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  cardContainer: {
    height: 100, 
    alignSelf: 'stretch',
    borderWidth: 0,
    borderRadius: 5,
    borderColor: '#ddd',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    shadowColor: '#ddd',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  cardViewLeftBorder: {
    height: 100, 
    width: 3,
  },
  circle: {
    width: 11,
    height: 11,
    borderRadius: 50,
  },
  cardTitle: {
    fontSize: 16,
    color: Colors.primaryText
  },
  cardSubtitle: {
    fontSize: 12,
    color: Colors.subtitleText
  },
  cardStatus: {
    fontSize: 12,
    marginLeft: 5 
  },
  signButton: {
    height: 30, 
    fontSize: 14,
    padding: 2,
    color: Colors.themeColor,
  }
})
