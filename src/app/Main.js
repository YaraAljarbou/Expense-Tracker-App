import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Button, Title } from 'react-native-paper';
import createApolloClient from './apollo';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import SettingScreen from './components/SettingScreen';

const Main = ({ userId, username, token, logout }) => {
   const [client, setClient] = useState(null);

   useEffect(() => {
      const apolloClient = createApolloClient(token);
      async function getClient() {
         await apolloClient.mutate({
            mutation: gql`
            mutation ($username: String, $userid: String){
               insert_users (
                  objects: [{ name: $username, id: $userid}]
               ) {
                  affected_rows
               }
            }
            `,
            variables: {
               username: username,
               userid: userId
            }
         });
      }    // Execute the created function directly
      getClient();

      setClient(apolloClient);
      // logout();
   }, []);

   const Tab = createBottomTabNavigator();

   return (
      client ?
         <ApolloProvider client={client}>
            <NavigationContainer>
               <Tab.Navigator>
                  <Tab.Screen name="Home" component={HomeScreen} />
                  <Tab.Screen name="Setting" component={SettingScreen} />
               </Tab.Navigator>
            </NavigationContainer>
         </ApolloProvider>
         : <View><Text>Loading...</Text></View>
   );
}

export default Main

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
