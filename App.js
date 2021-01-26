import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from './src/auth/Auth';
import Main from './src/app/Main';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [loading, setLoading] = useState(false);

  login = (userId, username, token) => {
    setIsLoggedIn(true);
    setUserId(userId);
    setUsername(username);
    setJwt(token);
    setLoading(false);
  }
  
  logout = () => {
    setIsLoggedIn(false);
    setLoading(false);
  }

  useEffect( async () => {
    AsyncStorage.getItem('@expense-tracker:auth0').then((session) => {//////////////////////////
      if (session) {
        const obj = JSON.parse(session);
        if (obj.exp > Math.floor(new Date().getTime() / 1000))
          login(obj.id, obj.name, obj.token);
        else
          logout();
      } 
      else
        logout();
    })
  }, []);

  if (loading)
    return <View><Text>Loading...</Text></View>

  if (isLoggedIn)
    return (
      <Main
        userId={userId}
        username={username}
        token={jwt}
        logout={logout}
      />
    )
  else
    return (<Auth login={login}/>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
