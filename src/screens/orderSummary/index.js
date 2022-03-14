import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, Image } from 'react-native';
import Header from '../../components/Header';
import { color } from '../../utils/color';
import { GlobalStyles } from '../../utils/globalStyles';
import Entypo from '@expo/vector-icons/Entypo';
import { IMAGE_URL } from '../../utils/url';
import { useDispatch } from 'react-redux';
import { getLocation } from '../../redux/actions/main';
import common_axios from '../../utils/axios';
import Toast from '../../utils/toast';

export default function OrderSummary({ navigation, route }) {

    const [value, setValue] = useState(1)
    const [amount, setAmount] = useState(0)
    const [loading, setLoading] = useState(true)
    const [address, setAddress] = useState([])
    const [selectedAddress, setSelectedAddress] = useState({})
    const dispatch = useDispatch()

    const { img, desc, name, cat, id, price, maxQty } = route.params;

    useEffect(() => {
        updateState()
    }, [updateState])

    const updateState = useCallback(() => {
        setAmount(price)
        setLoading(false)
    }, [price]);

    useEffect(() => {
        fetch_address()
    }, []);

    const fetch_address = async () => {
        try {
            const { data } = await common_axios.get("/getuseraddress");
            console.log(data)
            if (data.data) {
                setAddress(data.data)
                setSelectedAddress(data.data.length > 0 ? data.data[data.data.length - 1] : {})
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getCurrentLocation = async () => {
        navigation.navigate("AddAddress", { current: true })
    }

    const addQuantity = () => {
        if (value == parseFloat(maxQty)) {
            alert("Maximum quantity reached");
            return;
        }
        setValue(value => value + 1);
        setAmount(val => parseFloat(val) + parseFloat(price))
    }

    const subtractQuantity = () => {
        if (value == 1) {
            alert("Quantity can't be less than 1");
            return;
        }
        setValue(value => value - 1);
        setAmount(val => parseFloat(val) - parseFloat(price))
    }

    const place_order = async () => {
        if (selectedAddress.id) {
            navigation.navigate("Payment", { name, img, desc, cat, id, qty: value })
        } else {
            Toast("Address is missing")
        }
    }

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetch_address()
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={{ backgroundColor: color.primary }}>
            <View style={{ height: "100%", width: "100%", backgroundColor: color.white }}>
                <TouchableOpacity onPress={() => place_order()} style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', height: 45, bottom: 15, right: 15, left: 15, backgroundColor: color.primary, borderRadius: 5, zIndex: 5 }}>
                    <Text style={{ fontSize: 16, color: color.white, ...GlobalStyles.dm_sans_bold }}>Place Order</Text>
                </TouchableOpacity>
                <Header title="Order Summary" type="back" />
                <ScrollView>
                    <View style={{ height: 100, width: "100%", justifyContent: 'center', alignItems: 'center', borderBottomColor: 'rgba(0, 0, 0, 0.6)', borderBottomWidth: 0.5 }}>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '10%' }}>
                                <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', backgroundColor: color.primary }}>
                                    <Text style={{ color: color.white }}>1</Text>
                                </View>
                            </View>
                            <View style={{ width: '60%', borderTopColor: color.black, borderWidth: 1 }} />
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: '10%' }}>
                                <View style={{ height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center', borderColor: "rgba(0, 0, 0, 0.6)", borderWidth: 0.5 }}>
                                    <Text style={{ color: 'rgba(0, 0, 0, 0.6)' }}>2</Text>
                                </View>
                                {/* <Text style={{ fontSize: 12, textAlign: 'center', ...GlobalStyles.regular_text }}>Payment</Text> */}
                            </View>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', width: "90%", alignSelf: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 12, textAlign: 'center', ...GlobalStyles.regular_text }}>Order summary</Text>
                            <Text style={{ fontSize: 12, textAlign: 'center', ...GlobalStyles.regular_text }}>Payment      </Text>
                        </View>
                    </View>
                    <View style={{ width: '100%', paddingVertical: 20, paddingHorizontal: 15, borderBottomWidth: 0.5, borderBottomColor: "rgba(0, 0, 0, 0.6)" }}>
                        {Object.keys(selectedAddress).length == 0 ? <>
                            <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_bold }}>Add address</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("AddAddress")} style={{ justifyContent: 'center', alignItems: 'center', height: 45, backgroundColor: color.primary, borderRadius: 5, marginTop: 15 }}>
                                <Text style={{ fontSize: 16, color: color.white, ...GlobalStyles.dm_sans_bold }}>Add Address</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => getCurrentLocation()} style={{ justifyContent: 'center', alignItems: 'center', height: 45, backgroundColor: color.primary, borderRadius: 5, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                                <Entypo name="location-pin" color={color.white} size={18} />
                                <Text style={{ fontSize: 16, color: color.white, marginLeft: 5, ...GlobalStyles.dm_sans_bold }}>Use current location</Text>
                            </TouchableOpacity></> :
                            <View style={{ width: "100%" }}>
                                <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_bold }}>Add address</Text>
                                <View style={{ width: "100%", padding: 15, borderRadius: 10, elevation: 10, shadowColor: color.black, shadowOffset: { height: 3, width: 0 }, shadowOpacity: 0.5, shadowRadius: 3, backgroundColor: color.white, marginTop: 10 }}>
                                    <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", width: "100%" }}>
                                        <Text style={{ ...GlobalStyles.semi_bold_text600 }}>{selectedAddress.name || 'Missing'}</Text>
                                        <Entypo onPress={() => navigation.navigate("AddAddress", { editing: true, data: selectedAddress })} size={14} name={"edit"} />
                                    </View>
                                    <Text style={{ color: color.semiBlack, marginTop: 5, fontSize: 14, ...GlobalStyles.regular_text }}>{selectedAddress.address}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.pincode}</Text>
                                    <Text style={{ marginTop: 3, ...GlobalStyles.semi_bold_text }}>Mobile: <Text style={{ color: color.semiBlack, ...GlobalStyles.regular_text }}>{selectedAddress.phone || "8888777766"}</Text></Text>
                                </View>
                                <TouchableOpacity onPress={() => getCurrentLocation()} style={{ justifyContent: 'center', alignItems: 'center', height: 45, backgroundColor: color.primary, borderRadius: 5, marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <Entypo name="location-pin" color={color.white} size={18} />
                                    <Text style={{ fontSize: 16, color: color.white, marginLeft: 5, ...GlobalStyles.dm_sans_bold }}>Use current location</Text>
                                </TouchableOpacity>
                            </View>}
                    </View>
                    <View style={{ width: '100%', paddingVertical: 20, paddingHorizontal: 15, }}>
                        <Text style={{ fontSize: 16, ...GlobalStyles.dm_sans_bold }}>Order details</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', marginTop: 15, justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image style={{ height: 100, width: 100, resizeMode: "contain" }} source={{ uri: `${IMAGE_URL}${img}` }} />
                                <View style={{ marginLeft: 15 }}>
                                    <Text style={{ fontSize: 16, marginTop: -15, ...GlobalStyles.dm_sans_bold }}>{name}</Text>
                                    <Text style={{ fontSize: 12, marginTop: 5, ...GlobalStyles.dm_sans_regular }}>{cat}</Text>
                                    <Text style={{ fontSize: 12, marginTop: 10, color: color.semiBlack, ...GlobalStyles.dm_sans_regular }}>Price: <Text style={{ fontSize: 16, color: color.black }}>₹{price}</Text></Text>
                                </View>
                            </View>
                            <View style={{ height: 74, width: 24, borderRadius: 5, borderColor: "#CECECE", borderWidth: 0.5 }}>
                                <TouchableOpacity onPress={() => addQuantity()} style={{ height: '33.3%', width: '100%', backgroundColor: "#E6E3DC", borderTopLeftRadius: 5, borderTopRightRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>+</Text>
                                </TouchableOpacity>
                                <View style={{ height: '33.3%', width: '100%', backgroundColor: color.white, borderTopLeftRadius: 5, borderTopRightRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>{value}</Text>
                                </View>
                                <TouchableOpacity onPress={() => subtractQuantity()} style={{ height: '33.3%', width: '100%', backgroundColor: "#E6E3DC", borderBottomLeftRadius: 5, borderBottomRightRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>-</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <Text style={{ fontSize: 16, marginTop: 30, ...GlobalStyles.dm_sans_bold }}>Price details</Text>
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', marginTop: 15 }}>
                            <Text style={{ color: "rgba(108, 108, 108, 1)", ...GlobalStyles.regular_text }}>Product price</Text>
                            <Text>₹<Text style={{ color: color.black, ...GlobalStyles.regular_text }}>{amount}</Text></Text>
                        </View>
                        {/* <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
                        <Text style={{ color: "rgba(108, 108, 108, 1)", ...GlobalStyles.regular_text }}>Delivery charges</Text>
                        <Text style={{ color: color.black, ...GlobalStyles.dm_sans_regular }}>₹99</Text>
                    </View> */}
                        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', marginTop: 15, borderTopColor: "#CECECE", borderTopWidth: 0.5, borderBottomWidth: 0.5, borderBottomColor: "#CECECE", paddingVertical: 12 }}>
                            <Text style={{ color: color.primary, ...GlobalStyles.dm_sans_medium }}>Total Amount</Text>
                            <Text style={{ color: color.primary, ...GlobalStyles.dm_sans_regular }}>₹{amount}</Text>
                        </View>
                    </View>
                    <View style={{ height: 60, width: "100%", }} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}