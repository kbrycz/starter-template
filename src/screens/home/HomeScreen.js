import React from 'react'
import {View, StyleSheet, Text, Dimensions, TouchableOpacity, Share, Linking, Image} from 'react-native'
import * as Color from '../../../global/Color'
import SimpleModalComponent from '../../components/SimpleModalComponent'
import CircleComponent from '../../components/CircleComponent';
import { Feather } from '@expo/vector-icons'; 

class HomeScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            text: '',
            modalVisible: false
        }
    }

    // Lets users share the app with other people
    // TODO need to update this to new link
    shareButton = async () => {
        console.log("share")
        // try {
        //     const result = await Share.share({
        //         url: 'pp&af_js_web=true',
        //     });

        // } 
        // catch (error) {
        //     this.setState({
        //         text: 'Unable to share app. Please try again!',
        //         modalVisible: true,
        //     })
        // }
    }

    // Sends the user to the app store to rate the app
    // TODO need to update this to new link
    rateApp = async () => {
        console.log("rate app")
        // Linking.openURL('https://apps.apple.com/us/app/celsius-safe-crypto-platform/id1387885523');
    }

    // Head to the about screen
    goToAbout = () => {
        this.props.navigation.navigate("About")
    }

    // Head to the choose type screen
    goToChoiceScreen = () => {
        this.props.navigation.navigate("Choice")
    }

    goToRandomizeTeams = () => {
        this.props.navigation.navigate("Teams", {isCreatingBracket: false})
    }

    // Sets the status of simple modal
    setModalVisible = (isVisible) => {
        this.setState({modalVisible: isVisible})
    }

    render() {
        return (
            <View style={styles.background}>
                <CircleComponent isWhite={false} />
                <Text style={styles.headerText}>Bracket and Team Maker</Text>
                <View>
                    <Image
                        style={styles.image} 
                        source={require('../../../assets/main.png')}
                        />
                </View>
                <TouchableOpacity style={styles.button} onPress={this.goToChoiceScreen}>
                    <Text style={styles.buttonText}>Create Bracket</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondary} onPress={this.goToRandomizeTeams}>
                    <Text style={styles.secondaryText}>Team Randomizer</Text>
                </TouchableOpacity>
                <View style={styles.iconView}>
                    <TouchableOpacity onPress={this.shareButton}>
                        <Feather name="share-2" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.rateApp}>
                        <Feather name="star" style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.goToAbout}>
                        <Feather name="info" style={styles.icon}/>
                    </TouchableOpacity>
                </View>
                <SimpleModalComponent modalVisible={this.state.modalVisible} 
                                      setModalVisible={this.setModalVisible} 
                                      text={this.state.text} buttonText={'OK'} />
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: Color.Background,
        height: Dimensions.get('window').height
    },
    headerText: {
        marginTop: Dimensions.get('window').height * .15,
        marginLeft: Dimensions.get('window').width * .05,
        marginRight: Dimensions.get('window').width * .05,
        lineHeight: Dimensions.get('window').height * .08,
        fontSize: Dimensions.get('window').height * .06,
        textAlign: 'center',
        color: Color.Main,
        opacity: .8,
        fontFamily: 'BalsamiqSans'
    },
    image: {
        height: Dimensions.get('window').height * .2,
        width: Dimensions.get('window').width * .5,
        marginHorizontal: Dimensions.get('window').width * .25,
        marginVertical: Dimensions.get('window').height * .07,
        resizeMode: 'contain'
    },
    buttonText: {
        fontSize: Dimensions.get('window').height * .03,
        textAlign: 'center',
        color: Color.White,
        fontFamily: 'BalsamiqSans'
    },
    button: {
        width: Dimensions.get('window').width * .7,
        marginLeft: Dimensions.get('window').width * .15,
        marginRight: Dimensions.get('window').width * .15,
        paddingVertical: Dimensions.get('window').width * .05,
        paddingHorizontal: Dimensions.get('window').width * .07,
        borderWidth: 3,
        borderColor: Color.Main,
        backgroundColor: Color.Main,
        borderRadius: 20,
    },
    secondaryText: {
        fontSize: Dimensions.get('window').height * .03,
        textAlign: 'center',
        color: Color.Main,
        fontFamily: 'BalsamiqSans'
    },
    secondary: {
        marginTop: Dimensions.get('window').height * .02,
        width: Dimensions.get('window').width * .7,
        marginLeft: Dimensions.get('window').width * .15,
        marginRight: Dimensions.get('window').width * .15,
        paddingVertical: Dimensions.get('window').width * .05,
        paddingHorizontal: Dimensions.get('window').width * .07,
        borderWidth: 3,
        borderColor: Color.Main,
        borderRadius: 15,
    },
    iconView: {
        marginTop: Dimensions.get('window').height * .04,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {
        color: Color.Main,
        marginHorizontal: Dimensions.get('window').width * .04,
        fontSize: Dimensions.get('window').height * .03,
    },
})

export default HomeScreen
