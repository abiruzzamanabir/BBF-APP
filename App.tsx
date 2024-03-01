import React from 'react';
// Import necessary modules from React Navigation
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './screens/login';
import RegistrationScreen from './screens/registration';
import ForgetPassword from './screens/forgetPassword';
import BlogPostTemplate from './screens/blogPost';

// Define stack navigator
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="Blog" component={BlogPostTemplate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
