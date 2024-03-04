import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './screens/login';
import RegistrationScreen from './screens/registration';
import ForgetPasswordScreen from './screens/forgetPassword';
import BlogPostTemplateScreen from './screens/blogPost';
import { Button, View } from 'react-native';
import SettingsPage from './screens/settings';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

export const showToast = (type, txt1, txt2) => {
  Toast.show({
    type: type,
    text1: txt1,
    text2: txt2,
    autoHide: true,
    visibilityTime: 4000,
    position: 'top',
  });
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      // Check AsyncStorage for login state
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        // User is logged in
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      // Done loading
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear AsyncStorage
      await AsyncStorage.removeItem('userToken');
      // Update login state
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    // Loading screen
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={isLoggedIn ? "Blog" : "Login"}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="Blog" component={BlogPostTemplateScreen} />
        <Stack.Screen name="Setting" component={SettingsPage} />
      </Stack.Navigator>
      {isLoggedIn && (
        <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
          <Button title="Logout" onPress={handleLogout} />
        </View>
      )}
      <Toast />
    </NavigationContainer>
  );
};

export default App;
