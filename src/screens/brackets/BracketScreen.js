import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  Platform,
} from 'react-native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';
import s8 from '../../../assets/s8.png';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const BracketScreen = (props) => {
  const [bracketImage, setBracketImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(windowHeight * 0.8);

  useEffect(() => {
    chooseBracketImage();
  }, []);

  const chooseBracketImage = () => {
    const imageAsset = Image.resolveAssetSource(s8);
    const imageUri = imageAsset.uri;
  
    Image.getSize(imageUri, (width, height) => {
      const aspectRatio = width / height;
      setImageWidth(imageHeight * aspectRatio);
    });
    setBracketImage(s8);
  };

  const showTeams = () => {
    setModalVisible(true);
  };

  const hideTeams = () => {
    setModalVisible(false);
  };

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
    <Text key={index} style={styles.teamText}>
      Team {index + 1}: {team}
    </Text>
  ));

  return (
    <View style={styles.container}>
      <PinchGestureHandler
        onGestureEvent={onPinchEvent}
        onHandlerStateChange={onPinchStateChange}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {imageWidth && (
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
          )}
        </ScrollView>
      </PinchGestureHandler>
      <TouchableOpacity style={styles.infoButton} onPress={showTeams}>
        <Text style={styles.infoButtonText}>i</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={hideTeams}
        statusBarTranslucent={Platform.OS === 'android'}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Teams</Text>
            <ScrollView contentContainerStyle={styles.modalScroll}>
              {teamList}
            </ScrollView>
            <TouchableOpacity style={styles.modalCloseButton} onPress={hideTeams}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9f4fb',
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
    backgroundColor: '#007AFF',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  infoButtonText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    padding: 20,
    width: '100%',
    paddingBottom: Platform.OS === 'android' ? 30 : 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalScroll: {
    flexGrow: 1,
    paddingBottom: 10,
  },
  teamText: {
    fontSize: 18,
    marginBottom: 5,
  },
  modalCloseButton: {
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default BracketScreen;
