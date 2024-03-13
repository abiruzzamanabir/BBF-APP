import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, View, Dialog, Paragraph, Provider as PaperProvider } from 'react-native-paper';
import LoginScreen from './screens/login';
import RegistrationScreen from './screens/registration';
import ForgetPasswordScreen from './screens/forgetPassword';
import BlogPostTemplateScreen from './screens/blogPost';
import SettingsPage from './screens/settings';
import NetInfo from '@react-native-community/netinfo'; // Import NetInfo module
import AboutUsScreen from './screens/about';
import ContactPage from './screens/contact';
import Team from './screens/team';

const Stack = createStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showNoInternetDialog, setShowNoInternetDialog] = useState(false);
  const [isInternetReachable, setIsInternetReachable] = useState(true);
  const [isAttemptingLogin, setIsAttemptingLogin] = useState(false); // New state

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(handleConnectivityChange);
    checkLoginStatus();
    return () => unsubscribe();
  }, []);

  const handleConnectivityChange = (state) => {
    setIsInternetReachable(state.isConnected && state.isInternetReachable);
    setShowNoInternetDialog(!state.isConnected);
  };

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!isInternetReachable) {
      setShowNoInternetDialog(true);
      return;
    }
    // Perform login process
    setIsAttemptingLogin(true);
    // Simulating login process with a delay (replace this with your actual login logic)
    setTimeout(() => {
      setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
      setIsAttemptingLogin(false);
    }, 2000); // 2 seconds delay to simulate login process
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={isLoggedIn ? 'Blog' : 'Login'}>
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen
                {...props}
                onLogin={handleLogin}
                isAttemptingLogin={isAttemptingLogin}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Registration" component={RegistrationScreen} />
          <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
          <Stack.Screen name="Blog" component={BlogPostTemplateScreen} />
          <Stack.Screen name="Setting" component={SettingsPage} />
          <Stack.Screen name="About" component={AboutUsScreen} />
          <Stack.Screen name="Team" component={Team} />
          <Stack.Screen name="Contact" component={ContactPage} />
        </Stack.Navigator>
        {isLoggedIn && (
          <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
            <Button title="Logout" onPress={handleLogout} />
          </View>
        )}
        <Dialog visible={showNoInternetDialog} onDismiss={() => setShowNoInternetDialog(false)}>
          <Dialog.Title>No Internet Connection</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Please connect to the internet to use this app.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowNoInternetDialog(false)}>OK</Button>
          </Dialog.Actions>
        </Dialog>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
