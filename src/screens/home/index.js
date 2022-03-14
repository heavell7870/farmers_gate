import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { getCommodities } from '../../redux/actions/main';
import { color } from '../../utils/color';
import { GlobalStyles } from '../../utils/globalStyles';
import { images } from '../../utils/icons';
import { IMAGE_URL } from '../../utils/url';

export default function Home({ navigation }) {

    //const [data, setData] = useState([{ id: "1", title: "Peas", description: "Dummy text", image: "https://picsum.photos/200" }, { id: "2", title: "Peas", description: "Dummy text", image: "https://picsum.photos/200" }, { id: "3", title: "Peas", description: "Dummy text", image: "https://picsum.photos/200" }, { id: "4", title: "Peas", description: "Dummy text", image: "https://picsum.photos/200" }, { id: "5", title: "Peas", description: "Dummy text", image: "https://picsum.photos/200" }, { id: "6", title: "Peas", description: "Dummy text", image: "https://picsum.photos/200" }, { id: "7", title: "Peas", description: "Dummy text", image: "https://picsum.photos/200" },])
    const { commodities } = useSelector(state => state.reducer)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCommodities())
    }, [])

    console.log(commodities)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: color.light_primary }}>
            <View style={{ height: "100%", width: '100%' }}>
                <View style={{ backgroundColor: color.white }}>
                    <Header onBagPress={() => navigation.navigate("MyOrders")} bagVisible={false} type='menu' />
                </View>
                <FlatList
                    data={commodities}
                    showsVerticalScrollIndicator={false}
                    style={{ backgroundColor: color.white }}
                    keyExtractor={(item) => item.id}
                    ListHeaderComponent={() => <ListHeader />}
                    ListFooterComponent={() => <View style={{ marginBottom: 10 }} />}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => navigation.navigate('Steps', { id: item.id, name: item.name })} style={{ padding: 15, borderRadius: 10, elevation: 5, shadowColor: color.black, shadowOpacity: 0.4, shadowOffset: { height: 3, width: 0 }, shadowRadius: 3, backgroundColor: color.white, marginTop: 10, marginHorizontal: 15, flexDirection: 'row', alignItems: 'center', }}>
                            <Image source={{ uri: `${IMAGE_URL}${item.category_image}` }} style={{ height: 70, width: 70, borderRadius: 5 }} />
                            <View style={{ marginLeft: 20, maxWidth: '75%', }}>
                                <Text numberOfLines={1} style={{ color: color.primary, fontSize: 16, ...GlobalStyles.dm_sans_bold }}>{item.name}</Text>
                                {/* <Text numberOfLines={2} style={{ color: color.primary, fontSize: 12, marginTop: 5, ...GlobalStyles.dm_sans_regular }}>{item.description || "Description is missing so using dummy text sorry!"}</Text> */}
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const ListHeader = () => (
    <View style={{ width: '100%', backgroundColor: color.white }}>
        <View style={{ marginTop: 0 }}>
            <View style={{ padding: 15 }}>
                <View style={{ width: '100%', borderRadius: 10, backgroundColor: color.primary, justifyContent: 'center', alignItems: 'center', padding: 15, paddingVertical: 70 }}>
                    <Text style={{ fontSize: 20, color: color.white, maxWidth: '70%', textAlign: 'center', ...GlobalStyles.dm_sans_bold }}>Farmer’s gate Optimisation through accountability</Text>
                    {/* <View style={{ flexDirection: 'row', marginTop: 15 }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Image source={images.home_1} style={{ height: 50, width: 100, borderRadius: 10 }} />
                            <Image source={images.home_2} style={{ height: 25, width: 100, borderRadius: 10, marginTop: 5 }} />
                        </View>
                        <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 10 }}>
                            <Image source={images.home_3} style={{ height: 25, width: 100, borderRadius: 10 }} />
                            <Image source={images.home_4} style={{ height: 50, width: 100, borderRadius: 10, marginTop: 5 }} />
                        </View>
                    </View> */}
                </View>
            </View>
            <View style={{ marginTop: '10%' }}>
                <Text style={{ fontSize: 14, textAlign: 'center', ...GlobalStyles.dm_sans_bold }}>COMMODITIES</Text>
            </View>
        </View>
    </View>
)