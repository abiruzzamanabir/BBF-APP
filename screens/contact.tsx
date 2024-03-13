import React from 'react';
import { View, StyleSheet, ImageBackground, Linking } from 'react-native';
import { List, Appbar, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const ContactPage = () => {
  const navigation = useNavigation();

  const handlePhonePress = () => {
    Linking.openURL('tel:1234567890');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:example@example.com');
  };

  return (
    <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigation.goBack()} />
            <Appbar.Content title="Contact Us" />
          </Appbar.Header>

          <Card style={styles.card}>
            <Card.Content>
              <List.Section>
                {/* Address Section */}
                <List.Item
                  title="123 Main Street"
                  description="City, Country"
                  left={() => <List.Icon icon="map-marker" color="#007bff" />}
                  style={styles.listItem}
                />

                {/* Phone Number Section */}
                <List.Item
                  title="123-456-7890"
                  left={() => <List.Icon icon="phone" color="#007bff" />}
                  onPress={handlePhonePress}
                  style={styles.listItem}
                />

                {/* Email Section */}
                <List.Item
                  title="example@example.com"
                  left={() => <List.Icon icon="email" color="#007bff" />}
                  onPress={handleEmailPress}
                  style={styles.listItem}
                />
              </List.Section>
            </Card.Content>
          </Card>
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
  card: {
    margin: 20,
    marginTop: 10,
  },
  listItem: {
    padding: 20,
  },
});

export default ContactPage;
