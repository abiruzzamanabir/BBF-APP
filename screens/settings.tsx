import React, {useEffect, useState} from 'react';
import {StyleSheet, View, ImageBackground, ToastAndroid} from 'react-native';
import {
  Appbar,
  TextInput,
  Button,
  Snackbar,
  Text,
  Card,
  IconButton,
} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {
  onAuthStateChanged,
  signOut,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import {auth} from '../FirebaseConfig';

const ProfileUpdate = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [user, setUser] = useState(null);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user);
        setName(user.displayName);
      } else {
        navigation.navigate('Blog');
      }
    });
    return unsubscribe;
  }, []);

  const handleUpdateProfile = () => {
    if (name.trim() === '') {
      setSnackbarVisible(true);
      setSnackbarMessage('Name cannot be empty');
      return;
    }

    if (name.trim().length > 20) {
      setSnackbarVisible(true);
      setSnackbarMessage('Name cannot exceed 20 characters');
      return;
    }

    setSnackbarVisible(true);
    setSnackbarMessage('Updating profile...');

    // Trim spaces from the name and capitalize each character of the word
    const formattedName = name
      .trim()
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const user = auth.currentUser;

    const updateProfilePromise = updateProfile(user, {
      displayName: formattedName,
    });

    if (password !== '' && password.length < 6) {
      setSnackbarVisible(true);
      setSnackbarMessage('Password must be at least 6 characters long');
      return;
    }

    const updatePasswordPromise =
      password !== '' ? updatePassword(user, password) : Promise.resolve();

    Promise.all([updateProfilePromise, updatePasswordPromise])
      .then(() => {
        setSnackbarVisible(true);
        setSnackbarMessage('Profile updated successfully');
        ToastAndroid.show('Profile updated successfully', ToastAndroid.LONG);
        if (password !== '') {
          signOut(auth);
          navigation.navigate('Login');
          setSnackbarMessage(
            'Password updated successfully. Please Login Again.',
          );
          ToastAndroid.show(
            'Password updated successfully. Please Login Again.',
            ToastAndroid.LONG,
          );
        } else {
          navigation.navigate('Blog');
        }
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.jpg')}
      style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Profile Update" />
          </Appbar.Header>
          <View style={styles.formContainer}>
            <Card style={styles.card}>
              <Card.Content>
                {user && (
                  <>
                    <TextInput
                      label="Name"
                      value={name}
                      onChangeText={text => {
                        // Check if the character count exceeds 20
                        if (text.trim().length > 20) {
                          // Display a warning message or prevent further input
                          setSnackbarVisible(true);
                          setSnackbarMessage(
                            'Name cannot exceed 20 characters',
                          );
                        } else {
                          // Update the name state
                          setName(text);
                        }
                      }}
                      onBlur={() => {
                        let formattedText = name
                          .trim()
                          .replace(/\b\w/g, char => char.toUpperCase());
                        formattedText = formattedText.replace(/\s+/g, ' ');
                        formattedText = formattedText.replace(/^\s+/, '');
                        formattedText = formattedText.replace(/ +$/, '');
                        setName(formattedText);
                      }}
                      style={styles.input}
                    />

                    <Text style={styles.nonEditableField}>
                      Email: {user.email}
                    </Text>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        style={styles.input}
                      />
                      <IconButton
                        icon={showPassword ? 'eye-off' : 'eye'}
                        onPress={() => setShowPassword(!showPassword)}
                        style={styles.showHideButton}
                      />
                    </View>
                    <View style={styles.passwordContainer}>
                      <TextInput
                        label="Confirm Password"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry={!showConfirmPassword}
                        style={styles.input}
                      />
                      <IconButton
                        icon={showConfirmPassword ? 'eye-off' : 'eye'}
                        onPress={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        style={styles.showHideButton}
                      />
                    </View>
                    <Button
                      mode="contained"
                      onPress={handleUpdateProfile}
                      style={styles.button}>
                      Update Profile
                    </Button>
                  </>
                )}
              </Card.Content>
            </Card>
          </View>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={Snackbar.DURATION_SHORT}>
            {snackbarMessage}
          </Snackbar>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)', // Adjust the opacity as needed
  },
  formContainer: {
    paddingHorizontal: 10,
    marginTop: 10,
    flex: 1,
  },
  card: {
    marginVertical: 10,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  nonEditableField: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#eee',
  },
  passwordContainer: {
    position: 'relative',
  },
  showHideButton: {
    position: 'absolute',
    top: 12,
    right: 0,
  },
});

export default ProfileUpdate;
