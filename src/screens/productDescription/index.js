import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    SafeAreaView,
    Text,
    Image,
    FlatList,
    TouchableOpacity,
    Dimensions,
    ScrollView,
} from "react-native";
import WebView from "react-native-webview";
import Header from "../../components/Header";
import common_axios from "../../utils/axios";
import { color } from "../../utils/color";
import { GlobalStyles } from "../../utils/globalStyles";
import { IMAGE_URL } from "../../utils/url";

export default function ProductDescription({ navigation, route }) {
    const [data, setData] = useState({
        id: "1",
        title: "Peas",
        description: "Dummy text",
        image: "https://picsum.photos/200",
    });

    const { cat, id } = route.params;

    useEffect(() => {
        fetchData()
    }, [fetchData])

    const fetchData = useCallback(async () => {
        try {
            const { data } = await common_axios.get(`/productsid?product_id=${id}`)
            console.log(data)
            if (data.length > 0) {
                setData(data[0])
            }
        } catch (e) {
            console.log(e)
        }
    }, [id])

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.light_primary }}>
            <View style={{ width: "100%", backgroundColor: color.white, height: "100%" }}>
                <TouchableOpacity onPress={() => navigation.navigate("OrderSummary", { name: data.product_name, img: data.product_image, desc: data.product_discription, cat, id, price: data.product_price, maxQty: data.product_quantity })} style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', height: 45, bottom: 15, right: 15, left: 15, backgroundColor: color.primary, borderRadius: 5, zIndex: 2 }}>
                    <Text style={{ fontSize: 16, color: color.white, ...GlobalStyles.dm_sans_bold }}>Buy Now</Text>
                </TouchableOpacity>
                <Header
                    title={data.product_name}
                    bagVisible={false}
                    notifyVisible={false}
                    searchVisible={false}
                    type="back"
                />
                <ScrollView>
                    <View style={{ width: "100%", height: Dimensions.get('window').height * 0.4, justifyContent: "center", alignItems: "center", padding: 15, paddingHorizontal: 35 }}>
                        <Image source={{ uri: `${IMAGE_URL}${data.product_image}` }} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
                    </View>
                    <View style={{ width: "100%", paddingHorizontal: 15 }}>
                        <Text style={{ fontSize: 20, color: color.primary, ...GlobalStyles.dm_sans_bold }}>{data.product_name}</Text>
                        <Text style={{ fontSize: 12, marginTop: 5, color: color.semiBlack, ...GlobalStyles.dm_sans_regular }}>{cat}</Text>
                        <Text style={{ fontSize: 16, marginTop: 10, color: color.semiBlack, ...GlobalStyles.dm_sans_regular }}>Price: <Text style={{ fontSize: 20, color: color.black }}>₹ {data.product_price}</Text></Text>
                        <View style={{ width: "100%", marginTop: 15, height: 300, backgroundColor: "transparent" }}>
                            <Text style={{ fontSize: 16, color: color.primary, ...GlobalStyles.dm_sans_medium }}>Description</Text>
                            <WebView
                                style={{ height: '100%', width: '100%', backgroundColor: "transparent" }}
                                source={{ html: data.product_discription ? data.product_discription : '' }}
                            />
                            {/* <Text style={{ fontSize: 12, color: color.black, marginTop: 10, ...GlobalStyles.dm_sans_regular }}>{desc}</Text>
                        <View style={{ width: "100%", marginTop: 5 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 6, width: 6, borderRadius: 3, backgroundColor: color.primary }} />
                                <Text style={{ fontSize: 12, marginLeft: 5, color: color.black, ...GlobalStyles.dm_sans_regular }}>Number of seeds: Approximately 900 to 1000 Seeds</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 6, width: 6, borderRadius: 3, backgroundColor: color.primary }} />
                                <Text style={{ fontSize: 12, marginLeft: 5, color: color.black, ...GlobalStyles.dm_sans_regular }}>Mode of sowing: Direct sowing</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 6, width: 6, borderRadius: 3, backgroundColor: color.primary }} />
                                <Text style={{ fontSize: 12, marginLeft: 5, color: color.black, ...GlobalStyles.dm_sans_regular }}>Germination time: 6 to 8 days from sowing</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 6, width: 6, borderRadius: 3, backgroundColor: color.primary }} />
                                <Text style={{ fontSize: 12, marginLeft: 5, color: color.black, ...GlobalStyles.dm_sans_regular }}>Harvesting: 110 to 120 days from sowing</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ height: 6, width: 6, borderRadius: 3, backgroundColor: color.primary }} />
                                <Text style={{ fontSize: 12, marginLeft: 5, color: color.black, ...GlobalStyles.dm_sans_regular }}>Season of sowing: Monsoon and summer</Text>
                            </View>
                        </View> */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
