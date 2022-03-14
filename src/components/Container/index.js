import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { color } from '../../utils/color';


function Container({ children, style }) {
    return (
        <View style={{ height: '100%', width: '100%' }}>
            <LinearGradient
                locations={[0.5, 0.8]}
                // Background Linear Gradient
                colors={[color.light_primary, color.primary]}
                style={{ height: '100%', width: '100%', ...style }}
            >
                {children}
            </LinearGradient>
        </View>
    )
}

export default Container;