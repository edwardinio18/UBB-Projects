import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import RecordSectionScreen from "./screens/RecordSectionScreen";

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="RecordSection" component={RecordSectionScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;