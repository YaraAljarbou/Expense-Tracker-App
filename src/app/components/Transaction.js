import React from 'react';
import { Card, Paragraph, Avatar } from 'react-native-paper';
import { SwipeListView } from 'react-native-swipe-list-view';

const Transaction = ({ item }) => {
    return (
        <Card style={{marginBottom: 10, padding: 5}} key={item.id}>
            <Card.Title 
                title={item.description} 
                subtitle={item.category.name} 
                left={(props) => <Avatar.Icon {...props} icon={item.category.icon}/>}
                right={() => <Paragraph style={{color: item.amount > 0 ? "green" : "red", marginRight: 20}}>{Number(item.amount).toFixed(2)}</Paragraph>}
            />
        </Card>
    )
}

export default Transaction;
