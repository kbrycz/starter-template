import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Color from '../../../global/Color';
import { Dimensions } from 'react-native';

const TeamPickerScreen = (props) => {
  const [numTeams, setNumTeams] = useState('');
  const [teams, setTeams] = useState([]);
  const scrollViewRef = useRef();
  const inputsRef = useRef([]);

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

  const handleTextInputSubmit = (index) => {
    if (index < teams.length - 1) {
      inputsRef.current[index + 1].focus();
      scrollViewRef.current.scrollTo({ x: 0, y: (index + 1) * 80, animated: true });
    } else {
      Keyboard.dismiss();
    }
  };

  const handleTextInputFocus = (index) => {
    scrollViewRef.current.scrollTo({ x: 0, y: index * 80, animated: true });
  };

  const handleReady = () => {
    props.navigation.navigate("Bracket", {teams: teams, isDoubleElimination: props.route.params.isDoubleElimination})
  };

  const isReady = teams.length > 0 && teams.every((team) => team.trim() !== '');

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>&larr; Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Team Picker</Text>
      <Text style={styles.subtitle}>
        Choose the number of teams (up to 64):
      </Text>
      <TextInput
        style={styles.numTeamsInput}
        onChangeText={handleNumTeamsChange}
        value={numTeams}
        placeholder='Number of teams'
        keyboardType='number-pad'
      />
      <ScrollView ref={scrollViewRef}>
        {teams.map((team, index) => (
          <View key={index} style={styles.teamContainer}>
            <Text style={styles.teamTitle}>Team {index + 1}</Text>
            <TextInput
              ref={(input) => inputsRef.current[index] = input}
              style={[styles.input, styles.namesInput]}
              onChangeText={(text) => handleTeamNameChange(text, index)}
              value={team}
              placeholder='Enter player names, separated by commas'
              onSubmitEditing={() => handleTextInputSubmit(index)}
              onFocus={() => handleTextInputFocus(index)}
              blurOnSubmit={false}
            />
          </View>
        ))}
      </ScrollView>
      {isReady && (
        <TouchableOpacity style={styles.readyButton} onPress={handleReady}>
          <Text style={styles.readyButtonText}>Ready</Text>
          </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
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
    borderRadius: 5,
    padding: 5,
  },
  backButtonText: {
    fontSize: Dimensions.get('window').width * 0.045,
    color: Color.Main,
    fontFamily: 'BalsamiqSans',
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
  numTeamsInput: {
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
    height: 40,
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
  readyButton: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.05,
    right: Dimensions.get('window').width * 0.05,
    backgroundColor: Color.Main,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    elevation: 2,
    zIndex: 2,
  },
  readyButtonText: {
    fontSize: Dimensions.get('window').width * 0.045,
    color: '#ffffff',
    fontFamily: 'BalsamiqSans',
  },
});

export default TeamPickerScreen;
