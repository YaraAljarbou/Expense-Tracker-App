import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View , Button} from 'react-native';
import createApolloClient from './apollo';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';
//import TodoList from './TodoList';

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

   return (
      client ?
         <ApolloProvider client={client}>
            {/* <TodoList
            userId={userId}
            username={username}
            logout={logout}
         /> */}
         <View style={styles.container}>
            <Text>{userId}, {username}</Text>
            <Button onPress={logout} title="logout"/>
         </View>
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
