import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native';
import createApolloClient from './apollo';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';
//import TodoList from './TodoList';

const Main = ({ userId, username, token, logout }) => {
   const [client, setClient] = useState(null);

   useEffect( async () => {
      const apolloClient = createApolloClient(token);
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
      setClient(apolloClient);
      logout();
   }, []);

   if (!client) {
      return <View><Text>Loading...</Text></View>;
   }

   return (
      <ApolloProvider client={client}>
         {/* <TodoList
            userId={userId}
            username={username}
            logout={logout}
         /> */}
      </ApolloProvider>
   );
}

export default Main
