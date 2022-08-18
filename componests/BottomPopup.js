import React from "react";
import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import { useEffect, useState } from 'react';

import { COLORS, FONTS, SIZES } from '../src/designSet';

const deviceHight = Dimensions.get("window").height

export class BottomPopup extends React.Component {

    constructor( props ) {
        super( props )
        this.state = {
            show: false,
            inputName: "",
        }
    }

    show = () => {
        this.setState({show: true})
    }

    close = () => {
        this.setState({show: false})
    }

    renderOutsideTouchable(onTouch) {
        const view = <View style={{flex:1, width:'100%'}} />
        if (!onTouch) return View
        
        return(
            <TouchableWithoutFeedback onPress={onTouch} style={{flex:1, width:'100%'}} >
                {view}
            </TouchableWithoutFeedback>
        )
    }

    renderTitle = () => {
        const {title} = this.props
        return(
            <View>
                <Text style={styles.popupViewBlockTitle}>{title}</Text>
            </View>
        )
    }

    handleName = (text) => {
        this.setState({ inputName: text })
    }

    save = (saveValue) => {
        if (this.state.inputName.length == 0) {
            this.setState({show: false})
        } else {
            this.setState({inputName: saveValue})
            this.props.save(saveValue)        
            Keyboard.dismiss()
            console.log("saved: " + saveValue);
        }
    }

    renderContent = () => {
        const {data} = this.props
        return(
            <View style={styles.popupViewBlockText}>
                <TextInput 
                    style={styles.popupInput}
                    onChangeText={(text) => this.handleName(text)} 
                    defaultValue={data}
                    // value={this.state.inputName}
                />
                <View>
                    <TouchableOpacity onPress={() => { this.save(this.state.inputName) }}>
                        <Text>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        let {show} = this.state
        const {onTouchOutside, title} = this.props
        if (Platform.OS === 'android') {
            return(
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={show}
                    onRequestClose={this.close}
                >
                    <KeyboardAvoidingView style={styles.popupView}>
                        {this.renderOutsideTouchable(onTouchOutside)}
                        <View style={styles.popupViewBlock}>
                            {this.renderTitle()}
                            {this.renderContent()}
                        </View>
                    </KeyboardAvoidingView>
                </Modal>
            ) 
        }
        return(
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <KeyboardAvoidingView 
                    keyboardVerticalOffset={deviceHight*0}
                    behavior="padding" 
                    style={styles.popupView}
                >
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={styles.popupViewBlock}>
                        {this.renderTitle()}
                        {this.renderContent()}
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        ) 
    }

}

const styles = StyleSheet.create( {
    popupView: {
        flex: 1,
        backgroundColor: COLORS.black,
        justifyContent: 'flex-end',
        opacity: 0.8,
    },    
    popupViewBlock: {
        backgroundColor: COLORS.white,
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 10,
        maxHeight: deviceHight * 0.5,
    },
    popupViewBlockTitle: {
        ...FONTS.p1,
        padding: SIZES.padding,
        paddingBottom: 0,
    },
    popupViewBlockText: {
        padding: SIZES.padding,
    },
    popupInput: {
        width: '100%',
        padding: SIZES.padding - 10,
        backgroundColor: COLORS.gray,
        marginBottom: SIZES.padding,
    },
});