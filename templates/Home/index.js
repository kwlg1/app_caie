import { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default function Home() {





    return (
        <View style={styles.container}>

            <StatusBar backgroundColor='#ffffc2' barStyle={'dark-content'}></StatusBar>

            <Text>Home</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
