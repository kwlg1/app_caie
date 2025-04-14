import { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button, Image, Animated, Alert, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import firebase from '../../config/firebase'

export default function Login() {

    const logo = require('../../assets/logo.png')
    const AnimatedOpacity = useRef(new Animated.Value(0)).current
    const AnimatedFormBox = useRef(new Animated.Value(0)).current
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const navigation = useNavigation();

    useEffect(() => {

        Animated.decay(AnimatedFormBox, {
            velocity: 0.7,
            deceleration: 0.998,
            useNativeDriver: false
        }).start()

        Animated.loop(

            Animated.sequence([

                Animated.timing(AnimatedOpacity, {
                    toValue: 1,
                    duration: 2500,
                    delay: 2000,
                    useNativeDriver: false
                }),
                Animated.timing(AnimatedOpacity, {
                    toValue: 0,
                    duration: 3000,
                    delay: 1000,
                    useNativeDriver: false
                })

            ])
        ).start()
    }, [])

    async function ToDoLogin() {
        await firebase.auth().signInWithEmailAndPassword(Email, Password)
            .then(() => {

            })
            .catch((error) => {
                Alert.alert('ERRO', 'Erro, verifique seus dados!')
            })
    }

    return (
        <View style={styles.container}>

            <StatusBar backgroundColor='#ffffc2' barStyle={'dark-content'}></StatusBar>

            <Animated.Text style={[styles.Title, { opacity: AnimatedOpacity }]}>
                BEM VINDO, APP CAIE!
            </Animated.Text>

            <Image
                style={styles.Image}
                source={logo}
            />

            <Animated.View style={[styles.FormBox, { height: AnimatedFormBox }]}>

                <TextInput
                    style={styles.Input}
                    placeholderTextColor='#349d22'
                    placeholder='Endereço de email'
                    autoCapitalize='none'
                    onChangeText={(text) => setEmail(text)}
                />

                <TextInput
                    style={styles.Input}
                    placeholderTextColor='#349d22'
                    placeholder='Password'
                    autoCapitalize='none'
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity
                    style={[styles.Button, { marginTop: 20 }]}
                    onPress={() => ToDoLogin()}
                >
                    <Text style={styles.TextButton}>ACESSAR</Text>
                </TouchableOpacity>

                <Text style={styles.OU}>
                    OU
                </Text>

                <TouchableOpacity
                    style={styles.Button}
                    onPress={() => navigation.navigate('Cadaster')}
                >
                    <Text style={styles.TextButton}>CADASTRE-SE</Text>
                </TouchableOpacity>


            </Animated.View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffc2',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100
    },
    FormBox: {
        alignItems: 'center',
    },
    Title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 100
    },
    Input: {
        borderColor: '#349d22',
        height: 50,
        width: 260,
        borderBottomWidth: 1,
        margin: 20,
        paddingLeft: 10,
        paddingRight: 10

    },
    Button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#349d22",
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        width: 240
    },
    TextButton: {
        color: '#fff'
    },
    Image: {
        position: 'absolute',
        width: 380,
        height: 350,
        opacity: 0.1
    },
    OU: {
        fontSize: 18,
        fontWeight: '100',
        paddingTop: 15,
        paddingBottom: 15
    }
});
