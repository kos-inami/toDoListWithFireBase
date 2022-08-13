import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW } from "../designSet"

export default function WelcomeScreen() {
    
    // Set navigation ----------
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.h1}>MY LIST MATE</Text>
            </View>
            <TouchableOpacity onPress={ () => navigation.navigate("SignupScreen") }>
                <Text style={[styles.button, styles.buttonSingup]}>Sign up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => navigation.navigate("SigninScreen") }>
                <Text style={[styles.button, styles.buttonSingin]}>Sign in</Text>
            </TouchableOpacity>
        </View>
    );
}

// Styles ===========
const styles = StyleSheet.create({

    container: {
        // paddingTop: Platform.OS === "ios" ? 40 : StatusBar.currentHeight + 10,
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
    h1: {
        ...FONTS.h1,
        padding:SIZES.padding*2,
        textAlign: 'center',
    },
    button: {
        ...FONTS.p1,
        color: COLORS.white,
        textAlign: 'center',
        padding: SIZES.padding*2,
        margin: SIZES.padding,
    },
    buttonSingup: {
        backgroundColor: COLORS.orange,
    },
    buttonSingin: {
        backgroundColor: COLORS.blue,
    }

});