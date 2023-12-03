import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ScrollView, ImageBackground, Dimensions, Pressable, Share, Alert, Platform } from 'react-native'
import Color from '../StyleGuide/Color'
import { ButtonText, InputText } from '../components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { MaterialCommunityIcons, AntDesign, Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/CartReducer'

const ProductInfoScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const width = Dimensions.get('window').width;
    const height = (width * 100) / 100;
    const [addedToCart, setAddedToCart] = useState(false);
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
                title: Platform.OS === 'android' ? 'React Native Share' : undefined,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log(`Shared with activity type: ${result.activityType}`);
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message);
        }
    };
    const dispatch = useDispatch();
    const addItemToCart = (item) => {
        setAddedToCart(true)
        dispatch(addToCart(item))
        setTimeout(() => {
            setAddedToCart(false)
        }, 60000);
    }
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart)
    return (
        <ScrollView style={{ flex: 1, backgroundColor: Color.White, }} showsVerticalScrollIndicator={false}>
            <InputText />
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {route.params.carouselImages.map((item, index) => (
                    <ImageBackground
                        style={{
                            width: width,
                            height: height,
                            marginTop: 25,
                            resizeMode: "contain"
                        }}
                        source={{ uri: item }}
                        key={index}
                    >
                        <View
                            style={{
                                padding: 20,
                                flexDirection: "row-reverse",
                                alignItems: 'center',
                                justifyContent: "space-between",
                            }}
                        >
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                    borderRadius: 30,
                                    backgroundColor: Color.Strong_red,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: "row-reverse",
                                    alignSelf: "flex-end",
                                }}>
                                <Text style={{ color: Color.White, textAlign: "center", fontWeight: '600' }}>20% off</Text>
                            </View>
                            <Pressable onPress={onShare}>
                                <View
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 30,
                                        backgroundColor: Color.Very_light_gray,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: "row-reverse",
                                        alignSelf: "flex-end",
                                    }}
                                >
                                    <MaterialCommunityIcons name="share-variant" color="black" size={24} />
                                </View>
                            </Pressable>
                        </View>
                        <View

                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 30,
                                backgroundColor: Color.Very_light_gray,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: "row-reverse",
                                alignSelf: "flex-end",
                                marginTop: "auto",
                                marginLeft: 10,
                                marginBottom: 20,
                            }}
                        >
                            <AntDesign name="hearto" color="black" size={24} />
                        </View>
                    </ImageBackground>
                ))}
            </ScrollView>
            <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 15, fontWeight: '500', }}>{route?.params?.title}</Text>
                <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 6, }}>₹{route?.params?.price}</Text>
            </View>
            <View style={{ height: 1, borderColor: "#D0D0D0", borderWidth: 1, }} />
            <View style={{ flexDirection: "row-reverse", alignItems: 'center', padding: 10 }}>
                <Text>Color: </Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{route.params.color}</Text>
            </View>
            <View style={{ flexDirection: "row-reverse", alignItems: 'center', padding: 10 }}>
                <Text>Size: </Text>
                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{route.params.size}</Text>
            </View>
            <View style={{ padding: 10, }}>
                <Text style={{ fontSize: 15, fontWeight: 'bold', marginVertical: 5, }}>Total : ₹{route.params.price}</Text>
                <Text style={{ color: Color.Strong_cyan }}>FREE delivery Tomorrow by 3 PM.Order width 10hrs 30 mins</Text>
                <View style={{ flexDirection: "row-reverse", marginVertical: 5, alignItems: 'center', gap: 5 }}>
                    <Ionicons name="location" size={24} color="black" />
                    <Text style={{ fontSize: 15, fontWeight: '500' }}>Deliver To Sujan - Bangalore</Text>
                </View>
            </View>
            <Text style={{ color: Color.Dark_lime_green, marginHorizontal: 10, fontWeight: '500', }}>IN Stock</Text>
            <ButtonText
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
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}
                onPress={() => addItemToCart(route.params.item)}
            />
            <ButtonText
                title="By Now"
                ContainerButton={{
                    backgroundColor: Color.Vivid_orange,
                    padding: 10,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    marginVertical: 10,
                }}
            />
        </ScrollView>
    )
}

export default ProductInfoScreen

const styles = StyleSheet.create({})