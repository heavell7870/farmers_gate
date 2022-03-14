import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, Image, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import Header from '../../components/Header';
import Loader from '../../components/Loader';
import common_axios from '../../utils/axios';
import { color } from '../../utils/color';
import { GlobalStyles } from '../../utils/globalStyles';
import { IMAGE_URL } from '../../utils/url';

export default function Category({ navigation, route }) {
    const { name, id } = route.params;
    const [data, setData] = useState([])
    const width = Dimensions.get("window").width;
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch_prods()
    }, [])

    const fetch_prods = async () => {
        try {
            const { data: res } = await common_axios.get(`/product?product_step_id=${id}`)
            if (res.data) {
                setData(res.data);
            }
        } catch (e) {
            console.log(e)
        }
        setLoading(false)
    }

    if (loading) {
        return <Loader Header={() => <Header title={name} bagVisible={false} notifyVisible={false} searchVisible={false} type='back' />} />
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.light_primary }}>
            <View style={{ backgroundColor: color.white, height: "100%", width: "100%" }}>
                <Header title={name} bagVisible={false} notifyVisible={false} searchVisible={false} type='back' />
                <FlatList
                    data={data}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: "space-evenly" }}
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: color.white }}
                    keyExtractor={(item) => item.id}
                    ListFooterComponent={() => <View style={{ marginBottom: 10 }} />}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("ProductDescription", { name: item.product_name, img: item.product_image, desc: item.product_discription, cat: name, id: item.id })} style={{ borderRadius: 5, elevation: 5, shadowColor: color.black, shadowOpacity: 0.4, shadowOffset: { height: 3, width: 0 }, shadowRadius: 3, marginTop: 15, width: width * 0.45, height: width * 0.60, backgroundColor: color.white }}>
                            <Image source={{ uri: `${IMAGE_URL}${item.product_image}` }} style={{ height: '70%', width: '85%', borderRadius: 5, marginHorizontal: '7.5%' }} />
                            <View style={{ padding: 15 }}>
                                <Text numberOfLines={1} style={{ fontSize: 12, ...GlobalStyles.dm_sans_bold }}>{item.product_name}</Text>
                                <Text numberOfLines={1} style={{ fontSize: 12, marginTop: 5, color: color.light_primary, ...GlobalStyles.dm_sans_regular }}>{item.product_discription}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}
