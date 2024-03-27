import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Easing,
  ToastAndroid,
  DrawerLayoutAndroid,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../FirebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import BlogPost from './post';

const BlogPostTemplate = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [drawerAnimation] = useState(new Animated.Value(0));
  const [drawerTranslateX] = useState(new Animated.Value(0));
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [blogPosts, setBlogPosts] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [swipedUpToLoadMore, setSwipedUpToLoadMore] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(2);
  const [noMorePostsMessageShown, setNoMorePostsMessageShown] = useState(false);
  const [backgroundAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    setInitialLoad(false);
  }, [blogPosts]);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setDisplayName(
          user.displayName ? user.displayName.toUpperCase() : 'User',
        );
        setLoading(false);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setLoading(false);
        navigation.navigate('Login');
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchData(auth.currentUser);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchData(auth.currentUser);
    }, []),
  );

  const fetchData = async user => {
    try {
      if (user) {
        setDisplayName(
          user.displayName ? user.displayName.toUpperCase() : 'User',
        );
        setLoading(true);
        const response = await fetch(
          'https://api.slingacademy.com/v1/sample-data/blog-posts',
        );
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }

        const data = await response.json();
        setBlogPosts(data.blogs);
      } else {
        setDisplayName('');
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      ToastAndroid.show('Error fetching blog posts', ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  const checkLoginStatus = async () => {
    try {
      const userToken = await AsyncStorage.getItem('userToken');
      if (userToken !== null) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
      ToastAndroid.show('Error checking login status', ToastAndroid.LONG);
    }
  };

  const drawerRef = useRef(null);

  const openDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.openDrawer();
      animateDrawer(1);
      animateBackground(1);
      setDrawerOpen(true);
    }
  };

  const closeDrawer = () => {
    animateDrawer(0);
    setTimeout(() => {
      if (drawerRef.current) {
        drawerRef.current.closeDrawer();
      }
    }, 300);
    animateBackground(0);
    setDrawerOpen(false);
  };

  const animateDrawer = toValue => {
    Animated.parallel([
      Animated.timing(drawerAnimation, {
        toValue: toValue,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
      Animated.timing(drawerTranslateX, {
        toValue: toValue === 1 ? -6 : 0,
        duration: 300,
        easing: Easing.ease,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const animateBackground = toValue => {
    Animated.timing(backgroundAnimation, {
      toValue,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const onRefresh = () => {
    setLoading(true);
    setRefreshing(true);
    fetchData(auth.currentUser);
    setVisiblePosts(2);
    setNoMorePostsMessageShown(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        AsyncStorage.removeItem('userToken');
        setIsLoggedIn(false);
        navigation.navigate('Login');
        ToastAndroid.show('Signed out successfully', ToastAndroid.LONG);
      })
      .catch(error => {
        console.error(error);
        ToastAndroid.show('Error signing out', ToastAndroid.LONG);
      });
  };

  const drawerScale = drawerAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.85],
  });

  const drawerTranslateXInterpolated = drawerTranslateX.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -50],
  });

  const handleScroll = event => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 5;
    setIsAtBottom(isBottom);
  };

  useEffect(() => {
    if (isAtBottom && blogPosts.length > visiblePosts) {
      loadMorePosts();
    }
  }, [isAtBottom]);

  const loadMorePosts = () => {
    setSwipedUpToLoadMore(true);
    setTimeout(() => {
      setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 2);
      setSwipedUpToLoadMore(false);
    }, 1000);
  };

  const renderLoadMoreMessage = () => {
    if (swipedUpToLoadMore) {
      return (
        <View style={styles.loadMoreMessage}>
          <ActivityIndicator size="small" color="#fff" />
          <Text style={styles.loadMoreText}>Load More</Text>
        </View>
      );
    } else if (isAtBottom && blogPosts.length > visiblePosts) {
      return (
        <TouchableOpacity
          style={styles.loadMoreMessage}
          onPress={loadMorePosts}>
          <Text style={styles.loadMoreText}>Swipe up to load more</Text>
        </TouchableOpacity>
      );
    } else if (
      !loading &&
      blogPosts.length === visiblePosts &&
      !noMorePostsMessageShown
    ) {
      ToastAndroid.show('No more posts to load', ToastAndroid.LONG);
      setNoMorePostsMessageShown(true);
    }
    return null;
  };

  const renderDrawer = () => {
    let initials = '';
    if (displayName) {
      const nameParts = displayName.split(' ');
      initials = nameParts.map(part => part.charAt(0)).join('');
    }

    return (
      <View style={styles.drawerContainer}>
        <View style={styles.drawerHeader}>
          <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={styles.headerImage}>
            <ImageBackground
              source={require('../assets/images/BBF.jpg')}
              style={styles.backgroundImage}>
              <View style={styles.overlay} />
            </ImageBackground>
          </LinearGradient>
          <View style={styles.profileContainer}>
            <View style={styles.profilePicture}>
              <Text style={styles.profileInitial}>{initials}</Text>
            </View>
            <Text style={styles.profileName}>{displayName}</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('About')}>
          <Icon
            name="information-circle-outline"
            size={20}
            style={styles.drawerIcon}
          />
          <Text style={styles.drawerText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Team')}>
          <Icon name="people-outline" size={20} style={styles.drawerIcon} />
          <Text style={styles.drawerText}>Team Member</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Contact')}>
          <Icon name="mail-outline" size={20} style={styles.drawerIcon} />
          <Text style={styles.drawerText}>Contact</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Setting')}>
          <Icon name="settings-outline" size={20} style={styles.drawerIcon} />
          <Text style={styles.drawerText}>Settings</Text>
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
              <Text style={[styles.drawerText, { color: '#fff' }]}>Sign Out</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    isLoggedIn && (
      <View style={[styles.container, { flex: 1 }]}>
        <DrawerLayoutAndroid
          ref={drawerRef}
          drawerWidth={300}
          drawerPosition="left"
          onDrawerOpen={openDrawer}
          onDrawerClose={closeDrawer}
          renderNavigationView={renderDrawer}>
          <Animated.View
            style={[
              {
                width: '100%',
                transform: [
                  { scaleX: drawerScale },
                  { scaleY: drawerScale },
                  { translateX: drawerTranslateXInterpolated },
                ],
              },
            ]}>
            <ScrollView
              contentContainerStyle={styles.content}
              keyboardShouldPersistTaps="handled"
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              onScroll={handleScroll}
              onContentSizeChange={() => { }}
              scrollEnabled={true}
            >
              <ImageBackground
                style={styles.backgroundImage}
                source={require('../assets/images/background.webp')}>
                <LinearGradient
                  colors={['#4c669f', '#3b5998', '#192f6a']}
                  style={styles.overlay}>
                  <LinearGradient
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    style={styles.gradientOverlay}>
                    <View style={styles.overlay} />
                  </LinearGradient>
                </LinearGradient>
                <LinearGradient
                  colors={['#fff', '#fff', '#fff']}
                  style={styles.header}>
                  <TouchableOpacity
                    onPress={drawerOpen ? closeDrawer : openDrawer}
                    style={styles.drawerToggle}>
                    <Icon
                      name={drawerOpen ? 'close-outline' : 'menu-outline'}
                      size={30}
                      color="#000"
                    />
                  </TouchableOpacity>
                  <Text style={styles.heading}>Explore Our Blog</Text>
                  <TouchableOpacity style={styles.placeholder} />
                </LinearGradient>
                <View style={styles.content}>
                  {loading ? (
                    <View>
                      <ActivityIndicator size="large" color="#fff" />
                      <Text style={styles.overlayText}>Loading Posts...</Text>
                    </View>
                  ) : (
                    <View style={styles.blogContainer}>
                      {blogPosts.slice(0, visiblePosts).map((post, index) => (
                        <BlogPost
                          key={index}
                          image={{ uri: post.photo_url }}
                          title={post.title}
                          description={post.content_html}
                        />
                      ))}
                      {renderLoadMoreMessage()}
                    </View>
                  )}
                </View>
              </ImageBackground>
            </ScrollView>
          </Animated.View>
          <Animated.View
            style={[
              styles.drawerOpenBackground,
              {
                backgroundColor: backgroundAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['#192f6a', '#4c669f'],
                }),
              },
            ]}
          />
        </DrawerLayoutAndroid>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  content: {
    flexGrow: 1,
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
    fontWeight: '500',
    textAlign: 'center',
    color: '#000',
  },
  blogContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
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
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    fontSize: 24,
    color: '#fff',
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 5,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  loadMoreMessage: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  loadMoreText: {
    fontSize: 16,
    color: '#fff',
  },
  drawerOpenBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
});

export default BlogPostTemplate;
