import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  DrawerLayoutAndroid,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Easing,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for persistent storage
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import BlogPost from './post';
import { showToast } from '../App';

const BlogPostTemplate = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [drawerAnimation] = useState(new Animated.Value(0));
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status

  useEffect(() => {
    checkLoginStatus(); // Check login status when component mounts
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setDisplayName(user.displayName.toUpperCase());
        setLoading(false);
        setIsLoggedIn(true); // User is logged in
      } else {
        setIsLoggedIn(false); // User is not logged in
        setLoading(false);
        navigation.navigate('Login');
      }
    });
    return unsubscribe;
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const drawerRef = React.useRef(null);

  const openDrawer = () => {
    drawerRef.current.openDrawer();
    animateDrawer(1); // Open drawer animation
  };

  const closeDrawer = () => {
    animateDrawer(0); // Close drawer animation
    setTimeout(() => {
      drawerRef.current.closeDrawer();
    }, 300); // Wait for animation to finish before closing drawer
  };

  const animateDrawer = toValue => {
    Animated.timing(drawerAnimation, {
      toValue: toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const onRefresh = () => {
    setLoading(true);
    setRefreshing(true);
    setTimeout(() => {
      setLoading(false);
      setRefreshing(false);
    }, 2000);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        AsyncStorage.removeItem('userToken'); // Clear user token from AsyncStorage
        setIsLoggedIn(false);
        navigation.navigate('Login');
        // showToast('success', 'Signed out successfully','');
        ToastAndroid.show("Signed out successfully", ToastAndroid.LONG);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const drawerTranslateX = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 250], // Adjust this value according to your drawer width
  });

  const navigateToPage = pageName => {
    // Navigate to the page
  };

  return (
    {isLoggedIn} && <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition="left"
      onDrawerOpen={openDrawer}
      onDrawerClose={closeDrawer}
      renderNavigationView={() => (
        <View style={styles.drawerContainer}>
          <View style={styles.drawerHeader}>
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={styles.headerImage}>
              <Image
                source={require('../assets/images/background.webp')}
                style={styles.headerImage}
              />
            </LinearGradient>
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/images/pp.jpg')}
                style={styles.profilePicture}
              />
              <Text style={styles.profileName}>{displayName}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigation.navigate('Setting')}>
            <Icon name="settings-outline" size={20} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigateToPage('About')}>
            <Icon
              name="information-circle-outline"
              size={20}
              style={styles.drawerIcon}
            />
            <Text style={styles.drawerText}>About Us</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigateToPage('Contact')}>
            <Icon name="mail-outline" size={20} style={styles.drawerIcon} />
            <Text style={styles.drawerText}>Contact</Text>
          </TouchableOpacity>
          <View style={styles.drawerItemBottom}>
            <TouchableOpacity
              style={styles.drawerItemBottomButton}
              onPress={handleLogout}>
              <LinearGradient
                colors={['#4c669f', '#3b5998', '#192f6a']}
                style={styles.signOutButton}>
                <Icon
                  name="log-out-outline"
                  size={20}
                  color="#fff"
                  style={styles.drawerIcon}
                />
                <Text style={[styles.drawerText, { color: '#fff' }]}>
                  Sign Out
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      )}>
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateX: drawerTranslateX }] },
        ]}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={styles.content}>
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={styles.header}>
              <TouchableOpacity
                onPress={openDrawer}
                style={styles.drawerToggle}>
                <Icon name="menu-outline" size={30} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.heading}>Explore Our Blog</Text>
              <TouchableOpacity style={styles.placeholder} />
            </LinearGradient>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : (
              <View style={styles.blogContainer}>
                <BlogPost
                  image={require('../assets/images/post1.jpg')}
                  title="Title of Post 1"
                  description="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc."
                />
                <BlogPost
                  image={require('../assets/images/post2.jpg')}
                  title="Title of Post 2"
                  description="Description of Post 2. Proin ullamcorper tellus eu mi suscipit, quis gravida velit hendrerit."
                />
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
  },
  blogContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 5,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  drawerItemBottom: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  drawerItemBottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  drawerText: {
    fontSize: 18,
    marginLeft: 20,
  },
  drawerIcon: {
    marginRight: 10,
  },
  drawerToggle: {
    marginRight: 10,
  },
  placeholder: {
    flex: 1,
  },
  drawerHeader: {
    marginBottom: 0,
  },
  headerImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    textTransform: 'uppercase',
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  signOutButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 5,
  },
});

export default BlogPostTemplate;
