import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics, ApplicationStyles } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  headerTitle: {
    ...Fonts.style.time,
    fontSize: 17,
    color: Colors.antiPrimaryText
  },
  largeTitle: {
    ...Fonts.style.time,
    fontSize: 38,
    color: Colors.antiPrimaryText
  }
})
