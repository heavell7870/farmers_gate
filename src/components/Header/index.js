import React from 'react';
import { View, Text, TouchableOpacity, Image, Platform } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { color } from '../../utils/color';
import { GlobalStyles } from '../../utils/globalStyles';
import { icons, images } from '../../utils/icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

export default function Header({ type, bagVisible, logo, subText, searchVisible, notifyVisible, title, right_text, onRightBtnPress, rightBtnVisible, onBagPress, onNotifyPress }) {

    const navigation = useNavigation()

    if (type == 'custom') {
        return (
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: color.light_primary, paddingVertical: 15, alignItems: "center", paddingTop: Platform.OS == 'android' ? Constants.statusBarHeight + 10 : 15 }}>
                <View>
                    <TouchableOpacity onPress={() => navigation.goBack(null)}>
                        <Feather style={{ marginLeft: 0 }} name='arrow-left' color={color.white} size={25} />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: color.white, fontSize: 20, marginLeft: 15, maxWidth: "80%", ...GlobalStyles.bold_text }}>{title}</Text>
                {rightBtnVisible ? <TouchableOpacity numberOfLines={1} onPress={onRightBtnPress}>
                    <Text style={{ fontSize: 16, color: color.white, ...GlobalStyles.dm_sans_medium }}>{right_text}</Text>
                </TouchableOpacity> : <View style={{ width: 25 }} />}
            </View>
        )
    }

    if (type == 'back') {
        return (
            <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: color.light_primary, paddingVertical: 15, alignItems: "center", paddingTop: Platform.OS == 'android' ? Constants.statusBarHeight + 10 : 15 }}>
                <View style={{ flexDirection: 'row', }}>
                    <TouchableOpacity onPress={() => navigation.goBack(null)}>
                        <Feather style={{ marginLeft: 0 }} name='arrow-left' color={color.white} size={25} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={{ color: color.white, fontSize: 20, marginLeft: 15, width: "68%", ...GlobalStyles.bold_text }}>{title}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center' }}>
                    {bagVisible ? <Image source={icons.bag} style={{ height: 20, width: 16 }} /> : null}
                    {searchVisible ? <Image source={icons.search} style={{ height: 20, width: 20, marginLeft: 15 }} /> : null}
                    {notifyVisible ? <TouchableOpacity onPress={() => navigation.navigate("Notifications")}><Image source={icons.notify} style={{ height: 24, width: 24, marginLeft: 15 }} /></TouchableOpacity> : null}
                </View>
            </View>
        )
    }
    return (
        <View style={{ width: "100%", flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 15, backgroundColor: color.light_primary, paddingVertical: 15, alignItems: "center", paddingTop: Platform.OS == 'android' ? Constants.statusBarHeight + 10 : 15 }}>
            <View>
                <Feather onPress={() => navigation.openDrawer()} name='menu' color={color.white} size={20} />
            </View>
            <View>
                <Image style={{ height: 32, width: 60, resizeMode: "contain" }} source={images.white_logo} />
            </View>
            <TouchableOpacity onPress={onBagPress} style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                {bagVisible ? <Image source={icons.bag} style={{ height: 20, width: 16 }} /> : <View style={{ height: 20, width: 16 }} />}
            </TouchableOpacity>
        </View>
    )
}