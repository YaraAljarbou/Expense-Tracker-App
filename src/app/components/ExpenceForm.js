import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Card, FAB } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import CategoryData from './CategoryData';

const ExpenceForm = ({ logout }) => {
    const [expence, setExpence] = useState({
        id:1,
        amount: "",
        category: {
            name: "", 
            icon: ""
        },
        description: "",
        type: "-"
    });

    const [showDropDown, setShowDropDown] = useState(false);
    const [category, setCategory] = useState();
    
    const categoryList = [];
    for (const category of CategoryData) {
        categoryList.push({ label: category.name, value: category.name });
    }

    const handleChange = () => {
        console.log("/////////////////////////////////////here");
        console.log(expence);
        let selectedCategory = CategoryData.find(c => c.name === category);
        console.log("/////////////////////////////////////");
        console.log(selectedCategory);
        //selectedCategory.name=category;
        //selectedCategory.name=category;
        setExpence({...expence, category: "hello"});
        console.log("/////////////////////////////////////");
        console.log(expence);
    }

    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="Add New Expence" />
                <Appbar.Action icon="logout" onPress={logout} />
            </Appbar.Header>
            <View style={styles.container}>
                <Card style={{padding: 30}}>
                <TextInput 
                    style={{marginTop: 20, marginBottom: 20}}
                    label="Amount"
                    defaultValue={expence.amount}
                    onChangeText={value => setExpence({...expence, amount: value})}
                />
                <DropDown
                    activeColor={"green"}
                    label={'Category'}
                    mode={'flat'}
                    value={category}
                    setValue={setCategory}
                    list={categoryList}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    inputProps={{
                        right: <TextInput.Icon name={'menu-down'} />,
                    }}
                />
                <TextInput
                    style={{marginTop: 20}}
                    label="Description"
                    defaultValue={expence.description}
                    onChangeText={value => setExpence({...expence, description: value})}
                />
                
                <FAB
                    style={styles.fab}
                    icon="plus"
                    label="Add"
                    onPress={handleChange}
                />
            </Card>
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    fab: {
        //position: 'absolute',
        margin: 16,
        bottom: 0,
        backgroundColor: "#76b947"
    },
    container: {
        padding: 20
    },
})
export default ExpenceForm;
