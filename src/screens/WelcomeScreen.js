import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW } from "../designSet"

export default function WelcomeScreen() {
    
    // Set navigation ----------
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={ () => navigation.navigate("SignupScreen") }>
                <Text style={{...FONTS.p1}}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigation.navigate("SigninScreen") }>
                <Text style={{...FONTS.p1}}>Sign in</Text>
            </TouchableOpacity>
        </View>
    );
}

// Styles ===========
const styles = StyleSheet.create({

    container: {
        paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        height: '100%',
        width: '100%'
    },

});