import React, { useReducer, useEffect, useContext } from 'react';
import { Text, View, ScrollView, Alert, Platform } from 'react-native';
import Color from '../StyleGuide/Color';
import { TextInput } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { ButtonText } from '../components';
import { reducer, initialState } from '../Reducer/AddScreenReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from "jwt-decode";
import { UserType } from '../UserContext';
import axios from 'axios';

const AddressScreen = ({ navigation }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { userId, setUserId } = useContext(UserType);

    function isEnableSignInEmail() {
        return state.mobileNo != "" && state.houseNo != "" && state.street != "" && state.landmark != "" && state.postalCode != ""
    }

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = await AsyncStorage.getItem("authToken");
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;
                    setUserId(userId);
                    console.log("Updated userId:", userId);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, [])

    console.log("Initial userId:", userId);

    const handleAddAddress = async () => {
        const address = {
            name: state.name,
            mobileNo: state.mobileNo,
            houseNo: state.houseNo,
            street: state.street,
            landmark: state.landmark,
            postalCode: state.postalCode
        }
        try {
            const response = await axios.post("http://192.168.1.190:8000/addresses", userId, address);
            console.log(response);
            Alert.alert("Success", "Addresses", "added successfully")
            dispatch({ type: "SET_NAME", payload: state.name })
            dispatch({ type: "SET_MOBILE_NO", payload: state.mobileNo })
            dispatch({ type: "SET_HOUSE_NO", payload: state.houseNo })
            dispatch({ type: "SET_STREET", payload: state.street })
            dispatch({ type: "SET_LANDMARK", payload: state.landmark })
            dispatch({ type: "SET_POSTAL_CODE", payload: state.postalCode })
            setTimeout(() => {
                navigation.goBack();
            }, 500)
        } catch (error) {
            Alert.alert("Error", "Failed to add address")
            console.log("error", error)
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ height: 50, backgroundColor: Color.Strong_cyan, }} />
            <KeyboardAvoidingView enabled={true} >
                <View style={{ padding: 10, }}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', }}>Add a new Address</Text>
                    <TextInput
                        placeholder='India'
                        placeholderTextColor={Color.Black}
                        style={{
                            padding: 10,
                            borderColor: Color.Light_gray,
                            borderWidth: 1,
                            marginTop: 10,
                            borderRadius: 5,
                        }}
                    />
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Full name (First and last name)</Text>
                        <TextInput
                            value={state.name}
                            placeholder='enter yor name'
                            placeholderTextColor={Color.Black}
                            style={{
                                padding: 10,
                                borderColor: Color.Light_gray,
                                borderWidth: 1,
                                marginTop: 10,
                                borderRadius: 5,
                            }}
                            onChangeText={(text) => dispatch({ type: "SET_NAME", payload: text })}
                        />
                        <View>
                            <View style={{ marginTop: 10, }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Mobile number</Text>
                                <TextInput
                                    value={state.mobileNo}
                                    placeholder='Mobile No'
                                    keyboardType="number-pad"
                                    placeholderTextColor={Color.Black}
                                    style={{
                                        padding: 10,
                                        borderColor: Color.Light_gray,
                                        borderWidth: 1,
                                        marginTop: 10,
                                        borderRadius: 5,
                                    }}
                                    onChangeText={(text) => dispatch({ type: "SET_MOBILE_NO", payload: text })}
                                />
                            </View>
                            <View style={{ marginVertical: 10, }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Flat,House No,Building,Company</Text>
                                <TextInput
                                    value={state.houseNo}
                                    placeholder=''
                                    placeholderTextColor={Color.Black}
                                    style={{
                                        padding: 10,
                                        borderColor: Color.Light_gray,
                                        borderWidth: 1,
                                        marginTop: 10,
                                        borderRadius: 5,
                                    }}
                                    onChangeText={(text) => dispatch({ type: "SET_HOUSE_NO", payload: text })}
                                />
                            </View>
                            <View>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Area,Street,sector,village</Text>
                                <TextInput
                                    value={state.street}
                                    placeholderTextColor={Color.Black}
                                    style={{
                                        padding: 10,
                                        borderColor: Color.Light_gray,
                                        borderWidth: 1,
                                        marginTop: 10,
                                        borderRadius: 5,
                                    }}
                                    onChangeText={(text) => dispatch({ type: "SET_STREET", payload: text })}
                                />
                            </View>
                            <View style={{ marginVertical: 10 }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Landmark</Text>
                                <TextInput
                                    value={state.landmark}
                                    placeholder='Eg near apollo hospital'
                                    placeholderTextColor={Color.Black}
                                    style={{
                                        padding: 10,
                                        borderColor: Color.Light_gray,
                                        borderWidth: 1,
                                        marginTop: 10,
                                        borderRadius: 5,
                                    }}
                                    onChangeText={(text) => dispatch({ type: "SET_LANDMARK", payload: text })}
                                />
                            </View>
                            <View>
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>PinCode</Text>
                                <TextInput
                                    value={state.postalCode}
                                    placeholder='Enter PinCode'
                                    placeholderTextColor={Color.Black}
                                    style={{
                                        padding: 10,
                                        borderColor: Color.Light_gray,
                                        borderWidth: 1,
                                        marginTop: 10,
                                        borderRadius: 5,
                                    }}
                                    onChangeText={(text) => dispatch({ type: "SET_POSTAL_CODE", payload: text })}
                                />
                            </View>
                            <ButtonText
                                title="Add Address"
                                onPress={handleAddAddress}
                                ContainerButton={{
                                    backgroundColor: isEnableSignInEmail() ? Color.Strong_cyan : Color.Red_OP,
                                    padding: 19,
                                    borderRadius: 6,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 20,
                                }}
                                disabled={isEnableSignInEmail() ? false : true}
                                ContainerText={{
                                    fontWeight: 'bold',
                                }}
                            />
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default AddressScreen;