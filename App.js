import react, { useEffect,useState } from 'react';
import firebase from './config/firebase'
import { NavigationContainer } from '@react-navigation/native';

import RoutesLogin from './templates/routes/Login'
import Home from './templates/Home/index'



export default function App() {
  const [user, setUser] = useState();

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     setUser(user);
  //   })
  // }, []);

  // if(user){
  //   return <Home></Home>
  // }
  
  return (
      <NavigationContainer>
        <RoutesLogin></RoutesLogin>
      </NavigationContainer>
  )

}