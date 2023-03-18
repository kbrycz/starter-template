import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Animated } from 'react-native';
import logo from '../../assets/icon.png';

function SplashScreen({ navigation }) {
    const [fadeAnim] = useState(new Animated.Value(0));
  
    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          delay: 1000,
          useNativeDriver: true,
        }).start(() => {
          navigation.navigate('Home');
        });
      });
    }, []);
  
    return (
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image source={logo} style={styles.logo} />
        </Animated.View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    logo: {
      width: 150,
      height: 150,
    },
  });
  
  export default SplashScreen;
  