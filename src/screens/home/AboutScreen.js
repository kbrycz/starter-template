import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as Color from '../../../global/Color'; // Make sure the path to Color is correct

const AboutScreen = (props) => {
  const handleGoBack = () => {
    props.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>&larr; Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>About</Text>
      <View style={styles.textContainer}>
        <Text style={styles.description}>
          Welcome to the Bracket Maker and Random Team Generator! This app is designed to help you organize and streamline your tournaments with ease. By simply inputting your teams, you can create either single or double elimination brackets, making it perfect for any competitive setting.
        </Text>
        <Text style={styles.description}>
          Additionally, our Random Team Generator feature allows you to create well-balanced teams in just a few clicks. Whether you're planning a friendly get-together or a serious competition, this app has got you covered.
        </Text>
        <Text style={[styles.description, {marginBottom: 0}]}>
          Say goodbye to tedious tournament planning and let the Bracket Maker and Random Team Generator take care of it for you. Enjoy a seamless experience and focus on what truly matters - the thrill of the game!
        </Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f4fb',
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingTop: Dimensions.get('window').height * 0.05,
  },
  backButton: {
    marginTop: Dimensions.get('window').height * 0.02,
    marginBottom: Dimensions.get('window').height * 0.01,
    borderRadius: 5,
    padding: 5,
  },
  backButtonText: {
    fontSize: Dimensions.get('window').width * 0.045,
    color: Color.Main,
    fontFamily: 'BalsamiqSans',
  },
  textContainer: {
    backgroundColor: Color.White,
    padding: Dimensions.get('window').height * 0.03
  },
  title: {
    fontSize: Dimensions.get('window').width * 0.075,
    fontWeight: 'bold',
    fontFamily: 'BalsamiqSans',
    marginBottom: Dimensions.get('window').height * 0.02,
    color: Color.Main,
    textAlign: 'center',
  },
  description: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontFamily: 'BalsamiqSans',
    color: Color.Main,
    textAlign: 'justify',
    lineHeight: Dimensions.get('window').height * 0.03,
    marginBottom: Dimensions.get('window').height * 0.02,
  },
});

export default AboutScreen;
