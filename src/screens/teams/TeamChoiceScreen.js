import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Switch
} from 'react-native';
import * as Color from '../../../global/Color';
import CircleComponent from '../../components/CircleComponent';

const TeamChoiceScreen = (props) => {
  const [isDoubleElimination, setIsDoubleElimination] = useState(false);

  const handleGoBack = () => {
    props.navigation.goBack();
  };

  const handleCreateTeams = () => {
    props.navigation.navigate("Picker", {isDoubleElimination})
  };

  const handleRandomTeams = () => {
    props.navigation.navigate("Teams", {isDoubleElimination, isCreatingBracket: true})
  };

  const handleToggleChange = (value) => {
    setIsDoubleElimination(value);
  };

  return (
    <View style={styles.container}>
      <CircleComponent isWhite={false} />
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>&larr; Back</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.randomTeamsButton}
          onPress={handleRandomTeams}
        >
          <Text style={styles.randomTeamsButtonText}>
            Randomly Generate Teams
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.createTeamsButton}
          onPress={handleCreateTeams}
        >
          <Text style={styles.createTeamsButtonText}>Create Your Own Teams</Text>
        </TouchableOpacity>
        <View style={styles.eliminationToggleContainer}>
            <Text style={styles.eliminationToggleText}>
                Double Elimination:
            </Text>
            <Switch
                trackColor={{ false: Color.InputBorder, true: Color.Main }}
                thumbColor={isDoubleElimination ? '#ffffff' : '#ffffff'}
                ios_backgroundColor={Color.InputBorder}
                onValueChange={handleToggleChange}
                value={isDoubleElimination}
            />
        </View>
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
    borderRadius: 5,
    padding: 5,
  },
  backButtonText: {
    fontSize: Dimensions.get('window').width * 0.045,
    color: Color.Main,
    fontFamily: 'BalsamiqSans',
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  randomTeamsButton: {
    backgroundColor: Color.Main,
    borderRadius: 5,
    paddingVertical: 15,
    width: '100%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  randomTeamsButtonText: {
    fontSize: Dimensions.get('window').width * 0.045,
    color: '#ffffff',
    fontFamily: 'BalsamiqSans',
  },
  createTeamsButton: {
    borderColor: Color.Main,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createTeamsButtonText: {
    fontSize: Dimensions.get('window').width * 0.045,
    color: Color.Main,
    fontFamily: 'BalsamiqSans',
  },
  eliminationToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Dimensions.get('window').height * .03,
  },
  eliminationToggleText: {
    fontSize: Dimensions.get('window').width * 0.045,
    color: Color.Main,
    fontFamily: 'BalsamiqSans',
    marginRight: 10,
  },
});

export default TeamChoiceScreen;
