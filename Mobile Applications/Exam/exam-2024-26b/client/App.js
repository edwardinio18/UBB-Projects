import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EventListScreen from "./screens/EventListScreen";
import CreateEventScreen from "./screens/CreateEventScreen";
import EventDetailsScreen from "./screens/EventDetailsScreen";
import InProgressEventScreen from "./screens/InProgressEventScreen";
import AnalyticsScreen from "./screens/AnalyticsScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="EventList" component={EventListScreen}/>
                <Stack.Screen name="CreateEvent" component={CreateEventScreen}/>
                <Stack.Screen name="EventDetails" component={EventDetailsScreen}/>
                <Stack.Screen name="InProgressEvent" component={InProgressEventScreen}/>
                <Stack.Screen name="Analytics" component={AnalyticsScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;