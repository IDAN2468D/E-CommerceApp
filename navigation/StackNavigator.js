import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, RegisterScreen, HomeScreen, ProfileScreen, ProductInfoScreen, AddAddressScreen, AddressScreen } from '../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import COLORS from '../StyleGuide/Color';
import { Entypo, AntDesign, Ionicons } from '@expo/vector-icons';


const StackNavigator = () => {
    const Stack = createNativeStackNavigator();
    const Tab = createBottomTabNavigator();

    function BottomTabs() {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name='Cart'
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Cart",
                        tabBarLabelStyle: { color: COLORS.Dark_cyan },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <AntDesign name="shoppingcart" size={24} color={COLORS.Dark_cyan} />
                            ) : (
                                <AntDesign name="shoppingcart" color="black" size={25} />
                            )
                    }}
                />
                <Tab.Screen
                    name='Profile'
                    component={ProfileScreen}
                    options={{
                        tabBarLabel: "Profile",
                        tabBarLabelStyle: { color: COLORS.Dark_cyan },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Ionicons name="person" size={24} color={COLORS.Dark_cyan} />
                            ) : (
                                <Ionicons name="person-outline" color="black" size={25} />
                            )
                    }}
                />
                <Tab.Screen
                    name='Home'
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarLabelStyle: { color: COLORS.Dark_cyan },
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ? (
                                <Entypo name="home" size={24} color={COLORS.Dark_cyan} />
                            ) : (
                                <AntDesign name="home" color="black" size={25} />
                            )
                    }}
                />
            </Tab.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name='Info' component={ProductInfoScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Address' component={AddAddressScreen} options={{ headerShown: false }} />
                <Stack.Screen name='Add' component={AddressScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator;