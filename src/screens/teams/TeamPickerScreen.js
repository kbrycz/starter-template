// TeamPickerScreen.js
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from 'react-native';
import * as Color from '../../../global/Color';
import BackButton from './BackButton';
import { Dimensions } from 'react-native';

const TeamPickerScreen = (props) => {
  const [numTeams, setNumTeams] = useState('');
  const [teams, setTeams] = useState([]);

  const handleGoBack = () => {
    props.navigation.goBack();
  };

  const handleNumTeamsChange = (text) => {
    if (parseInt(text) <= 64 || text === '') {
      setNumTeams(text);
      const newTeams = Array(parseInt(text) || 0).fill('');
      setTeams(newTeams);
    }
  };

  const handleTeamNameChange = (text, index) => {
    const updatedTeams = [...teams];
    updatedTeams[index] = text;
    setTeams(updatedTeams);
  };

  return (
    <View style={styles.container}>
      <BackButton onPress={handleGoBack} />
      <Text style={styles.title}>Team Picker</Text>
      <Text style={styles.subtitle}>
        Choose the number of teams (up to 64):
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={handleNumTeamsChange}
        value={numTeams}
        placeholder='Number of teams'
        keyboardType='number-pad'
      />
      <ScrollView>
        {teams.map((team, index) => (
          <View key={index} style={styles.teamContainer}>
            <Text style={styles.teamTitle}>Team {index + 1}</Text>
            <TextInput
              style={[styles.input, styles.namesInput]}
              onChangeText={(text) => handleTeamNameChange(text, index)}
              value={team}
              placeholder='Enter player names, separated by commas'
            />
          </View>
        ))}
      </ScrollView>
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
  title: {
    fontSize: Dimensions.get('window').width * 0.075,
    fontWeight: 'bold',
    fontFamily: 'BalsamiqSans',
    marginBottom: Dimensions.get('window').height * 0.025,
    color: Color.Main,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontFamily: 'BalsamiqSans',
    marginBottom: Dimensions.get('window').height * 0.025,
    color: Color.Main,
  },
  input: {
    height: 40,
    borderColor: Color.InputBorder,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontFamily: 'BalsamiqSans',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
},
namesInput: {
  minHeight: 80,
  textAlignVertical: 'top',
},
teamContainer: {
  backgroundColor: Color.TeamBackground,
  borderRadius: 5,
  padding: 15,
  marginBottom: 20,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 2,
},
teamTitle: {
  fontSize: Dimensions.get('window').width * 0.045,
  fontWeight: 'bold',
  fontFamily: 'BalsamiqSans',
  marginBottom: 10,
  color: Color.Main,
},
});

export default TeamPickerScreen;

