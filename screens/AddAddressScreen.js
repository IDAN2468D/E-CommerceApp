import { Text, View, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { InputText } from '../components';
import { MaterialIcons } from '@expo/vector-icons';
import Color from '../StyleGuide/Color';


const AddAddressScreen = ({ navigation }) => {
    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <InputText />
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Your Address</Text>
                <Pressable
                    onPress={() => navigation.navigate("Add")}
                    style={{
                        flexDirection: "row-reverse",
                        alignItems: 'center',
                        justifyContent: "space-between",
                        marginTop: 10,
                        borderColor: Color.Light_gray,
                        borderWidth: 1,
                        borderLeftWidth: 0,
                        borderRightWidth: 0,
                        paddingVertical: 7,
                        paddingHorizontal: 5,
                    }}>
                    <Text>Address a new Address</Text>
                    <MaterialIcons name="keyboard-arrow-right" color="black" size={24} />
                </Pressable>
                <Pressable>
                    {/* all the added address */}

                </Pressable>
            </View>
        </ScrollView>
    )
}

export default AddAddressScreen;