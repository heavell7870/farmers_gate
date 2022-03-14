import 'react-native-gesture-handler';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import App from './App';
import store from './src/redux/store/store';
import React, { useEffect } from 'react';
import * as Updates from 'expo-updates';

const Main = () => {

    useEffect(() => {
        checkUpdates()
    }, [])

    const checkUpdates = async () => {
        try {
            const update = await Updates.checkForUpdateAsync();
            if (update.isAvailable) {
                await Updates.fetchUpdateAsync();
                alert('New Update Available')
                await Updates.reloadAsync();
            }
        } catch (e) {
            console.log(e)
        }

    }
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}
registerRootComponent(Main);
