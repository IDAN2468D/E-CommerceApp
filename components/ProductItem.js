import React, { useState } from 'react'
import { Text, View, Pressable, Image } from 'react-native'
import Color from '../StyleGuide/Color';
import ButtonText from './ButtonText';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/CartReducer';

const ProductItem = ({ item }) => {
    const dispatch = useDispatch()
    const [addedToCart, setAddedToCart] = useState(false);

    const addItemToCart = (item) => {
        setAddedToCart(true)
        dispatch(addToCart(item))
        setTimeout(() => {
            setAddedToCart(false)
        }, 60000);
    }

    return (
        <Pressable style={{ marginHorizontal: 20, marginVertical: 25 }}>
            <Image style={{ width: 150, height: 150, resizeMode: "contain" }} source={{ uri: item?.image }} />

            <Text numberOfLines={1} style={{ width: 150, marginTop: 10, }}>{item?.title}</Text>

            <View style={{ marginTop: 5, flexDirection: "row-reverse", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', }}>₹{item?.price}</Text>
                <Text style={{ color: Color.Vivid_orange, fontWeight: 'bold', }}>{item?.rating?.rate} ratings</Text>
            </View>

            <ButtonText
                onPress={() => addItemToCart()}
                title={addedToCart ? (
                    <View>
                        <Text>added To Cart</Text>
                    </View>
                ) : (
                    <Text>add To Cart</Text>
                )}
                ContainerButton={{
                    backgroundColor: Color.Vivid_orange,
                    padding: 10,
                    borderRadius: 20,
                    marginHorizontal: 10,
                    marginTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
        </Pressable>
    )
}

export default ProductItem;