import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'

const ProfileScreen = ({ navigation }) => {

    const logoutAndRedirect = async () => {
        try {
            await AsyncStorage.removeItem("authToken");
            navigation.navigate("Login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Pressable onPress={logoutAndRedirect}>
            <Text>ProfileScreen</Text>
        </Pressable>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})