import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const BookButton = (props) => {

    const buttonStyle = {
        width: 100,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    } 

    const textStyle = {
        fontSize: 16, 
    }

    if(props.type === "disabled") {
        buttonStyle.borderColor = "#E0E0E0";
        textStyle.color = "#979797";
    }

    if(props.type === "book") {
        buttonStyle.borderColor = "#55CB82";
        textStyle.color = "#16A64D";
    }

    if(props.type === "cancel") {
        buttonStyle.borderColor = "#FE93B3";
        textStyle.color = "#E2006A";
    }
    
    return (
        <View
            style = {buttonStyle}
        >
            <Text style = {textStyle}>{props.text}</Text>
        </View>
    )
}


export default BookButton;