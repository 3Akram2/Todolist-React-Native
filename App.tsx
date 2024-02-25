import React from 'react';
import { PaperProvider } from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RigsterScreen from './screens/RigsterScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();
export default function App() {
  
  return (
    <PaperProvider>
    <NavigationContainer>
      <Stack.Navigator>  
        <Stack.Screen name="Login"  component={LoginScreen}  />
        <Stack.Screen name="Register" component={RigsterScreen} />
        <Stack.Screen name="Home" options={{ headerShown: false  }} component={HomeScreen}  />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
    
     );
}


