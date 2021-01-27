import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Appbar, TextInput, Card, FAB } from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import CategoryData from './CategoryData';

const ExpenseForm = ({ logout, data, setData, setIndex }) => {
    const [expense, setExpense] = useState({
        id: Math.random().toString(36).substr(2, 9),
        amount: "",
        category: {
            name: "",
            icon: ""
        },
        description: "",
    });

    const [showDropDown, setShowDropDown] = useState(false);
    const [category, setCategory] = useState();

    const categoryList = [];
    for (const category of CategoryData) {
        categoryList.push({ label: category.name, value: category.name });
    }
    let selectedCategory = CategoryData.find(c => c.name === category);
    const handleChange = () => {
        // console.log("/////////////////////////////////////here");
        // console.log(expense);
        // let selectedCategory = CategoryData.find(c => c.name === category);
        // console.log("/////////////////////////////////////");
        // console.log(selectedCategory);
        //selectedCategory.name=category;
        //selectedCategory.name=category;
        // setExpense({ ...expense, category: selectedCategory });
        setData([...data, expense ])
        setExpense({ id: Math.random().toString(36).substr(2, 9),
            amount: "",
            category: {
                name: "",
                icon: ""
            },
            description: "" 
        });
        setIndex(0)
        // console.log("/////////////////////////////////////");
        // console.log(expense);
    // console.log(category);

        // console.log(data)
    }
    // console.log(data)
    // console.log(expense);
    useEffect(() => {
        setExpense({ ...expense, category: selectedCategory });
    }, [category])
    return (
        <View>
            <Appbar.Header>
                <Appbar.Content title="Add New Expense" />
                <Appbar.Action icon="logout" onPress={logout} />
            </Appbar.Header>
            <View style={styles.container}>
                <Card style={{ padding: 30 }}>
                    <TextInput
                        style={{ marginTop: 20, marginBottom: 20 }}
                        label="Amount"
                        value={expense.amount}
                        onChangeText={value => setExpense({ ...expense, amount: value})}
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
                        style={{ marginTop: 20 }}
                        label="Description"
                        value={expense.description}
                        onChangeText={value => setExpense({ ...expense, description: value })}
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
export default ExpenseForm;