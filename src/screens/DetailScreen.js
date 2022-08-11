import {View, Text, StyleSheet} from 'react-native'
import { useRoute } from '@react-navigation/native'

export default function DetailScreen( props ) {

    const route = useRoute()
    const { id, name } = route.params

    return (
        <View>
        <Text>{ id }</Text>
        <Text>{ name }</Text>
        </View>
    )
}