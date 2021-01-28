import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import createApolloClient from './apollo';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import HomeScreen from './components/HomeScreen';
import ExpenseForm from './components/ExpenseForm';
import Profile from './components/Profile';
import TransactionData from './components/TransactionData';

const Main = ({ userId, username, token, logout }) => {

   const [client, setClient] = useState(null);
   const [index, setIndex] = useState(0);
   const [data, setData] = useState(TransactionData)

   const [routes] = useState([
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'add', title: 'Add Expense', icon: 'plus-circle' },
      { key: 'profile', title: 'Profile', icon: 'account-circle' },
   ]);

   const renderScene = ({ route, jumpTo }) => {
      switch (route.key) {
         case 'home':
            return <HomeScreen jumpTo={jumpTo} logout={logout} data={data} setData={setData}/>;
         case 'add':
            return <ExpenseForm jumpTo={jumpTo} logout={logout} data={data} setData={setData} setIndex={setIndex}/>;
         case 'profile':
            return <Profile jumpTo={jumpTo} logout={logout} username={username}/>;
      }
   }

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
      }
      getClient();
      setClient(apolloClient);
   }, []);

   return (
      client ?
         <ApolloProvider client={client}>
            <BottomNavigation
               shifting={true}
               navigationState={{ index, routes }}
               onIndexChange={setIndex}
               renderScene={renderScene}
            />
         </ApolloProvider>
         : <View><Text>Loading...</Text></View>
   );
}

export default Main;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
   },
});
