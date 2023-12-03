import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonText = ({ title, onPress, ContainerButton, ContainerText }) => {
    return (
        <TouchableOpacity onPress={onPress} style={ContainerButton} activeOpacity={0.8}>
            <Text style={ContainerText}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonText