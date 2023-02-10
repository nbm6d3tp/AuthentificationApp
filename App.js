import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'expo-status-bar';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import {Colors} from './constants/styles';
import {Provider} from 'react-redux';
import store from './redux/store';
import {useSelector, useDispatch} from 'react-redux';
import IconButton from './components/ui/IconButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingOverlay from './components/ui/LoadingOverlay';
import {storeData} from './backend/asyncStore';
import {
  selectAuthentification,
  setAuthentification,
} from './redux/authentificationSlice';
import {Alert} from 'react-native';
import {useEffect, useState} from 'react';
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const dispatch = useDispatch();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: Colors.primary500},
        headerTintColor: 'white',
        contentStyle: {backgroundColor: Colors.primary100},
      }}>
      <Stack.Screen
        options={{
          headerRight: ({tintColor}) => (
            <IconButton
              icon="exit"
              color={tintColor}
              size={24}
              onPress={() => {
                dispatch(setAuthentification(null));
                try {
                  storeData('');
                } catch {
                  Alert.alert('An error occurred');
                }
              }}
            />
          ),
        }}
        name="Welcome"
        component={WelcomeScreen}
      />
    </Stack.Navigator>
  );
}
function Root() {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('idToken');
        console.log(value);
        if (value !== null) {
          dispatch(setAuthentification(value));
        }
      } catch (e) {
        Alert.alert('An error occurred');
      }
    };
    getData();
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <LoadingOverlay />;
  }
  return <Navigation />;
}

function Navigation() {
  const isAuthentificated = useSelector(selectAuthentification) ? true : false;
  return (
    <NavigationContainer>
      {isAuthentificated && <AuthenticatedStack />}
      {!isAuthentificated && <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="light" />
      <Root />
    </Provider>
  );
}
