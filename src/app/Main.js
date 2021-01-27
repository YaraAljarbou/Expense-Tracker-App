import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Title } from 'react-native-paper';
import createApolloClient from './apollo';
import gql from 'graphql-tag';
import { ApolloProvider } from 'react-apollo';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Appbar, IconButton } from 'react-native-paper';
import HomeScreen from './components/HomeScreen';
import Transactions from './components/Transactions';
import SettingScreen from './components/SettingScreen';

const Main = ({ userId, username, token, logout }) => {
   const [client, setClient] = useState(null);
   const [index, setIndex] = useState(0);
   const [routes] = useState([
      { key: 'home', title: 'Home', icon: 'home', userId },
      { key: 'albums', title: 'Albums', icon: 'album' },
      { key: 'recents', title: 'Recents', icon: 'history' },
   ]);
   const renderScene = ({ route, jumpTo }) => {
      switch (route.key) {
         case 'home':
            return <HomeScreen jumpTo={jumpTo} userId={userId} username={username} logout={logout} color="red"/>;
         case 'albums':
            return <SettingScreen jumpTo={jumpTo} />;
         case 'recents':
            return <SettingScreen jumpTo={jumpTo} />;
      }
   }
   // const HomeScreen = (props) => {
   //    console.log(props)
   //    return (
   //    <View>
   //       <Appbar.Header>
   //          <Appbar.Content title="Home" />
   //       </Appbar.Header>
   //       <Title>Your Balance</Title>
   //       <Text>{username}</Text>
   //       {/* <Transactions userId={userId}/> */}
   //       <IconButton
   //          icon="plus"
   //          size={40}
   //          onPress={() => console.log('Pressed')}
   //       />
   //    </View>
   //    )
   // }
   // const renderScene = BottomNavigation.SceneMap({
   //    home: HomeScreen,
   //    albums: SettingScreen,
   //    recents: SettingScreen,
   // });

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
   // console.log("token => " + token)
   return (
      client ?
         <ApolloProvider client={client}>
            <BottomNavigation
               shifting={true}
               navigationState={{ index, routes }}
               onIndexChange={setIndex}
               renderScene={renderScene}
            />
            {/* <NavigationContainer>
               <Tab.Navigator>
                  <Tab.Screen name="Home" component={HomeScreen} />
                  <Tab.Screen name="Setting" component={SettingScreen} />
               </Tab.Navigator>
            </NavigationContainer> */}
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
