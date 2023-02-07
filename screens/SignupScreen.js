import {useState} from 'react';
import {Alert} from 'react-native';
import {signUp} from '../backend/http';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {useDispatch} from 'react-redux';
import {setAuthentification} from '../redux/authentificationSlice';
function SignupScreen() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  async function authenticateHandler({email, password}) {
    try {
      setIsLoading(true);
      const idToken = await signUp(email, password);
      dispatch(setAuthentification(idToken));
    } catch (err) {
      Alert.alert('An error occurred while sign up');
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return <AuthContent onAuthenticate={authenticateHandler} />;
}

export default SignupScreen;
