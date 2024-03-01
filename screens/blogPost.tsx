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
} from 'react-native';

import { useNavigation } from '@react-navigation/native'; // Importing navigation hook

import BlogPost from './post'; // Importing the BlogPost component

const BlogPostTemplate = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [refreshing, setRefreshing] = useState(false); // Initialize refreshing as false

  const drawerRef = React.useRef(null);

  const openDrawer = () => {
    drawerRef.current.openDrawer();
  };

  const navigateToPage = (pageName) => {
    // Navigation logic to redirect to specific pages
    navigation.navigate(pageName);
    drawerRef.current.closeDrawer();
  };

  // Simulate data loading delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Simulated delay of 2 seconds
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refreshing data
    setTimeout(() => {
      setLoading(false);
      setRefreshing(false);
    }, 2000); // Simulated delay of 2 seconds
  };

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={() => (
        <View style={styles.drawerContainer}>
          <View style={styles.drawerHeader}>
            <Image
              source={require('../assets/images/background.webp')}
              style={styles.headerImage}
            />
            <View style={styles.profileContainer}>
              <Image
                source={require('../assets/images/pp.jpg')}
                style={styles.profilePicture}
              />
              <Text style={styles.profileName}>John Doe</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigateToPage('Settings')}>
            <Text style={styles.drawerText}>
              <Text style={styles.drawerIcon}>⚙️</Text> Settings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigateToPage('About')}>
            <Text style={styles.drawerText}>
              <Text style={styles.drawerIcon}>ℹ️</Text> About Us
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.drawerItem}
            onPress={() => navigateToPage('Contact')}>
            <Text style={styles.drawerText}>
              <Text style={styles.drawerIcon}>✉️</Text> Contact
            </Text>
          </TouchableOpacity>
          {/* Additional drawer items */}
        </View>
      )}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={styles.content}>
          <View style={styles.header}>
            <TouchableOpacity onPress={openDrawer} style={styles.drawerToggle}>
              <Text style={styles.drawerIcon}>☰</Text>
            </TouchableOpacity>
            <Text style={styles.heading}>Explore Our Blog</Text>
            <View style={styles.placeholder}></View>
          </View>
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
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  blogContainer: {
    flexDirection: 'column', // Display one post per row
    justifyContent: 'flex-start', // Align posts from top
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0', // Example background color
    paddingTop: 0,
    paddingHorizontal: 0,
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 20,
  },
  drawerText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333', // Example text color
  },
  drawerIcon: {
    fontSize: 16,
    marginRight: 5,
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
  },
  divider: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});

export default BlogPostTemplate;
