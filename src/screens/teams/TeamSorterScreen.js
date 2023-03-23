import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard
} from 'react-native';
import * as Color from '../../../global/Color';

const TeamSorterScreen = (props) => {
  const [numTeams, setNumTeams] = useState('');
  const [numPlayers, setNumPlayers] = useState('');
  const [names, setNames] = useState('');
  const [teams, setTeams] = useState([]);

  const handleGoBack = () => {
    props.navigation.goBack();
  };

const handleNumTeamsChange = (text) => {
  if (parseInt(text) <= 64 || text === '') {
    setNumTeams(text);
  }
};

const handleNumPlayersChange = (text) => {
  if (parseInt(text) <= 64 || text === '') {
    setNumPlayers(text);
  }
};

const handleNamesChange = (text) => {
  const lines = text.split('\n');
  if (
    lines.length > 1 &&
    (lines[lines.length - 1] === '' && lines[lines.length - 2] === '')
  ) {
    return;
  }
  setNames(text);
};


  const handleSubmit = () => {
    Keyboard.dismiss();
    console.log(names.trim())
    if (names.trim() === '') {
      alert('Please enter at least one name.');
      return;
    }
    const filteredNames = names
      .split('\n')
      .map(name => name.trim())
      .filter(name => name !== '');

    console.log(filteredNames)

    if (filteredNames.length === 0) {
      alert('Please enter at least one name.');
      return;
    }

    const nameList = filteredNames.split('\n').map((name) => name.trim());
    const nTeams = parseInt(numTeams);
    const nPlayers = parseInt(numPlayers);

    if ((!nTeams && !nPlayers) || nameList.length < 2) {
      Alert.alert('Error', 'Please enter valid input');
      return;
    }

    const randomizedNames = nameList.sort(() => Math.random() - 0.5);
    let generatedTeams = [];

    if (nTeams) {
      for (let i = 0; i < nTeams; i++) {
        generatedTeams.push([]);
      }

      randomizedNames.forEach((name, index) => {
        generatedTeams[index % nTeams].push(name);
      });
    } else {
      const teamSize = nPlayers;
      const nTeams = Math.ceil(nameList.length / teamSize);

      for (let i = 0; i < nTeams; i++) {
        generatedTeams.push(randomizedNames.splice(0, teamSize));
      }
    }

    setTeams(generatedTeams);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>&larr; Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Team Sorter</Text>
      <Text style={styles.subtitle}>
        Choose one of the options below (up to 64):
      </Text>
      <TextInput
        style={[styles.input, numPlayers !== '' ? styles.inputDisabled : null]}
        onChangeText={handleNumTeamsChange}
        value={numTeams}
        placeholder='Number of teams (optional)'
        keyboardType='number-pad'
        editable={numPlayers === ''}
      />
      <TextInput
        style={[styles.input, numTeams !== '' ? styles.inputDisabled : null]}
        onChangeText={handleNumPlayersChange}
        value={numPlayers}
        placeholder='Number of players per team (optional)'
        keyboardType='number-pad'
        editable={numTeams === ''}
      />

      <Text style={styles.subtitle}>Enter player names:</Text>
      <TextInput
        style={[styles.input, styles.namesInput]}
        onChangeText={handleNamesChange}
        value={names}
        placeholder='Enter names, one per line'
        multiline
      />
      <TouchableOpacity
        style={[styles.button, names.trim() === '' ? styles.buttonDisabled : null]}
        onPress={handleSubmit}
        disabled={names.trim() === ''}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <ScrollView>
        {teams.map((team, index) => (
          <View key={index} style={styles.teamContainer}>
            <Text style={styles.teamTitle}>Team {index + 1}</Text>
            {team.map((player, idx) => (
              <Text key={idx} style={styles.playerName}>
                {player}
              </Text>
            ))}
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    marginBottom: 10,
    borderColor: Color.Main,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
  },
  backButtonText: {
    fontSize: 18,
    color: Color.Main,
    fontFamily: 'BalsamiqSans',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'BalsamiqSans',
    marginBottom: 10,
    color: Color.Main,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'BalsamiqSans',
    marginBottom: 20,
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
  inputDisabled: {
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: Color.Button,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Color.White,
    fontFamily: 'BalsamiqSans',
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
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'BalsamiqSans',
    marginBottom: 10,
    color: Color.Main,
  },
  playerName: {
    fontSize: 16,
    fontFamily: 'BalsamiqSans',
    color: Color.Main,
  },
});


export default TeamSorterScreen;
