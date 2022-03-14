import React, { useState } from 'react';
import Container from '../../components/Container';
import { View, Text } from 'react-native'
import { color } from '../../utils/color';
import Button from '../../components/Button';
import { GlobalStyles } from '../../utils/globalStyles';
import FloatingLabel from '../../components/FloatingLabel';
import Feather from "@expo/vector-icons/Feather";
import common_axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setIsUser, setUserData } from '../../redux/actions/main';
import { useDispatch } from 'react-redux';
import Toast from '../../utils/toast';

function Verification({ navigation, route }) {

    const { email } = route.params;
    const [otp, setOtp] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const verify = async () => {
        setLoading(true)
        try {
            const { data } = await common_axios.post('/auth/verify_otp', {
                email,
                otp
            });
            console.log(data)
            if (data.status == 200) {
                dispatch(setUserData(data.user))
                dispatch(setIsUser(true))
                await AsyncStorage.setItem('access_token', JSON.stringify(data.user?.api_token))
                await AsyncStorage.setItem('user_data', JSON.stringify(data.user))
            } else {
                alert("Invalid Code")
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            alert("Invalid Code")
            setLoading(false)
        }
    }

    const resendOtp = async () => {
        try {
            const { data } = await common_axios.post("/auth/resend_otp", {
                email
            })
            if (data.status == 200) {
                Toast(data.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Container>
            <Feather onPress={() => navigation.goBack(null)} style={{ position: "absolute", top: 45, left: 20 }} name="arrow-left" size={24} color={color.white} />
            <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                <Text style={{ fontSize: 28, color: color.white, ...GlobalStyles.bold_text }}>Verification!</Text>
                <Text style={{ fontSize: 16, textAlign: "center", color: color.white, marginTop: 10, ...GlobalStyles.semi_bold_text }}>Enter 4 digits code that sent to your email address.</Text>
                <View>
                    <FloatingLabel
                        value={otp}
                        style={{ backgroundColor: color.transparent, marginTop: 60 }}
                        label={"Enter OTP"}
                        autoCapitalize="none"
                        keyboard={"phone-pad"}
                        maxLength={4}
                        onChangeText={(value) => {
                            setOtp(value);
                        }}
                    />
                </View>
                <Button loading={loading} titleStyle={{ fontSize: 16 }} style={{ marginTop: 15 }} title={"Verify"} onPress={() => verify()} />
                <Text style={{ fontSize: 14, color: color.light_grey, marginTop: 10, ...GlobalStyles.regular_text }}>Didn’t recieve code? <Text onPress={resendOtp} style={{ color: color.white }}>Resend OTP</Text></Text>
            </View>
        </Container>
    )
}

export default Verification;