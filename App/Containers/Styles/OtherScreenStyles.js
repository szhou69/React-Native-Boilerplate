import {
    StyleSheet
} from 'react-native'
import {
    ApplicationStyles
} from '../../Themes'
import { Colors, Fonts } from '../../Themes'

export default StyleSheet.create({
    ...ApplicationStyles.screen,
    bodyText: {
        ...Fonts.style.regular,
        fontSize: 16,
        color: Colors.secondaryText,
        textAlign: 'center'
    },
})
