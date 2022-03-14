import React, { useState, useEffect } from 'react';
import Container from '../../components/Container';
import { View, Text } from 'react-native'
import { color } from '../../utils/color';
import Button from '../../components/Button';
import { GlobalStyles } from '../../utils/globalStyles';
import FloatingLabel from '../../components/FloatingLabel';
import common_axios from '../../utils/axios';
import { useDispatch } from 'react-redux';
import { setIsUser, setUserData } from '../../redux/actions/main';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register({ navigation }) {

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("")
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        setUsername(username.replace(/\s/g, ""));
    }, [username]);

    function isUserNameValid(username) {
        const res = /^[a-z0-9_\.]+$/.exec(username);
        const valid = !!res;
        return valid;
    }

    const handlePress = async () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (username.length < 2) {
            alert("Enter a valid username");
            return;
        }

        if (phone.length != 10) {
            alert("Enter a valid mobile number")
            return;
        }

        if (!reg.test(email)) {
            alert("Enter a valid email");
            return;
        }

        if (!isUserNameValid(username)) {
            alert("Invalid username, it shouldn't contain capital letters and spaces.");
            return;
        }

        // if (password.length < 5) {
        //     alert("Enter a valid password")
        //     return;
        // }
        setLoading(true)
        try {
            const { data } = await common_axios.post("/auth/request_otp", {
                name: username,
                email,
                phone,
                country: "India"
            })
            console.log(data)
            setLoading(false)
            if (data.status == 200) {
                navigation.navigate("Verification", { email })
                // dispatch(setUserData(data.data))
                // dispatch(setIsUser(true))
                // await AsyncStorage.setItem('access_token', JSON.stringify(data.data?.api_token))
                // await AsyncStorage.setItem('user_data', JSON.stringify(data.data))
            }
        } catch (e) {
            console.log(e)
            alert("Server error")
            setLoading(false)
        }
    }

    return (
        <Container style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 28, color: color.white, ...GlobalStyles.bold_text }}>Welcome!</Text>
            <Text style={{ fontSize: 16, color: color.white, marginTop: 10, ...GlobalStyles.semi_bold_text }}>Create your account to get started</Text>
            <FloatingLabel
                value={username}
                style={{ backgroundColor: color.transparent, marginTop: 50 }}
                label={"User Name"}
                autoCapitalize="none"
                onChangeText={(value) => {
                    setUsername(value);
                }}
            />
            <FloatingLabel
                value={phone}
                style={{ backgroundColor: color.transparent, marginTop: 40 }}
                label={"Phone Number"}
                maxLength={10}
                keyboardType="phone-pad"
                autoCapitalize="none"
                onChangeText={(value) => {
                    setPhone(value);
                }}
            />
            <FloatingLabel
                value={email}
                style={{ backgroundColor: color.transparent, marginTop: 40 }}
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
            <Button loading={loading} titleStyle={{ fontSize: 16 }} style={{ marginTop: 25 }} title={"Register"} onPress={() => handlePress()} />
            <Text style={{ fontSize: 14, color: color.light_grey, marginTop: 10, ...GlobalStyles.regular_text }}>Already have an account? <Text onPress={() => navigation.navigate("Login")} style={{ color: color.white }}>Login</Text></Text>
        </Container>
    )
}

export default Register;