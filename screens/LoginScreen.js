import AuthContent from '../components/Auth/AuthContent';
import {signIn} from '../backend/http';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setAuthentification} from '../redux/authentificationSlice';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {storeData} from '../backend/asyncStore';
import Button from '../components/ui/Button';
import * as Notifications from 'expo-notifications';
import {Alert, Text, View} from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function LoginScreen() {
  const scheduleNotificationHandler = () => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Time's up!",
        body: 'Change sides!',
      },
      trigger: {
        seconds: 5,
      },
    });
  };

  function sendPushNotificationHandler() {
    fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: 'ExponentPushToken[aZCzyTHbdQ6BAlu88D8uL4]',
        title: 'Test - sent from a device!',
        body: 'This is a test!',
      }),
    });
  }

  useEffect(() => {
    Notifications.getExpoPushTokenAsync().then(pushTokenData => {
      console.log(pushTokenData);
    });
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.DEFAULT,
      });
    }
    const subscription = Notifications.addNotificationReceivedListener(
      notification => {
        console.log(notification);
        Alert.alert(
          `You have just received a notification:"${notification.request.content.title}" after ${notification.request.trigger.seconds}`,
        );
      },
    );
    const subscription1 = Notifications.addNotificationResponseReceivedListener(
      response => {
        console.log(response);
      },
    );
    return () => {
      subscription.remove();
      subscription1.remove();
    };
  }, []);

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  async function authenticateHandler({email, password}) {
    try {
      setIsLoading(true);
      const idToken = await signIn(email, password);
      storeData(idToken);
      dispatch(setAuthentification(idToken));
    } catch (err) {
      Alert.alert('An error occurred while sign in');
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <>
      <AuthContent onAuthenticate={authenticateHandler} isLogin />
      <View style={{margin: 20}}>
        <Button onPress={scheduleNotificationHandler}>
          <Text>Schedule Notification</Text>
        </Button>
      </View>
      <View style={{margin: 20}}>
        <Button onPress={sendPushNotificationHandler}>
          <Text>Push Notification</Text>
        </Button>
      </View>
    </>
  );
}

export default LoginScreen;
