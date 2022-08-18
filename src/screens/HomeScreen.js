import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert, Keyboard, KeyboardAvoidingView, Platform, } from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/elements'

import { COLORS, FONTS, SIZES } from '../designSet';

// Import FontAwesome Component
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function HomeScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    // Add New task ---------
    const [input, setInput] = useState("")
    const submit = (path, data) => {
        const dataObj = {name: data, date: new Date()}
        setInput("")
        Keyboard.dismiss()
        props.add( path, dataObj )
    }

    useEffect(() => {
        if(!props.auth){
            navigation.reset({index: 0, routes: [{ name: "WelcomeScreen" }]})
        }
    }, [props.auth])

    // Get data ----------
    useEffect( () => {
        console.log( props.data )
    }, [props.data])

    // Pass data detail screen ----------
    const clickHandler = (data) => {
        navigation.navigate('Detail', data )
    }
    const renderItem = ({item}) => (    // Render to items 
        <View>
            <View>
                <Text style={styles.taskListText} onPress={ () => clickHandler(item) }>
                    { item.name }
                </Text>
                <FontAwesome name="angle-right" style={styles.listArrow}/>
            </View>
            <View style={styles.borderBottom}></View>
        </View>
    )

    const height = useHeaderHeight()

    if (Platform.OS === 'android') {
        return (
            <View style={styles.homeView}>
                <FlatList 
                    data={ props.data } 
                    renderItem= {renderItem}
                    keyExtractor={ item => item.id }
                />
                <KeyboardAvoidingView style={styles.inputBlock}>
                    <TextInput style={styles.input} value={input} onChangeText={(val) => setInput(val)} placeholder="Create a new task!"/>
                    <TouchableOpacity 
                        style={ (input.length > 0) ? styles.button : styles.buttonDisabled }
                        disabled={ (input.length > 0) ? false : true }
                        onPress={() => {
                            submit(`list/${props.auth.uid}/items`, input)
                        }}
                    >
                        <Text style={ (input.length > 0) ? styles.buttonText : styles.buttonTextDisabled }>+</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }
    return (
        <View style={styles.homeView}>
            <FlatList 
                data={ props.data } 
                renderItem= {renderItem}
                keyExtractor={ item => item.id }
            />
            <KeyboardAvoidingView 
                keyboardVerticalOffset={height + 10}
                behavior="padding"
                style={styles.inputBlock} 
            >
                <TextInput style={styles.input} value={input} onChangeText={(val) => setInput(val)} placeholder="Create a new task!"/>
                <TouchableOpacity 
                    style={ (input.length > 0) ? styles.button : styles.buttonDisabled }
                    disabled={ (input.length > 0) ? false : true }
                    onPress={() => {
                        submit(`list/${props.auth.uid}/items`, input)
                    }}
                >
                    <Text style={ (input.length > 0) ? styles.buttonText : styles.buttonTextDisabled }>+</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create( {
    homeView: {
        backgroundColor: COLORS.white,
        flex: 1,
        padding: SIZES.padding,
        width: '100%',
        paddingBottom: 100,
    },
    inputBlock: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        left: 15,
        right: 0,
        bottom: 20,
        width: '100%',
    },
    input: {
        ...FONTS.p2,
        backgroundColor: COLORS.white,
        borderColor: COLORS.orange,
        borderWidth: 3,
        borderRadius: 100,
        padding: 10,
        marginRight: 10,
        paddingLeft: SIZES.padding,
        width: '80%',
        zIndex: 3, // works on ios
        elevation: 3, // works on android
    },
    button: {
        backgroundColor: COLORS.white,
        width: 46,
        borderColor: COLORS.orange,
        borderWidth: 2,
        borderRadius: 100,
        zIndex: 3, // works on ios
        elevation: 3, // works on android
    },
    buttonDisabled: {
        backgroundColor: COLORS.white,
        width: 46,
        borderColor: COLORS.gray,
        borderWidth: 2,
        borderRadius: 100,
        zIndex: 3, // works on ios
        elevation: 3, // works on android
    },
    buttonText: {
        color: COLORS.orange,
        fontSize: 30,
        paddingLeft: 12,
        paddingTop: 0,
    },
    buttonTextDisabled: {
        color: COLORS.gray,
        fontSize: 30,
        paddingLeft: 12,
        paddingTop: 0,
    },
    taskListText: {
        ...FONTS.p2,
        padding: SIZES.padding,
        width: '100%',
        // borderBottomColor: COLORS.orange,
        // borderBottomWidth: 2,
    },
    listArrow: {
        position: 'absolute',
        right: SIZES.padding,
        top: 20,
        fontSize: 20,
        color: COLORS.orange,
    },
    borderBottom: {
        backgroundColor: COLORS.orange,
        height: 2,
        width: '100%',
    },
});