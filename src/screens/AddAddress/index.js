import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import FloatingLabel from "../../components/FloatingLabel";
import Header from "../../components/Header";
import { getLocation } from "../../redux/actions/main";
import common_axios from "../../utils/axios";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";

export default function AddAddress({ navigation, route }) {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [pincode, setPincode] = useState('')
    const [state, setState] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [locality, setLocality] = useState('')
    const [loading, setLoading] = useState(false)
    const current = route.params?.current
    const editing = route.params?.editing
    const data = route.params?.data
    const dispatch = useDispatch()

    useEffect(() => {
        if (current) {
            getCurrentLoc()
        }
    }, [current])

    useEffect(() => {
        if (editing) {
            setFields()
        }
    }, [setFields])

    const setFields = useCallback(() => {
        setName(data.name);
        setPhone(data.phone);
        setPincode(data.pincode);
        setState(data.state);
        setAddress(data.address);
        setCity(data.city);
        setLocality(data.locality)
    }, [data])

    const getCurrentLoc = async () => {
        setLoading(true)
        const loc = await dispatch(getLocation())
        console.log(loc)
        const { data } = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${loc.coords?.latitude},${loc.coords?.longitude}&key=${'AIzaSyA_nmZVriBFLHl4ZdmN7d_WVr9PEH2sZa4'}`);
        console.log(data)
        if (data.status == 'OK') {
            setAddress(data.results[0].formatted_address);
            const letVar = data.results[0].address_components;
            letVar.forEach(item => {
                item.types.forEach(qr => {
                    if (qr === 'locality') {
                        setLocality(item.long_name);
                    }
                    if (qr === 'administrative_area_level_2') {
                        setCity(item.long_name);
                    }
                    if (qr === 'administrative_area_level_1') {
                        setState(item.long_name);
                    }
                    if (qr === 'postal_code') {
                        setPincode(item.long_name);
                    }
                });
            });
            setLoading(false);
        }
        setLoading(false);
    }

    const { user_data } = useSelector(state => state.reducer);

    function hasNumber(myString) {
        return /\d/.test(myString);
    }

    const submit = async () => {
        if (name.length == 0) {
            alert("Enter a valid name");
            return;
        }

        if (hasNumber(name)) {
            alert("Name shouldn't contain number.");
            return;
        }

        if (phone.length != 10) {
            alert("Enter a valid mobile number");
            return;
        }

        if (pincode.length != 6) {
            alert("Enter a valid pincode");
            return;
        }

        if (state.length == 0) {
            alert("Enter a valid state");
            return;
        }

        if (hasNumber(state)) {
            alert("State shouldn't contain number.");
            return;
        }


        if (city.length == 0) {
            alert("Enter a valid city");
            return;
        }

        if (hasNumber(city)) {
            alert("City shouldn't contain number.");
            return;
        }

        if (locality.length == 0) {
            alert("Enter a valid locality");
            return;
        }

        if (hasNumber(locality)) {
            alert("Locality shouldn't contain number.");
            return;
        }
        setLoading(true)

        if (editing) {
            try {
                const { data } = await common_axios.post('/updateaddress', {
                    user_id: user_data.id,
                    pincode,
                    state,
                    address,
                    city,
                    locality,
                });
                if (data.status == "1") {
                    setLoading(false)
                    navigation.goBack(null)
                }
            } catch (e) {
                setLoading(false)
                console.log(e?.response?.data?.message)
            }
            return;
        }

        try {
            const { data } = await common_axios.post('/useraddress', {
                user_id: user_data.id,
                pincode,
                state,
                address,
                city,
                locality,
                phone,
                name
            });
            if (data.status == "1") {
                setLoading(false)
                navigation.goBack(null)
            }
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: color.primary }}>
            <Header type="back" title="Add new address" />
            <View style={{ height: "100%", width: "100%", paddingHorizontal: 15, paddingVertical: 20, backgroundColor: color.white }}>
                <ScrollView>
                    {!editing && <FloatingLabel
                        value={name}
                        style={{ backgroundColor: color.transparent, marginTop: 20, borderColor: "#c4c4c4", borderRadius: 5, color: color.black }}
                        label={"Name"}
                        labelColor={color.black}
                        inputStyle={{ color: color.black, fontSize: 16 }}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                            setName(value);
                        }}
                    />}
                    {!editing && <FloatingLabel
                        value={phone}
                        maxLength={10}
                        style={{ backgroundColor: color.transparent, marginTop: 40, borderColor: "#c4c4c4", borderRadius: 5, color: color.black }}
                        label={"Mobile Number"}
                        keyboardType={"phone-pad"}
                        labelColor={color.black}
                        inputStyle={{ color: color.black, fontSize: 16 }}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                            setPhone(value);
                        }}
                    />}
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <FloatingLabel
                            value={pincode}
                            maxLength={6}
                            keyboardType={"phone-pad"}
                            style={{ backgroundColor: color.transparent, marginTop: 40, borderColor: "#c4c4c4", borderRadius: 5, color: color.black, width: '47%' }}
                            label={"Pincode"}
                            labelColor={color.black}
                            inputStyle={{ color: color.black, fontSize: 16 }}
                            autoCapitalize="none"
                            onChangeText={(value) => {
                                setPincode(value);
                            }}
                        />
                        <FloatingLabel
                            value={state}
                            style={{ backgroundColor: color.transparent, marginTop: 40, borderColor: "#c4c4c4", borderRadius: 5, color: color.black, width: '47%' }}
                            label={"State"}
                            labelColor={color.black}
                            inputStyle={{ color: color.black, fontSize: 16 }}
                            autoCapitalize="none"
                            onChangeText={(value) => {
                                setState(value);
                            }}
                        />
                    </View>
                    <FloatingLabel
                        value={address}
                        style={{ backgroundColor: color.transparent, marginTop: 40, borderColor: "#c4c4c4", borderRadius: 5, color: color.black }}
                        label={"Address"}
                        labelColor={color.black}
                        inputStyle={{ color: color.black, fontSize: 16 }}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                            setAddress(value);
                        }}
                    />
                    <FloatingLabel
                        value={city}
                        style={{ backgroundColor: color.transparent, marginTop: 40, borderColor: "#c4c4c4", borderRadius: 5, color: color.black }}
                        label={"City"}
                        labelColor={color.black}
                        inputStyle={{ color: color.black, fontSize: 16 }}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                            setCity(value);
                        }}
                    />
                    <FloatingLabel
                        value={locality}
                        style={{ backgroundColor: color.transparent, marginTop: 40, borderColor: "#c4c4c4", borderRadius: 5, color: color.black }}
                        label={"Locality"}
                        labelColor={color.black}
                        inputStyle={{ color: color.black, fontSize: 16 }}
                        autoCapitalize="none"
                        onChangeText={(value) => {
                            setLocality(value);
                        }}
                    />
                    <TouchableOpacity onPress={() => submit()} style={{ justifyContent: 'center', alignItems: 'center', height: 45, backgroundColor: color.primary, borderRadius: 5, marginTop: editing ? 100 : 30 }}>
                        {loading ? <ActivityIndicator color={color.white} size={'small'} /> : <Text style={{ fontSize: 16, color: color.white, ...GlobalStyles.dm_sans_bold }}>Submit</Text>}
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}