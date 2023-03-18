import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/home/HomeScreen'
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import * as SplashScreenExpo from 'expo-splash-screen';
import SplashScreen from './src/splash/SplashScreen';


// Creates stack for the Home screens
const Home = createStackNavigator();
const HomeStack = () => {
  return (
    <Home.Navigator 
        initialRouteName="Main"
        screenOptions={{
          headerShown: false
        }}>
        <Home.Screen name="Main" component={HomeScreen} />
    </Home.Navigator>
  )
}

const RootStack = createStackNavigator();

class App extends React.Component {

  // Initialize the App Screen state
  constructor() {
    super();
  }

  // Loads all assets before screen renders
  // Allows for images and fonts to be in place when the screen is rendered
  async loadEverything() {

    // Keep the splash screen visible while we fetch resources
    await SplashScreenExpo.hideAsync();

    // Loads all the images
    // await Asset.loadAsync([
    //   require('./assets/main.png'),
    // ]);

    // Loads all the fonts
    await Font.loadAsync({
      BalsamiqSans: require('./assets/fonts/BalsamiqSans-Regular.ttf')
    });
}

  // Allows for fading between screens
  forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });

 
  // Check and see if user already has a token to log user in
  componentDidMount() {
    this.loadEverything()
  }

  // Renders the jsx for the UI
  render() {
    return( 
      <NavigationContainer>
           <RootStack.Navigator screenOptions={{
              headerShown: false,
              headerMode: 'none',
              animationEnabled: true,
              cardStyleInterpolator: this.forFade,
              gestureEnabled: false,
            }}>
            <RootStack.Screen name="Splash" component={SplashScreen}
              options={{ headerShown: false }}
            />
            <RootStack.Screen name='Home' component={HomeStack} />
         </RootStack.Navigator>
        </NavigationContainer>  
    )
          }
}

export default function(props) {
    return <App {...props} />;
}