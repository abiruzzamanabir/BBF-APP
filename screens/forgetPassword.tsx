import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, Image, ActivityIndicator } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icon

import LogoImage from '../assets/images/logo.png';

const ForgetPasswordScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState(false); // State variable for loading indicator

  const handleForgetPassword = () => {
    if (email.trim() === '') {
      setSnackbarVisible(true);
    } else {
      // Here you can implement your logic to handle the forget password functionality
      setLoading(true); // Set loading to true when password reset process starts
      // Simulating password reset process with setTimeout
      setTimeout(() => {
        setLoading(false); // Set loading to false when password reset process ends
        setSnackbarVisible(true);
      }, 2000); // Example: 2 seconds delay
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={LogoImage} style={styles.logo} />
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#aaa" style={styles.icon} />
          <View style={styles.dividerLeft}></View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button mode="contained" onPress={handleForgetPassword} disabled={loading}>
            {loading ? <ActivityIndicator color="white" /> : 'Reset Password'}
          </Button>
        </View>
      </View>
      <View style={styles.footer}>
        <Button onPress={() => navigation.navigate('Login')} mode="outlined">
          Back to Login
        </Button>
      </View>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {email.trim() === '' ? 'Please enter your email' : 'Password reset instructions have been sent to your email.'}
      </Snackbar>
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10, // Add marginLeft to separate icon and input
  },
  icon: {
    width: 20,
    textAlign: 'center',
    marginRight: 10,
  },
  footer: {
    marginBottom: 20,
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  dividerLeft: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginRight: 5,
  },
});

export default ForgetPasswordScreen;
