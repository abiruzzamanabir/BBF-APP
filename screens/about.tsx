import React from 'react';
import { View, StyleSheet, ImageBackground, Image } from 'react-native';
import { Appbar, Card, Title, Paragraph, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';

const AboutUsScreen = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../assets/images/bg.jpg')}
      style={styles.backgroundImage}
      imageStyle={{ opacity: 0.5 }}
    >
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.goBack()} />
          <Appbar.Content title="About Us" />
        </Appbar.Header>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Card style={styles.card}>
            <Image
              source={require('../assets/images/BBF.jpg')}
              style={styles.image}
              resizeMode="cover"
            />
          </Card>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.title}>Bangladesh Brand Forum (BBF)</Title>
              <Divider style={styles.divider} />
              <Paragraph style={styles.description}>
                Bangladesh Brand Forum (BBF) is a leading think tank based in
                Bangladesh. Established in 2007 with the tagline “Inspiring the
                Nation”, Bangladesh Brand Forum and its initiatives have
                embarked on the journey to catalyze, stimulate, and transform
                the industries and businesses of the country, and ultimately,
                Bangladesh itself. Bangladesh Brand Forum strives to be the
                beacon of collaborative effort and movement that will spearhead
                the change for tomorrow. The organization is devoted to
                disseminating industry specific knowledge, pioneering thoughts
                and ideas, catalyzing technological shifts, and inspiring
                changemakers.
              </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.title}>Mission</Title>
              <Divider style={styles.divider} />
              <Paragraph style={styles.description}>
                We are devoted to Inspiring the Nation – via inspiring the
                industries and professionals across multiple industries,
                through knowledge dissemination, recognizing best initiatives &
                industry practices, skill development, and collaboration amongst
                different industries.
              </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.title}>Vision</Title>
              <Divider style={styles.divider} />
              <Paragraph style={styles.description}>
                We envision a future that is ushered, catalyzed, and guided by
                the exhaustive work of Bangladesh Brand Forum and its
                initiatives - where Bangladesh emerges as a key player, role
                model, and a powerful innovator in the Asia Pacific region and
                in the rest of the world.
              </Paragraph>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.title}>Objective</Title>
              <Divider style={styles.divider} />
              <Paragraph style={styles.description}>
                Through multi-dimensional engagements, BBF wants to inspire
                multiple segments of society to enable Bangladesh's next phase
                of progress and inclusive growth. Hence, ‘Inspiring the Nation’.
              </Paragraph>
            </Card.Content>
          </Card>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 10,
  },
  card: {
    marginBottom: 20,
    elevation: 4, // Add shadow
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent white background
    borderRadius: 10,
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#007bff', // Blue color
  },
  divider: {
    backgroundColor: '#007bff', // Blue color
    height: 2,
    width: '50%', // Half the width of the card content
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10, // Rounded corners
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'justify',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default AboutUsScreen;
