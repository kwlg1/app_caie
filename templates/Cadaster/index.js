import { useState, useEffect, useRef } from 'react';
import { View, StatusBar, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Animated, SubmitButton } from 'react-native';
import firebase from '../../config/firebase'
import {Picker} from "@react-native-picker/picker";

export default function Cadaster() {

  const logo = require("../../assets/logo.png");
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [TypeUser, setTypeUser] = useState("")
  const AnimatedOpacity = useRef(new Animated.Value(0)).current
  const AnimatedFormBox = useRef(new Animated.Value(0)).current
  const [selectedItem, setSelectedItem] = useState("")
  const PickerRef = useRef( )

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

  async function ToDoCadaster() {

    if (Password === ConfirmPassword) {

      await firebase.auth().createUserWithEmailAndPassword(Email, Password)
        .catch((error) => {
          Alert.alert('ERRO', `${error.message}`)
        })

    } else {
      Alert.alert("SENHAS DIVERGENTES", "As senhas não coincidem. Por favor, verifique as senhas.")
    }

  }

  return (

    <View style={styles.container}>

      <StatusBar backgroundColor='#ffffc2' barStyle={'dark-content'}></StatusBar>

      <Animated.Text style={[styles.Title, { opacity: AnimatedOpacity }]}>
        INSIRA ABAIXO SEUS DADOS PARA O CADASTRO
      </Animated.Text>

      <Image
        style={styles.Image}
        source={logo}
      />

      <Animated.View style={[styles.FormBox, { height: AnimatedFormBox }]}>

        <Picker
          ref={PickerRef}
          selectedValue={TypeUser}
          onValueChange={(itemValue) => {
            setTypeUser(itemValue)
          }}
          style={styles.pickerStyles}
        >
          <Picker.Item  label='Coordendor(a)' value={'Coordendor(a)'}/>
          <Picker.Item  label='Professor(a)' value={'Professor(a)'}/>
          <Picker.Item  label='Responsável' value={'Responsável'}/>
        </Picker>

        <TextInput
          style={styles.Input}
          placeholderTextColor='#349d22'
          placeholder='Endereço de de email'
          autoCapitalize='none'
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          style={styles.Input}
          placeholderTextColor='#349d22'
          placeholder='Senha'
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />

        <TextInput
          style={styles.Input}
          placeholderTextColor='#349d22'
          placeholder='Confirmar senha'
          autoCapitalize='none'
          secureTextEntry={true}
          onChangeText={(text) => setConfirmPassword(text)}
        />

        <TouchableOpacity
          style={[styles.Button, { marginTop: 20 }]}
          onPress={() => ToDoCadaster()}
        >
          <Text style={styles.TextButton}>CADASTRO</Text>
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
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 100
  },
  Input: {
    borderColor: '#349d22',
    height: 50,
    width: 260,
    borderBottomWidth: 1,
    margin: 20,

  },
  Button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#349d22",
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    height: 50,
    width: 200
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
  },
  pickerStyles:{
    width: 290,
    color:'#349d22',
  }
});
