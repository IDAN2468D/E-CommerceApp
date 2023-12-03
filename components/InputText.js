import React from 'react'
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import Color from '../StyleGuide/Color';
import { AntDesign, Feather } from '@expo/vector-icons';


const InputTextComponent = ({ onPress }) => {
    return (
        <View
            style={{
                backgroundColor: Color.Strong_cyan,
                padding: 10,
                flexDirection: "row-reverse",
                alignItems: 'center',
            }}>
            <Pressable
                style={{
                    flex: 1,
                    flexDirection: "row-reverse",
                    alignItems: 'center',
                    marginHorizontal: 7,
                    gap: 10,
                    backgroundColor: Color.White,
                    borderRadius: 3,
                    height: 38,
                }}
                onPress={onPress}
            >
                <AntDesign style={{ marginRight: 10 }} name='search1' size={24} color={Color.Black} />
                <TextInput placeholder='Search Amazon.in' />
            </Pressable>
            <Feather name="mic" color="black" size={25} />
        </View>
    )
}

export default InputTextComponent;
