import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../designSet';

export default function HomeScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    // Add New task ---------
    const [input, setInput] = useState()
    const submit = (path, data) => {
        const dataObj = {name: data, date: new Date()}
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
        </View> 
    )
    return (
        <View style={styles.homeView}>
            <View style={styles.inputBlock}>
                <TextInput style={styles.input} onChangeText={(val) => setInput(val)} placeholder=" Create a new task!"/>
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
        flex: 1,
        margin: SIZES.padding,
    },
    inputBlock: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: SIZES.padding,
    },
    input: {
        borderColor: COLORS.orange,
        borderWidth: 2,
        borderRadius: 100,
        fontSize: 20,
        padding: 10,
        width: '84%',
    },
    button: {
        width: 50,
        borderColor: COLORS.orange,
        borderWidth: 2,
        borderRadius: 100,
    },
    buttonText: {
        color: COLORS.orange,
        fontSize: 30,
        paddingLeft: 14.5,
        paddingTop: 2.5,
    },
    taskListText: {
        ...FONTS.p2,
        padding: SIZES.padding,
        width: '100%',
        borderBottomColor: COLORS.orange,
        borderBottomWidth: 1,
    },
});