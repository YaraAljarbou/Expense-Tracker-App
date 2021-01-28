import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Appbar, Divider, Avatar, Searchbar, Chip  } from 'react-native-paper';
import Transaction from './Transaction';
import Swipeable from 'react-native-swipeable-row';

const HomeScreen = ({ logout, data, setData }) => {

    const [filter, setFilter] = useState("all");

    const getBalance = (data) => {
        let balance = data.reduce((acc, item) => acc + Number(item.amount), 0);
        return balance;
    }

    const rightButtons = [
        <TouchableOpacity><Avatar.Icon color="red" style={{ marginRight: 0, height: 82, backgroundColor: '#F7C6C5', borderRadius: 0}} size={50} icon="trash-can" /></TouchableOpacity>
    ];

    const handleDelete = (id) => {
        let newData =  data.filter( (item) => item.id !== id);
        setData(newData);
    }


    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.Content style={{ fontWeights: '', textAlign: 'left' }} title={`Your Balance: $ ${getBalance(data).toFixed(2)}`} />
                <Appbar.Action icon="logout" onPress={logout} />
            </Appbar.Header>

            <View style={{ margin: 20 }}>
                <Searchbar
                    placeholder="Search"
                    //onChangeText={onChangeSearch}
                    //value={searchQuery}
                />

                <View style={{ flexWrap: 'wrap', flexDirection: 'row', marginTop: 20}}>
                    <Chip selected={filter === 'incomes'} style={{width: '50%'}} icon="arrow-bottom-left" onClose={() => setFilter('all')} onPress={() => setFilter('incomes')}>Incomes</Chip>
                    <Chip selected={filter === 'expenses'} style={{width: '50%'}} icon="arrow-top-right" onClose={() => setFilter('all')} onPress={() => setFilter('expenses')}>Expenses</Chip>
                </View>

                <ScrollView style={{marginTop: 20}}>
                    {
                        filter === "all" && data.map( item => 
                            <Swipeable rightActionActivationDistance={30} rightButtons={rightButtons} onRightActionRelease={() => handleDelete(item.id)} >
                                <Transaction item={item} key={item.id}/> 
                            </Swipeable>
                        )
                    }
                    {
                        filter === "incomes" && data.filter(item => item.amount > 0).map( item => 
                            <Swipeable rightActionActivationDistance={30} rightButtons={rightButtons} onRightActionRelease={() => handleDelete(item.id)} >
                                <Transaction item={item} key={item.id}/> 
                            </Swipeable>
                        )
                    }
                    {
                        filter === "expenses" && data.filter(item => item.amount < 0).map( item => 
                            <Swipeable rightActionActivationDistance={30} rightButtons={rightButtons} onRightActionRelease={() => handleDelete(item.id)} >
                                <Transaction item={item} key={item.id}/> 
                            </Swipeable>
                        )
                    }
                </ScrollView>
            </View>
        </View>
    )
}

export default HomeScreen;

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
