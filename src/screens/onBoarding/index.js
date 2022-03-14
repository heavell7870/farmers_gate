import React from 'react';
import Container from '../../components/Container';
import { View, Image } from 'react-native'
import { color } from '../../utils/color';
import Button from '../../components/Button';
import { images } from '../../utils/icons';

function OnBoarding({ navigation }) {
    return (
        <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: 230, height: 230, borderRadius: 115, backgroundColor: color.white, marginTop: "-50%", justifyContent: "center", alignItems: "center" }}>
                <Image style={{ height: "80%", width: "80%", resizeMode: "contain" }} source={images.logo} />
            </View>
            <View style={{ position: 'absolute', bottom: 50, left: 0, right: 0, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Button onPress={() => navigation.navigate('Login')} title={"Get Started"} />
            </View>
        </Container>
    )
}

export default OnBoarding;