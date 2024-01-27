import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";
import {appendLog} from "../log/Logger";

const AddFinancialEntryScreen = ({route}) => {
    const navigation = useNavigation();
    const [date, setDate] = useState('');
    const [type, setType] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const currentDate = route.params.date;

    const handleSubmit = async () => {
        if (!type || !amount || !category || !description) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            await axios.post('http://192.168.0.17:2307/transaction', {
                date: currentDate,
                type,
                amount: parseFloat(amount),
                category,
                description,
            });
            Alert.alert('Success', 'Financial entry added successfully');
            setDate('');
            setType('');
            setAmount('');
            setCategory('');
            setDescription('');
            navigation.navigate('FinancialDetails', {date: currentDate});
        } catch (error) {
            appendLog('Error adding financial entry');
            Alert.alert('Error', 'Failed to add financial entry');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Date:</Text>
                <TextInput style={styles.input} value={currentDate} onChangeText={setDate} editable={false}/>

                <Text style={styles.label}>Type:</Text>
                <TextInput style={styles.input} value={type} onChangeText={setType}/>

                <Text style={styles.label}>Amount:</Text>
                <TextInput
                    style={styles.input}
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Category:</Text>
                <TextInput style={styles.input} value={category} onChangeText={setCategory}/>

                <Text style={styles.label}>Description:</Text>
                <TextInput style={styles.input} value={description} onChangeText={setDescription}/>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Entry</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 4,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddFinancialEntryScreen;