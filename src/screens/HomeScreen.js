import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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
            <Text style={styles.taskListText} onPress={ () => clickHandler(item) }>
                { item.name }
            </Text>
            <FontAwesome name="angle-right" style={styles.listArrow}/>
        </View> 
    )
    return (
        <View style={styles.homeView}>
            <View style={styles.inputBlock}>
                <TextInput style={styles.input} onChangeText={(val) => setInput(val)} placeholder="Create a new task!"/>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => {
                        submit(`list/${props.auth.uid}/items`, input)
                    }}
                >
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>
            <FlatList 
                data={ props.data } 
                renderItem= {renderItem}
                keyExtractor={ item => item.id }
            />
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
        borderWidth: 2,
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
    buttonText: {
        color: COLORS.orange,
        fontSize: 30,
        paddingLeft: 12,
        paddingTop: 0,
    },
    taskListText: {
        ...FONTS.p2,
        padding: SIZES.padding,
        width: '100%',
        borderBottomColor: COLORS.orange,
        borderBottomWidth: 1,
    },
    listArrow: {
        position: 'absolute',
        right: SIZES.padding,
        top: 20,
        fontSize: 20,
        color: COLORS.orange,
    },
});