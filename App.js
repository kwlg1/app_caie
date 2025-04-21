import react, { useEffect,useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RoutesLogin from './templates/routes/Login'
import Home from './templates/Home/index'



export default function App() {
  const [Logged, setLogged] = useState(null);

  useEffect(() => {
    async function checkLogin() {
      const user = await AsyncStorage.getItem('user');
      setLogged(!!user);
    }
    checkLogin();
  }, []);

  if (Logged === null) {
    return null;
  }

  return (
    <NavigationContainer>
      {Logged ? <Home /> : <RoutesLogin />}
    </NavigationContainer>
  );
}