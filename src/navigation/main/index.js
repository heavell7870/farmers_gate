import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../screens/home';
import Steps from '../../screens/Steps';
import StepsDescription from '../../screens/stepDescription';
import Category from '../../screens/Category';
import ProductDescription from '../../screens/productDescription';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyProfile from '../../screens/MyProfile';
import MyOrders from '../../screens/MyOrders';
import Notifications from '../../screens/Notifications';
import DrawerContent from '../../components/DrawerContent';
import AntDesign from '@expo/vector-icons/AntDesign';
import { color } from '../../utils/color';
import Feather from '@expo/vector-icons/Feather';
import { GlobalStyles } from '../../utils/globalStyles';
import EditProfile from '../../screens/EditProfile';
import OrderSummary from '../../screens/orderSummary';
import Payment from '../../screens/Payment';
import AddAddress from '../../screens/AddAddress';
import { BottomSheet } from "react-native-btr";
import { useDispatch, useSelector } from 'react-redux';
import { setIsUser, setLogoutModal, setUserData } from '../../redux/actions/main';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeStack = () => {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen component={Home} name="Home" options={{ header: () => null }} />
            <Stack.Screen component={Steps} name="Steps" options={{ header: () => null }} />
            <Stack.Screen component={StepsDescription} name="StepsDescription" options={{ header: () => null }} />
            <Stack.Screen component={Category} name="Category" options={{ header: () => null }} />
            <Stack.Screen component={ProductDescription} name="ProductDescription" options={{ header: () => null }} />
            <Stack.Screen component={Notifications} name="Notifications" options={{ header: () => null }} />
            <Stack.Screen component={EditProfile} name="EditProfile" options={{ header: () => null }} />
            <Stack.Screen component={OrderSummary} name="OrderSummary" options={{ header: () => null }} />
            <Stack.Screen component={Payment} name="Payment" options={{ header: () => null }} />
            <Stack.Screen component={AddAddress} name="AddAddress" options={{ header: () => null }} />
        </Stack.Navigator>
    )
}

function MainNav() {

    const Drawer = createDrawerNavigator();
    const logout_modal = useSelector(state => state.reducer.logout_modal);
    const dispatch = useDispatch();

    const logout = async () => {
        await AsyncStorage.clear()
        dispatch(setIsUser(false))
        dispatch(setUserData({}))
        dispatch(setLogoutModal(false))
    }

    return (
        <>
            <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />} screenOptions={{ drawerActiveBackgroundColor: "transparent", drawerItemStyle: { marginHorizontal: "7%", paddingLeft: 0, borderBottomWidth: 1, borderBottomColor: "rgba(0, 0, 0, 0.1)", marginTop: 0 }, drawerInactiveTintColor: color.black, drawerActiveTintColor: color.primary, drawerLabelStyle: { fontSize: 16, marginLeft: -10, ...GlobalStyles.dm_sans_regular } }}>
                <Drawer.Screen component={HomeStack} name="HomeStack" options={{ header: () => null, title: "Home", drawerIcon: ({ color }) => <AntDesign name="home" color={color} size={18} />, }} />
                <Drawer.Screen component={MyProfile} name="MyProfile" options={{ header: () => null, title: "My Profile", drawerIcon: ({ color }) => <Feather name="user" color={color} size={18} />, }} />
                <Drawer.Screen component={MyOrders} name="MyOrders" options={{ header: () => null, title: "My Orders", drawerIcon: ({ color }) => <Feather name="shopping-bag" color={color} size={18} />, }} />
            </Drawer.Navigator>
            <BottomSheet visible={logout_modal} onBackButtonPress={() => dispatch(setLogoutModal(false))} onBackdropPress={() => dispatch(setLogoutModal(false))}>
                <View style={{ width: "100%", backgroundColor: color.white, paddingTop: 15 }}>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Text style={{ ...GlobalStyles.bold_text, fontSize: 16, }}>Logout</Text>
                        <Text style={{ color: color.semiBlack, marginTop: 2, ...GlobalStyles.regular_text }}>Are you sure you want to logout?</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: 'center', width: "100%", borderTopColor: color.light_grey, borderTopWidth: 0.5, marginTop: 32, marginBottom: Platform.OS == 'android' ? 0 : 20 }}>
                        <TouchableOpacity onPress={() => dispatch(setLogoutModal(false))} style={{ width: "50%", height: 45, justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.5, borderRightColor: color.light_grey }}>
                            <Text style={{ fontSize: 16, color: color.light_grey, ...GlobalStyles.semi_bold_text }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={logout} style={{ width: "50%", height: 45, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 16, color: color.red, ...GlobalStyles.semi_bold_text }}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
        </>
    )
}

export default MainNav;