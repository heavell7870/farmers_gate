import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { View, Text, SafeAreaView } from 'react-native';
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setIsUser, setLogoutModal, setUserData } from '../../redux/actions/main';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function DrawerContent(props) {

    const dispatch = useDispatch()

    return (
        <DrawerContentScrollView {...props}>
            <View style={{ height: 55, width: '100%', justifyContent: 'center', shadowColor: color.black, shadowOffset: { height: 3, width: 0 }, shadowRadius: 3, shadowOpacity: 0.5, elevation: 5, backgroundColor: color.white }}>
                <Text style={{ marginLeft: '10%', ...GlobalStyles.dm_sans_bold }}>MENU</Text>
            </View>
            <View style={{ height: 20 }} />
            <DrawerItemList {...props} />
            <DrawerItem
                label="Whatsapp"
                icon={() => <Ionicons name="logo-whatsapp" color={color.black} size={18} />}
                onPress={() => alert("Coming soon")}
                labelStyle={{ marginLeft: -10, fontSize: 16, color: color.black, ...GlobalStyles.dm_sans_regular }}
                style={{ marginHorizontal: "7%", marginTop: 0, borderBottomWidth: 1, borderBottomColor: "rgba(0, 0, 0, 0.1)", }}
            />
            <DrawerItem
                label="Logout"
                icon={() => <Feather name="lock" color={color.black} size={18} />}
                onPress={() => dispatch(setLogoutModal(true))}
                labelStyle={{ marginLeft: -10, fontSize: 16, color: color.black, ...GlobalStyles.dm_sans_regular }}
                style={{ marginHorizontal: "7%", marginTop: 0 }}
            />
        </DrawerContentScrollView>
    )
}