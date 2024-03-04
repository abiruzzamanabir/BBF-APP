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
import app from '../FirebaseConfig';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'; 
import LogoImage from '../assets/images/logo.png';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { showToast } from '../App';

const auth = getAuth(app);
const firestore = getFirestore(app);

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const handleRegister = async () => {
    if (fullName && email && phone && password && confirmPassword) {
      if (password !== confirmPassword) {
        // Alert.alert('Error', 'Passwords do not match');
        showToast('error', 'Passwords do not match','');
      } else {
        try {
          const response = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(auth.currentUser, {
            displayName: fullName,
            phoneNumber: phone
          });
  
          // Alert.alert('Success', 'Sign up successful');
          showToast('success', 'Sign up successful','');
          navigation.navigate('Login');
        } catch (error) {
          // Alert.alert('Error', error.message);
          if(error.message==='Firebase: Error (auth/email-already-in-use).'){
            showToast('error', 'User Already Exist!','');
          }
        }
      }
    } else {
      // Alert.alert('Error', 'Please fill all fields');
      showToast('error', 'Please fill all fields','');
    }
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
            placeholder="Full Name"
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />
        </View>
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
        <View style={styles.inputContainer}>
          <Icon name="phone" size={20} color="#aaa" style={styles.icon} />
          <View style={styles.dividerLeft}></View>
          <TextInput
            style={styles.input}
            placeholder="Phone"
            onChangeText={(text) => setPhone(text)}
            value={phone}
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.passwordInputContainer}>
          <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
          <View style={styles.dividerLeft}></View>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordToggleButton}>
            <Icon
              name={showPassword ? 'eye-slash' : 'eye'}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.passwordInputContainer}>
          <Icon name="lock" size={20} color="#aaa" style={styles.icon} />
          <View style={styles.dividerLeft}></View>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.passwordToggleButton}>
            <Icon
              name={showConfirmPassword ? 'eye-slash' : 'eye'}
              size={20}
              color="#aaa"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={handleRegister} />
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
  dividerLeft: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginRight: 5,
  },
  dividerRight: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginRight: 40,
  },
  icon: {
    width: 20,
    textAlign: 'center',
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  passwordToggleButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  footer: {
    marginBottom: 20,
  },
  footerText: {
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
});

export default RegistrationScreen;
