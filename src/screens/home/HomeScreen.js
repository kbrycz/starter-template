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
        //         url: 'https://celsius.onelink.me/EyfO/ios?pid=website&c=download-app&af_js_web=true',
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

    // Sets the status of simple modal
    setModalVisible = (isVisible) => {
        this.setState({modalVisible: isVisible})
    }

    render() {
        return (
            <View style={styles.background}>
                <CircleComponent isWhite={false} />
                <Text style={styles.headerText}>App Title</Text>
                <View>
                    <Image
                        style={styles.image} 
                        source={require('../../../assets/icon.png')}
                        />
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Main</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.secondary}>
                    <Text style={styles.secondaryText}>Secondary</Text>
                </TouchableOpacity>
                <View style={styles.iconView}>
                    <TouchableOpacity onPress={this.shareButton}>
                        <Feather name="share-2" style={styles.icon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.rateApp}>
                        <Feather name="star" style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
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
        backgroundColor: Color.MAIN,
        height: Dimensions.get('window').height
    },
    headerText: {
        marginTop: Dimensions.get('window').height * .15,
        marginLeft: Dimensions.get('window').width * .05,
        marginRight: Dimensions.get('window').width * .05,
        lineHeight: Dimensions.get('window').height * .08,
        fontSize: Dimensions.get('window').height * .06,
        textAlign: 'center',
        color: Color.WHITE,
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
        fontSize: Dimensions.get('window').height * .032,
        textAlign: 'center',
        color: Color.MAIN,
        fontFamily: 'BalsamiqSans'
    },
    button: {
        width: Dimensions.get('window').width * .7,
        marginLeft: Dimensions.get('window').width * .15,
        marginRight: Dimensions.get('window').width * .15,
        backgroundColor: Color.WHITE,
        paddingVertical: Dimensions.get('window').width * .05,
        paddingHorizontal: Dimensions.get('window').width * .07,
        borderWidth: 4,
        borderColor: Color.MAIN,
        borderRadius: 20,
    },
    secondaryText: {
        fontSize: Dimensions.get('window').height * .022,
        textAlign: 'center',
        color: Color.WHITE,
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
        borderColor: Color.WHITE,
        borderRadius: 15,
    },
    iconView: {
        marginTop: Dimensions.get('window').height * .04,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    icon: {
        color: Color.WHITE,
        marginHorizontal: Dimensions.get('window').width * .04,
        fontSize: Dimensions.get('window').height * .03,
    },
})

export default HomeScreen
