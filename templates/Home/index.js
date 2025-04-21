import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Home(user) {

    const navigation = useNavigation();

    async function ToDoLogout() {
        await AsyncStorage.removeItem('user')
        navigation.replace('Login')
    }

    return (
        <View style={styles.container}>

            <StatusBar backgroundColor='#ffffc2' barStyle={'dark-content'}></StatusBar>

            <TouchableOpacity
                style={styles.LogOut}
                onPress={() => ToDoLogout()}
            >
                <Ionicons name="exit-outline" size={24} color="black" />    
            </TouchableOpacity>
            
            <Text>Home</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffc2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    LogOut: {
        position: 'absolute',
        top: 20,
        left: 10,
        borderRadius: 10,
        padding: 10,
    },
});
