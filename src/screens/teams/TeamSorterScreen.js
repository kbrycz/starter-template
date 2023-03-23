import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Keyboard,
  Dimensions
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

  const handleReady = () => {
    // Add your logic for moving to the next page here
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

    if (filteredNames.length === 0) {
      alert('Please enter at least one name.');
      return;
    }

    const nameList = filteredNames.map((name) => name.trim());
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
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>&larr; Back</Text>
        </TouchableOpacity>
        {teams.length > 0 && (
          <TouchableOpacity style={styles.readyButton} onPress={handleReady}>
            <Text style={styles.readyButtonText}>Ready</Text>
          </TouchableOpacity>
        )}
      </View>
      <Text style={styles.title}>Team Randomizer</Text>
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
    backgroundColor: Color.Background,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    paddingTop: Dimensions.get('window').height * 0.05,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height * 0.02,
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
  readyButton: {
    borderRadius: 5,
    paddingVertical: Dimensions.get('window').width * 0.02,
    paddingHorizontal: Dimensions.get('window').height * 0.02,
    backgroundColor: Color.Button,
  },
  readyButtonText: {
    fontSize: Dimensions.get('window').width * 0.045,
    color: Color.White,
    fontFamily: 'BalsamiqSans',
  },
  title: {
    fontSize: Dimensions.get('window').width * 0.08,
    fontWeight: 'bold',
    fontFamily: 'BalsamiqSans',
    marginBottom: Dimensions.get('window').height * 0.02,
    color: Color.Main,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontFamily: 'BalsamiqSans',
    marginBottom: Dimensions.get('window').height * 0.02,
    color: Color.Main,
  },
  input: {
    height: Dimensions.get('window').height * 0.05,
    borderColor: Color.InputBorder,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: Dimensions.get('window').height * 0.02,
    fontFamily: 'BalsamiqSans',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  namesInput: {
    minHeight: Dimensions.get('window').height * 0.1,
    textAlignVertical: 'top',
  },
  inputDisabled: {
    backgroundColor: '#f0f0f0',
  },
  button: {
    backgroundColor: Color.Button,
    paddingVertical: Dimensions.get('window').height * 0.01,
    paddingHorizontal: Dimensions.get('window').width * 0.05,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: Dimensions.get('window').height * 0.02,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontWeight: 'bold',
    color: Color.White,
    fontFamily: 'BalsamiqSans',
  },
  teamContainer: {
    backgroundColor: Color.TeamBackground,
    borderRadius: 5,
    padding: Dimensions.get('window').width * 0.04,
    marginBottom: Dimensions.get('window').height * 0.02,
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
    marginBottom: Dimensions.get('window').height * 0.01,
    color: Color.Main,
  },
  playerName: {
    fontSize: Dimensions.get('window').width * 0.04,
    fontFamily: 'BalsamiqSans',
    color: Color.Main,
  },
});


export default TeamSorterScreen;
