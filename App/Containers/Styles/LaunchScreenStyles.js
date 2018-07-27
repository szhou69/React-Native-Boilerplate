import {
  StyleSheet
} from 'react-native'
import {
  Metrics,
  ApplicationStyles
} from '../../Themes'
import Colors from '../../Themes/Colors'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    paddingBottom: Metrics.baseMargin
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain',
  },
  centered: {
    alignItems: 'center'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    borderColor: Colors.border,
    borderWidth: 1,
    height: 40,
    borderRadius: Metrics.buttonRadius,
    alignSelf: 'stretch',
    marginTop: 2,
  }
})
