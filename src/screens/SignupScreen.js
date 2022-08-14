import { Text, TextInput, View, StyleSheet, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

// Design set ----------
import { COLORS, SIZES, FONTS, SHADOW } from "../designSet"


export default function SignupScreen( props ) {
    
    // Set navigation ----------
    const navigation = useNavigation()

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState( false ) // email validation
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState()
        
    const validateEmail = ( emailStr ) => {
        // Check if email contains '@' symbol
        const atIndex = emailStr.indexOf('@')
        if (atIndex > 0) {
            return true
        }
        else {
            return false
        }
    }

    const validatePassword = ( passwordStr ) => {
        // check the length of the password
        const passLength = passwordStr.length
        if (passLength >= 8) {
            return true
        }
        else {
            return false
        }
    }

    const signUp = ( email, password ) => {
        console.log('signing up...')
        props.signup( email, password )
    }

    useEffect (() => {
        // console.log(validateEmail(email))
        if ( validateEmail( email ) ) {
            setValidEmail ( true )
        } else {
            setValidEmail ( false )
        }
        if ( validatePassword( password ) ) {
            setValidPassword ( true )
        } else {
            setValidPassword ( false )
        }
    }, [email, password])

    useEffect (() => {
        if (props.auth) {
            // navigation.navigate("Home")
            navigation.reset( {index: 0, routes: [{name: "HomeScreen"}]})
        }
    }, [props.auth])

    return (
        <KeyboardAvoidingView style={styles.signupView} behavior='padding'>
            <View style={styles.container}>
                <Text style={{...FONTS.h1}}>Let's create an account!</Text>
                <View style={styles.signupForm}>
                    <Text style={styles.label}>Email</Text>
                        <TextInput style={styles.input} onChangeText={ (value) => setEmail(value) }/>
                    <Text style={styles.label}>Password</Text>
                        <TextInput style={styles.input} secureTextEntry={true} onChangeText={ (value) => setPassword(value) } />
                    <TouchableOpacity 
                        style={ (validEmail && validPassword) ? styles.button : styles.buttonDisabled }
                        disabled={ (validEmail && validPassword) ? false : true }
                        onPress={ () => { signUp(email, password) }}
                    >
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => navigation.navigate("SigninScreen") }>
                        <Text style={{...FONTS.p2}}>Do you already have an account?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
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
    signupView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupForm: {
        width: '100%',
        height: '100%',
        padding: 10,
    },
    label: {
        ...FONTS.p1,
        marginVertical: 10,
    },
    input: {
        borderColor: COLORS.orange,
        borderWidth: 2,
        marginBottom: 15,
        padding: 10,
    },
    form: {
        alignItems: 'flex-start',
    },
    button: {
        backgroundColor: COLORS.orange,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
    },
    buttonDisabled: {
        backgroundColor: COLORS.gray,
        padding: 10,
        marginTop: 10,
        marginBottom: 30,
    },
    buttonText: {
        ...FONTS.p1,
        color: 'white',
        textAlign: 'center',
    }

});