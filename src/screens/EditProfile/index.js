import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { color } from "../../utils/color";
import Header from "../../components/Header"
import { GlobalStyles } from "../../utils/globalStyles";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import AntDesign from "@expo/vector-icons/AntDesign";
import FloatingLabel from "../../components/FloatingLabel";
import * as ImagePicker from 'expo-image-picker';
import common_axios from "../../utils/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND_URL } from "../../utils/url";
import { setUserData } from "../../redux/actions/main";

export default function EditProfile({ navigation }) {

    const { user_data } = useSelector(state => state.reducer);
    console.log(user_data)

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [image, setImage] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        setEmail(user_data.email)
        setPhone(user_data.phone)
        setName(user_data.name)
        setImage(user_data.profile_pic)
    }, []);

    const pick_image = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Photos,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    }

    const update = async () => {
        let form_data = new FormData()
        if (email?.length != 0 && user_data.email != email) {
            form_data.append("email", email);
        }
        if (name?.length != 0 && user_data.name != name) {
            form_data.append("name", name);
        }
        if (phone?.length != 0 && user_data.phone != phone) {
            form_data.append("phone", phone);
        }
        if (image?.length != 0 && user_data.profile_pic != image) {
            form_data.append("profile_pic", {
                type: "image/png",
                name: `${user_data.name}.png`,
                uri: image
            });
        }

        // const { data } = await common_axios.post('/auth/update_profile', form_data);
        // console.log(data, 'data');
        const token = await AsyncStorage.getItem('access_token')
        fetch(`${BACKEND_URL}/auth/update_profile`, {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
            body: form_data
        }).then((res) => res.json())
            .then(async (json) => {
                dispatch(setUserData(json.data))
                await AsyncStorage.setItem('user_data', JSON.stringify(json.data))
                navigation.goBack(null)
            }).catch((e) => {
                console.log(e)
            })

    }

    return (
        <SafeAreaView style={{ backgroundColor: color.light_primary }}>
            <View style={{ height: '100%', width: "100%", alignItems: 'center', backgroundColor: color.white }}>
                <Header type="custom" rightBtnVisible={false} right_text={"Edit"} onRightBtnPress={() => console.log("Hii")} title={"Edit Profile"} />
                <View style={{ height: 70, width: 70, borderRadius: 35, marginTop: 60 }}>
                    <Image source={{ uri: image ? image : 'https://picsum.photos/200' }} style={{ height: 70, width: 70, borderRadius: 35 }} />
                    <TouchableOpacity onPress={pick_image} style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 100, position: 'absolute' }}>
                        <AntDesign color={color.white} size={20} name={"camerao"} />
                    </TouchableOpacity>
                </View>
                <View style={{ width: "90%", marginTop: 27 }}>
                    <FloatingLabel
                        value={name}
                        style={{ backgroundColor: color.transparent, marginTop: 40, borderColor: "#c4c4c4", borderRadius: 5, }}
                        label={"User Name"}
                        labelColor={color.black}
                        autoCapitalize="none"
                        inputStyle={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 12 }}
                        onChangeText={(value) => {
                            setName(value);
                        }}
                    />
                    <FloatingLabel
                        value={phone}
                        style={{ backgroundColor: color.transparent, marginTop: 40, borderColor: "#c4c4c4", borderRadius: 5, color: 'rgba(0, 0, 0, 0.6)' }}
                        label={"Phone Number"}
                        autoCapitalize="none"
                        inputStyle={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 12 }}
                        labelColor={color.black}
                        onChangeText={(value) => {
                            setPhone(value);
                        }}
                    />
                    <FloatingLabel
                        value={email}
                        style={{ backgroundColor: color.transparent, marginTop: 40, borderColor: "#c4c4c4", borderRadius: 5, color: 'rgba(0, 0, 0, 0.6)' }}
                        label={"Email Address"}
                        labelColor={color.black}
                        inputStyle={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: 12 }}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                            setEmail(value);
                        }}
                    />
                </View>
                <View style={{ position: 'absolute', bottom: 15, left: '5%', right: '5%', height: 60 }}>
                    <Button onPress={() => update()} titleStyle={{ color: color.white, fontSize: 16, ...GlobalStyles.dm_sans_bold }} title="Save" style={{ backgroundColor: color.primary, width: "100%", borderRadius: 5 }} />
                </View>
            </View>
        </SafeAreaView>
    )
}