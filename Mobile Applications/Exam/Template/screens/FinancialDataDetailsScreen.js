import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import {appendLog} from "../log/Logger";
import WebSocketClient from "../websocket/WebSocketClient";

const FinancialDataDetailsScreen = ({route}) => {
    const navigation = useNavigation();
    const {date} = route.params;
    const [transactions, setTransactions] = useState([]);
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        loadTransactions();

        return () => unsubscribe();
    }, [date]);

    const handleWebSocketMessage = (data) => {
        try {
            const newTransaction = JSON.parse(data);
            setTransactions((prevTransactions) => [...prevTransactions, newTransaction]);
            Toast.show({
                type: 'info',
                text1: 'New Transaction Added',
                text2: `Transaction: ${newTransaction.type}`,
                visibilityTime: 5000,
                onPress: () => {
                    navigation.navigate('FinancialDetails', {date: newTransaction.date})
                },
            });
        } catch (error) {
            console.error('Error parsing WebSocket message', error);
        }
    };

    WebSocketClient(handleWebSocketMessage);

    const loadTransactions = async () => {
        setIsLoading(true);
        const storedTransactions = await getData(`@transactions_${date}`);
        if (isOffline) {
            if (storedTransactions) {
                appendLog('Loaded transactions from AsyncStorage');
                setTransactions(storedTransactions);
            } else {
                setIsOffline(true);
            }
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://192.168.0.17:2307/transactions/${date}`);
            setTransactions(response.data);
            await storeData(`@transactions_${date}`, response.data);
            appendLog('Transactions fetched successfully from server');
            setIsOffline(false);
        } catch (error) {
            appendLog('Error fetching transactions: ' + error.message);
            if (storedTransactions) {
                setTransactions(storedTransactions);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to fetch transactions.',
                    visibilityTime: 5000,
                });
                setIsOffline(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            appendLog('Storing data in AsyncStorage');
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            appendLog('Error storing data', e);
        }
    };

    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            appendLog('Retrieved data from AsyncStorage');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            appendLog('Error retrieving data', e);
        }
    };

    const deleteTransaction = async (transactionId) => {
        if (isOffline) {
            Toast.show({
                type: 'error',
                text1: 'Offline',
                text2: 'Cannot delete transactions while offline.',
                visibilityTime: 5000,
            });
            return;
        }

        try {
            await axios.delete(`http://192.168.0.17:2307/transaction/${transactionId}`);
            appendLog('Transaction deleted successfully from server');

            const updatedTransactions = transactions.filter((transaction) => transaction.id !== transactionId);
            setTransactions(updatedTransactions);
            await storeData(`@transactions_${date}`, updatedTransactions);
        } catch (error) {
            appendLog('Error deleting transaction:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to delete transaction.',
                visibilityTime: 5000,
            });
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff"/>
            ) : isOffline && !transactions.length ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <Button title="Retry" onPress={loadTransactions} color="#007AFF"/>
                </View>
            ) : (
                <>
                    <FlatList
                        data={transactions}
                        keyExtractor={(transaction) => transaction.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.transactionItem}>
                                <Text style={styles.transactionTitle}>{item.type}: {item.amount}</Text>
                                <Text>Category: {item.category}</Text>
                                <Text>Date: {item.date}</Text>
                                <Text>Description: {item.description}</Text>
                                <TouchableOpacity
                                    style={[styles.deleteButton, isOffline && styles.disabledButton]}
                                    onPress={() => deleteTransaction(item.id)}
                                    disabled={isOffline}
                                >
                                    <Text
                                        style={[styles.deleteButtonText, isOffline && styles.disabledButtonText]}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />

                    <TouchableOpacity
                        style={[styles.addButton, isOffline && styles.disabledButton]}
                        onPress={() => navigation.navigate('AddFinancialEntry', {date})}
                        disabled={isOffline}
                    >
                        <Text style={[styles.addButtonText, isOffline && styles.disabledButtonText]}>Add New
                            Transaction</Text>
                    </TouchableOpacity>
                </>
            )}
            <Toast/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    offlineContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    offlineText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    transactionItem: {
        backgroundColor: '#e6e6e6',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    transactionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        margin: 16,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    disabledButton: {
        backgroundColor: '#999',
        opacity: 0.7,
    },
    disabledButtonText: {
        color: '#666',
    },
});

export default FinancialDataDetailsScreen;