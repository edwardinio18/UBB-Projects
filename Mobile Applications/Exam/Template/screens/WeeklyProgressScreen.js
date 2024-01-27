import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    StatusBar,
    Platform
} from 'react-native';
import axios from 'axios';
import {appendLog} from '../log/Logger';
import moment from 'moment';

const WeeklyProgressScreen = () => {
    const [weeklyTotals, setWeeklyTotals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadFinancialData();
    }, []);

    const loadFinancialData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://192.168.0.17:2307/entries');
            const weeklyAmount = {};

            response.data.forEach(transaction => {
                const weekNumber = moment(transaction.date, "YYYY-MM-DD").week();
                weeklyAmount[weekNumber] = (weeklyAmount[weekNumber] || 0) + transaction.amount;
            });

            const sortedWeeklyData = Object.entries(weeklyAmount).sort((a, b) => b[1] - a[1]);
            setWeeklyTotals(sortedWeeklyData);
            appendLog('Financial data fetched and processed successfully');
        } catch (error) {
            appendLog('Error fetching financial data: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <>
                    <Text style={styles.sectionTitle}>Weekly Financial Progress</Text>
                    <FlatList
                        data={weeklyTotals}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <View style={styles.weekItem}>
                                <Text style={styles.title}>Week: {item[0]}</Text>
                                <Text>Total Amount: ${item[1].toFixed(2)}</Text>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    weekItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#f2f2f2',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        paddingLeft: 10
    },
});

export default WeeklyProgressScreen;