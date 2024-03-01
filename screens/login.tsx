import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import LogoImage from '../assets/images/logo.png';
import FacebookLogo from '../assets/images/facebook_logo.png';
import GoogleLogo from '../assets/images/google_logo.png';

const LoginScreen = () => {
  const navigation = useNavigation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleLogin = () => {
    if (username === 'admin' && password === 'abir') {
      Alert.alert('Success', 'Logged in successfully');
    } else {
      Alert.alert('Error', 'Invalid username or password');
    }
  };

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };

  const handleFacebookLogin = () => {
    // Logic to handle Facebook login
    // You can use libraries like React Native FBSDK for Facebook login
  };

  const handleGoogleLogin = () => {
    // Logic to handle Google login
    // You can use libraries like React Native Google Sign-In for Google login
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <Image source={LogoImage} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Username"
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} />
        </View>
        <TouchableOpacity onPress={handleForgetPassword}>
          <Text style={styles.link}>Forget Password?</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.divider}></View>
          <Text style={styles.orText}>Or login with</Text>
          <View style={styles.divider}></View>
        </View>
        <View style={styles.socialLoginContainer}>
          <TouchableOpacity onPress={handleFacebookLogin}>
            <Image source={FacebookLogo} style={styles.socialLogo} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleGoogleLogin}>
            <Image source={GoogleLogo} style={styles.socialLogo} />
          </TouchableOpacity>
        </View>
      </View>
      {!keyboardVisible && (
        <View style={styles.createAccountContainer}>
          <Button
            title="Create Account"
            onPress={() => navigation.navigate('Registration')}
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  createAccountContainer: {
    marginBottom: 20,
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
  },
  orText: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  socialLogo: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  link: {
    marginTop: 10,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default LoginScreen;
