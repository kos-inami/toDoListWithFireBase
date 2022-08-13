import React from "react";
import { Modal, Dimensions, TouchableWithoutFeedback, StyleSheet, View, Text, FlatList } from "react-native";

import { COLORS, FONTS, SIZES } from '../src/designSet';

const deviceHight = Dimensions.get("window").height

export class BottomPopup extends React.Component {

    constructor( props ) {
        super( props )
        this.state = {
            show: false
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

    renderContent = () => {
        const {data} = this.props
        return(
            <View>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={this.renderItem}
                    extraData={data}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    contentContainerStyle={{
                        paddingBottom: 40,
                    }}
                />
            </View>
        )
    }

    renderItem = ({item}) => {
        return(
            <View>
                <Text>{item}</Text>
            </View>
        )
    }

    renderSeparator = () => (
        <View style={{
            opacity: 0.1,
            backgroundColor: COLORS.blue,
            height: 1,
        }} />
    )

    render() {
        let {show} = this.state
        const {onTouchOutside, title} = this.props

        return(
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={show}
                onRequestClose={this.close}
            >
                <View style={styles.popupView}>
                    {this.renderOutsideTouchable(onTouchOutside)}
                    <View style={styles.popupViewBlock}>
                        {this.renderTitle()}
                        {this.renderContent()}
                    </View>
                </View>
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
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 10,
        maxHeight: deviceHight * 0.4,
    },
    popupViewBlockTitle: {

    },
    popupViewBlockText: {

    },
});