import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native'
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    useEffect(() => {
        if(!props.auth){
            navigation.reset({index: 0, routes: [{ name: "WelcomeScreen" }]})
        }
    }, [props.auth])

    return (
        <View style={styles.homeView}>
            <Text>Add items</Text>
                <TextInput style={styles.input}/>
            <TouchableOpacity style={styles.button}>
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create( {
    homeView: {
        flex: 1,
    },
    input: {
        backgroundColor: "red",
        fontSize: 20,
        padding: 10,
    },
    button: {
        backgroundColor: "lightblue",
        fontSize: 50,
    }
});