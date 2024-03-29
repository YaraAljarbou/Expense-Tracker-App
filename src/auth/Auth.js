import * as AuthSession from 'expo-auth-session';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import jwtDecoder from 'jwt-decode';
import { Button, Appbar } from 'react-native-paper';
const auth0ClientId = 'xYCVQxpXx4GMUSqcXfr15xnGnPoSv1yh';//////////////////////////////
const auth0Domain = 'https://expense-tracker-app.us.auth0.com';////////////////////////////////

const toQueryString = (params) => {
   return '?' + Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
};

const Auth = ({ login }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const loginWithAuth0 = async () => {
      // get redirect URL to redirect after log in
      const redirectUrl = AuthSession.getRedirectUrl();
      // perform login
      const result = await AuthSession.startAsync({
         authUrl: `${auth0Domain}/authorize` + toQueryString({
            client_id: auth0ClientId,
            response_type: 'id_token',
            scope: 'openid profile',
            audience: 'expense-tracker-api',/////////////////////////////
            redirect_uri: redirectUrl,
            nonce: "randomstring"
         }),
      });
      console.log(result);
      // if success, handle the result
      if (result.type === 'success') {
         handleParams(result.params);
      }
   }

   const handleParams = (responseObj) => {
      // handle error
      if (responseObj.error) {
         Alert.alert('Error', responseObj.error_description || 'something went wrong while logging in');
         return;
      }
      // store session in storage and redirect back to the app
      const encodedToken = responseObj.id_token;
      const decodedToken = jwtDecoder(encodedToken);
      AsyncStorage.setItem(
         '@expense-tracker:auth0',
         JSON.stringify({
            token: encodedToken,
            name: decodedToken.nickname,
            id: decodedToken.sub,
            exp: decodedToken.exp
         })
      ).then(() => login(decodedToken.sub, decodedToken.nickname, encodedToken));
   }

   
   return (
      <>
         <Appbar.Header></Appbar.Header>
         <View style={styles.container}>
            <Text style={{color: "green", fontSize: 30, marginBottom: 5}}>Expense Tracker</Text>
            <Image source={require('../app/components/logo.png')}/>
            <Button style={{ width: 250, marginTop: 10}} mode="contained" onPress={loginWithAuth0}>
               Lets Get Started
            </Button>

            <Text style={{color: "green", fontSize: 20, marginTop: 60}}>Developed By</Text>
            <Text style={{color: "gray", fontSize: 15, marginTop: 10}}>Yara Aljarbou & Wijdan Kuddah</Text>
         </View>
      </>
   )
}

export default Auth;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
