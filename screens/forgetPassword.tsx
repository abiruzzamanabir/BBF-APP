import React from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native'; // Import useNavigation hook from React Navigation

import LogoImage from '../assets/images/logo.png';

const ForgetPasswordScreen = () => {
  const navigation = useNavigation(); // Initialize navigation object

  const [email, setEmail] = React.useState('');

  const handleForgetPassword = () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter your email');
    } else {
      // Here you can implement your logic to handle the forget password functionality
      Alert.alert(
        'Reset Password',
        'Password reset instructions have been sent to your email.',
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={LogoImage} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <View style={styles.buttonContainer}>
          <Button title="Reset Password" onPress={handleForgetPassword} />
        </View>
      </View>
      <View style={styles.footer}>
        <Text
          style={styles.footerText}
          onPress={() => navigation.push('Login')}>
          Back to Login
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  loginContainer: {
    marginTop: 20,
    width: '80%',
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
  footer: {
    marginBottom: 20,
  },
  footerText: {
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

export default ForgetPasswordScreen;
