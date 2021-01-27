import React from 'react'
import { Text, View, ScrollView, FlatList } from 'react-native';
import { Query } from 'react-apollo';
import { ActivityIndicator } from 'react-native-paper';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const Transactions = ({ userId }) => {
    const TranItem = ({ item }) => {
        return (
            <View>
                <Text>{item.description}</Text>
            </View>
        )
    }
    const FETCH_TRANSACTIONS = gql`
    query ($userId: String){
        transactions(where: {user_id: {_eq: $userId}}) {
        amount
        category {
            name
        }
        description
        type
    }
    }
    `;

    const { data, error, loading } = useQuery(
        FETCH_TRANSACTIONS,
        {
            variables: { userId }
        }
    );
    if (error) {
        console.error(error);
        return <Text>Error</Text>;
    }
    if (loading) {
        return <ActivityIndicator animating={true} />;
    }
    return (
        <View>
            <Text>Transactions</Text>
            <View style={styles.container}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContainer}>
                    <FlatList
                        data={data.transactions}
                        renderItem={({ item }) => <TranItem item={item} />}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </ScrollView>
            </View>
            {/* <Query
                query={FETCH_TRANSACTIONS}
            >
                {
                    ({ data, error, loading }) => {
                        if (error || loading) {
                            return <View> <Text> Loading ... </Text> </View>
                        }
                        return (
                            <ScrollView style={styles.container} contentContainerStyle={styles.container}>
                                <FlatList
                                    data={data.todos}
                                    renderItem={({ item }) => <Text>{item.text}</Text>}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            </ScrollView>
                        )
                    }
                }
            </Query> */}
        </View>
    )
}

export default Transactions;
