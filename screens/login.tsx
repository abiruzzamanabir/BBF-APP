import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Image, TouchableOpacity, ScrollView, Keyboard, ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../FirebaseConfig'; 
import LogoImage from '../assets/images/logo.png'; 
import FacebookLogo from '../assets/images/facebook_logo.png'; 
import GoogleLogo from '../assets/images/google_logo.png'; 
import Icon from 'react-native-vector-icons/FontAwesome'; 
import { showToast } from '../App';

const auth = getAuth(app);

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleLogin = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      // showToast('success', 'Logged in successfully','');
      ToastAndroid.show("Logged in successfully", ToastAndroid.LONG);
      navigation.navigate('Blog'); 
    } catch (error) {
      // console.error('Login failed:', error);
      // Alert.alert('Error', 'Invalid username or password');
      showToast('error', 'Invalid username or password','');
    }
  };

  const handleForgetPassword = () => {
    navigation.navigate('ForgetPassword');
  };

  const handleFacebookLogin = () => {
    // Implement Facebook login logic
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        <Image source={LogoImage} style={styles.logo} />
        <View style={styles.inputContainer}>
          <Icon name="user" size={20} color="#aaa" style={styles.icon} />
          <View style={styles.dividerLeft}></View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.passwordInputContainer}>
          <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
          <View style={styles.dividerLeft}></View>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={text => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-slash' : 'eye'}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={handleLogin} />
        </View>
        <TouchableOpacity onPress={handleForgetPassword}>
          <Text style={styles.link}>Forget Password?</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.divider} />
          <Text style={styles.orText}>Or login with</Text>
          <View style={styles.divider} />
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    textAlign: 'center',
    marginRight: 10,
  },
  dividerLeft: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginRight: 5,
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
  passwordInput: {
    flex: 1,
    height: 40,
  },
  input: {
    flex: 1,
    height: 40,
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
