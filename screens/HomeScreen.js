import React, { useReducer, useEffect, useState, useCallback } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, ScrollView, Pressable, Image, Modal } from 'react-native';
import COLORS from '../StyleGuide/Color';
import { InputText, ProductItem } from '../components';
import { Ionicons, MaterialIcons, Entypo, AntDesign } from '@expo/vector-icons';
import Color from '../StyleGuide/Color';
import Data from '../data/Data';
import { CarouselSlider } from "react-native-carousel-image-slider";
import { reducer, initialState } from '../Reducer/HomeScreenReducer';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { useSelector } from 'react-redux';

const HomeScreen = ({ navigation }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [open, setOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [category, setCategory] = useState("men's clothing");
    const [items, setItems] = useState([
        { label: "Men's clothing", value: "men's clothing" },
        { label: "jewelery", value: "jewelery" },
        { label: "electronics", value: "electronics" },
        { label: "women's clothing", value: "women's clothing" }
    ])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://fakestoreapi.com/products");
                dispatch({ type: "SET_PRODUCTS", payload: response.data });
            } catch (error) {
                console.log("error message", error);
            }
        }
        fetchData()
    }, []);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const onGenderOpen = useCallback(() => {
        //setCompanyOpen(false)
    }, [])

    console.log("products", state.products);
    const cart = useSelector((state) => state.cart.cart);
    console.log(cart);

    return (
        <>
            <View style={{ paddingTop: Platform.OS === "ios" ? 40 : 0, flex: 1, backgroundColor: COLORS.White }}>
                <StatusBar barStyle='dark-content' backgroundColor="white" />
                <ScrollView>
                    <InputText />
                    <View style={{ flexDirection: "row-reverse", alignItems: 'center', gap: 5, padding: 10, backgroundColor: Color.Very_soft_cyan, }}>
                        <Ionicons name="locate-outline" color="black" size={25} />
                        <Pressable onPress={toggleModal}>
                            <Text style={{ fontSize: 13, fontWeight: "500" }}>Deliver to - Bangalore 560021</Text>
                        </Pressable>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                    </View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {Data.list.map((item, index) => {
                            return (
                                <Pressable
                                    key={index}
                                    style={{ margin: 10, justifyContent: 'center' }}
                                >
                                    <Image source={{ uri: item.image }} style={{ width: 50, height: 50, resizeMode: "contain" }} />
                                    <Text style={{ textAlign: "center", fontSize: 12, fontWeight: '500', marginTop: 5, }}>{item.name}</Text>
                                </Pressable>
                            )
                        })}
                    </ScrollView>
                    <View style={{ bottom: 50 }}>
                        <CarouselSlider
                            inactiveDotColor={COLORS.Very_dark_blue}
                            activeDotColor={COLORS.Dark_grayish_blue}
                            imageStyle={{ width: 400, height: "100%" }}
                            images={Data.images}
                            resizeMode="cover"
                            renderDots={true}
                            dotStyle={{ bottom: 40, zIndex: 2, }}
                        />
                        <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold' }}>Trending Deals of the week</Text>
                        <View style={{ flexDirection: "row-reverse", alignItems: 'center', flexWrap: 'wrap' }}>
                            {Data.deals.map((item, index) => {
                                return (
                                    <Pressable
                                        onPress={() => navigation.navigate("Info", {
                                            id: item.id,
                                            title: item.title,
                                            price: item.price,
                                            carouselImages: item.carouselImages,
                                            color: item.color,
                                            size: item.size,
                                            oldPrice: item.oldPrice,
                                            item: item,
                                        })}
                                        key={index}
                                        style={{
                                            marginVertical: 10,
                                            flexDirection: "row-reverse",
                                            alignItems: 'center'
                                        }}>
                                        <Image source={{ uri: item?.image }} style={{ width: 180, height: 180, resizeMode: "contain" }} />
                                    </Pressable>
                                )
                            })}
                        </View>
                        <View style={{ height: 1, borderColor: COLORS.Dark_grayish_blue, borderWidth: 2, marginTop: 15, }} />
                        <Text style={{ padding: 10, fontSize: 18, fontWeight: 'bold', }}>Today's Deals</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {Data.offers.map((item, index) => {
                                return (
                                    <Pressable
                                        onPress={() => navigation.navigate("Info", {
                                            id: item.id,
                                            title: item.title,
                                            price: item.price,
                                            carouselImages: item.carouselImages,
                                            color: item.color,
                                            size: item.size,
                                            oldPrice: item.oldPrice,
                                            item: item,
                                        })}
                                        key={index}
                                        style={{
                                            marginVertical: 10,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Image source={{ uri: item?.image }} style={{ width: 150, height: 150, resizeMode: "contain" }} />
                                        <View
                                            style={{
                                                backgroundColor: COLORS.Vivid_red,
                                                paddingVertical: 5,
                                                width: 130,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                marginTop: 10,
                                                borderRadius: 4,
                                            }}
                                        >
                                            <Text style={{ textAlign: "center", color: COLORS.White, fontSize: 13, fontWeight: 'bold', }}>Upto {item?.offer}</Text>
                                        </View>
                                    </Pressable>
                                )
                            })}
                        </ScrollView>
                        <View style={{ height: 1, borderColor: COLORS.Dark_grayish_blue, borderWidth: 2, marginTop: 15, }} />
                        <View
                            style={{
                                marginHorizontal: 10,
                                width: "45%",
                                alignSelf: "flex-end",
                                marginTop: 20,
                                marginBottom: open ? 120 : 15,
                            }}
                        >
                            <DropDownPicker
                                style={{
                                    borderColor: Color.Gray_2,
                                    height: 30,
                                    marginBottom: open ? 50 : 15,
                                }}
                                open={open}
                                value={category}
                                items={items}
                                setOpen={setOpen}
                                setValue={setCategory}
                                setItems={setItems}
                                placeholder="choose category"
                                //placeholderStyle={styles.placeholderStyle}
                                onOpen={onGenderOpen}
                                //onChangeValue={onChange}
                                zIndex={3000}
                                zIndexInverse={1000}
                            />
                        </View>
                        <View style={{ flexDirection: "row-reverse", alignItems: 'center', flexWrap: 'wrap', }}>
                            {state.products?.filter((item) => item.category === category)?.map((item, index) => (
                                <ProductItem item={item} key={index} />
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                statusBarTranslucent={true}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Pressable onPress={toggleModal}>
                            <Entypo name="cross" size={24} color="black" />
                        </Pressable>
                        <View style={{ marginBottom: 8 }}>
                            <Text style={styles.modalText}>Choose your Location</Text>
                            <Text style={styles.subTitle}>Select a delivery location to see product availability and delivery options</Text>
                        </View>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {/* already added addresses */}
                            <Pressable
                                style={{
                                    width: 140,
                                    height: 140,
                                    borderColor: COLORS.Light_gray,
                                    marginTop: 10,
                                    padding: 10,
                                    borderWidth: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                onPress={() => { setModalVisible(false), navigation.navigate("Address") }}
                            >
                                <Text style={{ textAlign: "center", color: COLORS.Dark_blue, fontWeight: "500" }}>Add an Address or pick-up point</Text>
                            </Pressable>
                        </ScrollView>
                        <View style={{ flexDirection: "column-reverse", gap: 7, marginBottom: 10 }}>
                            <View style={{ flexDirection: "row-reverse", alignItems: 'center', gap: 5 }}>
                                <AntDesign name="earth" size={24} color={COLORS.Dark_blue} />
                                <Text style={{ color: COLORS.Dark_blue, fontWeight: '400' }}>Deliver outside India</Text>
                            </View>
                            <View style={{ flexDirection: "row-reverse", alignItems: 'center', gap: 5 }}>
                                <Ionicons name="locate-sharp" size={24} color={COLORS.Dark_blue} />
                                <Text style={{ color: COLORS.Dark_blue, fontWeight: '400' }}>Use My Correct location</Text>
                            </View>

                            <View style={{ flexDirection: "row-reverse", alignItems: 'center', gap: 5 }}>
                                <Entypo name="location-pin" size={24} color={COLORS.Dark_blue} />
                                <Text style={{ color: COLORS.Dark_blue, fontWeight: '400' }}>Enter an Indian PinCode</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        position: "absolute",
        width: "100%",
        bottom: 0,
    },
    modalView: {
        height: 410,
        backgroundColor: 'white',
        padding: 20,
        elevation: 8,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    modalText: {
        fontSize: 16,
        fontWeight: '500',
    },
    subTitle: {
        marginTop: 5,
        fontSize: 16,
        color: Color.Gray,
    }
});

export default HomeScreen;