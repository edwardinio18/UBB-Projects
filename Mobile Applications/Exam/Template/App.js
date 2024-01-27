import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FinancialDataScreen from './screens/FinancialDataScreen';
import FinancialDataDetailsScreen from "./screens/FinancialDataDetailsScreen";
import AddFinancialEntryScreen from "./screens/AddFinancialEntryScreen";
import WeeklyProgressScreen from "./screens/WeeklyProgressScreen";
import TopCategoriesScreen from "./screens/TopCategoriesScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Financials" component={FinancialDataScreen}/>
                <Stack.Screen name="FinancialDetails" component={FinancialDataDetailsScreen}/>
                <Stack.Screen name="AddFinancialEntry" component={AddFinancialEntryScreen}/>
                <Stack.Screen name="WeeklyProgress" component={WeeklyProgressScreen}/>
                <Stack.Screen name="TopCategories" component={TopCategoriesScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;