import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const BlogPost = ({ image, title, description }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>
        {showMore ? description : `${description.substring(0, 70)}...`}
        {!showMore && (
          <Text onPress={() => setShowMore(true)} style={styles.readMore}>
            Read More
          </Text>
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    padding: 15,
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
    marginBottom: 15,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
  },
  description: {
    marginBottom: 15,
    textAlign: 'justify',
    color: '#666',
  },
  readMore: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default BlogPost;
