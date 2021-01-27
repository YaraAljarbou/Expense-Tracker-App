import React from 'react';
import { Text, View } from 'react-native';
import { Appbar } from 'react-native-paper';

const HomeScreen = () => {
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="Home" />
            </Appbar.Header>
        </View>
    )
}

export default HomeScreen
