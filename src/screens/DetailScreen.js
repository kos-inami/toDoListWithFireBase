import React from "react";
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native'
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SIZES } from '../designSet';

import { useRoute } from '@react-navigation/native'

import { BottomPopup } from '../../componests/BottmPupuup';

const popupList = [
    {
        id: 1,
        name: 'task1',
    },
    {
        id: 2,
        name: 'task2',
    }
]

export default function DetailScreen( props ) {

    // Set navigation ----------
    const navigation = useNavigation()

    const route = useRoute()
    const { id, name } = route.params

    // Get document id and navigate to home screen ----------
    const clickHandler = (del) => {
        Alert.alert(
            "DELETE A TASK",
            "Are you sure to delete this task?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { 
                    text: "OK", 
                    onPress: () =>  clickAlert(del),
                }
            ]
        )
    }
    // When press okay through this function
    const clickAlert = (del) => {
        console.log("OK Pressed")
        props.del( del )
        navigation.navigate('HomeScreen', del )
    }

    // For pop up ---------
    let popupRef = React.createRef()

    const onShowPopup = () => {
        popupRef.show()
    }
    const onClosePopup = () => {
        popupRef.close()
    }

    return (
        <View style={styles.detailView}>
            <View style={styles.table}>
                <Text style={styles.tableLeft}>Task ID</Text>
                <Text>{ id }</Text>
            </View>
            <TouchableOpacity style={styles.table} onPress={onShowPopup}>
                <Text style={styles.tableLeft}>Task Name</Text>
                <Text>{ name }</Text>
            </TouchableOpacity>                
            <TouchableOpacity 
                    style={styles.deleteBtn}
                    onPress={ () => clickHandler(id) }
                >
                <Text style={styles.deleteBtnText}>delete</Text>
            </TouchableOpacity>
            <BottomPopup 
                title = "Name"
                ref={(target) => popupRef = target}
                onTouchOutside={onClosePopup}
                data={ name }
            />
        </View>
    )
}


const styles = StyleSheet.create( {
    detailView: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.padding,
    },
    table: {
        flexDirection: 'row',
        marginBottom: SIZES.padding,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray,
        paddingBottom: SIZES.padding,
    },
    tableLeft: {
        width: '30%',
    },
    deleteBtn: {

    },
});