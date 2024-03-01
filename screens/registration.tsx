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
  KeyboardAvoidingView,
} from 'react-native';

// Import your logo image
import LogoImage from '../assets/images/logo.png';
import FacebookLogo from '../assets/images/facebook_logo.png';
import GoogleLogo from '../assets/images/google_logo.png';
import { useNavigation } from '@react-navigation/native';

const RegistrationScreen = () => {
  const navigation = useNavigation(); // Initialize navigation object
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('male'); // Default selection set to 'male'
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

  const handleRegister = () => {
    if (name && email && phone && gender && password && confirmPassword) {
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
      } else {
        // Implement registration logic here
        Alert.alert('Success', 'Account created successfully');
      }
    } else {
      Alert.alert('Error', 'Please fill all fields');
    }
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
        {/* Logo */}
        <Image source={LogoImage} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          onChangeText={(text) => setPhone(text)}
          value={phone}
          keyboardType="phone-pad"
        />
        <View style={styles.radioContainer}>
          <TouchableOpacity
            style={[
              styles.radioOption,
              gender === 'Male' && styles.selectedGender,
            ]}
            onPress={() => setGender('Male')}>
            <View
              style={[
                styles.radioCircle,
                gender === 'Male' && styles.selectedCircle,
              ]}
            />
            <Text style={styles.radioOptionText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.radioOption,
              gender === 'Female' && styles.selectedGender,
            ]}
            onPress={() => setGender('Female')}>
            <View
              style={[
                styles.radioCircle,
                gender === 'Female' && styles.selectedCircle,
              ]}
            />
            <Text style={styles.radioOptionText}>Female</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={handleRegister} />
        </View>
        <View style={styles.orContainer}>
          <View style={styles.divider}></View>
          <Text style={styles.orText}>Or register with</Text>
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
        <View style={styles.footer}>
          <Text
            style={styles.footerText}
            onPress={() => navigation.push('Login')}>
            Already have an account? Sign in
          </Text>
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
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'flex-start', // Align items to the start (left)
    width: '80%', // Limit the width of the radio container
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  radioOptionText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#333',
    marginRight: 5,
  },
  selectedCircle: {
    backgroundColor: '#333',
  },
  selectedGender: {
    opacity: 1,
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

export default RegistrationScreen;
