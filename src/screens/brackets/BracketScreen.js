import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Animated,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import s4 from '../../../assets/s4.png';
import s5 from '../../../assets/s5.png';
import s6 from '../../../assets/s6.png';
import s7 from '../../../assets/s7.png';
import s8 from '../../../assets/s8.png';
import s9 from '../../../assets/s9.png';
import s10 from '../../../assets/s10.png';
import s11 from '../../../assets/s11.png';
import s12 from '../../../assets/s12.png';
import s13 from '../../../assets/s13.png';
import s14 from '../../../assets/s14.png';
import s15 from '../../../assets/s15.png';
import s16 from '../../../assets/s16.png';
import * as Color from '../../../global/Color';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const BracketScreen = (props) => {
  const [bracketImage, setBracketImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const modalAnimation = useRef(new Animated.Value(0)).current;
  const [zoomScale, setZoomScale] = useState(1);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(windowHeight * 0.8);

  useEffect(() => {
    chooseBracketImage();
  }, []);

  const handleGoBack = () => {
    props.navigation.goBack();
  };

  const chooseBracketImage = () => {
    const { teams, isDoubleElimination } = props.route.params;
    const teamCount = teams.length;

    let imageName = isDoubleElimination ? 'd' : 's';
    imageName += teamCount;

    const images = {
      s4, s5, s6, s7, s8, s9, s10, s11, s12, s13, s14, s15, s16
    };

    let image = images[imageName]

    const imageAsset = Image.resolveAssetSource(image);
    const imageUri = imageAsset.uri;
  
    Image.getSize(imageUri, (width, height) => {
      const aspectRatio = width / height;
      setImageWidth(imageHeight * aspectRatio);
    });

    setTimeout(() => {
      setBracketImage(image);
      setIsLoading(false);
    }, 1000);
  };

  const showTeams = () => {
    setModalVisible(true);
    Animated.timing(modalAnimation, {
      toValue: 1,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const hideTeams = () => {
    Animated.timing(modalAnimation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: false,
    }).start(() => {
      setModalVisible(false);
    });
  };

  const translateY = modalAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const onPinchEvent = (event) => {
    setZoomScale(event.nativeEvent.scale);
  };

  const onPinchStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setZoomScale(1);
    }
  };

  const { teams } = props.route.params;
  const teamList = teams.map((team, index) => (
    <Text key={index} style={styles.teamTextContainer}>
      <Text style={styles.teamText}>
        Team {index + 1}:{" "}
      </Text>
      <Text style={styles.teamUsersText}>
        {team.join(', ')} {/* Update this line */}
      </Text>
    </Text>
  ));

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backButtonText}>&larr; Back</Text>
      </TouchableOpacity>
      <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchStateChange}
        >
          <View style={{ flex: 1 }}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color={Color.Main} />
                  <Text style={styles.loadingText}>Loading...</Text>
                </View>
              ) : (
                imageWidth && (
                  <Image
                    source={bracketImage}
                    style={[
                      styles.image,
                      {
                        height: imageHeight,
                        width: imageWidth,
                        transform: [{ scale: zoomScale }],
                      },
                    ]}
                  />
                )
              )}
            </ScrollView>
          </View>
        </PinchGestureHandler>
      <TouchableOpacity style={styles.infoButton} onPress={showTeams}>
        <Ionicons name="information-circle-outline" style={styles.infoButtonText} />
      </TouchableOpacity>
      {modalVisible && (
        <Animated.View
          style={[
            styles.modalContent,
            {
              transform: [{ translateY: translateY }],
            },
          ]}
        >
          <ScrollView contentContainerStyle={styles.modalScroll}>{teamList}</ScrollView>
          <TouchableOpacity style={styles.modalCloseButton} onPress={hideTeams}>
            <Text style={styles.modalCloseButtonText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f4fb',
    paddingTop: Dimensions.get('window').height * .025
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: Dimensions.get('window').width * 0.045,
    fontFamily: 'BalsamiqSans',
    color: Color.Main,
  },  
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  backButton: {
    paddingLeft: Dimensions.get('window').width * .025,
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
  scrollView: {
    flexGrow: 1,
  },
  horizontalScrollView: {
    flexGrow: 1,
    minWidth: '100%',
  },
  verticalScrollView: {
    flexGrow: 1,
    minHeight: '100%',
  },
  scrollView: {
    flexGrow: 1,
  },
  image: {
    resizeMode: 'contain',
  },
  infoButton: {
    backgroundColor: Color.Main,
    borderRadius: Dimensions.get('window').width * 0.15,
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  infoButtonText: {
    color: Color.White,
    fontSize: Dimensions.get('window').width * 0.075,
    fontFamily: 'BalsamiqSans',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
    pointerEvents: 'none', // Add this line
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    width: '100%',
    paddingBottom: Platform.OS === 'android' ? 30 : 20,
    pointerEvents: 'auto', // Add this line
  },
  modalScroll: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  teamTextContainer: {
    flexDirection: 'row',
  },
  teamText: {
    fontSize: Dimensions.get('window').width * 0.045,
    fontFamily: 'BalsamiqSans',
    color: Color.Main,
    marginBottom: 5,
  },
  teamUsersText: {
    fontSize: Dimensions.get('window').width * 0.045,
    fontFamily: 'BalsamiqSans',
    color: Color.Text,
    marginBottom: 5,
  },
  modalCloseButton: {
    backgroundColor: Color.Main,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: Dimensions.get('window').width * 0.035,
    fontFamily: 'BalsamiqSans',
  },
});

export default BracketScreen;
