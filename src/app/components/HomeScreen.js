import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, FAB, Title, Divider, Card, Paragraph, Avatar, Badge  } from 'react-native-paper';
// import Transactions from './Transactions'

const HomeScreen = ({logout, data }) => {
    
    // const data = {
    //     transactions: [
    //         {
    //             id:1,
    //             amount: "-10",
    //             category: {
    //                 name: "Food", 
    //                 icon: "food"
    //             },
    //             description: "Rice",
    //         },
    //         {
    //             id:2,
    //             amount: "-20",
    //             category: {
    //                 name: "Food", 
    //                 icon: "food"
    //             },
    //             description: "Cake",
    //         },
    //         {
    //             id:3,
    //             amount: "-5",
    //             category: {
    //                 name: "Food", 
    //                 icon: "food"
    //             },
    //             description: "Chocolate",
    //         },
    //         {
    //             id:4,
    //             amount: "100",
    //             category: {
    //                 name: "Income",
    //                 icon: "cash"
    //             },
    //             description: "Freelance",
    //         },
    //     ]
    // }

    const TranItem = ({item}) => {
        return(        
        <Card style={{marginBottom: 10, padding: 5}} key={item.id}>
            <Card.Title 
                title={item.description} 
                subtitle={item.category.name} 
                left={(props) => <Avatar.Icon {...props} icon={item.category.icon}/>}
                right={() => <Paragraph style={{color: item.amount > 0 ? "green" : "red", marginRight: 20}}>{Number(item.amount).toFixed(2)}</Paragraph>}
                />
        </Card>)
    }

    const getBalance = (data) => {
        let balance = data.reduce((acc, item) => acc + Number(item.amount), 0)
        return balance
    }
    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="Home" />
                <Appbar.Action icon="logout" onPress={logout} />
            </Appbar.Header>
            <View style={{ margin: 10 }}>
                <Title>Your Balance: ${getBalance(data).toFixed(2)}</Title>
                <Divider />
                <ScrollView>
                    {data.map( item => <TranItem item={item} key={item.id}/> )}
                </ScrollView>
            </View>
            {/* <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => setIndex(2)}
            /> */}
        </View>
    )
}
const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: "40%",
        bottom: 0,
        backgroundColor: "#76b947"
    },
    container: {
        flex: 1
    },
})
export default HomeScreen
