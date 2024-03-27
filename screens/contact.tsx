import React from 'react';
import { View, StyleSheet, ImageBackground, Linking, ScrollView } from 'react-native';
import { List, Appbar, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const AddressSection = () => (
  <View style={styles.container}>
    {/* Address Section */}
    <List.Item
      title="Bangladesh Brand Forum, Apt No. 9/A (Level-9), House No. 30 CWN (A), Road No. 42/43, Gulshan - 2 Dhaka - 1212"
      titleNumberOfLines={5}
      left={() => <List.Icon icon="map-marker" color="#007bff" />}
      style={styles.listItem}
    />
  </View>
);

const PhoneSection = () => (
  <View style={styles.container}>
    {/* Phone Number Section */}
    <List.Item
      title="02-58815318, 02-58815340"
      left={() => <List.Icon icon="phone" color="#007bff" />}
      style={styles.listItem}
    />
  </View>
);

const EmailSection = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:info@bangladeshbrandforum.com');
  };

  return (
    <View style={styles.container}>
      {/* Email Section */}
      <List.Item
        title="info@bangladeshbrandforum.com"
        left={() => <List.Icon icon="email" color="#007bff" />}
        onPress={handleEmailPress}
        style={styles.listItem}
      />
    </View>
  );
};

const AdditionalContactNumbers = () => (
  <View style={styles.container}>
    {/* Additional Contact Numbers */}
    <List.Item
      title="Advertisement & Subscription"
      titleStyle={styles.centeredText} // Added titleStyle
      style={[styles.listItem, styles.advertisementSubscription]} // Added advertisementSubscription style
    />
    <List.Item
      title="01712-732124"
      left={() => <List.Icon icon="phone" color="#007bff" />}
      style={styles.listItem}
    />
  </View>
);

const SocialMediaSection = () => {
  const handleFacebookPress = () => {
    Linking.openURL('https://www.facebook.com/Official.BBF/');
  };

  const handleTwitterPress = () => {
    Linking.openURL('https://twitter.com/bbfbangladesh');
  };

  const handleYouTubePress = () => {
    Linking.openURL('https://www.youtube.com/channel/UCILWoVp5We99RQ6nVfigr0Q');
  };

  const handleInstagramPress = () => {
    Linking.openURL('https://www.instagram.com/bangladesh_brand_forum/');
  };

  const handleLinkedInPress = () => {
    Linking.openURL('https://www.linkedin.com/company/bangladesh-brand-forum/mycompany/');
  };

  return (
    <View style={styles.container}>
      {/* Social Media Section */}
      <List.Item
        title="Follow us on Social Media"
        left={() => <List.Icon icon="share-variant" color="#007bff" />}
        style={styles.listItem}
      />
      <List.Item
        title="Facebook"
        left={() => <List.Icon icon="facebook" color="#007bff" />}
        onPress={handleFacebookPress}
        style={styles.listItem}
      />
      <List.Item
        title="Twitter"
        left={() => <List.Icon icon="twitter" color="#007bff" />}
        onPress={handleTwitterPress}
        style={styles.listItem}
      />
      <List.Item
        title="YouTube"
        left={() => <List.Icon icon="youtube" color="#007bff" />}
        onPress={handleYouTubePress}
        style={styles.listItem}
      />
      <List.Item
        title="Instagram"
        left={() => <List.Icon icon="instagram" color="#007bff" />}
        onPress={handleInstagramPress}
        style={styles.listItem}
      />
      <List.Item
        title="LinkedIn"
        left={() => <List.Icon icon="linkedin" color="#007bff" />}
        onPress={handleLinkedInPress}
        style={styles.listItem}
      />
    </View>
  );
};

const ContactPage = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground source={require('../assets/images/bg.jpg')} style={styles.background}>
      <View style={styles.overlay}>
        <ScrollView>
          <View style={styles.container}>
            <Appbar.Header>
              <Appbar.BackAction onPress={() => navigation.goBack()} />
              <Appbar.Content title="Contact Us" />
            </Appbar.Header>

            <Card style={styles.card}>
              <Card.Content>
                <AddressSection />
                <PhoneSection />
                <EmailSection />
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content>
                <AdditionalContactNumbers />
              </Card.Content>
            </Card>

            <Card style={styles.card}>
              <Card.Content>
                <SocialMediaSection />
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  card: {
    margin: 20,
    marginTop: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  listItem: {
    padding: 5,
  },
  advertisementSubscription: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  centeredText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ContactPage;
