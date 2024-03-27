import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, LayoutAnimation, Platform, UIManager, useWindowDimensions, TouchableOpacity } from 'react-native';
import HTML from 'react-native-render-html';
import { IconButton } from 'react-native-paper'; // Import IconButton from React Native Paper

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BlogPost = ({ image, title, description }) => {
  const [showMore, setShowMore] = useState(false);
  const truncatedDescription = `${description.substring(0, 40)}...`;
  const fullDescription = showMore ? description : truncatedDescription;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [showMore]);

  const { width } = useWindowDimensions();

  const toggleDescription = () => {
    setShowMore(!showMore);
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <HTML contentWidth={width} source={{ html: `<div style="text-align: center;">${fullDescription}</div>` }} />
      {description.length > 40 && (
        <View style={styles.showMoreButtonContainer}>
          <TouchableOpacity onPress={toggleDescription} style={styles.showMoreButton}>
            <Text style={styles.showMoreButtonText}>
              {showMore ? 'Show Less' : 'Show More'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    marginBottom: 10,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  showMoreButtonContainer: {
    width: '100%',
    alignItems: 'center', // Center the button horizontally
  },
  showMoreButton: {
    paddingVertical: 5,
  },
  showMoreButtonText: {
    color: '#007BFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default BlogPost;
