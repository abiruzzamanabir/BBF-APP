import React from 'react';
import { View, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';
import { Appbar, Card, Avatar, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const TeamMember = ({ image, name, designation, socialLinks }) => {

  const handleLinkClick = (url) => {
    Linking.openURL(url);
  };

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.cardContent}>
        <Avatar.Image size={80} source={{ uri: image }} />
        <View style={styles.textContainer}>
          <Title style={styles.title}>{name}</Title>
          <Paragraph style={styles.paragraph}>{designation}</Paragraph>
          {socialLinks && (
            <View style={styles.socialIcons}>
              {socialLinks.map((link, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleLinkClick(link.url)}
                  style={styles.iconContainer}
                >
                  <Icon name={link.iconName} size={20} color={link.color} style={styles.icon} />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );
};

const Team = ({ navigation }) => {
  const teamMembers = [
    {
      image: 'https://bangladeshbrandforum.com/Application/storage/app/public/images/db7ca3b311570ef1ae377e2ae083a40csharifulislam.jpg',
      name: 'Shariful Islam',
      designation: 'Founder & Managing Director',
      socialLinks: [
        { iconName: 'facebook', color: '#3b5998', url: 'https://www.facebook.com/example' },
        { iconName: 'twitter', color: '#00acee', url: 'https://www.twitter.com/example' },
        { iconName: 'linkedin', color: '#0077b5', url: 'https://www.linkedin.com/in/shariful-islam-bbf/' },
      ],
    },
    {
      image: 'https://bangladeshbrandforum.com/Application/storage/app/public/images/eeb4ba1501574118de6a03eef42f0983nazia.jpg',
      name: 'Nazia Andaleeb Preema',
      designation: 'Director & Creative Editor',
      socialLinks: [
        { iconName: 'linkedin', color: '#0077b5', url: 'https://www.linkedin.com/in/nazia-andaleeb-preema-7938484/' },
      ],
    },
    {
      image: 'https://bangladeshbrandforum.com/Application/storage/app/public/images/d0881930e0058b8fc0cb35f1b4e76b22ferhat.jpg',
      name: 'Prof. Dr. Syed Ferhat Anwar',
      designation: 'Chief Advisor',
      socialLinks: [
        { iconName: 'linkedin', color: '#0077b5', url: 'https://www.linkedin.com/in/syed-ferhat-anwar-644a694b/' },
      ],
    },
    {
      image: 'https://bangladeshbrandforum.com/Application/storage/app/public/images/886b9051439f0b4918d3480f9a1284faashrafbintaj.jpg',
      name: 'Ashraf Bin Taj',
      designation: 'Advisor',
      socialLinks: [
        { iconName: 'linkedin', color: '#0077b5', url: 'https://www.linkedin.com/in/ashrafbintaj/' },
      ],
    },
    {
      image: 'https://bangladeshbrandforum.com/Application/storage/app/public/images/f9278b1e70500c22888f83434403ef94Sajid%20Mahbub.jpg',
      name: 'Sajid Mahbub',
      designation: 'Chief Operating Officer & Executive Editor',
      socialLinks: [
        { iconName: 'linkedin', color: '#0077b5', url: 'https://www.linkedin.com/in/sajidmahbub/?originalSubdomain=bd' },
      ],
    },
    // Add more team members here
  ];

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleGoBack} />
        <Appbar.Content title="Team" />
      </Appbar.Header>
      <ScrollView>
        <View style={styles.container}>
          {teamMembers.map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              designation={member.designation}
              socialLinks={member.socialLinks}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  card: {
    marginVertical: 10,
    width: '90%',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginLeft: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  paragraph: {
    fontSize: 14,
    flexWrap: 'wrap',
  },
  socialIcons: {
    flexDirection: 'row',
    marginTop: 5,
  },
  iconContainer: {
    height: 40,
    width: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#c9c9c9',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    marginRight: 0,
  },
});

export default Team;
