import { StyleSheet } from 'react-native';

import { createStackNavigator } from "@react-navigation/stack";

import Login from '../login/index';
import Cadaster from '../Cadaster/index';
import Home from '../Home/index';

export default function RoutesLogin() {

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='Cadaster'
        component={Cadaster}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
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
