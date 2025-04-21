import { useState, useEffect, useRef } from 'react';
import { View, StatusBar, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert, Animated, SubmitButton } from 'react-native';
import firebase from '../../config/firebase'
import { Picker } from "@react-native-picker/picker";
import axios from 'axios';

export default function Cadaster() {

  const logo = require("../../assets/logo.png");
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [tipo_user, setTipo_user] = useState("")
  const AnimatedOpacity = useRef(new Animated.Value(0)).current
  const AnimatedFormBox = useRef(new Animated.Value(0)).current
  const [selectedItem, setSelectedItem] = useState("")
  const PickerRef = useRef()

  useEffect(() => {

    Animated.decay(AnimatedFormBox, {
      velocity: 1.2,
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

      if (tipo_user !== "") {

        if (name !== "") {

          if (Email !== "") {

            axios.post('http://192.168.18.14:3000/cadaster', {
              nome: name,
              email: Email,
              senha: Password,
              tipo_user: tipo_user

            })
              .then((response) => {
                Alert.alert("CADASTRO", "Cadastro realizado com sucesso!")
              })
              .catch((error) => {
                Alert.alert("ERRO", "Erro ao realizar o cadastro, confira seus dados.")
                alert(error)
              })

          } else {
            Alert.alert("EMAIL NÃO INFORMADO", "Por favor, insira seu email.")
          }

        }
        else {
          Alert.alert("NOME NÃO INFORMADO", "Por favor, insira seu nome.")
        }

      } else {
        Alert.alert("TIPO DE USUÁRIO", "Selecione o tipo de usuário.")
      }

    }
    else {
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
          selectedValue={tipo_user}
          onValueChange={(itemValue) => {
            setTipo_user(itemValue)
          }}
          defaultValue={"Selecione o tipo de usuário"}
          mode='dropdown'
          style={styles.pickerStyles}
        >
           <Picker.Item label='Selecione o tipo de usuário' value='' enabled={false} />
          <Picker.Item label='Coordenador(a)' value={'Coordenador(a)'} />
          <Picker.Item label='Professor(a)' value={'Professor(a)'} />
          <Picker.Item label='Responsável' value={'Responsável'} />
        </Picker>

        <TextInput
          style={styles.Input}
          placeholderTextColor='#349d22'
          placeholder='Usuario'
          autoCapitalize='none'
          onChangeText={(text) => setName(text)}
        />

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
    marginBottom: 50
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
  pickerStyles: {
    width: 290,
    color: '#349d22',
  }
});
