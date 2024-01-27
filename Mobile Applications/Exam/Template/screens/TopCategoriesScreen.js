import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator
} from 'react-native';
import axios from 'axios';

const TopCategoriesScreen = () => {
    const [topCategories, setTopCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://192.168.0.17:2307/entries');
            const categoryCount = {};

            response.data.forEach(transaction => {
                categoryCount[transaction.category] = (categoryCount[transaction.category] || 0) + 1;
            });

            const sortedCategories = Object.entries(categoryCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3);

            setTopCategories(sortedCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <FlatList
                    data={topCategories}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <View style={styles.categoryItem}>
                            <Text style={styles.title}>{item[0]}</Text>
                            <Text>Transactions: {item[1]}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 10,
    },
    categoryItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default TopCategoriesScreen;