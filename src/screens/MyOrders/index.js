import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { color } from "../../utils/color";
import Header from "../../components/Header"
import { GlobalStyles } from "../../utils/globalStyles";
import { useSelector } from "react-redux";
import Button from "../../components/Button";
import Feather from '@expo/vector-icons/Feather';
import common_axios from "../../utils/axios";
import { IMAGE_URL } from "../../utils/url";

export default function MyOrders({ navigation }) {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch_data()
    }, []);

    const fetch_data = async () => {
        const { data: res } = await common_axios.get('/userorder')
        if (res.status == "1") {
            setData(res.data)
            setLoading(false)
        }
        setLoading(false)
    }

    console.log(data)

    if (loading) {
        return (
            <SafeAreaView style={{ backgroundColor: color.light_primary }}>
                <View style={{ height: '100%', width: "100%", alignItems: 'center', backgroundColor: color.white, justifyContent: 'center' }}>
                    <ActivityIndicator color={color.primary} size={'large'} />
                </View>
            </SafeAreaView>
        )
    }

    if (data.length == 0) {
        return (
            <SafeAreaView style={{ backgroundColor: color.light_primary }}>
                <View style={{ height: '100%', width: "100%", alignItems: 'center', backgroundColor: color.white }}>
                    <Header type="custom" rightBtnVisible={false} right_text={"Edit"} onRightBtnPress={() => navigation.navigate("EditProfile")} title={"My Orders"} />
                    <View style={{ alignItems: 'center', justifyContent: "center", height: '100%', width: '100%' }}>
                        <View style={{ marginTop: -100, alignItems: 'center', justifyContent: "center", }}>
                            <Feather name={"shopping-bag"} size={41} color={color.black} />
                            <Text style={{ color: color.black, marginTop: 15, fontSize: 24, textAlign: 'center', ...GlobalStyles.dm_sans_bold }}>No Orders!</Text>
                            <Text style={{ color: 'rgba(10, 10, 10, 0.7)', marginTop: 15, fontSize: 14, textAlign: 'center', ...GlobalStyles.dm_sans_regular }}>Order now and get requirement fulfilled</Text>
                        </View>
                    </View>
                    <View style={{ position: 'absolute', bottom: 15, left: '5%', right: '5%', height: 60 }}>
                        <Button onPress={() => navigation.goBack(null)} titleStyle={{ color: color.white, fontSize: 16, ...GlobalStyles.dm_sans_bold }} title="Go to Home" style={{ backgroundColor: color.primary, width: "100%", borderRadius: 5 }} />
                    </View>
                </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={{ backgroundColor: color.light_primary }}>
            <View style={{ height: '100%', width: "100%", backgroundColor: color.white }}>
                <Header type="custom" rightBtnVisible={false} right_text={"Edit"} onRightBtnPress={() => navigation.navigate("EditProfile")} title={"My Orders"} />
                <FlatList
                    data={data}
                    keyExtractor={item => item.id}
                    ListFooterComponent={() => <View style={{ height: 100, width: 100 }} />}
                    style={{ paddingHorizontal: 15, marginTop: 20 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("ProductDescription", { id: item.product_id, cat: item.name })} style={{ width: '100%', flexDirection: 'row', alignItems: 'center', borderBottomColor: "rgba(0, 0, 0, 0.1)", borderBottomWidth: 1, paddingVertical: 10 }}>
                            <Image source={{ uri: `${IMAGE_URL}${item.product_image}` }} style={{ height: 100, width: 100, borderColor: "rgba(0, 0, 0, 0.1)", borderWidth: 0.5, resizeMode: 'contain' }} />
                            <View style={{ marginLeft: 15 }}>
                                <Text style={{ fontSize: 16, marginTop: -15, ...GlobalStyles.dm_sans_bold }}>{item.product_name}</Text>
                                <Text style={{ fontSize: 12, marginTop: 5, ...GlobalStyles.dm_sans_regular }}>{item.name}</Text>
                                <Text style={{ fontSize: 12, marginTop: 5, color: 'rgba(10, 10, 10, 0.7)', ...GlobalStyles.dm_sans_regular }}>Price:  <Text style={{ fontSize: 16, color: color.black }}>₹ {item.product_price}</Text></Text>
                                <Text style={{ fontSize: 10, marginTop: 10, color: 'rgba(218, 30, 40, 1)', ...GlobalStyles.dm_sans_regular }}>Ordered on {item.created_at}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
                <View style={{ position: 'absolute', bottom: 15, left: '5%', right: '5%', height: 60 }}>
                    <Button onPress={() => navigation.goBack(null)} titleStyle={{ color: color.white, fontSize: 16, ...GlobalStyles.dm_sans_bold }} title="Go to Home" style={{ backgroundColor: color.primary, width: "100%", borderRadius: 5 }} />
                </View>
            </View>
        </SafeAreaView>
    )
}