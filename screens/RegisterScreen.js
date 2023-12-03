import React, { useReducer } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, KeyboardAvoidingView, TextInput, TouchableOpacity, Alert } from 'react-native';
import COLORS from '../StyleGuide/Color';
import { ButtonText, Separator } from '../components';
import Display from '../utils/Display';
import { AntDesign, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { reducer, initialState } from '../Reducer/LoginScreenReducer';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const RegisterScreen = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigation = useNavigation();
    const handleRegister = async () => {
        const user = {
            name: state.name,
            email: state.email,
            password: state.password
        };

        try {
            const response = await axios.post("http://192.168.1.190:8000/register", user);
            console.log(response);
            Alert.alert("Registration successful", "You have been registered successfully");
            dispatch({ type: "SET_NAME", payload: state.name, });
            dispatch({ type: "SET_EMAIL", payload: state.email, });
            dispatch({ type: "SET_PASSWORD", payload: state.password });
        } catch (error) {
            Alert.alert("Registration failed", "An error occurred while registering");
            console.error("Registration failed", error);
        }
    };
    return (
        <View style={styles.container} >
            <StatusBar barStyle='dark-content' backgroundColor="white" />
            <View style={{ marginTop: 10 }}>
                <Image style={{ width: 150, height: 100 }} source={{ uri: "https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png" }} />
            </View>
            <KeyboardAvoidingView>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontSize: 17, marginTop: 12, color: COLORS.Blue }}>Login In to your Account</Text>
                </View>
                <Separator height={Display.setHeight(7)} />
                <View style={styles.textInputContainer}>
                    <Ionicons style={{ marginRight: 8, color: COLORS.Gray }} name="person" size={24} />
                    <TextInput
                        value={state.name}
                        style={[styles.textInput, { fontSize: state.name ? 16 : 16 }]}
                        placeholder='enter your Name'
                        onChangeText={(text) => dispatch({ type: "SET_NAME", payload: text })}
                    />
                </View>
                <Separator height={Display.setHeight(5)} />
                <View style={styles.textInputContainer}>
                    <MaterialIcons style={{ marginRight: 8, color: COLORS.Gray }} name="email" size={24} />
                    <TextInput
                        value={state.email}
                        style={[styles.textInput, { fontSize: state.email ? 16 : 16 }]}
                        placeholder='enter your Email'
                        onChangeText={(text) => dispatch({ type: "SET_EMAIL", payload: text })}
                    />
                </View>

                <Separator height={Display.setHeight(5)} />
                <View style={styles.textInputContainer}>
                    <AntDesign style={{ marginRight: 8, color: COLORS.Gray }} name="lock1" size={24} />
                    <TextInput
                        value={state.password}
                        secureTextEntry={state.showPassword}
                        style={[styles.textInput, { fontSize: state.showPassword ? 16 : 16 }]}
                        placeholder='enter your Password'
                        onChangeText={(text) => dispatch({ type: "SET_PASSWORD", payload: text })}
                    />
                    <TouchableOpacity onPress={() => dispatch({ type: "SET_SHOW_PASSWORD" })}>
                        <Ionicons style={{ marginLeft: 8, color: COLORS.Gray }} name={state.showPassword ? "eye-off" : "eye"} size={24} />
                    </TouchableOpacity>
                </View>
                <Separator height={Display.setHeight(1)} />
                <View style={styles.ForgetPassword}>
                    <Text>Keep me logged in</Text>
                    <Text style={{ color: COLORS.BluePure, fontWeight: '500' }}>Forget Password</Text>
                </View>
                <Separator height={Display.setHeight(5)} />
                <ButtonText
                    title="Register"
                    ContainerButton={{
                        width: 200,
                        backgroundColor: "#FEBE10",
                        borderRadius: 6,
                        marginRight: 'auto',
                        marginLeft: 'auto',
                        padding: 15,
                    }}
                    ContainerText={{
                        textAlign: "center",
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLORS.White
                    }}
                    onPress={handleRegister}
                />
                <Separator height={Display.setHeight(1)} />
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "gray" }}>Don't have an account? Sign In</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: 'center',
    },
    textInputContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        gap: 5,
        paddingVertical: 5,
        backgroundColor: COLORS.Light_gray,
        borderRadius: 10,
    },
    textInput: {
        color: COLORS.Gray,
        marginVertical: 5,
        width: 280,
    },
    ForgetPassword: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: "space-between",
    }
})