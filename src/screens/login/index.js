import React, { useState } from 'react';
import Container from '../../components/Container';
import { View, Text } from 'react-native'
import { color } from '../../utils/color';
import Button from '../../components/Button';
import { GlobalStyles } from '../../utils/globalStyles';
import FloatingLabel from '../../components/FloatingLabel';
import common_axios from '../../utils/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setIsUser, setUserData } from '../../redux/actions/main';

function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    const handlePress = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!reg.test(email)) {
            alert("Enter a valid email");
            return;
        }

        // if (password.length < 5) {
        //     alert("Enter a valid password")
        //     return;
        // }
        setLoading(true)
        try {
            const { data } = await common_axios.post("/auth/login_otp", {
                email,
            })
            console.log(data)
            setLoading(false)
            if (data.status == 200) {
                navigation.navigate("Verification", { email })
            }
        } catch (e) {
            console.log(e)
            alert("Server error")
            setLoading(false)
        }
    }

    return (
        <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ position: 'absolute', bottom: 70, left: 0, right: 0, zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 28, color: color.white, ...GlobalStyles.bold_text }}>Welcome!</Text>
                <Text style={{ fontSize: 16, color: color.white, marginTop: 10, ...GlobalStyles.semi_bold_text }}>Create your account or login to start</Text>
                <FloatingLabel
                    value={email}
                    style={{ backgroundColor: color.transparent, marginTop: 60 }}
                    label={"Email Address"}
                    autoCapitalize="none"
                    onChangeText={(value) => {
                        setEmail(value);
                    }}
                />
                {/* <FloatingLabel
                    value={password}
                    secureTextEntry={true}
                    style={{ backgroundColor: color.transparent, marginTop: 40 }}
                    label={"Password"}
                    autoCapitalize="none"
                    onChangeText={(value) => {
                        setPassword(value);
                    }}
                /> */}
                <Button loading={loading} titleStyle={{ fontSize: 16 }} style={{ marginTop: 15 }} title={"Login"} onPress={() => handlePress()} />
                <Text style={{ fontSize: 14, color: color.light_grey, marginTop: 10, ...GlobalStyles.regular_text }}>Doesn’t have an account? <Text onPress={() => navigation.navigate("Register")} style={{ color: color.white }}>Register</Text></Text>
            </View>
        </Container>
    )
}

export default Login;